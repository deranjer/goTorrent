package storage

import (
	"os"
	"path/filepath"

	"github.com/sirupsen/logrus"

	"github.com/asdine/storm"
)

//Logger is the global Logger that is used in all packages
var Logger *logrus.Logger

//RSSFeedStore stores all of our RSS feeds in a slice of gofeed.Feed
type RSSFeedStore struct {
	ID       int             `storm:"id,unique"` //storm requires unique ID to save although there will only be one of these
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
	PubDate string //TODO, change this to a date of some kind
}

//TorrentFilePriority stores the priority for each file in a torrent
type TorrentFilePriority struct {
	TorrentFilePath     string
	TorrentFilePriority string
}

//TorrentLocal is local storage of the torrents for readd on server restart, marshalled into the database using Storm
type TorrentLocal struct {
	Hash                string `storm:"id,unique"` //Hash should be unique for every torrent... if not we are re-adding an already added torrent \\TODO check for re-add of same torrent
	InfoBytes           []byte
	DateAdded           string
	StoragePath         string
	TorrentMoved        bool
	TorrentName         string
	TorrentStatus       string
	MaxConnections      int
	TorrentType         string //magnet or .torrent file
	TorrentFileName     string
	TorrentFile         []byte //TODO store and reteive torrent file from here
	Label               string //for labeling torrent files
	UploadedBytes       int64
	DownloadedBytes     int64 //TODO not sure if needed since we should have the file which contains the bytes
	UploadRatio         string
	TorrentFilePriority []TorrentFilePriority
}

//TorrentHistoryList holds the entire history of downloaded torrents by hash TODO implement a way to read this and maybe grab the name for every torrent as well
type TorrentHistoryList struct {
	HashList []string
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
	Logger.WithFields(logrus.Fields{"database": torrentStorage, "Torrent": local}).Info("Adding new Torrent to database")
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
func DelTorrentLocalStorageAndFiles(torrentStorage *storm.DB, selectedHash string) {
	singleTorrentInfo := TorrentLocal{}
	err := torrentStorage.One("Hash", selectedHash, &singleTorrentInfo) //finding the torrent by the hash passed in and storing it in a struct
	if err != nil {
		Logger.WithFields(logrus.Fields{"selectedHash": selectedHash, "error": err}).Error("Error deleting torrent with hash!")
	}
	singleTorrentPath := filepath.Join(singleTorrentInfo.StoragePath, singleTorrentInfo.TorrentName)
	err = os.RemoveAll(singleTorrentPath)
	if err != nil {
		Logger.WithFields(logrus.Fields{"filepath": singleTorrentPath, "error": err}).Error("Error deleting torrent data!")
	}
	err = torrentStorage.DeleteStruct(&singleTorrentInfo) //deleting that struct from the database
	if err != nil {
		Logger.WithFields(logrus.Fields{"singleTorrent": singleTorrentInfo, "error": err}).Error("Error deleting torrent struct!")
	}
}

//UpdateStorageTick updates the values in boltdb that should update on every tick (like uploadratio or uploadedbytes, not downloaded since we should have the actual file)
func UpdateStorageTick(torrentStorage *storm.DB, torrentLocal TorrentLocal) {
	err := torrentStorage.Update(&torrentLocal)
	if err != nil {
		Logger.WithFields(logrus.Fields{"UpdateContents": torrentLocal, "error": err}).Error("Error performing tick update to database!")
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
			Logger.WithFields(logrus.Fields{"RSSFeedURL": RSSFeedURL}).Debug("Adding new RSS feed to list..")
			newRSSFeedStore.RSSFeeds = append(newRSSFeedStore.RSSFeeds, RSSFeed)
		}
	}
	err := db.Update(&newRSSFeedStore)
	if err != nil {
		Logger.WithFields(logrus.Fields{"RSSFeedURL": RSSFeedURL, "error": err}).Error("Error deleting RSS feed from database")
	}
}
