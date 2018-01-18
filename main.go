package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
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
	"github.com/sirupsen/logrus"
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
	baseTmpl string = "templates/base.tmpl"
	//Logger does logging for the entire project
	Logger     = logrus.New()
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
	Engine.Logger = Logger //Injecting the logger into all the packages
	Storage.Logger = Logger
	Config := Engine.FullClientSettingsNew() //grabbing from settings.go
	if Config.LoggingOutput == "file" {
		file, err := os.OpenFile("logs/server.log", os.O_CREATE|os.O_WRONLY, 0666) //creating the log file
		if err != nil {
			fmt.Println("Unable to create file for logging.... please check permissions.. forcing output to stdout")
			Logger.Out = os.Stdout
		}
		Logger.Out = file //Setting our logger to output to the file
	} else {
		Logger.Out = os.Stdout
	}
	Logger.SetLevel(Config.LoggingLevel)

	httpAddr := Config.HTTPAddr
	os.Mkdir(Config.TFileUploadFolder, os.ModeDir) //creating a directory to store uploaded torrent files
	Logger.WithFields(logrus.Fields{"Config": Config}).Info("Torrent Client Config has been generated...")

	tclient, err := torrent.NewClient(&Config.TorrentConfig) //pulling out the torrent specific config to use
	if err != nil {
		Logger.WithFields(logrus.Fields{"error": err}).Fatalf("Error creating torrent client: %s")
	}

	db, err := storm.Open("storage.db") //initializing the boltDB store that contains all the added torrents
	if err != nil {
		Logger.WithFields(logrus.Fields{"error": err}).Fatal("Error opening/creating storage.db")
	}
	defer db.Close() //defering closing the database until the program closes

	cronEngine := Engine.InitializeCronEngine() //Starting the cron engine for tasks
	Logger.Debug("Cron Engine Initialized...")

	torrentLocalStorage := Storage.TorrentLocal{}     //creating a new struct that stores all of our local storage info
	var TorrentLocalArray = []*Storage.TorrentLocal{} //this is an array of ALL of the local storage torrents, they will be added back in via hash
	var RunningTorrentArray = []Engine.ClientDB{}     //this stores ALL of the torrents that are running, used for client update pushes combines Local Storage and Running tclient info
	var PreviousTorrentArray = []Engine.ClientDB{}

	TorrentLocalArray = Storage.FetchAllStoredTorrents(db) //pulling in all the already added torrents

	if TorrentLocalArray != nil { //the first creation of the running torrent array //since we are adding all of them in we use a coroutine... just allows the web ui to load then it will load in the torrents
		go func() { //TODO instead of running all torrent fetches in coroutine see if possible to run each single one in a routine so we don't wait for ALL of them to be verified
			RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db)
		}()
	} else {
		Logger.Info("Database is empty, no torrents loaded")
	}

	Engine.RefreshRSSCron(cronEngine, db, tclient, torrentLocalStorage, Config.TorrentConfig.DataDir) // Refresing the RSS feeds on an hourly basis to add torrents that show up in the RSS feed

	router := mux.NewRouter()         //setting up the handler for the web backend
	router.HandleFunc("/", serveHome) //Serving the main page for our SPA
	http.Handle("/static/", http.FileServer(http.Dir("public")))
	http.Handle("/", router)
	http.HandleFunc("/uploadTorrent", func(w http.ResponseWriter, r *http.Request) { //grabbing the uploaded Torrent File and adding it to the client TODO figure out websocket
		defer http.Redirect(w, r, "/", 301) //forcing redirect to home page after file is processed
		err := r.ParseMultipartForm(32)
		if err != nil {
			fmt.Println("Error parsing forme", err)
		}

		storageFilePath := r.Form["storagePath"]
		fmt.Println("Storage Path", storageFilePath)
		file, header, err := r.FormFile("fileTorrent")
		if err != nil {
			Logger.WithFields(logrus.Fields{"error": err, "file": file}).Error("Error with fetching file or request issue")
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
			Logger.WithFields(logrus.Fields{"error": err, "file Name": fileName.Name()}).Error("Error adding Torrent from file")
		} else {
			Logger.WithFields(logrus.Fields{"file Name": fileName.Name()}).Info("Adding Torrent via file")
			Engine.StartTorrent(clientTorrent, torrentLocalStorage, db, Config.TorrentConfig.DataDir, "file", fileName.Name(), storageFilePath[0]) // the starttorrent can take a LONG time on startup
		}

	})
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) { //exposing the data to the
		TorrentLocalArray = Storage.FetchAllStoredTorrents(db)
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
			Logger.WithFields(logrus.Fields{"error": err}).Fatal("Unable to create websocket!")
			return
		}
	MessageLoop: //Tagging this so we can break out of it with any errors we encounter that are failing
		for {
			runningTorrents := tclient.Torrents() //getting running torrents here since multiple cases ask for the running torrents
			msg := Engine.Message{}
			err := conn.ReadJSON(&msg)
			if err != nil {
				Logger.WithFields(logrus.Fields{"error": err, "message": msg}).Error("Unable to read JSON client message")
				break MessageLoop
			}

			Logger.WithFields(logrus.Fields{"message": msg}).Debug("Message From Client")
			switch msg.MessageType { //first handling data requests

			case "torrentListRequest":
				Logger.WithFields(logrus.Fields{"message": msg}).Debug("Client Requested TorrentList Update")
				TorrentLocalArray = Storage.FetchAllStoredTorrents(db)                                                               //Required to re-read th database since we write to the DB and this will pull the changes from it
				RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well
				PreviousTorrentArray = RunningTorrentArray
				var torrentlistArray = new(Engine.TorrentList)
				torrentlistArray.MessageType = "torrentList"
				torrentlistArray.ClientDBstruct = RunningTorrentArray
				torrentlistArray.Totaltorrents = len(RunningTorrentArray)
				Logger.WithFields(logrus.Fields{"torrentList": torrentlistArray, "previousTorrentList": PreviousTorrentArray}).Debug("Previous and Current Torrent Lists for sending to client")
				conn.WriteJSON(torrentlistArray)
				//updateClient(RunningTorrentArray, conn) // sending the client update information over the websocket

			case "torrentFileListRequest": //client requested a filelist update
				Logger.WithFields(logrus.Fields{"message": msg}).Debug("Client Requested FileList Update")
				FileListArray := Engine.CreateFileListArray(tclient, msg.Payload[0])
				conn.WriteJSON(FileListArray) //writing the JSON to the client

			case "torrentDetailedInfo":
				Logger.WithFields(logrus.Fields{"message": msg}).Debug("Client Requested TorrentListDetail Update")

				torrentDetailArray := Engine.CreateTorrentDetailJSON(tclient, msg.Payload[0], db)
				conn.WriteJSON(torrentDetailArray)

			case "torrentPeerListRequest":
				Logger.WithFields(logrus.Fields{"message": msg}).Debug("Client Requested PeerList Update")
				torrentPeerList := Engine.CreatePeerListArray(tclient, msg.Payload[0])
				conn.WriteJSON(torrentPeerList)

			case "rssFeedRequest":
				Logger.WithFields(logrus.Fields{"message": msg}).Debug("Client Requested RSS Update")

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
				Logger.WithFields(logrus.Fields{"message": msg.Payload[0]}).Debug("Client Added RSS Feed")
				newRSSFeed := msg.Payload[0] //there will only be one RSS feed (hopefully)
				fullRSSFeeds := Storage.FetchRSSFeeds(db)
				Logger.WithFields(logrus.Fields{"RSSFeeds": fullRSSFeeds}).Debug("Pulled Full RSS Feeds")
				for _, singleFeed := range fullRSSFeeds.RSSFeeds {
					if newRSSFeed == singleFeed.URL || newRSSFeed == "" {
						Logger.WithFields(logrus.Fields{"RSSFeed": newRSSFeed}).Warn("Empty URL or Duplicate RSS URL to one already in database!  Rejecting submission")
						break MessageLoop
					}
				}
				fp := gofeed.NewParser()
				feed, err := fp.ParseURL(newRSSFeed)
				if err != nil {
					Logger.WithFields(logrus.Fields{"RSSFeed": newRSSFeed}).Warn("Unable to parse the URL as valid RSS.. cannot add RSS...")
					break MessageLoop
				}
				Logger.WithFields(logrus.Fields{"RSSFeedTitle": feed.Title}).Info("Have feed from URL...")
				newRSSFeedFull := Storage.SingleRSSFeed{}
				newRSSFeedFull.Name = feed.Title
				newRSSFeedFull.URL = msg.Payload[0]
				fullRSSFeeds.RSSFeeds = append(fullRSSFeeds.RSSFeeds, newRSSFeedFull) // add the new RSS feed to the stack

				Engine.ForceRSSRefresh(db, fullRSSFeeds)
				//forcing an RSS refresh to fully populate all rss feeds TODO maybe just push the update of the new RSS feed and leave cron to update?  But user would most likely expect and immediate update

			case "deleteRSSFeed":
				Logger.WithFields(logrus.Fields{"message": msg.Payload[0]}).Debug("Deleting RSS Feed")
				removingRSSFeed := msg.Payload[0]
				Storage.DeleteRSSFeed(db, removingRSSFeed)
				fullRSSFeeds := Storage.FetchRSSFeeds(db)
				Engine.ForceRSSRefresh(db, fullRSSFeeds)

			case "rssTorrentsRequest":
				RSSFeedURL := msg.Payload[0]
				Logger.WithFields(logrus.Fields{"RSSFeed": msg.Payload[0]}).Info("Requesting torrentList for feed..")
				UpdatedRSSFeed := Engine.RefreshSingleRSSFeed(db, Storage.FetchSpecificRSSFeed(db, RSSFeedURL))
				TorrentRSSList := SingleRSSFeedMessage{MessageType: "rssTorrentList", URL: RSSFeedURL, Name: UpdatedRSSFeed.Name, TotalTorrents: len(UpdatedRSSFeed.Torrents), Torrents: UpdatedRSSFeed.Torrents}
				Logger.WithFields(logrus.Fields{"TorrentRSSList": TorrentRSSList}).Debug("Returning Torrent list from RSSFeed to client")
				conn.WriteJSON(TorrentRSSList)

			case "magnetLinkSubmit": //if we detect a magnet link we will be adding a magnet torrent
				storageValue := msg.MessageDetail
				for _, magnetLink := range msg.Payload {
					clientTorrent, err := tclient.AddMagnet(magnetLink) //reading the payload into the torrent client
					if err != nil {
						Logger.WithFields(logrus.Fields{"err": err, "MagnetLink": magnetLink}).Error("Unable to add magnetlink to client!")
						break MessageLoop //break out of the loop entirely for this message since we hit an error
					}
					Logger.WithFields(logrus.Fields{"clientTorrent": clientTorrent, "magnetLink": magnetLink}).Info("Adding torrent to client!")
					Engine.StartTorrent(clientTorrent, torrentLocalStorage, db, Config.TorrentConfig.DataDir, "magnet", "", storageValue) //starting the torrent and creating local DB entry

				}

			case "torrentFileSubmit":
				file, err := base64.StdEncoding.DecodeString(msg.Payload[0]) //decoding the base64 encoded file sent from client
				if err != nil {
					Logger.WithFields(logrus.Fields{"Error": err}).Info("Unable to decode base64 string to file")
				}
				desiredFileName := msg.MessageDetail
				storageValue := msg.MessageDetailTwo
				filePath := filepath.Join(Config.TFileUploadFolder, desiredFileName) //creating a full filepath to store the .torrent files

				err = ioutil.WriteFile(filePath, file, 0644) //Dumping our recieved file into the filename
				if err != nil {
					Logger.WithFields(logrus.Fields{"filepath": filePath, "Error": err}).Error("Unable to write torrent data to file")
				}
				clientTorrent, err := tclient.AddTorrentFromFile(filePath)

				Engine.StartTorrent(clientTorrent, torrentLocalStorage, db, Config.TorrentConfig.DataDir, "file", filePath, storageValue)

			case "stopTorrents":
				TorrentListCommands := msg.Payload
				for _, singleTorrent := range runningTorrents {

					for _, singleSelection := range TorrentListCommands {
						if singleTorrent.InfoHash().String() == singleSelection {
							Logger.WithFields(logrus.Fields{"selection": singleSelection}).Info("Matched for stopping torrents")
							tempTorrentLocal := Storage.TorrentLocal{}
							tempTorrentLocal.Hash = singleTorrent.InfoHash().String() //required since this is the ID that stormdb requires
							tempTorrentLocal.TorrentStatus = "Stopped"
							oldMax := singleTorrent.SetMaxEstablishedConns(0) //Forcing the max amount of connections allowed to zero effectively stopping it
							Logger.WithFields(logrus.Fields{"oldMaxConnections": oldMax, "torrent": singleTorrent}).Info("Forcing connections to zero for torrent")
							Storage.UpdateStorageTick(db, tempTorrentLocal) //Updating the torrent status
						}
					}
				}

			case "deleteTorrents":
				withData := msg.MessageDetail //Checking if torrents should be deleted with data

				Logger.WithFields(logrus.Fields{"deleteTorrentsPayload": msg.Payload, "torrentlist": msg.Payload, "deleteWithData?": withData}).Info("message for deleting torrents")
				for _, singleTorrent := range runningTorrents {
					for _, singleSelection := range msg.Payload {
						if singleTorrent.InfoHash().String() == singleSelection {
							Logger.WithFields(logrus.Fields{"selection": singleSelection}).Info("Matched for deleting torrents")
							if withData == "true" {
								Logger.WithFields(logrus.Fields{"selection": singleSelection}).Info("Deleting torrent and data")
								Storage.DelTorrentLocalStorageAndFiles(db, singleTorrent.InfoHash().String())
							} else {
								Logger.WithFields(logrus.Fields{"selection": singleSelection}).Info("Deleting just the torrent")
								Storage.DelTorrentLocalStorage(db, singleTorrent.InfoHash().String())
							}
						}
					}
				}

			case "startTorrents":
				Logger.WithFields(logrus.Fields{"selection": msg.Payload}).Info("Matched for starting torrents")
				for _, singleTorrent := range runningTorrents {

					for _, singleSelection := range msg.Payload {
						if singleTorrent.InfoHash().String() == singleSelection {
							Logger.WithFields(logrus.Fields{"infoHash": singleTorrent.InfoHash().String()}).Debug("Found matching torrent to start")
							tempTorrentLocal := Storage.TorrentLocal{}
							tempTorrentLocal.Hash = singleTorrent.InfoHash().String()                                //required since this is the ID that stormdb requires
							tempTorrentLocal.TorrentStatus = "Running"                                               //Setting the status back to running
							oldTorrentInfo := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String()) //Fetching the old max connections setting from the database
							if oldTorrentInfo.MaxConnections == 0 {                                                  //if somehow the old max was set at zero change it to 80
								oldTorrentInfo.MaxConnections = 80
								Storage.UpdateStorageTick(db, oldTorrentInfo)
							}

							oldMax := singleTorrent.SetMaxEstablishedConns(oldTorrentInfo.MaxConnections) //Forcing the max amount of connections allowed to zero effectively stopping it
							Logger.WithFields(logrus.Fields{"Previous Max Connections": oldMax}).Debug("Setting max connection from zero to")
							singleTorrent.DownloadAll()                     //forcing a download all just in case TODO.. might reset priorities of file dl
							Storage.UpdateStorageTick(db, tempTorrentLocal) //Updating the torrent status
						}
					}
				}

			case "setFilePriority":
				Logger.WithFields(logrus.Fields{"selection": msg.Payload}).Info("Matched for setting file priority")
				priorityRequested := msg.Payload[1]                     //storing the priority requested
				infoHash := msg.Payload[0]                              //storing our infohash
				fileList := append(msg.Payload[:0], msg.Payload[2:]...) //removing the filehash and priority from the array leaving just the filepath
				Logger.WithFields(logrus.Fields{"filelist": fileList}).Debug("Full filelist for setting file priority")
				for _, singleTorrent := range runningTorrents {
					if singleTorrent.InfoHash().String() == infoHash {
						Logger.WithFields(logrus.Fields{"singleTorrent": singleTorrent}).Debug("Matched for changing file prio torrents")
						for _, file := range singleTorrent.Files() {
							for _, sentFile := range fileList {
								if file.Path() == sentFile {
									if priorityRequested == "High" {
										fileRead := singleTorrent.NewReader()
										fileRead.Seek(file.Offset(), 0)
										fileRead.SetReadahead(file.Length())
										Logger.WithFields(logrus.Fields{"singleTorrent": file.DisplayPath()}).Debug("Setting priority for HIGH")
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
										Logger.WithFields(logrus.Fields{"singleTorrent": file.DisplayPath()}).Debug("Setting priority for Normal")
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
										Logger.WithFields(logrus.Fields{"singleTorrent": file.DisplayPath()}).Debug("Canceling file")
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
				Logger.WithFields(logrus.Fields{"message": msg}).Info("Unrecognized Message from client... ignoring")
				return
			}
		}

	})
	if err := http.ListenAndServe(httpAddr, nil); err != nil {
		Logger.WithFields(logrus.Fields{"error": err}).Fatal("Unable to listen on the http Server!")
	}
}
