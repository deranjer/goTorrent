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
	"github.com/asdine/storm"
	Engine "github.com/deranjer/goTorrent/engine"
	Storage "github.com/deranjer/goTorrent/storage"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/mmcdole/gofeed"
)

//SingleRSSFeedMessage will most likley be deprecated as this is the only way I could get it working currently
type SingleRSSFeedMessage struct { //TODO had issues with getting this to work with Storage or Engine
	MessageType   string
	URL           string //the URL of the individual RSS feed
	Name          string
	TotalTorrents int
	Torrents      []Storage.SingleRSSTorrent //name of the torrentss
}

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
	Config := Engine.FullClientSettingsNew()       //grabbing from settings.go
	os.Mkdir(Config.TFileUploadFolder, os.ModeDir) //creating a directory to store uploaded torrent files
	torrentLocalStorage := Storage.TorrentLocal{}  //creating a new struct that stores all of our local storage info
	fmt.Printf("%+v\n", Config)

	tclient, err := torrent.NewClient(&Config.TorrentConfig) //pulling out the torrent specific config to use
	if err != nil {
		log.Fatalf("error creating client: %s", err)
	}

	db, err := storm.Open("storage.db") //initializing the boltDB store that contains all the added torrents
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close() //defering closing the database until the program closes

	cronEngine := Engine.InitializeCronEngine() //Starting the cron engine for tasks
	Engine.RefreshRSSCron(cronEngine, db)       // Refresing the RSS feeds on an hourly basis

	var TorrentLocalArray = []*Storage.TorrentLocal{} //this is an array of ALL of the local storage torrents, they will be added back in via hash
	var RunningTorrentArray = []Engine.ClientDB{}     //this stores ALL of the torrents that are running, used for client update pushes combines Local Storage and Running tclient info
	var PreviousTorrentArray = []Engine.ClientDB{}

	TorrentLocalArray = Storage.ReadInTorrents(db) //pulling in all the already added torrents

	if TorrentLocalArray != nil { //the first creation of the running torrent array //since we are adding all of them in we use a coroutine... just allows the web ui to load then it will load in the torrents
		go func() { //TODO instead of running all torrent fetches in coroutine see if possible to run each single one in a routine so we don't wait for ALL of them to be verified
			RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db)
		}()

		//RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well

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
			Engine.StartTorrent(clientTorrent, torrentLocalStorage, db, Config.TorrentConfig.DataDir, "file", fileName.Name()) // the starttorrent can take a LONG time on startup
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
	MessageLoop: //Tagging this so we can break out of it with any errors we encounter that are failing
		for {
			runningTorrents := tclient.Torrents() //getting running torrents here since multiple cases ask for the running torrents
			msg := Engine.Message{}
			readJSONError := conn.ReadJSON(&msg)
			if readJSONError != nil {
				fmt.Println("Unable to read JSON client message", err)
				break MessageLoop
			}

			fmt.Println("MessageFull", msg)
			switch msg.MessageType { //first handling data requests

			case "torrentListRequest":
				//fmt.Println("client Requested TorrentList Update")
				TorrentLocalArray = Storage.ReadInTorrents(db)                                                                       //Required to re-read th database since we write to the DB and this will pull the changes from it
				RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well
				PreviousTorrentArray = RunningTorrentArray
				var torrentlistArray = new(Engine.TorrentList)
				torrentlistArray.MessageType = "torrentList"
				torrentlistArray.ClientDBstruct = RunningTorrentArray
				torrentlistArray.Totaltorrents = len(RunningTorrentArray)
				//fmt.Println("%+v\n", PreviousTorrentArray)
				//fmt.Printf("%+v\n", torrentlistArray)
				conn.WriteJSON(torrentlistArray)
				//updateClient(RunningTorrentArray, conn) // sending the client update information over the websocket

			case "torrentFileListRequest": //client requested a filelist update
				//fmt.Println("client Requested Filelist update")
				FileListArray := Engine.CreateFileListArray(tclient, msg.Payload[0])
				conn.WriteJSON(FileListArray) //writing the JSON to the client

			case "torrentDetailedInfo": //TODO Figure out how to get single torrent info correctly
				fmt.Println("client requested detailed Torrent Info")

				torrentDetailArray := Engine.CreateTorrentDetailJSON(tclient, msg.Payload[0], db)
				conn.WriteJSON(torrentDetailArray)

			case "torrentPeerListRequest":
				fmt.Println("client requested peer list")
				torrentPeerList := Engine.CreatePeerListArray(tclient, msg.Payload[0])
				//fmt.Printf("%+v\n", torrentPeerList)
				conn.WriteJSON(torrentPeerList)

			case "rssFeedRequest":
				fmt.Println("client requested RSS feed")

				RSSList := Storage.FetchRSSFeeds(db)
				RSSJSONFeed := Engine.RSSJSONList{MessageType: "rssListRequest", TotalRSSFeeds: len(RSSList.RSSFeeds)}
				RSSsingleFeed := Engine.RSSFeedsNames{}
				for _, singleFeed := range RSSList.RSSFeeds {
					RSSsingleFeed.RSSName = singleFeed.Name
					RSSsingleFeed.RSSFeedURL = singleFeed.URL
					RSSJSONFeed.RSSFeeds = append(RSSJSONFeed.RSSFeeds, RSSsingleFeed)
				}

				conn.WriteJSON(RSSJSONFeed)

			case "addRSSFeed":
				fmt.Println("Adding RSSFeed", msg.Payload[0])
				newRSSFeed := msg.Payload[0] //there will only be one RSS feed (hopefully)
				fullRSSFeeds := Storage.FetchRSSFeeds(db)
				fmt.Println("Pulled full RSS feeds from database: ", fullRSSFeeds)
				for _, singleFeed := range fullRSSFeeds.RSSFeeds {
					if newRSSFeed == singleFeed.URL || newRSSFeed == "" {
						fmt.Println("Empty URL or Duplicate RSS URL to one already in database!  Rejecting submission")
						break MessageLoop
					}
				}
				fp := gofeed.NewParser()
				feed, err := fp.ParseURL(newRSSFeed)
				if err != nil {
					fmt.Println("Unable to parse the URL as valid RSS.. cannot add RSS...", newRSSFeed)
					break MessageLoop
				}
				fmt.Println("Have feed from URL...", feed.Title)
				newRSSFeedFull := Storage.SingleRSSFeed{}
				newRSSFeedFull.Name = feed.Title
				newRSSFeedFull.URL = msg.Payload[0]
				fullRSSFeeds.RSSFeeds = append(fullRSSFeeds.RSSFeeds, newRSSFeedFull) // add the new RSS feed to the stack

				Engine.ForceRSSRefresh(db, fullRSSFeeds)
				//forcing an RSS refresh to fully populate all rss feeds TODO maybe just push the update of the new RSS feed and leave cron to update?  But user would most likely expect and immediate update

			case "deleteRSSFeed":
				fmt.Println("Deleting RSS Feed", msg.Payload[0])
				removingRSSFeed := msg.Payload[0]
				Storage.DeleteRSSFeed(db, removingRSSFeed)
				fullRSSFeeds := Storage.FetchRSSFeeds(db)
				Engine.ForceRSSRefresh(db, fullRSSFeeds)

			case "rssTorrentsRequest":
				fmt.Println("Requesting Torrent List for feed", msg.Payload[0])
				RSSFeedURL := msg.Payload[0]
				fullRSSFeeds := Storage.FetchRSSFeeds(db)
				for _, singleFeed := range fullRSSFeeds.RSSFeeds {
					fmt.Println("URL", singleFeed.URL)
				}
				UpdatedRSSFeed := Engine.RefreshSingleRSSFeed(db, Storage.FetchSpecificRSSFeed(db, RSSFeedURL))
				TorrentRSSList := SingleRSSFeedMessage{MessageType: "rssTorrentList", URL: RSSFeedURL, Name: UpdatedRSSFeed.Name, TotalTorrents: len(UpdatedRSSFeed.Torrents), Torrents: UpdatedRSSFeed.Torrents}
				conn.WriteJSON(TorrentRSSList)

			case "magnetLinkSubmit": //if we detect a magnet link we will be adding a magnet torrent

				for _, magnetLink := range msg.Payload {
					clientTorrent, err := tclient.AddMagnet(magnetLink) //reading the payload into the torrent client
					if err != nil {
						fmt.Println("Magnet Error could not add torrent! ", err)
						break MessageLoop //break out of the loop entirely for this message since we hit an error
					}
					fmt.Println(clientTorrent)
					fmt.Printf("Adding Magnet Link")
					Engine.StartTorrent(clientTorrent, torrentLocalStorage, db, Config.TorrentConfig.DataDir, "magnet", "") //starting the torrent and creating local DB entry

				}

			case "stopTorrents":
				TorrentListCommands := msg.Payload
				for _, singleTorrent := range runningTorrents {

					for _, singleSelection := range TorrentListCommands {
						if singleTorrent.InfoHash().String() == singleSelection {
							fmt.Println("Matched for stopping torrents")
							tempTorrentLocal := Storage.TorrentLocal{}
							tempTorrentLocal.Hash = singleTorrent.InfoHash().String() //required since this is the ID that stormdb requires
							tempTorrentLocal.TorrentStatus = "Stopped"
							oldMax := singleTorrent.SetMaxEstablishedConns(0) //Forcing the max amount of connections allowed to zero effectively stopping it
							fmt.Println("Setting max connections from ", oldMax, " to 0")
							Storage.UpdateStorageTick(db, tempTorrentLocal) //Updating the torrent status
						}
					}
				}

			case "deleteTorrents":
				for _, singleTorrent := range runningTorrents {

					for _, singleSelection := range msg.Payload {
						if singleTorrent.InfoHash().String() == singleSelection {
							fmt.Println("Matched for deleting torrents")
							Storage.DelTorrentLocalStorage(db, singleTorrent.InfoHash().String())
						}
					}
				}

			case "startTorrents":
				fmt.Println("Starting torrents", msg.Payload)
				for _, singleTorrent := range runningTorrents {

					for _, singleSelection := range msg.Payload {
						if singleTorrent.InfoHash().String() == singleSelection {
							fmt.Println("Matched for starting torrents", singleSelection)
							tempTorrentLocal := Storage.TorrentLocal{}
							tempTorrentLocal.Hash = singleTorrent.InfoHash().String()                                //required since this is the ID that stormdb requires
							tempTorrentLocal.TorrentStatus = "Running"                                               //Setting the status back to running
							oldTorrentInfo := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String()) //Fetching the old max connections setting from the database
							if oldTorrentInfo.MaxConnections == 0 {                                                  //if somehow the old max was set at zero change it to 80
								oldTorrentInfo.MaxConnections = 80
								Storage.UpdateStorageTick(db, oldTorrentInfo)
							}

							oldMax := singleTorrent.SetMaxEstablishedConns(oldTorrentInfo.MaxConnections) //Forcing the max amount of connections allowed to zero effectively stopping it
							fmt.Println("Setting max connections from 0 to:", oldMax)

							Storage.UpdateStorageTick(db, tempTorrentLocal) //Updating the torrent status
						}
					}
				}

			case "setFilePriority": //TODO have one priority second message determines what priority
				fmt.Println("Setting file priority", msg.Payload)
				priorityRequested := msg.Payload[1]                     //storing the priority requested
				infoHash := msg.Payload[0]                              //storing our infohash
				fileList := append(msg.Payload[:0], msg.Payload[2:]...) //removing the filehash and priority from the array leaving just the filepath
				fmt.Println("fileList after stripping out", fileList)
				for _, singleTorrent := range runningTorrents {
					if singleTorrent.InfoHash().String() == infoHash {
						fmt.Println("Matched for changing file prio torrents", singleTorrent)
						for _, file := range singleTorrent.Files() {
							for _, sentFile := range fileList {
								if file.Path() == sentFile {
									if priorityRequested == "High" {
										fileRead := singleTorrent.NewReader()
										fileRead.Seek(file.Offset(), 0)
										fileRead.SetReadahead(file.Length())
										fmt.Println("Setting priority for HIGH", file.DisplayPath())
										activeTorrentStruct := Storage.FetchTorrentFromStorage(db, infoHash)   //fetching all the data from the db to update certain fields then write it all back
										for i, specificFile := range activeTorrentStruct.TorrentFilePriority { //searching for that specific file
											if specificFile.TorrentFilePath == file.DisplayPath() {
												activeTorrentStruct.TorrentFilePriority[i].TorrentFilePriority = "High" //writing just that field to the current struct
											}
										}
										Storage.UpdateStorageTick(db, activeTorrentStruct) //rewritting essentially that entire struct right back into the database
									}
									if priorityRequested == "Normal" {
										file.Download()
										fmt.Println("Setting priority for Normal", file.DisplayPath())
										activeTorrentStruct := Storage.FetchTorrentFromStorage(db, infoHash)   //fetching all the data from the db to update certain fields then write it all back
										for i, specificFile := range activeTorrentStruct.TorrentFilePriority { //searching for that specific file
											if specificFile.TorrentFilePath == file.DisplayPath() {
												activeTorrentStruct.TorrentFilePriority[i].TorrentFilePriority = "Normal" //writing just that field to the current struct
											}
										}
										Storage.UpdateStorageTick(db, activeTorrentStruct) //rewritting essentially that entire struct right back into the database
									}
									if priorityRequested == "Cancel" {
										file.Cancel()
										fmt.Println("Canceling File", file.DisplayPath())
										activeTorrentStruct := Storage.FetchTorrentFromStorage(db, infoHash)   //fetching all the data from the db to update certain fields then write it all back
										for i, specificFile := range activeTorrentStruct.TorrentFilePriority { //searching for that specific file
											if specificFile.TorrentFilePath == file.DisplayPath() {
												activeTorrentStruct.TorrentFilePriority[i].TorrentFilePriority = "Canceled" //writing just that field to the current struct
											}
										}
										Storage.UpdateStorageTick(db, activeTorrentStruct) //rewritting essentially that entire struct right back into the database
									}

								}
							}
						}
					}
				}

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
