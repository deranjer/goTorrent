package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"reflect"
	"strings"

	_ "net/http/pprof"

	"github.com/anacrolix/torrent"
	"github.com/asdine/storm"
	Engine "github.com/deranjer/goTorrent/engine"
	Settings "github.com/deranjer/goTorrent/settings"
	Storage "github.com/deranjer/goTorrent/storage"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/mmcdole/gofeed"
	"github.com/sirupsen/logrus"
)

var (
	//Logger does logging for the entire project
	Logger = logrus.New()
	//Authenticated stores the value of the result of the client that connects to the server
	Authenticated = false
	APP_ID        = os.Getenv("APP_ID")
	sendJSON      = make(chan interface{})
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func serveHome(w http.ResponseWriter, r *http.Request) {
	s1, _ := template.ParseFiles("templates/home.tmpl")
	s1.ExecuteTemplate(w, "base", map[string]string{"APP_ID": APP_ID})
}

//HandleMessages creates a queue of JSON messages from the client and executes them in order
func handleMessages(conn *websocket.Conn) {
	for {
		msgJSON := <-sendJSON
		conn.WriteJSON(msgJSON)
	}
}

func handleAuthentication(conn *websocket.Conn, db *storm.DB) {
	msg := Engine.Message{}
	err := conn.ReadJSON(&msg)
	//conn.WriteJSON(msg) //TODO just for testing, remove
	payloadData, ok := msg.Payload.(map[string]interface{})
	clientAuthToken, tokenOk := payloadData["ClientAuthString"].(string)
	fmt.Println("ClientAuthToken:", clientAuthToken, "TokenOkay", tokenOk, "PayloadData", payloadData, "PayloadData Okay?", ok)
	if ok == false || tokenOk == false {
		authFail := Engine.AuthResponse{MessageType: "authResponse", Payload: "Message Payload in AuthRequest was malformed, closing connection"}
		conn.WriteJSON(authFail)
		conn.Close()
		return
	}
	if err != nil {
		Logger.WithFields(logrus.Fields{"error": err, "SuppliedToken": clientAuthToken}).Error("Unable to read authentication message")
	}
	fmt.Println("Authstring", clientAuthToken)
	//clientAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnROYW1lIjoiZ29Ub3JyZW50V2ViVUkiLCJpc3MiOiJnb1RvcnJlbnRTZXJ2ZXIifQ.Lfqp9tm06CY4XfrqnNDeVLkq9c7rsbibDrUdPko8ffQ"
	signingKeyStruct := Storage.FetchJWTTokens(db)
	singingKey := signingKeyStruct.SigningKey
	token, err := jwt.Parse(clientAuthToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return singingKey, nil
	})
	if err != nil {
		authFail := Engine.AuthResponse{MessageType: "authResponse", Payload: "Parsing of Token failed, ensure you have the correct token! Closing Connection"}
		conn.WriteJSON(authFail)
		Logger.WithFields(logrus.Fields{"error": err, "SuppliedToken": token}).Error("Unable to parse token!")
		fmt.Println("ENTIRE SUPPLIED TOKEN:", token, "CLIENTAUTHTOKEN", clientAuthToken)
		conn.Close()
		return
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		authTrue := Engine.AuthResponse{MessageType: "authResponse", Payload: "Authentication Verified, proceed with commands."}
		conn.WriteJSON(authTrue)
		fmt.Println("Claims", claims["ClientName"], claims["Issuer"])
		Authenticated = true
	} else {
		Logger.WithFields(logrus.Fields{"error": err}).Error("Authentication Error occured, cannot complete!")
	}
}

func main() {
	Engine.Logger = Logger //Injecting the logger into all the packages
	Storage.Logger = Logger
	Settings.Logger = Logger
	var torrentQueues = Storage.TorrentQueues{}
	Config := Settings.FullClientSettingsNew() //grabbing from settings.go
	Engine.Config = Config
	if Config.LoggingOutput == "file" {
		_, err := os.Stat("logs")
		if os.IsNotExist(err) {
			err := os.Mkdir("logs", 0755)
			if err != nil {
				fmt.Println("Unable to create 'log' folder for logging.... please check permissions.. forcing output to stdout", err)
				Logger.Out = os.Stdout
			}
		} else {
			os.Remove("logs/server.log")                                               //cleanup the old log on every restart
			file, err := os.OpenFile("logs/server.log", os.O_CREATE|os.O_WRONLY, 0755) //creating the log file
			//defer file.Close()                                                         //TODO.. since we write to this constantly how does close work?
			if err != nil {
				fmt.Println("Unable to create file for logging.... please check permissions.. forcing output to stdout")
				Logger.Out = os.Stdout
			}
			fmt.Println("Logging to file logs/server.log")
			Logger.Out = file
		}
	} else {
		Logger.Out = os.Stdout
	}
	Logger.SetLevel(Config.LoggingLevel)

	httpAddr := Config.HTTPAddr
	os.MkdirAll(Config.TFileUploadFolder, 0755)  //creating a directory to store uploaded torrent files
	os.MkdirAll(Config.TorrentWatchFolder, 0755) //creating a directory to watch for added .torrent files
	Logger.WithFields(logrus.Fields{"Config": Config}).Info("Torrent Client Config has been generated...")

	tclient, err := torrent.NewClient(&Config.TorrentConfig) //pulling out the torrent specific config to use
	if err != nil {
		Logger.WithFields(logrus.Fields{"error": err}).Fatalf("Error creating torrent client: %s")
	}
	//fmt.Printf("%+v\n", Config.TorrentConfig)
	db, err := storm.Open("storage.db") //initializing the boltDB store that contains all the added torrents
	if err != nil {
		Logger.WithFields(logrus.Fields{"error": err}).Fatal("Error opening/creating storage.db")
	} else {
		Logger.WithFields(logrus.Fields{"error": err}).Info("Opening or creating storage.db...")
	}
	defer db.Close() //defering closing the database until the program closes

	err = db.One("ID", 5, &torrentQueues)
	if err != nil { //Create the torrent que database
		Logger.WithFields(logrus.Fields{"error": err}).Info("No Queue database found, assuming first run, creating database")
		torrentQueues.ID = 5
		db.Save(&torrentQueues)
	}

	tokens := Storage.IssuedTokensList{} //if first run setting up the authentication tokens
	var signingKey []byte
	err = db.One("ID", 3, &tokens)
	if err != nil {
		Logger.WithFields(logrus.Fields{"RSSFeedStore": tokens, "error": err}).Info("No Tokens database found, assuming first run, generating token...")
		tokens.ID = 3 //creating the initial store
		claims := Settings.GoTorrentClaims{
			"goTorrentWebUI",
			jwt.StandardClaims{
				Issuer: "goTorrentServer",
			},
		}
		signingKey = Settings.GenerateSigningKey() //Running this will invalidate any certs you already issued!!
		authString := Settings.GenerateToken(claims, signingKey)
		tokens.SigningKey = signingKey
		tokens.FirstToken = authString
		tokens.TokenNames = append(tokens.TokenNames, Storage.SingleToken{"firstClient"})
		err := ioutil.WriteFile("clientAuth.txt", []byte(authString), 0755)
		if err != nil {
			Logger.WithFields(logrus.Fields{"error": err}).Warn("Unable to write client auth to file..")
		}
		db.Save(&tokens) //Writing all of that to the database
	} else { //Already have a signing key so pulling that signing key out of the database to sign any key requests
		tokens := Storage.FetchJWTTokens(db)
		signingKey = tokens.SigningKey
	}

	oldConfig, err := Storage.FetchConfig(db)
	if err != nil {
		Logger.WithFields(logrus.Fields{"error": err}).Info("Assuming first run as no config found in database, client config being generated")
		Settings.GenerateClientConfigFile(Config, tokens.FirstToken) //if first run generate the client config file
	} else {
		if reflect.DeepEqual(oldConfig.ClientConnectSettings, Config.ClientConnectSettings) {
			Logger.WithFields(logrus.Fields{"error": err}).Info("Configs are the same, not regenerating client config")
		} else {
			Logger.WithFields(logrus.Fields{"error": err}).Info("Config has changed, re-writting config")
			Settings.GenerateClientConfigFile(Config, tokens.FirstToken)
		}
	}
	Storage.SaveConfig(db, Config) //Save the config to the database

	cronEngine := Engine.InitializeCronEngine() //Starting the cron engine for tasks
	Logger.Debug("Cron Engine Initialized...")

	torrentLocalStorage := Storage.TorrentLocal{} //creating a new struct that stores all of our local storage info
	var RunningTorrentArray = []Engine.ClientDB{} //this stores ALL of the torrents that are running, used for client update pushes combines Local Storage and Running tclient info
	var PreviousTorrentArray = []Engine.ClientDB{}

	TorrentLocalArray := Storage.FetchAllStoredTorrents(db) //pulling in all the already added torrents - this is an array of ALL of the local storage torrents, they will be added back in via hash

	if TorrentLocalArray != nil { //the first creation of the running torrent array //since we are adding all of them in we use a coroutine... just allows the web ui to load then it will load in the torrents
		Engine.CreateInitialTorrentArray(tclient, TorrentLocalArray, db, Config) //adding all of the stored torrents into the torrent client
		//TODO add GO to this
	} else {
		Logger.Info("Database is empty, no torrents loaded")
	}
	Engine.CheckTorrentWatchFolder(cronEngine, db, tclient, torrentLocalStorage, Config, torrentQueues) //Every 5 minutes the engine will check the specified folder for new .torrent files
	Engine.RefreshRSSCron(cronEngine, db, tclient, torrentLocalStorage, Config, torrentQueues)          // Refresing the RSS feeds on an hourly basis to add torrents that show up in the RSS feed
	Engine.CheckTorrentsCron(cronEngine, db, tclient, Config)

	router := mux.NewRouter()         //setting up the handler for the web backend
	router.HandleFunc("/", serveHome) //Serving the main page for our SPA
	router.PathPrefix("/static/").Handler(http.FileServer(http.Dir("public")))
	http.Handle("/", router)
	router.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) { //TODO, remove this
		TorrentLocalArray = Storage.FetchAllStoredTorrents(db)
		RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well
		var torrentlistArray = new(Engine.TorrentList)
		torrentlistArray.MessageType = "torrentList"          //setting the type of message
		torrentlistArray.ClientDBstruct = RunningTorrentArray //the full JSON that includes the number of torrents as the root
		torrentlistArray.Totaltorrents = len(RunningTorrentArray)
		torrentlistArrayJSON, _ := json.Marshal(torrentlistArray)
		w.Header().Set("Content-Type", "application/json")
		w.Write(torrentlistArrayJSON)
	})

	router.HandleFunc("/websocket", func(w http.ResponseWriter, r *http.Request) { //websocket is the main data pipe to the frontend
		conn, err := upgrader.Upgrade(w, r, nil)
		fmt.Println("Websocket connection established, awaiting authentication")
		connResponse := Engine.ServerPushMessage{MessageType: "connectResponse", MessageLevel: "Message", Payload: "Websocket Connection Established, awaiting Authentication"}
		conn.WriteJSON(&connResponse)
		defer conn.Close() //defer closing the websocket until done.
		if err != nil {
			Logger.WithFields(logrus.Fields{"error": err}).Fatal("Unable to create websocket!")
			return
		}
		if Authenticated != true {
			handleAuthentication(conn, db)
		} else { //If we are authenticated inject the connection into the other packages
			connResponse := Engine.ServerPushMessage{MessageType: "authResponse", MessageLevel: "Message", Payload: "Already Authenticated... Awaiting Commands"}
			conn.WriteJSON(&connResponse)
			Logger.Info("Authenticated, websocket connection available!")
		}
		Engine.Conn = conn
		Storage.Conn = conn

		go handleMessages(conn) //Starting the message channel to handle all the JSON requests from the client

	MessageLoop: //Tagging this so we can continue out of it with any errors we encounter that are failing
		for {
			runningTorrents := tclient.Torrents() //getting running torrents here since multiple cases ask for the running torrents
			msg := Engine.Message{}
			err := conn.ReadJSON(&msg)
			if err != nil {
				Logger.WithFields(logrus.Fields{"error": err, "message": msg}).Error("Unable to read JSON client message")
				Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "info", Payload: "Malformed JSON request made to server.. ignoring"}, conn)
				break MessageLoop
			}
			var payloadData map[string]interface{}
			if msg.Payload != nil && msg.Payload != "" {
				payloadData = msg.Payload.(map[string]interface{})
			}
			Logger.WithFields(logrus.Fields{"message": msg}).Debug("Message From Client")
			switch msg.MessageType { //first handling data requests
			case "authRequest":
				if Authenticated {
					Logger.WithFields(logrus.Fields{"message": msg}).Debug("Client already authenticated... skipping authentication method")
				} else {
					handleAuthentication(conn, db)
				}

			case "newAuthToken":
				claims := Settings.GoTorrentClaims{
					payloadData["ClientName"].(string),
					jwt.StandardClaims{
						Issuer: "goTorrentServer",
					},
				}
				Logger.WithFields(logrus.Fields{"clientName": payloadData["ClientName"].(string)}).Info("New Auth Token creation request")
				fmt.Println("Signing Key", signingKey)
				token := Settings.GenerateToken(claims, signingKey)
				tokenReturn := Settings.TokenReturn{MessageType: "TokenReturn", TokenReturn: token}
				tokensDB := Storage.FetchJWTTokens(db)
				tokensDB.TokenNames = append(tokens.TokenNames, Storage.SingleToken{payloadData["ClientName"].(string)})
				db.Update(&tokensDB) //adding the new token client name to the database
				sendJSON <- tokenReturn

			case "torrentListRequest": //This will run automatically if a webUI is open
				Logger.WithFields(logrus.Fields{"message": msg}).Debug("Client Requested TorrentList Update")
				go func() { //running updates in separate thread so can still accept commands
					TorrentLocalArray = Storage.FetchAllStoredTorrents(db)                                                               //Required to re-read the database since we write to the DB and this will pull the changes from it
					RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db) //Updates the RunningTorrentArray with the current client data as well
					PreviousTorrentArray = RunningTorrentArray
					torrentlistArray := Engine.TorrentList{MessageType: "torrentList", ClientDBstruct: RunningTorrentArray, Totaltorrents: len(RunningTorrentArray)}
					Logger.WithFields(logrus.Fields{"torrentList": torrentlistArray, "previousTorrentList": PreviousTorrentArray}).Debug("Previous and Current Torrent Lists for sending to client")
					sendJSON <- torrentlistArray
				}()

			case "torrentFileListRequest": //client requested a filelist update
				Logger.WithFields(logrus.Fields{"message": msg}).Info("Client Requested FileList Update")
				fileListArrayRequest := payloadData["FileListHash"].(string)
				FileListArray := Engine.CreateFileListArray(tclient, fileListArrayRequest, db, Config)
				sendJSON <- FileListArray

			case "torrentPeerListRequest":
				Logger.WithFields(logrus.Fields{"message": msg}).Info("Client Requested PeerList Update")
				peerListArrayRequest := payloadData["PeerListHash"].(string)
				torrentPeerList := Engine.CreatePeerListArray(tclient, peerListArrayRequest)
				sendJSON <- torrentPeerList

			case "fetchTorrentsByLabel":
				Logger.WithFields(logrus.Fields{"message": msg}).Info("Client Requested Torrents by Label")
				label := payloadData["Label"].(string)
				torrentsByLabel := Storage.FetchTorrentsByLabel(db, label)
				RunningTorrentArray = Engine.CreateRunningTorrentArray(tclient, TorrentLocalArray, PreviousTorrentArray, Config, db)
				labelRunningArray := []Engine.ClientDB{}
				for _, torrent := range RunningTorrentArray { //Ranging over the running torrents and if the hashes match we have torrents by label
					for _, label := range torrentsByLabel {
						if torrent.TorrentHashString == label.Hash {
							labelRunningArray = append(labelRunningArray, torrent)
						}
					}
				}
				sendJSON <- labelRunningArray

			case "changeStorageValue":
				Logger.WithFields(logrus.Fields{"message": msg}).Info("Client Requested Storage Location Update")
				newStorageLocation := payloadData["StorageValue"].(string)
				hashes := payloadData["ChangeStorageHashes"].([]interface{})
				for _, singleHash := range hashes {
					singleTorrent := Storage.FetchTorrentFromStorage(db, singleHash.(string))
					oldPath := singleTorrent.StoragePath
					newStorageLocationAbs, err := filepath.Abs(filepath.ToSlash(newStorageLocation))
					if err != nil {
						Logger.WithFields(logrus.Fields{"patherr": err, "path": newStorageLocation}).Warn("Unable to create absolute path for storage location, using default")
						singleTorrent.StoragePath = Config.TorrentConfig.DataDir
					} else {
						singleTorrent.StoragePath = newStorageLocationAbs
					}
					Storage.UpdateStorageTick(db, singleTorrent) //push torrent to storage
					if singleTorrent.TorrentMoved == true {      //If torrent has already been moved and I change path then move it again... TODO, does this work with symlinks?
						Logger.WithFields(logrus.Fields{"message": msg}).Info("Change Storage Value called")
						Engine.MoveAndLeaveSymlink(Config, singleHash.(string), db, true, oldPath)
					}
				}

			case "settingsFileRequest":
				Logger.WithFields(logrus.Fields{"message": msg}).Info("Client Requested Settings File")
				clientSettingsFile := Engine.SettingsFile{MessageType: "settingsFile", Config: Config}
				sendJSON <- clientSettingsFile

			case "rssFeedRequest":
				Logger.WithFields(logrus.Fields{"message": msg}).Info("Client Requested RSS Update")
				RSSList := Storage.FetchRSSFeeds(db)
				RSSJSONFeed := Engine.RSSJSONList{MessageType: "rssList", TotalRSSFeeds: len(RSSList.RSSFeeds)}
				RSSsingleFeed := Engine.RSSFeedsNames{}
				for _, singleFeed := range RSSList.RSSFeeds {
					RSSsingleFeed.RSSName = singleFeed.Name
					RSSsingleFeed.RSSFeedURL = singleFeed.URL
					RSSJSONFeed.RSSFeeds = append(RSSJSONFeed.RSSFeeds, RSSsingleFeed)
				}
				sendJSON <- RSSJSONFeed

			case "addRSSFeed":
				newRSSFeed := payloadData["RSSURL"].(string)
				Logger.WithFields(logrus.Fields{"message": newRSSFeed}).Info("Client Added RSS Feed")
				fullRSSFeeds := Storage.FetchRSSFeeds(db)
				Logger.WithFields(logrus.Fields{"RSSFeeds": fullRSSFeeds}).Info("Pulled Full RSS Feeds")
				for _, singleFeed := range fullRSSFeeds.RSSFeeds {
					if newRSSFeed == singleFeed.URL || newRSSFeed == "" {
						Logger.WithFields(logrus.Fields{"RSSFeed": newRSSFeed}).Warn("Empty URL or Duplicate RSS URL to one already in database!  Rejecting submission")
						Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "error", Payload: "Empty URL or Duplicate RSS URL to one already in database!"}, conn)
						continue MessageLoop
					}
				}
				fp := gofeed.NewParser()
				feed, err := fp.ParseURL(newRSSFeed)
				if err != nil {
					Logger.WithFields(logrus.Fields{"RSSFeed": newRSSFeed}).Warn("Unable to parse the URL as valid RSS.. cannot add RSS...")
					Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "error", Payload: "Unable to parse the URL as valid RSS.. cannot add RSS..."}, conn)
					continue MessageLoop
				}
				Logger.WithFields(logrus.Fields{"RSSFeedTitle": feed.Title}).Info("Have feed from URL...")
				Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "success", Payload: "Added RSS Feed"}, conn)
				newRSSFeedFull := Storage.SingleRSSFeed{}
				newRSSFeedFull.Name = feed.Title
				newRSSFeedFull.URL = newRSSFeed
				fullRSSFeeds.RSSFeeds = append(fullRSSFeeds.RSSFeeds, newRSSFeedFull) // add the new RSS feed to the stack
				Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "info", Payload: "Adding RSS feed..."}, conn)
				Engine.ForceRSSRefresh(db, fullRSSFeeds)
				//forcing an RSS refresh to fully populate all rss feeds

			case "deleteRSSFeed":
				deleteRSSFeed := payloadData["RSSURL"].(string)
				Logger.WithFields(logrus.Fields{"message": deleteRSSFeed}).Info("Deleting RSS Feed")
				Storage.DeleteRSSFeed(db, deleteRSSFeed)
				fullRSSFeeds := Storage.FetchRSSFeeds(db)
				Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "info", Payload: "Deleting RSS feed..."}, conn)
				Engine.ForceRSSRefresh(db, fullRSSFeeds)

			case "rssTorrentsRequest":
				RSSFeedURL := payloadData["RSSURL"].(string)
				Logger.WithFields(logrus.Fields{"RSSFeed": RSSFeedURL}).Info("Requesting torrentList for feed..")
				UpdatedRSSFeed := Engine.RefreshSingleRSSFeed(db, Storage.FetchSpecificRSSFeed(db, RSSFeedURL))
				TorrentRSSList := Engine.SingleRSSFeedMessage{MessageType: "rssTorrentList", URL: RSSFeedURL, Name: UpdatedRSSFeed.Name, TotalTorrents: len(UpdatedRSSFeed.Torrents), Torrents: UpdatedRSSFeed.Torrents}
				Logger.WithFields(logrus.Fields{"TorrentRSSList": TorrentRSSList}).Info("Returning Torrent list from RSSFeed to client")
				sendJSON <- TorrentRSSList

			case "magnetLinkSubmit": //if we detect a magnet link we will be adding a magnet torrent
				storageValue, ok := payloadData["StorageValue"].(string)
				if storageValue == "" || ok == false {
					storageValue, err = filepath.Abs(filepath.ToSlash(Config.DefaultMoveFolder))
					if err != nil {
						Logger.WithFields(logrus.Fields{"err": err, "MagnetLink": Config.DefaultMoveFolder}).Error("Unable to add default Storage Path")
					}
				} else {
					storageValue, err = filepath.Abs(filepath.ToSlash(storageValue))
					if err != nil {
						Logger.WithFields(logrus.Fields{"err": err, "MagnetLink": storageValue}).Error("Unable to add Storage Path")
						Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "error", Payload: "Unable to add Storage path..."}, conn)
						storageValue, _ = filepath.Abs(filepath.ToSlash(Config.DefaultMoveFolder))
					}
				}
				labelValue, ok := payloadData["Label"].(string)
				if labelValue == "" || ok == false {
					labelValue = "None"
				}
				magnetLinks := payloadData["MagnetLinks"].([]interface{})
				for _, magnetLink := range magnetLinks {
					clientTorrent, err := tclient.AddMagnet(magnetLink.(string)) //reading the payload into the torrent client
					if err != nil {
						Logger.WithFields(logrus.Fields{"err": err, "MagnetLink": magnetLink}).Error("Unable to add magnetlink to client!")
						Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "error", Payload: "Unable to add magnetlink to client!"}, conn)
						continue MessageLoop //continue out of the loop entirely for this message since we hit an error
					}
					Logger.WithFields(logrus.Fields{"clientTorrent": clientTorrent, "magnetLink": magnetLink}).Info("Adding torrent to client!")
					Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "info", Payload: "Received MagnetLink"}, conn)
					if len(torrentQueues.ActiveTorrents) > Config.MaxActiveTorrents {
						Logger.WithFields(logrus.Fields{"Name: ": clientTorrent.Name()}).Info("Adding New torrent to active, pushing other torrent to queue")
						removeTorrent := torrentQueues.ActiveTorrents[:1]
						for _, singleTorrent := range runningTorrents {
							if singleTorrent.InfoHash().String() == removeTorrent[0] {
								oldTorrentInfo := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String())
								Engine.RemoveTorrentFromActive(&oldTorrentInfo, singleTorrent, db)
								Storage.UpdateStorageTick(db, oldTorrentInfo)
							}
						}
					}
					go Engine.AddTorrent(clientTorrent, torrentLocalStorage, db, "magnet", "", storageValue, labelValue, Config) //starting the torrent and creating local DB entry
				}

			case "torrentFileSubmit":
				base64encoded := payloadData["FileData"].(string)
				fileName := payloadData["FileName"].(string)
				storageValue, ok := payloadData["StorageValue"].(string)
				if storageValue == "" || ok == false {
					storageValue, err = filepath.Abs(filepath.ToSlash(Config.DefaultMoveFolder))
					if err != nil {
						Logger.WithFields(logrus.Fields{"err": err, "MagnetLink": Config.DefaultMoveFolder}).Error("Unable to add Storage Path")
						Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "error", Payload: "Unable to add default Storage Path"}, conn)
					} else {
						storageValue, err = filepath.Abs(filepath.ToSlash(storageValue))
						if err != nil {
							Logger.WithFields(logrus.Fields{"err": err, "MagnetLink": storageValue}).Error("Unable to add Storage Path")
							Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "error", Payload: "Unable to add Storage Path"}, conn)
							storageValue, _ = filepath.Abs(filepath.ToSlash(Config.DefaultMoveFolder))
						}
					}
				}
				labelValue, ok := payloadData["Label"].(string)
				if labelValue == "" || ok == false {
					labelValue = "None"
				}
				base64file := strings.Split(base64encoded, ",")             //Mozilla and Chrome have different payloads, but both start the file after the comma
				file, err := base64.StdEncoding.DecodeString(base64file[1]) //grabbing the second half of the string after the split
				if err != nil {
					Logger.WithFields(logrus.Fields{"Error": err, "file": file}).Info("Unable to decode base64 string to file")
					Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "error", Payload: "Unable to decode base64 string to file"}, conn)
				}
				filePath := filepath.Join(Config.TFileUploadFolder, fileName)
				filePathAbs, err := filepath.Abs(filePath) //creating a full filepath to store the .torrent files

				err = ioutil.WriteFile(filePathAbs, file, 0755) //Dumping our received file into the filename
				if err != nil {
					Logger.WithFields(logrus.Fields{"filepath": filePathAbs, "file Name": fileName, "Error": err}).Error("Unable to write torrent data to file")
					Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "error", Payload: "Unable to write torrent data to file"}, conn)
				}

				clientTorrent, err := tclient.AddTorrentFromFile(filePathAbs)
				if err != nil {
					Logger.WithFields(logrus.Fields{"filepath": filePathAbs, "Error": err}).Error("Unable to add Torrent to torrent server")
					Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "error", Payload: "Unable to add Torrent to torrent server"}, conn)
				}
				Logger.WithFields(logrus.Fields{"clienttorrent": clientTorrent.Name(), "filename": filePathAbs}).Info("Added torrent")
				if len(torrentQueues.ActiveTorrents) >= Config.MaxActiveTorrents {
					Logger.WithFields(logrus.Fields{"Name: ": clientTorrent.Name()}).Info("Adding New torrent to active, pushing other torrent to queue")
					removeTorrent := torrentQueues.ActiveTorrents[:1]
					for _, singleTorrent := range runningTorrents {
						if singleTorrent.InfoHash().String() == removeTorrent[0] {
							oldTorrentInfo := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String())
							Engine.RemoveTorrentFromActive(&oldTorrentInfo, singleTorrent, db)
							Storage.UpdateStorageTick(db, oldTorrentInfo)
							go Engine.AddTorrent(clientTorrent, torrentLocalStorage, db, "file", filePathAbs, storageValue, labelValue, Config)
						}
					}
				}

			case "stopTorrents":
				torrentHashes := payloadData["TorrentHashes"].([]interface{})
				Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "info", Payload: "Received Stop Request"}, conn)
				for _, singleTorrent := range tclient.Torrents() {
					for _, singleSelection := range torrentHashes {
						if singleTorrent.InfoHash().String() == singleSelection {
							Logger.WithFields(logrus.Fields{"selection": singleSelection}).Info("Matched for stopping torrents")
							oldTorrentInfo := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String())
							Engine.StopTorrent(singleTorrent, &oldTorrentInfo, db)
						}
					}
				}

			case "deleteTorrents":
				torrentHashes := payloadData["TorrentHashes"].([]interface{})
				withData := payloadData["WithData"].(bool) //Checking if torrents should be deleted with data
				Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "info", Payload: "Received Delete Request"}, conn)
				Logger.WithFields(logrus.Fields{"deleteTorrentsPayload": msg.Payload, "torrentlist": msg.Payload, "deleteWithData?": withData}).Info("message for deleting torrents")
				for _, singleTorrent := range runningTorrents {
					for _, singleSelection := range torrentHashes {
						if singleTorrent.InfoHash().String() == singleSelection {
							oldTorrentInfo := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String())
							torrentQueues = Storage.FetchQueues(db)

							Logger.WithFields(logrus.Fields{"selection": singleSelection}).Info("Matched for deleting torrents")
							if withData {
								oldTorrentInfo.TorrentStatus = "DroppedData" //Will be cleaned up the next engine loop since deleting a torrent mid loop can cause issues
							} else {
								oldTorrentInfo.TorrentStatus = "Dropped"
							}
							Storage.UpdateStorageTick(db, oldTorrentInfo)
							Storage.UpdateQueues(db, torrentQueues)
						}
					}
				}

			case "startTorrents":
				torrentHashes := payloadData["TorrentHashes"].([]interface{})
				Logger.WithFields(logrus.Fields{"selection": msg.Payload}).Info("Matched for starting torrents")
				Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "info", Payload: "Received Start Request"}, conn)
				for _, singleTorrent := range runningTorrents {
					for _, singleSelection := range torrentHashes {
						if singleTorrent.InfoHash().String() == singleSelection {
							Logger.WithFields(logrus.Fields{"infoHash": singleTorrent.InfoHash().String()}).Info("Found matching torrent to start")
							oldTorrentInfo := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String())
							Logger.WithFields(logrus.Fields{"Torrent": oldTorrentInfo.TorrentName}).Info("Changing database to torrent running with 80 max connections")
							oldTorrentInfo.TorrentStatus = "ForceStart"
							oldTorrentInfo.MaxConnections = 80
							Storage.UpdateStorageTick(db, oldTorrentInfo) //Updating the torrent status
							Engine.AddTorrentToForceStart(&oldTorrentInfo, singleTorrent, db)

						}
						torrentQueues = Storage.FetchQueues(db)
						if len(torrentQueues.ActiveTorrents) > Config.MaxActiveTorrents { //Since we are starting a new torrent stop the last torrent in the que if running is full
							//removeTorrent := torrentQueues.ActiveTorrents[len(torrentQueues.ActiveTorrents)-1]
							removeTorrent := torrentQueues.ActiveTorrents[len(torrentQueues.ActiveTorrents)-1]
							for _, singleTorrent := range runningTorrents {
								if singleTorrent.InfoHash().String() == removeTorrent {
									oldTorrentInfo := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String())
									Engine.RemoveTorrentFromActive(&oldTorrentInfo, singleTorrent, db)
									Storage.UpdateStorageTick(db, oldTorrentInfo)
								}
							}
						}
					}
				}

			case "forceUploadTorrents": //TODO allow force to override total limit of queued torrents?
				torrentHashes := payloadData["TorrentHashes"].([]interface{})
				Logger.WithFields(logrus.Fields{"selection": msg.Payload}).Info("Matched for force Uploading Torrents")
				Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "info", Payload: "Received Force Start Request"}, conn)
				for _, singleTorrent := range runningTorrents {
					for _, singleSelection := range torrentHashes {
						if singleTorrent.InfoHash().String() == singleSelection {
							Logger.WithFields(logrus.Fields{"infoHash": singleTorrent.InfoHash().String()}).Debug("Found matching torrent to force start")
							oldTorrentInfo := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String())
							oldTorrentInfo.TorrentUploadLimit = false // no upload limit for this torrent
							oldTorrentInfo.TorrentStatus = "Running"
							oldTorrentInfo.MaxConnections = 80
							Logger.WithFields(logrus.Fields{"NewMax": oldTorrentInfo.MaxConnections, "Torrent": oldTorrentInfo.TorrentName}).Info("Setting max connection from zero to 80")
							Storage.UpdateStorageTick(db, oldTorrentInfo) //Updating the torrent status
						}
					}
				}

			case "setFilePriority": //TODO disable if the file is already at 100%?
				priorityRequested := payloadData["FilePriority"].(string)
				torrentHash := payloadData["TorrentHash"].(string)
				fileList := payloadData["FilePaths"].([]interface{})
				Logger.WithFields(logrus.Fields{"selection": torrentHash}).Info("Matched for setting file priority")
				Engine.CreateServerPushMessage(Engine.ServerPushMessage{MessageType: "serverPushMessage", MessageLevel: "info", Payload: "Received Set Priority Request"}, conn)
				Logger.WithFields(logrus.Fields{"filelist": fileList}).Debug("Full filelist for setting file priority")
				for _, singleTorrent := range runningTorrents {
					if singleTorrent.InfoHash().String() == torrentHash {
						activeTorrentStruct := Storage.FetchTorrentFromStorage(db, torrentHash) //fetching all the data from the db to update certain fields then write it all back
						Logger.WithFields(logrus.Fields{"singleTorrent": singleTorrent}).Debug("Matched for changing file prio torrents")
						for _, file := range singleTorrent.Files() {
							for _, sentFile := range fileList {
								var priorityString string
								if file.Path() == sentFile {
									switch priorityRequested {
									case "High":
										priorityString = "High"
										file.SetPriority(torrent.PiecePriorityHigh)
									case "Normal":
										priorityString = "Normal"
										file.SetPriority(torrent.PiecePriorityNormal)
									case "Cancel":
										priorityString = "Cancel"
										file.SetPriority(torrent.PiecePriorityNone)
									default:
										priorityString = "Normal"
										file.SetPriority(torrent.PiecePriorityNormal)
									}
									for i, specificFile := range activeTorrentStruct.TorrentFilePriority { //searching for that specific file
										if specificFile.TorrentFilePath == file.DisplayPath() {
											activeTorrentStruct.TorrentFilePriority[i].TorrentFilePriority = priorityString //writing just that field to the current struct
										}
									}
									Logger.WithFields(logrus.Fields{"singleTorrent": file.DisplayPath()}).Debug("Setting priority for ", priorityString)
									Storage.UpdateStorageTick(db, activeTorrentStruct) //re-writting essentially that entire struct right back into the database
								}
							}
						}
					}
				}

			default:
				Logger.WithFields(logrus.Fields{"message": msg}).Info("Unrecognized Message from client... ignoring")
				return
			}
		}

	})
	if Config.UseReverseProxy {
		err := http.ListenAndServe(httpAddr, handlers.ProxyHeaders(router))
		if err != nil {
			Logger.WithFields(logrus.Fields{"error": err}).Fatal("Unable to listen on the http Server!")
		}
	} else {
		err := http.ListenAndServe(httpAddr, nil) //Can't send proxy headers if not used since that can be a security issue
		if err != nil {
			Logger.WithFields(logrus.Fields{"error": err}).Fatal("Unable to listen on the http Server! (Maybe wrong IP in config, port already in use?) (Config: Not using proxy, see error for more details)")
		}
	}
}
