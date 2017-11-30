package main

import (
	"flag"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
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
	ActivePeers       int    `json:"ActivePeers"`
	TotalPeers        int    `json:"TotalPeers"`
	TorrentHashString string `json:"TorrentHashString"`
	PercentDone       int64  `json:"Done"`
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
	if !c.UpdatedAt.IsZero() {
		dt := float32(now.Sub(c.UpdatedAt))
		db := float32(bytes - c.BytesCompleted)
		rate := db * (float32(time.Second) / dt)
		if rate >= 0 {
			c.DownloadSpeed = rate
		}
	}
	c.UpdatedAt = now
}

func calculateTorrentStatus(t *torrent.Torrent, c *clientDB) {
	if t.Seeding() {
		c.Status = "Seeding"
	} else if t.Stats().ActivePeers > 0 && t.BytesMissing() > 0 {
		c.Status = "Downloading"
	} else if t.Stats().ActivePeers == 0 {
		c.Status = "Awaiting Peers"
	} else {
		c.Status = "Unknown"
	}
}

func serveHome(w http.ResponseWriter, r *http.Request) {
	s1, _ := template.ParseFiles("templates/home.tmpl")
	s1.ExecuteTemplate(w, "base", map[string]string{"APP_ID": APP_ID})
}

func startTorrent(clientTorrent *torrent.Torrent, torrentLocalStorage *TorrentLocal, Config torrent.Config, torrentDbStorage *bolt.DB, torrentLocal []*TorrentLocal, tclient *torrent.Client) {
	<-clientTorrent.GotInfo() //waiting for all of the torrent info to be downloaded
	var TempHash metainfo.Hash
	TempHash = clientTorrent.InfoHash()
	fmt.Println(clientTorrent.Info().Source)
	torrentLocalStorage.Hash = TempHash.String() // we will store the infohash to add it back later on client restart (if needed)
	torrentLocalStorage.DateAdded = time.Now().Format("Jan _2 2006")
	torrentLocalStorage.StoragePath = Config.DataDir //TODO check full path information for torrent storage
	torrentLocalStorage.TorrentName = clientTorrent.Name()
	torrentLocalStorage.TorrentStatus = "downloading" //by default start all the torrents as downloading.

	fmt.Printf("%+v\n", torrentLocalStorage)
	addTorrentLocalStorage(torrentDbStorage, torrentLocalStorage) //writing all of the data to the database

	clientTorrent.DownloadAll() //starting the download
	createRunningTorrentArray(tclient, torrentLocal)
}

func createRunningTorrentArray(tclient *torrent.Client, TorrentLocalArray []*TorrentLocal) (RunningTorrentArray []clientDB) {
	for _, element := range TorrentLocalArray { //re-adding all the torrents we had stored from last shutdown

		elementMagnet := "magnet:?xt=urn:btih:" + element.Hash
		singleTorrent, _ := tclient.AddMagnet(elementMagnet) //adding back in the torrents by hash

		fmt.Println("Here...", elementMagnet)
		//<-singleTorrent.GotInfo()
		//singleTorrent.DownloadAll()
		fmt.Println("Past...")
		fullClientDB := new(clientDB)
		fullStruct := singleTorrent.Stats()

		//bytesMissing := singleTorrent.BytesMissing()
		//bytesTotal := singleTorrent.Length()
		//bytesCompleted := singleTorrent.BytesCompleted()
		//
		calculateTorrentSpeed(singleTorrent, fullClientDB) //Setting the downloadSpeed for the torrent
		var TempHash metainfo.Hash
		TempHash = singleTorrent.InfoHash()
		//fullClientDB.DownloadedSize = singleTorrent.BytesCompleted()
		//fullClientDB.Size = bytesTotal
		fullClientDB.TorrentHash = TempHash
		//fullClientDB.PercentDone = 1 - (bytesMissing / bytesTotal)
		//fullClientDB.DataBytesRead = fullStruct.ConnStats.DataBytesRead
		//fullClientDB.DataBytesWritten = fullStruct.ConnStats.DataBytesWritten
		fullClientDB.ActivePeers = fullStruct.ActivePeers
		fullClientDB.TotalPeers = fullStruct.TotalPeers
		fullClientDB.TorrentHashString = TempHash.AsString()
		fullClientDB.StoragePath = element.StoragePath
		fullClientDB.TorrentName = element.TorrentName
		fullClientDB.DateAdded = element.DateAdded

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
	Config := fullClientSettingsNew() //grabbing from settings.go

	torrentLocalStorage := new(TorrentLocal) //creating a new struct that stores all of our local storage info

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

	if TorrentLocalArray != nil {
		RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray) //Updates the RunningTorrentArray with the current client data as well
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
		defer file.Close()                                                           //defer closing the file until we are done manipulating it
		fileName, err := os.OpenFile(header.Filename, os.O_WRONLY|os.O_CREATE, 0666) //generating the fileName
		if err != nil {
			panic(err)
		}
		io.Copy(fileName, file)                                           //Dumping our recieved file into the filename
		clientTorrent, err := tclient.AddTorrentFromFile(fileName.Name()) //Adding the torrent into the client
		if err != nil {
			fmt.Println("Error adding Torrent from file: ", fileName.Name())
		} else {
			fmt.Println("Adding Torrent via file", fileName)
			startTorrent(clientTorrent, torrentLocalStorage, Config.Config, db, TorrentLocalArray, tclient)
		}

	})
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) { //exposing the data to the
		if len(RunningTorrentArray) > 0 {
			RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray) //Updates the RunningTorrentArray with the current client data as well
			var torrentlistArray = new(torrentList)
			torrentlistArray.ClientDBstruct = RunningTorrentArray
			torrentlistArray.Totaltorrents = len(RunningTorrentArray)
			torrentlistArrayJSON, _ := json.Marshal(torrentlistArray)
			w.Header().Set("Content-Type", "application/json")
			w.Write(torrentlistArrayJSON)
			//updateClient(RunningTorrentArray, conn) // sending the client update information over the websocket
		}
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
				time.Sleep(6 * time.Second)
				err = conn.WriteMessage(msgType, []byte("clientUpdate"))
				if err != nil {
					fmt.Println("Websocket Write err", err)
					return
				}

				if len(RunningTorrentArray) > 0 {
					RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray) //Updates the RunningTorrentArray with the current client data as well
					var torrentlistArray = new(torrentList)
					torrentlistArray.ClientDBstruct = RunningTorrentArray
					torrentlistArray.Totaltorrents = len(RunningTorrentArray)
					fmt.Printf("%+v\n", torrentlistArray)
					conn.WriteJSON(torrentlistArray)
					//updateClient(RunningTorrentArray, conn) // sending the client update information over the websocket
				}

			} else if strings.HasPrefix(string(msg), "magnet:") {
				fmt.Println(string(msg))
				clientTorrent, err := tclient.AddMagnet(string(msg))
				if err != nil {
					fmt.Println("Magnet Error", err)
				}
				fmt.Println(clientTorrent)
				fmt.Printf("Adding")

				startTorrent(clientTorrent, torrentLocalStorage, Config.Config, db, TorrentLocalArray, tclient) //starting the torrent and creating local DB entry

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
