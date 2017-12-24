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

	"github.com/anacrolix/torrent"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"

	"github.com/boltdb/bolt"
	Engine "github.com/deranjer/goTorrent/engine"
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

func serveHome(w http.ResponseWriter, r *http.Request) {
	s1, _ := template.ParseFiles("templates/home.tmpl")
	s1.ExecuteTemplate(w, "base", map[string]string{"APP_ID": APP_ID})
}

func updateClient(torrentstats []Engine.ClientDB, conn *websocket.Conn) { //get the torrent client and the websocket connection to write msg
	conn.WriteJSON(torrentstats) //converting to JSON and writing to the client
}

func main() {
	//setting up the torrent client
	Config := Engine.FullClientSettingsNew()         //grabbing from settings.go
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
	var RunningTorrentArray = []Engine.ClientDB{}     //this stores ALL of the torrents that are running, used for client update pushes combines Local Storage and Running tclient info
	var PreviousTorrentArray = []Engine.ClientDB{}

	TorrentLocalArray = Storage.ReadInTorrents(db) //pulling in all the already added torrents

	if TorrentLocalArray != nil { //the first creation of the running torrent array
		RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well

	} else {
		fmt.Println("Database is empty!")
	}

	router := mux.NewRouter()         //setting up the handler for the web backend
	router.HandleFunc("/", serveHome) //Serving the main page for our SPA
	http.Handle("/static/", http.FileServer(http.Dir("public")))
	http.Handle("/", router)
	http.HandleFunc("/uploadTorrent", func(w http.ResponseWriter, r *http.Request) { //grabbing the uploaded Torrent File and adding it to the client TODO figure out websocket
		defer http.Redirect(w, r, "/", 301) //forcing redirect to home page after file is processed
		file, header, err := r.FormFile("fileTest")
		if err != nil {
			fmt.Println("Error with fetching file or request issue", file)
		}
		//torrentFileBytes, err := ioutil.ReadAll(file) TODO dump a byte slice directly into the filename

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
			Engine.StartTorrent(clientTorrent, torrentLocalStorage, db, Config.DataDir, "file", fileName.Name())
		}

	})
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) { //exposing the data to the
		TorrentLocalArray = Storage.ReadInTorrents(db)
		RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well
		var torrentlistArray = new(Engine.TorrentList)
		torrentlistArray.MessageType = "torrentList"          //setting the type of message
		torrentlistArray.ClientDBstruct = RunningTorrentArray //the full JSON that includes the number of torrents as the root
		torrentlistArray.Totaltorrents = len(RunningTorrentArray)
		torrentlistArrayJSON, _ := json.Marshal(torrentlistArray)
		w.Header().Set("Content-Type", "application/json")
		w.Write(torrentlistArrayJSON)
		//updateClient(RunningTorrentArray, conn) // sending the client update information over the websocket
	})
	http.HandleFunc("/websocket", func(w http.ResponseWriter, r *http.Request) { //websocket is the main data pipe to the frontend
		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			log.Println("Generic websocket error", err)
			return
		}
		for {
			runningTorrents := tclient.Torrents() //getting running torrents here since multiple cases ask for the running torrents
			msg := Engine.Message{}
			readJSONError := conn.ReadJSON(&msg)
			if readJSONError != nil {
				fmt.Println("Unable to read JSON client message", err)
			}

			fmt.Println("MessageType", msg.MessageType)
			switch msg.MessageType { //first handling data requests

			case "torrentListRequest":
				fmt.Println("client Requested TorrentList Update")
				TorrentLocalArray = Storage.ReadInTorrents(db)
				RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well
				PreviousTorrentArray = RunningTorrentArray
				var torrentlistArray = new(Engine.TorrentList)
				torrentlistArray.MessageType = "torrentList"
				torrentlistArray.ClientDBstruct = RunningTorrentArray
				torrentlistArray.Totaltorrents = len(RunningTorrentArray)
				//fmt.Printf("%+v\n", torrentlistArray)
				conn.WriteJSON(torrentlistArray)
				break
				//updateClient(RunningTorrentArray, conn) // sending the client update information over the websocket

			case "torrentFileListRequest": //client requested a filelist update
				fmt.Println("client Requested Filelist update")
				fileListRequest := Engine.GenericPayload{}
				json.Unmarshal(msg.Payload, &fileListRequest) //unmarshal into the generic payload
				FileListArray := Engine.CreateFileListArray(tclient, fileListRequest.TorrentHashString)
				conn.WriteJSON(FileListArray) //writing the JSON to the client
				break

			case "torrentDetailedInfo": //TODO Figure out how to get single torrent info correctly
				fmt.Println("client requested detailed Torrent Info")
				torrentDetailRequest := Engine.GenericPayload{}
				json.Unmarshal(msg.Payload, &torrentDetailRequest)
				torrentDetailArray := Engine.CreateTorrentDetailJSON(tclient, torrentDetailRequest.TorrentHashString, db)
				conn.WriteJSON(torrentDetailArray)
				break

			case "magnetLinkSubmit": //if we detect a magnet link we will be adding a magnet torrent
				magnetMessage := Engine.MagnetMessage{}                           //grabbing a magnetMessage struct from engine->clientstructs
				json.Unmarshal(msg.Payload, &magnetMessage)                       //unmarshalling the "Payload" from Message into our magnetmessage struct
				clientTorrent, err := tclient.AddMagnet(magnetMessage.MagnetLink) //reading the payload into the torrent client
				if err != nil {
					fmt.Println("Magnet Error", err)
				}
				fmt.Println(clientTorrent)
				fmt.Printf("Adding Magnet Link")

				Engine.StartTorrent(clientTorrent, torrentLocalStorage, db, Config.DataDir, "magnet", "") //starting the torrent and creating local DB entry
				break

			case "stopTorrents":
				TorrentListCommands := Engine.TorrentCommandMessage{}
				json.Unmarshal(msg.Payload, &TorrentListCommands)
				for _, singleTorrent := range runningTorrents {

					for _, singleSelection := range TorrentListCommands.TorrentHashStrings {
						if singleTorrent.InfoHash().AsString() == singleSelection {
							fmt.Println("Matched for stopping torrents")
							//singleTorrent.Drop()
						}
					}
				}
				break

			case "deleteTorrents":
				TorrentListCommands := Engine.TorrentCommandMessage{}
				json.Unmarshal(msg.Payload, &TorrentListCommands)
				for _, singleTorrent := range runningTorrents {

					for _, singleSelection := range TorrentListCommands.TorrentHashStrings {
						if singleTorrent.InfoHash().AsString() == singleSelection {
							fmt.Println("Matched for deleting torrents")
							singleTorrent.Drop()
						}
					}
				}
				break

			case "startTorrents":
				fmt.Println("Starting torrents")
				TorrentListCommands := Engine.TorrentCommandMessage{}
				json.Unmarshal(msg.Payload, &TorrentListCommands)
				for _, singleTorrent := range runningTorrents {

					for _, singleSelection := range TorrentListCommands.TorrentHashStrings {
						if singleTorrent.InfoHash().AsString() == singleSelection {
							fmt.Println("Matched for starting torrents")
							singleTorrent.DownloadAll()
						}
					}
				}
				break

			default:
				//conn.Close()
				fmt.Println("Message not found, message recieved is: ", msg)
				return
			}
		}

	})
	if err := http.ListenAndServe(*httpAddr, nil); err != nil {
		log.Fatalf("Error listening, %v", err)
	}
}
