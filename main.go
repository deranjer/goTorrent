package main

import (
	"flag"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"html/template"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
	"github.com/anacrolix/torrent"
	//"github.com/anacrolix/dht"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/boltdb/bolt"
	"encoding/json"
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

type torrentList struct { //helps create the JSON structure that vuetable expects to recieve
	Totaltorrents int `json:"total"`
	ClientDBstruct []clientDB `json:"data"`

}

type clientDB struct{
	TorrentName string `json:"Torrent Name"`
	ChunksWritten int64
	ChunksRead	int64
	BytesWritten	int64
	BytesRead    int64
	DataBytesWritten int64
	DataBytesRead    int64
	ActivePeers   int
	TotalPeers    int `json:"Total Peers"`
	TorrentHashString string
	TorrentHash metainfo.Hash
	StoragePath string `json:"Storage Location"`
	DateAdded string
}


func serveHome(w http.ResponseWriter, r *http.Request) {
	s1, _ := template.ParseFiles("templates/home.tmpl")
	s1.ExecuteTemplate(w, "base", map[string]string{"APP_ID": APP_ID})
}

func startTorrent(clientTorrent *torrent.Torrent, torrentLocalStorage *TorrentLocal, Config torrent.Config, torrentDbStorage *bolt.DB){
	<-clientTorrent.GotInfo()  //waiting for all of the torrent info to be downloaded

	torrentLocalStorage.Hash = clientTorrent.InfoHash() // we will store the infohash to add it back later on client restart (if needed)
	torrentLocalStorage.DateAdded = time.Now().Format("Jan _2 2006")
	torrentLocalStorage.StoragePath = Config.DataDir //TODO check full path information for torrent storage
	torrentLocalStorage.TorrentName = clientTorrent.Name()

	fmt.Printf("%+v\n", torrentLocalStorage)
	addTorrentLocalStorage(torrentDbStorage, torrentLocalStorage) //writing all of the data to the database

	clientTorrent.DownloadAll()//starting the download
}

func createRunningTorrentArray (tclient *torrent.Client, TorrentLocalArray []*TorrentLocal) (RunningTorrentArray []clientDB) {
	for _, element := range TorrentLocalArray { //re-adding all the torrents we had stored from last shutdown

		singleTorrent, _ := tclient.AddTorrentInfoHash(element.Hash) //adding back in the torrents by hash

		fullClientDB := new(clientDB)

		fullStruct := singleTorrent.Stats()

		fullClientDB.TorrentHash = element.Hash
		fullClientDB.ChunksWritten = fullStruct.ConnStats.ChunksWritten
		fullClientDB.ChunksRead = fullStruct.ConnStats.ChunksRead
		fullClientDB.BytesWritten = fullStruct.ConnStats.BytesWritten
		fullClientDB.BytesRead = fullStruct.ConnStats.BytesRead
		fullClientDB.DataBytesWritten = fullStruct.ConnStats.DataBytesWritten
		fullClientDB.DataBytesRead = fullStruct.ConnStats.DataBytesRead
		fullClientDB.ActivePeers = fullStruct.ActivePeers
		fullClientDB.TotalPeers = fullStruct.TotalPeers
		fullClientDB.TorrentHashString = element.Hash.String()
		fullClientDB.StoragePath = element.StoragePath
		fullClientDB.TorrentName = element.TorrentName
		fullClientDB.DateAdded = element.DateAdded


		RunningTorrentArray = append(RunningTorrentArray, *fullClientDB)

	}
	return RunningTorrentArray
}

func updateClient(torrentstats []clientDB, conn *websocket.Conn){  //get the torrent client and the websocket connection to write msg
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

	//torrentDbStorage := initializeStorage  //initializing the boltDB store that contains all the added torrents

	db, err := bolt.Open("storage.db", 0600, nil) //initializing the boltDB store that contains all the added torrents
	if err !=nil {
		log.Fatal(err)
	}
	defer db.Close() //defering closing the database until the program closes


	//defer torrentDbStorage().Close() //defering closing the database until the program closes

	var TorrentLocalArray = []*TorrentLocal{} //this is an array of ALL of the local storage torrents, they will be added back in via hash
	var RunningTorrentArray = []clientDB{} //this stores ALL of the torrents that are running, used for client update pushes combines Local Storage and Running tclient info


	TorrentLocalArray = readInTorrents(db)//pulling in all the already added torrents

	if TorrentLocalArray != nil {
		RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray) //Updates the RunningTorrentArray with the current client data as well
	} else {
		fmt.Println("Database is empty!")
	}



	r := mux.NewRouter() //setting up the handler for the web backend
	r.HandleFunc("/", serveHome)
	http.Handle("/static/", http.FileServer(http.Dir("public")))
	http.Handle("/", r)
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request){ //exposing the data to the
		if len(RunningTorrentArray) > 0 {
			RunningTorrentArray = createRunningTorrentArray(tclient, TorrentLocalArray) //Updates the RunningTorrentArray with the current client data as well
			var torrentlistArray = new(torrentList)
			torrentlistArray.ClientDBstruct = RunningTorrentArray
			torrentlistArray.Totaltorrents = len(RunningTorrentArray)
			torrentlistArrayJson, _:= json.Marshal(torrentlistArray)
			w.Header().Set("Content-Type", "application/json")
			w.Write(torrentlistArrayJson)
			//updateClient(RunningTorrentArray, conn) // sending the client update information over the websocket
		}
	})
	http.HandleFunc("/websocket", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			log.Println(err)
			return
		}

		for {
			msgType, msg, err := conn.ReadMessage()
			if err != nil {
				fmt.Println(err)
				return
			}
			if string(msg) == "ping" {  //6 second update ping
				fmt.Println("ping")
				time.Sleep(6 * time.Second)
				err = conn.WriteMessage(msgType, []byte("pong"))
				if err != nil {
					fmt.Println("Websocket err", err)
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
				if err !=nil{
					fmt.Println("Magnet Error", err)
				}
				fmt.Println(clientTorrent)
				fmt.Printf("Adding")

				startTorrent(clientTorrent, torrentLocalStorage, Config.Config, db) //starting the torrent and creating local DB entry

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

	//
}
