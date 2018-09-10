package storage

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/asdine/storm"
	Settings "github.com/deranjer/goTorrent/settings"
	"github.com/gorilla/websocket"
	"github.com/sirupsen/logrus"
)

//Logger is the global Logger that is used in all packages
var Logger *logrus.Logger

//Conn is the global websocket connection used to push server notification messages
var Conn *websocket.Conn

//TorrentQueues contains the active and queued torrent hashes in slices
type TorrentQueues struct {
	ID             int `storm:"id,unique"` //storm requires unique ID (will be 5)
	ActiveTorrents []string
	QueuedTorrents []string
}

//IssuedTokensList contains a slice of all the tokens issues to applications
type IssuedTokensList struct {
	ID         int `storm:"id,unique"` //storm requires unique ID (will be 3) to save although there will only be one of these
	SigningKey []byte
	TokenNames []SingleToken
	FirstToken string `storm:omitempty`
}

//SingleToken stores a single token and all of the associated information
type SingleToken struct {
	ClientName string
}

//TorrentHistoryList holds the entire history of downloaded torrents by hash TODO implement a way to read this and maybe grab the name for every torrent as well
type TorrentHistoryList struct {
	ID       int `storm:"id,unique"` //storm requires unique ID (will be 2) to save although there will only be one of these
	HashList []string
}

//RSSFeedStore stores all of our RSS feeds in a slice of gofeed.Feed
type RSSFeedStore struct {
	ID       int             `storm:"id,unique"` //storm requires unique ID (will be 1) to save although there will only be one of these
	RSSFeeds []SingleRSSFeed //slice of string containing URL's in string form for gofeed to parse
}

//SingleRSSFeed stores an RSS feed with a list of all the torrents in the feed
type SingleRSSFeed struct {
	URL      string `storm:"id,unique"` //the URL of the individual RSS feed
	Name     string
	Torrents []SingleRSSTorrent //name of the torrents
}

//SingleRSSTorrent stores a single RSS torrent with all the relevant information
type SingleRSSTorrent struct {
	Link    string `storm:"id,unique"`
	Title   string
	PubDate string
}

//TorrentFilePriority stores the priority for each file in a torrent
type TorrentFilePriority struct {
	TorrentFilePath     string
	TorrentFilePriority string
	TorrentFileSize     int64
}

//TorrentLocal is local storage of the torrents for readd on server restart, marshalled into the database using Storm
type TorrentLocal struct {
	Hash                string `storm:"id,unique"` //Hash should be unique for every torrent... if not we are re-adding an already added torrent
	InfoBytes           []byte
	DateAdded           string
	StoragePath         string //The absolute value of the path where the torrent will be moved when completed
	TempStoragePath     string //The absolute path of where the torrent is temporarily stored as it is downloaded
	TorrentMoved        bool
	TorrentName         string
	TorrentStatus       string
	TorrentUploadLimit  bool //if true this torrent will bypass the upload storage limit (effectively unlimited)
	MaxConnections      int
	TorrentType         string //magnet or .torrent file
	TorrentFileName     string //Should be just the name of the torrent
	TorrentFile         []byte
	Label               string
	UploadedBytes       int64
	DownloadedBytes     int64
	TorrentSize         int64 //If we cancel a file change the download size since we won't be downloading that file
	UploadRatio         string
	TorrentFilePriority []TorrentFilePriority
}

//SaveConfig saves the config to the database to compare for changes to settings.toml on restart
func SaveConfig(torrentStorage *storm.DB, config Settings.FullClientSettings) {
	config.ID = 4
	err := torrentStorage.Save(&config)
	if err != nil {
		Logger.WithFields(logrus.Fields{"database": torrentStorage, "error": err}).Error("Error saving Config to database!")
	}
}

//UpdateQueues Saves the slice of hashes that contain the active Torrents
func UpdateQueues(db *storm.DB, torrentQueues TorrentQueues) {
	torrentQueues.ID = 5
	err := db.Save(&torrentQueues)
	if err != nil {
		Logger.WithFields(logrus.Fields{"database": db, "error": err}).Error("Unable to write Queues to database!")
	}
}

//FetchQueues fetches the activetorrent and queuedtorrent slices from the database
func FetchQueues(db *storm.DB) TorrentQueues {
	torrentQueues := TorrentQueues{}
	err := db.One("ID", 5, &torrentQueues)
	if err != nil {
		Logger.WithFields(logrus.Fields{"database": db, "error": err}).Error("Unable to read Database into torrentQueues!")
		return torrentQueues
	}
	return torrentQueues
}

//FetchConfig fetches the client config from the database
func FetchConfig(torrentStorage *storm.DB) (Settings.FullClientSettings, error) {
	config := Settings.FullClientSettings{}
	err := torrentStorage.One("ID", 4, &config)
	if err != nil {
		Logger.WithFields(logrus.Fields{"database": torrentStorage, "error": err}).Error("Unable to read Database into configFile!")
		return config, err
	}
	return config, err
}

//FetchAllStoredTorrents is called to read in ALL local stored torrents in the boltdb database (called on server restart)
func FetchAllStoredTorrents(torrentStorage *storm.DB) (torrentLocalArray []*TorrentLocal) {
	torrentLocalArray = []*TorrentLocal{} //creating the array of the torrentlocal struct

	err := torrentStorage.All(&torrentLocalArray) //unmarshalling the database into the []torrentlocal
	if err != nil {
		Logger.WithFields(logrus.Fields{"database": torrentStorage, "error": err}).Error("Unable to read Database into torrentLocalArray!")
	}
	return torrentLocalArray //all done, return the entire Array to add to the torrent client
}

//AddTorrentLocalStorage is called when adding a new torrent via any method, requires the boltdb pointer and the torrentlocal struct
func AddTorrentLocalStorage(torrentStorage *storm.DB, local TorrentLocal) {
	Logger.WithFields(logrus.Fields{"Storage Path": local.StoragePath, "Torrent": local.TorrentName, "File(if file)": local.TorrentFileName}).Info("Adding new Torrent to database")
	fmt.Println("ENTIRE TORRENT", local)
	err := torrentStorage.Save(&local)
	if err != nil {
		Logger.WithFields(logrus.Fields{"database": torrentStorage, "error": err}).Error("Error adding new Torrent to database!")
	}
}

//DelTorrentLocalStorage is called to delete a torrent when we fail (for whatever reason to load the information for it).  Deleted by HASH matching.
func DelTorrentLocalStorage(torrentStorage *storm.DB, selectedHash string) {
	singleTorrentInfo := TorrentLocal{}
	err := torrentStorage.One("Hash", selectedHash, &singleTorrentInfo) //finding the torrent by the hash passed in and storing it in a struct
	if err != nil {
		Logger.WithFields(logrus.Fields{"selectedHash": selectedHash, "error": err}).Error("Error deleting torrent with hash!")
	}
	err = torrentStorage.DeleteStruct(&singleTorrentInfo) //deleting that struct from the database
	if err != nil {
		Logger.WithFields(logrus.Fields{"singleTorrent": singleTorrentInfo, "error": err}).Error("Error deleting torrent struct!")
	}
}

//DelTorrentLocalStorageAndFiles deletes the torrent from the database and also attempts to delete the torrent files from the disk as well.
func DelTorrentLocalStorageAndFiles(torrentStorage *storm.DB, selectedHash string, fileDownloadPath string) {
	singleTorrentInfo := TorrentLocal{}
	err := torrentStorage.One("Hash", selectedHash, &singleTorrentInfo) //finding the torrent by the hash passed in and storing it in a struct
	if err != nil {
		Logger.WithFields(logrus.Fields{"selectedHash": selectedHash, "error": err}).Error("Error deleting torrent with hash!")
	}
	singleTorrentPath := filepath.Join(fileDownloadPath, singleTorrentInfo.TorrentName)
	err = os.RemoveAll(singleTorrentPath)
	if err != nil {
		Logger.WithFields(logrus.Fields{"filepath": singleTorrentPath, "error": err}).Error("Error deleting torrent data!")
	} else {
		Logger.WithFields(logrus.Fields{"filepath": singleTorrentPath}).Info("Deleting Torrent Data..")
	}
	err = torrentStorage.DeleteStruct(&singleTorrentInfo) //deleting that struct from the database
	if err != nil {
		Logger.WithFields(logrus.Fields{"singleTorrent": singleTorrentInfo, "error": err}).Error("Error deleting torrent struct!")
	} else {
		Logger.WithFields(logrus.Fields{"singleTorrent": singleTorrentInfo.TorrentName}).Info("Deleted Torrent Struct")
	}
}

//UpdateStorageTick updates the values in boltdb that should update on every tick (like uploadratio or uploadedbytes, not downloaded since we should have the actual file)
func UpdateStorageTick(torrentStorage *storm.DB, torrentLocal TorrentLocal) {
	err := torrentStorage.Update(&torrentLocal)
	if err != nil {
		Logger.WithFields(logrus.Fields{"UpdateContents": torrentLocal, "error": err}).Error("Error performing tick update to database!")
	} else {
		Logger.WithFields(logrus.Fields{"UpdateContents": torrentLocal, "error": err}).Debug("Performed Update to database!")
	}
}

//FetchTorrentFromStorage grabs the localtorrent info from the bolt database for usage found by torrenthash
func FetchTorrentFromStorage(torrentStorage *storm.DB, selectedHash string) TorrentLocal {
	singleTorrentInfo := TorrentLocal{}
	err := torrentStorage.One("Hash", selectedHash, &singleTorrentInfo)
	if err != nil {
		Logger.WithFields(logrus.Fields{"selectedHash": selectedHash, "error": err}).Error("Error selecting torrent with hash!")
	}

	return singleTorrentInfo
}

//FetchTorrentsByLabel fetches a list of torrents that have a specific label
func FetchTorrentsByLabel(torrentStorage *storm.DB, label string) []TorrentLocal {
	allTorrents := []*TorrentLocal{}
	torrentsByLabel := []TorrentLocal{}
	err := torrentStorage.All(&allTorrents)
	if err != nil {
		Logger.WithFields(logrus.Fields{"database": torrentStorage, "error": err}).Error("Unable to read Database into torrentLocalArray!")
	}
	for _, torrent := range allTorrents {
		if torrent.Label == label {
			torrentsByLabel = append(torrentsByLabel, *torrent)
		}
	}
	return torrentsByLabel
}

//FetchHashHistory fetches the infohash of all torrents added into the client.  The cron job checks this so as not to add torrents from RSS that were already added before
func FetchHashHistory(db *storm.DB) TorrentHistoryList {
	torrentHistory := TorrentHistoryList{}
	err := db.One("ID", 2, &torrentHistory)
	if err != nil {
		Logger.WithFields(logrus.Fields{"TorrentHistoryList": torrentHistory, "error": err}).Error("Failure retrieving torrent history list, creating bucket for history list, expected behaviour if first run for history list")
		torrentHistory := TorrentHistoryList{}
		torrentHistory.ID = 2
		err = db.Save(&torrentHistory)
		if err != nil {
			Logger.WithFields(logrus.Fields{"RSSFeed": torrentHistory, "error": err}).Error("Error saving torrent History to database!")
		}
		return torrentHistory
	}
	return torrentHistory
}

//StoreHashHistory adds the infohash of all torrents added into the client.  The cron job checks this so as not to add torrents from RSS that were already added before
func StoreHashHistory(db *storm.DB, torrentHash string) {
	torrentHistory := FetchHashHistory(db)
	torrentHistory.HashList = append(torrentHistory.HashList, torrentHash)
	err := db.Update(torrentHistory)
	if err != nil {
		Logger.WithFields(logrus.Fields{"HashList": torrentHistory}).Error("Unable to update torrent history database with torrent hash!")
	}
}

//FetchJWTTokens fetches the stored client authentication tokens
func FetchJWTTokens(db *storm.DB) IssuedTokensList {
	tokens := IssuedTokensList{}
	err := db.One("ID", 3, &tokens)
	if err != nil {
		Logger.WithFields(logrus.Fields{"Tokens": tokens, "error": err}).Error("Unable to fetch Token database... should always be one token in database")
	}
	return tokens
}

//UpdateJWTTokens updates the database with new tokens as they are added
func UpdateJWTTokens(db *storm.DB, tokens IssuedTokensList) {
	err := db.Update(&tokens)
	if err != nil {
		Logger.WithFields(logrus.Fields{"Tokens": tokens, "error": err}).Error("Unable to update Token database")
	}

}

//FetchRSSFeeds fetches the RSS feed from db, which was setup when initializing database on first startup
func FetchRSSFeeds(db *storm.DB) RSSFeedStore {
	RSSFeed := RSSFeedStore{}
	err := db.One("ID", 1, &RSSFeed) //The ID of 1 should be unique since we will only have one entry
	if err != nil {                  //If we fail to find it in the DB, create it, will happen at first run
		Logger.WithFields(logrus.Fields{"RSSFeedStore": RSSFeed, "error": err}).Error("Failure retrieving RSS feeds, creating bucket for RSS feeds, expected behaviour if first run for RSS")
		RSSFeed := RSSFeedStore{}
		RSSFeed.ID = 1
		err = db.Save(&RSSFeed)
		if err != nil {
			Logger.WithFields(logrus.Fields{"RSSFeed": RSSFeed, "error": err}).Error("Error saving RSS feed to database!")
		}
		return RSSFeed
	}
	return RSSFeed
}

//FetchSpecificRSSFeed pulls one feed from the database to send to the client
func FetchSpecificRSSFeed(db *storm.DB, RSSFeedURL string) SingleRSSFeed {
	allRSSFeeds := FetchRSSFeeds(db)
	singleRSSFeedRet := SingleRSSFeed{}
	for _, singleRSSFeed := range allRSSFeeds.RSSFeeds {
		if singleRSSFeed.URL == RSSFeedURL {
			singleRSSFeedRet.Name = singleRSSFeed.Name
			singleRSSFeedRet.URL = singleRSSFeed.URL
			singleRSSFeedRet.Torrents = singleRSSFeed.Torrents
		}
	}
	Logger.WithFields(logrus.Fields{"singleRSSFeed": singleRSSFeedRet}).Info("Returning single RSS feed")
	return singleRSSFeedRet
}

//UpdateRSSFeeds updates the RSS feeds everytime they are changed
func UpdateRSSFeeds(db *storm.DB, RSSFeed RSSFeedStore) {
	err := db.Update(&RSSFeed)
	if err != nil {
		Logger.WithFields(logrus.Fields{"RSSFeed": RSSFeed}).Error("Unable to update database with rss feed!")
	}
}

//DeleteRSSFeed grabs old database then recreates it without the deleted RSS Feed
func DeleteRSSFeed(db *storm.DB, RSSFeedURL string) {
	RSSFeedStoreOld := FetchRSSFeeds(db)                    //Fetching current store to update
	newRSSFeedStore := RSSFeedStore{ID: RSSFeedStoreOld.ID} //creating new store
	for _, RSSFeed := range RSSFeedStoreOld.RSSFeeds {      //recreating entire store and excluding that one RSS feed we don't want
		if RSSFeed.URL != RSSFeedURL {
			Logger.WithFields(logrus.Fields{"RSSFeedURL": RSSFeedURL}).Debug("Deleting RSS Feed...")
			newRSSFeedStore.RSSFeeds = append(newRSSFeedStore.RSSFeeds, RSSFeed)
		}
	}
	err := db.Update(&newRSSFeedStore)
	if err != nil {
		Logger.WithFields(logrus.Fields{"RSSFeedURL": RSSFeedURL, "error": err}).Error("Error deleting RSS feed from database")
	}
}
