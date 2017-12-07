package main

import (
	"flag"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/anacrolix/torrent"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	//"github.com/anacrolix/dht"
	"encoding/json"

	"github.com/anacrolix/torrent/metainfo"
	"github.com/boltdb/bolt"
)

var (
	httpAddr        = flag.String("addr", ":8000", "Http server address")
	baseTmpl string = "templates/base.tmpl"

	APP_ID     = os.Getenv("APP_ID")
	APP_SECRET = os.Getenv("APP_SECRET")
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type torrentList struct { //helps create the JSON structure that react expects to recieve
	Totaltorrents  int        `json:"total"`
	ClientDBstruct []clientDB `json:"data"`
}

type clientDB struct {
	TorrentName       string  `json:"TorrentName"`
	DownloadedSize    int64   `json:"DownloadedSize"`
	Size              int64   `json:"Size"`
	DownloadSpeed     float32 `json:"DownloadSpeed"`
	UploadSpeed       float32 `json:"UploadSpeed"`
	DataBytesWritten  int64
	DataBytesRead     int64
	ActivePeers       int     `json:"ActivePeers"`
	TotalPeers        int     `json:"TotalPeers"`
	TorrentHashString string  `json:"TorrentHashString"`
	PercentDone       float32 `json:"PercentDone"`
	TorrentHash       metainfo.Hash
	StoragePath       string `json:"StorageLocation"`
	DateAdded         string
	KnownSwarm        []torrent.Peer
	Status            string `json:"Status"`
	BytesCompleted    int64
	UpdatedAt         time.Time
}

func calculateTorrentSpeed(t *torrent.Torrent, c *clientDB) {
	now := time.Now()
	bytes := t.BytesCompleted()
	fmt.Println("UpdatedAt: ", c.UpdatedAt)
	if c.UpdatedAt.IsZero() {
		c.UpdatedAt = now
		fmt.Println("Setting Time", c.UpdatedAt)

	} else {
		dt := float32(now.Sub(c.UpdatedAt))
		fmt.Println("Delta Time: ", dt)
		db := float32(bytes - c.BytesCompleted)
		fmt.Println("Delta Bytes:", db)
		rate := db * (float32(time.Second) / dt)

		fmt.Println("form: ", float32(time.Second))
		if rate >= 0 {
			c.DownloadSpeed = rate
		}
	}

}

func calculateTorrentStatus(t *torrent.Torrent, c *clientDB) {
	if t.Seeding() {
		c.Status = "Seeding"
	} else if t.Stats().ActivePeers > 0 && t.BytesMissing() > 0 {
		c.Status = "Downloading"
	} else if t.Stats().ActivePeers == 0 && t.BytesMissing() == 0 {
		c.Status = "Completed"
	} else if t.Stats().ActivePeers == 0 && t.BytesMissing() > 0 {
		c.Status = "Awaiting Peers"
	} else {
		c.Status = "Unknown"
	}
}

func serveHome(w http.ResponseWriter, r *http.Request) {
	s1, _ := template.ParseFiles("templates/home.tmpl")
	s1.ExecuteTemplate(w, "base", map[string]string{"APP_ID": APP_ID})
}

func startTorrent(clientTorrent *torrent.Torrent, torrentLocalStorage *TorrentLocal, torrentDbStorage *bolt.DB, dataDir string, torrentFile string, torrentFileName string) {

	timeout := make(chan bool, 1) //creating a timeout channel for our gotinfo
	go func() {
		time.Sleep(45 * time.Second)
		timeout <- true
	}()
	select {
	case <-clientTorrent.GotInfo(): //attempting to retrieve info for torrent
		fmt.Println("Recieved torrent info..")
		clientTorrent.DownloadAll()
	case <-timeout: // getting info for torrent has timed out so purging the torrent
		fmt.Println("Dropping Torrent")
		clientTorrent.Drop()
		return
	}

	var TempHash metainfo.Hash
	TempHash = clientTorrent.InfoHash()
	fmt.Println(clientTorrent.Info().Source)
	torrentLocalStorage.Hash = TempHash.String() // we will store the infohash to add it back later on client restart (if needed)
	torrentLocalStorage.DateAdded = time.Now().Format("Jan _2 2006")
	torrentLocalStorage.StoragePath = dataDir //TODO check full path information for torrent storage
	torrentLocalStorage.TorrentName = clientTorrent.Name()
	torrentLocalStorage.TorrentStatus = "downloading" //by default start all the torrents as downloading.
	torrentLocalStorage.TorrentType = torrentFile     //either "file" or "magnet" maybe more in the future
	if torrentFile == "file" {
		torrentLocalStorage.TorrentFileName = torrentFileName
	} else {
		torrentLocalStorage.TorrentFileName = ""
	}
	fmt.Printf("%+v\n", torrentLocalStorage)
	addTorrentLocalStorage(torrentDbStorage, torrentLocalStorage) //writing all of the data to the database
	clientTorrent.DownloadAll()                                   //starting the download
}

func createRunningTorrentArray(tclient *torrent.Client, TorrentLocalArray []*TorrentLocal, config fullClientSettings, db *bolt.DB) (RunningTorrentArray []clientDB) {
	for _, element := range TorrentLocalArray { //re-adding all the torrents we had stored from last shutdown

		var singleTorrent *torrent.Torrent

		if element.TorrentType == "file" { //if it is a file pull it from the uploaded torrent folder
			fmt.Println("Filename", element.TorrentFileName)
			if _, err := os.Stat(element.TorrentFileName); err == nil { //if we CAN find the torrent, add it
				fmt.Println("Adding file name...", element.TorrentFileName)
				singleTorrent, _ = tclient.AddTorrentFromFile(element.TorrentFileName)
			} else { //if we cant find the torrent delete it
				fmt.Println("File Error", err)
				delTorrentLocalStorage(db, element)
				continue
			}

		} else {
			elementMagnet := "magnet:?xt=urn:btih:" + element.Hash //For magnet links just need to prepend the magnet part to the hash to readd
			singleTorrent, _ = tclient.AddMagnet(elementMagnet)
		}

		timeout := make(chan bool, 1) //creating a timeout channel for our gotinfo
		go func() {
			time.Sleep(45 * time.Second)
			timeout <- true
		}()
		select {
		case <-singleTorrent.GotInfo(): //attempting to retrieve info for torrent
			singleTorrent.DownloadAll()
		case <-timeout: // getting info for torrent has timed out so purging the torrent
			fmt.Println("Dropping Torrent")
			singleTorrent.Drop()
			delTorrentLocalStorage(db, element) //purging torrent from the local database
			continue
		}

		fmt.Println("Recieved info for: ", element.TorrentName)
		fullClientDB := new(clientDB)
		fullStruct := singleTorrent.Stats()

		bytesTotal := singleTorrent.Length()
		//bytesCompleted := singleTorrent.BytesCompleted()

		calculateTorrentSpeed(singleTorrent, fullClientDB) //Setting the downloadSpeed for the torrent
		//fullClientDB.UpdatedAt = time.Now()                // setting the current time to measure download speed.
		var TempHash metainfo.Hash
		TempHash = singleTorrent.InfoHash()
		fullClientDB.DownloadedSize = singleTorrent.BytesCompleted() / 1024 / 1024
		fullClientDB.Size = bytesTotal / 1024 / 1024
		fullClientDB.TorrentHash = TempHash
		fullClientDB.PercentDone = (float32(fullClientDB.DownloadedSize) / float32(fullClientDB.Size))
		fullClientDB.DataBytesRead = fullStruct.ConnStats.DataBytesRead
		fullClientDB.DataBytesWritten = fullStruct.ConnStats.DataBytesWritten
		fullClientDB.ActivePeers = fullStruct.ActivePeers
		fullClientDB.TotalPeers = fullStruct.TotalPeers
		fullClientDB.TorrentHashString = TempHash.AsString()
		fullClientDB.StoragePath = element.StoragePath
		fullClientDB.TorrentName = element.TorrentName
		fullClientDB.DateAdded = element.DateAdded
		fmt.Println("Download Speed: ", fullClientDB.DownloadSpeed)
		fmt.Println("Percent Done: ", fullClientDB.PercentDone)
		fmt.Println("UpdatedAt: ", fullClientDB.UpdatedAt)

		calculateTorrentStatus(singleTorrent, fullClientDB) //calculate the status of the torrent

		RunningTorrentArray = append(RunningTorrentArray, *fullClientDB)

	}
	return RunningTorrentArray
}

func updateClient(torrentstats []clientDB, conn *websocket.Conn) { //get the torrent client and the websocket connection to write msg
	//first get the list of torrents in the client

	conn.WriteJSON(torrentstats) //converting to JSON and writing to the client
}

func main() {
	//setting up the torrent client
	Config := fullClientSettingsNew()              //grabbing from settings.go
	os.Mkdir(Config.tFileUploadFolder, os.ModeDir) //creating a directory to store uploaded torrent files
	torrentLocalStorage := new(TorrentLocal)       //creating a new struct that stores all of our local storage info

	fmt.Printf("%+v\n", Config)

	tclient, err := torrent.NewClient(&Config.Config) //pulling out the torrent specific config to use
	if err != nil {
		log.Fatalf("error creating client: %s", err)
	}

	db, err := bolt.Open("storage.db", 0600, nil) //initializing the boltDB store that contains all the added torrents
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close() //defering closing the database until the program closes

	var TorrentLocalArray = []*TorrentLocal{} //this is an array of ALL of the local storage torrents, they will be added back in via hash
	var RunningTorrentArray = []clientDB{}    //this stores ALL of the torrents that are running, used for client update pushes combines Local Storage and Running tclient info

	TorrentLocalArray = readInTorrents(db) //pulling in all the already added torrents

	if TorrentLocalArray != nil { //the first creation of the running torrent array
		RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray, Config, db) //Updates the RunningTorrentArray with the current client data as well

	} else {
		fmt.Println("Database is empty!")
	}

	router := mux.NewRouter()         //setting up the handler for the web backend
	router.HandleFunc("/", serveHome) //Serving the main page for our SPA
	http.Handle("/static/", http.FileServer(http.Dir("public")))
	http.Handle("/", router)
	http.HandleFunc("/uploadTorrent", func(w http.ResponseWriter, r *http.Request) { //grabbing the uploaded Torrent File and adding it to the client
		defer http.Redirect(w, r, "/", 301)
		file, header, err := r.FormFile("fileTest")
		if err != nil {
			fmt.Println("Error with fetching file or request issue", file)
		}
		defer file.Close()                                                      //defer closing the file until we are done manipulating it
		var filePath = filepath.Join(Config.tFileUploadFolder, header.Filename) //creating a full filepath to store the .torrent files
		fileName, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE, 0666)   //generating the fileName
		if err != nil {
			panic(err)
		}
		io.Copy(fileName, file)                                           //Dumping our recieved file into the filename
		clientTorrent, err := tclient.AddTorrentFromFile(fileName.Name()) //Adding the torrent into the client
		if err != nil {
			fmt.Println("Error adding Torrent from file: ", fileName.Name())
		} else {
			fmt.Println("Adding Torrent via file", fileName)
			startTorrent(clientTorrent, torrentLocalStorage, db, Config.DataDir, "file", fileName.Name())
		}

	})
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) { //exposing the data to the
		TorrentLocalArray = readInTorrents(db)
		RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray, Config, db) //Updates the RunningTorrentArray with the current client data as well
		var torrentlistArray = new(torrentList)
		torrentlistArray.ClientDBstruct = RunningTorrentArray
		torrentlistArray.Totaltorrents = len(RunningTorrentArray)
		torrentlistArrayJSON, _ := json.Marshal(torrentlistArray)
		w.Header().Set("Content-Type", "application/json")
		w.Write(torrentlistArrayJSON)
		//updateClient(RunningTorrentArray, conn) // sending the client update information over the websocket
	})
	http.HandleFunc("/websocket", func(w http.ResponseWriter, r *http.Request) { //websocket is the main data pipe to the frontend
		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			log.Println(err)
			return
		}

		for {
			msgType, msg, err := conn.ReadMessage()
			if err != nil {
				fmt.Println("Read Message Error", err)
				return
			}
			if string(msg) == "clientUpdateRequest" { //6 second update ping
				fmt.Println("client Requested Update")
				//time.Sleep(6 * time.Second)
				err = conn.WriteMessage(msgType, []byte("clientUpdate"))
				if err != nil {
					fmt.Println("Websocket Write err", err)
					return
				}

				TorrentLocalArray = readInTorrents(db)
				RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray, Config, db) //Updates the RunningTorrentArray with the current client data as well
				var torrentlistArray = new(torrentList)
				torrentlistArray.ClientDBstruct = RunningTorrentArray
				torrentlistArray.Totaltorrents = len(RunningTorrentArray)
				//fmt.Printf("%+v\n", torrentlistArray)
				conn.WriteJSON(torrentlistArray)
				//updateClient(RunningTorrentArray, conn) // sending the client update information over the websocket

			} else if strings.HasPrefix(string(msg), "magnet:") {
				fmt.Println(string(msg))
				clientTorrent, err := tclient.AddMagnet(string(msg))
				if err != nil {
					fmt.Println("Magnet Error", err)
				}
				fmt.Println(clientTorrent)
				fmt.Printf("Adding Magnet Link")

				startTorrent(clientTorrent, torrentLocalStorage, db, Config.DataDir, "magnet", "") //starting the torrent and creating local DB entry

			} else {
				conn.Close()
				fmt.Println(string(msg))
				return
			}
		}
	})
	if err := http.ListenAndServe(*httpAddr, nil); err != nil {
		log.Fatalf("Error listening, %v", err)
	}
}
