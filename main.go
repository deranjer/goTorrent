package main

import (
	"encoding/json"
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

	"github.com/anacrolix/torrent/metainfo"
	"github.com/boltdb/bolt"
	Engine "github.com/deranjer/goTorrent/engine"
	Settings "github.com/deranjer/goTorrent/settings"
	Storage "github.com/deranjer/goTorrent/storage"
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
	ClientDBstruct []ClientDB `json:"data"`
}

type ClientDB struct {
	TorrentName      string `json:"TorrentName"`
	DownloadedSize   string `json:"DownloadedSize"`
	Size             string `json:"Size"`
	DownloadSpeed    string `json:"DownloadSpeed"`
	downloadSpeedInt int64
	UploadSpeed      string `json:"UploadSpeed"`
	//UploadSpeedInt    int64
	DataBytesWritten  int64
	DataBytesRead     int64
	ActivePeers       string `json:"ActivePeers"`
	TorrentHashString string `json:"TorrentHashString"`
	PercentDone       string `json:"PercentDone"`
	TorrentHash       metainfo.Hash
	StoragePath       string `json:"StorageLocation"`
	DateAdded         string
	KnownSwarm        []torrent.Peer
	Status            string `json:"Status"`
	BytesCompleted    int64
	UpdatedAt         time.Time
	ETA               string `json:"ETA"`
}

func serveHome(w http.ResponseWriter, r *http.Request) {
	s1, _ := template.ParseFiles("templates/home.tmpl")
	s1.ExecuteTemplate(w, "base", map[string]string{"APP_ID": APP_ID})
}

func timeOutInfo(clientTorrent *torrent.Torrent, seconds time.Duration) (deleted bool) { //forcing a timeout of the
	timeout := make(chan bool, 1) //creating a timeout channel for our gotinfo
	go func() {
		time.Sleep(seconds * time.Second)
		timeout <- true
	}()
	select {
	case <-clientTorrent.GotInfo(): //attempting to retrieve info for torrent
		fmt.Println("Recieved torrent info..")
		clientTorrent.DownloadAll()
		return false
	case <-timeout: // getting info for torrent has timed out so purging the torrent
		fmt.Println("Dropping Torrent")
		clientTorrent.Drop()
		return true
	}

}

func startTorrent(clientTorrent *torrent.Torrent, torrentLocalStorage *Storage.TorrentLocal, torrentDbStorage *bolt.DB, dataDir string, torrentFile string, torrentFileName string) {

	timeOutInfo(clientTorrent, 45) //seeing if adding the torrrent times out (giving 45 seconds)
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
	Storage.AddTorrentLocalStorage(torrentDbStorage, torrentLocalStorage) //writing all of the data to the database
	clientTorrent.DownloadAll()                                           //starting the download
}

func createRunningTorrentArray(tclient *torrent.Client, TorrentLocalArray []*Storage.TorrentLocal, PreviousTorrentArray []clientDB, config Settings.FullClientSettings, db *bolt.DB) (RunningTorrentArray []clientDB) {
	for _, element := range TorrentLocalArray { //re-adding all the torrents we had stored from last shutdown

		var singleTorrent *torrent.Torrent

		if element.TorrentType == "file" { //if it is a file pull it from the uploaded torrent folder
			//fmt.Println("Filename", element.TorrentFileName)
			if _, err := os.Stat(element.TorrentFileName); err == nil { //if we CAN find the torrent, add it
				//fmt.Println("Adding file name...", element.TorrentFileName)
				singleTorrent, _ = tclient.AddTorrentFromFile(element.TorrentFileName)
			} else { //if we cant find the torrent delete it
				fmt.Println("File Error", err)
				Storage.DelTorrentLocalStorage(db, element)
				continue
			}

		} else {
			elementMagnet := "magnet:?xt=urn:btih:" + element.Hash //For magnet links just need to prepend the magnet part to the hash to readd
			singleTorrent, _ = tclient.AddMagnet(elementMagnet)
		}

		timeOut := timeOutInfo(singleTorrent, 45)
		if timeOut == true { // if we did timeout then drop the torrent from the boltdb database
			Storage.DelTorrentLocalStorage(db, element) //purging torrent from the local database
		}

		fullClientDB := new(ClientDB)
		fullStruct := singleTorrent.Stats()

		//ranging over the previous torrent array to calculate the speed for each torrent
		if len(PreviousTorrentArray) > 0 { //if we actually have  a previous array
			for _, previousElement := range PreviousTorrentArray {
				TempHash := singleTorrent.InfoHash()
				if previousElement.TorrentHashString == TempHash.AsString() { //matching previous to new
					Engine.CalculateTorrentSpeed(singleTorrent, fullClientDB, previousElement)
				}
			}
		}
		activePeersString := fmt.Sprintf("%v", fullStruct.ActivePeers) //converting to strings
		totalPeersString := fmt.Sprintf("%v", fullStruct.TotalPeers)
		bytesCompletedMB := float32(singleTorrent.BytesCompleted() / 1024 / 1024)
		totalSizeMB := float32(singleTorrent.Length() / 1024 / 1024)
		//downloadSizeString := fmt.Sprintf("%d", bytesCompletedMB)

		tSize, dSize := convertSizetoGB(totalSizeMB, bytesCompletedMB) //convert size to GB if needed
		var TempHash metainfo.Hash
		TempHash = singleTorrent.InfoHash()

		fullClientDB.DownloadedSize = dSize
		fullClientDB.Size = tSize
		PercentDone := fmt.Sprintf("%.2f", bytesCompletedMB/totalSizeMB)
		fullClientDB.TorrentHash = TempHash
		fullClientDB.PercentDone = PercentDone
		fullClientDB.DataBytesRead = fullStruct.ConnStats.DataBytesRead
		fullClientDB.DataBytesWritten = fullStruct.ConnStats.DataBytesWritten
		fullClientDB.ActivePeers = activePeersString + " / (" + totalPeersString + ")"
		fullClientDB.TorrentHashString = TempHash.AsString()
		fullClientDB.StoragePath = element.StoragePath
		fullClientDB.TorrentName = element.TorrentName
		fullClientDB.DateAdded = element.DateAdded
		fullClientDB.BytesCompleted = singleTorrent.BytesCompleted()
		calculateTorrentETA(singleTorrent, fullClientDB) //calculating the ETA for the torrent
		//fmt.Println("Download Speed: ", fullClientDB.DownloadSpeed)
		//fmt.Println("Percent Done: ", fullClientDB.PercentDone)
		//tclient.WriteStatus(os.Stdout)
		calculateTorrentStatus(singleTorrent, fullClientDB) //calculate the status of the torrent, ie downloading seeding etc

		RunningTorrentArray = append(RunningTorrentArray, *fullClientDB)

	}
	return RunningTorrentArray
}

func updateClient(torrentstats []clientDB, conn *websocket.Conn) { //get the torrent client and the websocket connection to write msg
	conn.WriteJSON(torrentstats) //converting to JSON and writing to the client
}

func main() {
	//setting up the torrent client
	Config := Settings.FullClientSettingsNew()       //grabbing from settings.go
	os.Mkdir(Config.TFileUploadFolder, os.ModeDir)   //creating a directory to store uploaded torrent files
	torrentLocalStorage := new(Storage.TorrentLocal) //creating a new struct that stores all of our local storage info

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

	var TorrentLocalArray = []*Storage.TorrentLocal{} //this is an array of ALL of the local storage torrents, they will be added back in via hash
	var RunningTorrentArray = []clientDB{}            //this stores ALL of the torrents that are running, used for client update pushes combines Local Storage and Running tclient info
	var PreviousTorrentArray = []clientDB{}

	TorrentLocalArray = Storage.ReadInTorrents(db) //pulling in all the already added torrents

	if TorrentLocalArray != nil { //the first creation of the running torrent array
		RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well

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
		var filePath = filepath.Join(Config.TFileUploadFolder, header.Filename) //creating a full filepath to store the .torrent files
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
		TorrentLocalArray = Storage.ReadInTorrents(db)
		RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well
		var torrentlistArray = new(torrentList)                                                                       //the full JSON that includes the number of torrents as the root
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

				TorrentLocalArray = Storage.ReadInTorrents(db)
				RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well
				PreviousTorrentArray = RunningTorrentArray
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

			} else if string(msg) == "torrentFileListRequest" { //client requested a filelist update
				fmt.Println("client Requested Filelist update")
				err = conn.WriteMessage(msgType, []byte("fileListUpdate"))
				if err != nil {
					fmt.Println("Websocket Write err", err)
					return
				}

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
