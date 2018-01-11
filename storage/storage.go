package storage

import (
	"fmt"

	"github.com/asdine/storm"
)

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

//ReadInTorrents is called to read in ALL local stored torrents in the boltdb database (called on server restart)
func ReadInTorrents(torrentStorage *storm.DB) (torrentLocalArray []*TorrentLocal) {
	torrentLocalArray = []*TorrentLocal{} //creating the array of the torrentlocal struct

	err := torrentStorage.All(&torrentLocalArray) //unmarshalling the database into the []torrentlocal
	if err != nil {
		fmt.Println("Error reading database into torrentLocalArray", err)
	}
	return torrentLocalArray //all done, return the entire Array to add to the torrent client
}

//AddTorrentLocalStorage is called when adding a new torrent via any method, requires the boltdb pointer and the torrentlocal struct
func AddTorrentLocalStorage(torrentStorage *storm.DB, local TorrentLocal) {
	println("Adding Local storage information")

	err := torrentStorage.Save(&local)
	if err != nil {
		fmt.Println("Error adding new Torrent to database", err)
	}

}

//DelTorrentLocalStorage is called to delete a torrent when we fail (for whatever reason to load the information for it).  Deleted by HASH matching.
func DelTorrentLocalStorage(torrentStorage *storm.DB, selectedHash string) {
	singleTorrentInfo := TorrentLocal{}
	err := torrentStorage.One("Hash", selectedHash, &singleTorrentInfo) //finding the torrent by the hash passed in and storing it in a struct
	if err != nil {
		fmt.Println("Error finding torrent with hash ", selectedHash, " to delete", err)
	}
	err = torrentStorage.DeleteStruct(&singleTorrentInfo) //deleting that struct from the database
	if err != nil {
		fmt.Println("Error deleting torrent ", singleTorrentInfo, " from database", err)
	}
}

//UpdateStorageTick updates the values in boltdb that should update on every tick (like uploadratio or uploadedbytes, not downloaded since we should have the actual file)
func UpdateStorageTick(torrentStorage *storm.DB, torrentLocal TorrentLocal) {
	err := torrentStorage.Update(&torrentLocal)
	if err != nil {
		fmt.Println("Error performing tick update to database", err)
	}
}

//FetchTorrentFromStorage grabs the localtorrent info from the bolt database for usage found by torrenthash
func FetchTorrentFromStorage(torrentStorage *storm.DB, selectedHash string) TorrentLocal {
	singleTorrentInfo := TorrentLocal{}
	err := torrentStorage.One("Hash", selectedHash, &singleTorrentInfo)
	if err != nil {
		fmt.Println("Failure selecting single torrent!", err)
	}

	return singleTorrentInfo
}

//FetchRSSFeeds fetches the RSS feed from db, which was setup when initializing database on first startup
func FetchRSSFeeds(db *storm.DB) RSSFeedStore {
	RSSFeed := RSSFeedStore{}
	err := db.One("ID", 1, &RSSFeed) //The ID of 1 should be unique since we will only have one entry
	if err != nil {                  //If we fail to find it in the DB, create it, will happen at first run
		fmt.Println("Failure retrieving RSS feeds, creating bucket for RSS feeds, expected behaviour if first run for RSS", err)
		RSSFeed := RSSFeedStore{}
		RSSFeed.ID = 1
		err = db.Save(&RSSFeed)
		if err != nil {
			fmt.Println("Fatal error trying to create RSSFeedStore in database")
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
	return singleRSSFeedRet
}

//UpdateRSSFeeds updates the RSS feeds everytime they are changed
func UpdateRSSFeeds(db *storm.DB, RSSFeed RSSFeedStore) {
	err := db.Update(&RSSFeed)
	if err != nil {
		fmt.Println("Error performing RSS Update", err)
	}
}

//DeleteRSSFeed grabs old database then recreates it without the deleted RSS Feed
func DeleteRSSFeed(db *storm.DB, RSSFeedURL string) {
	RSSFeedStoreOld := FetchRSSFeeds(db)                    //Fetching current store to update
	newRSSFeedStore := RSSFeedStore{ID: RSSFeedStoreOld.ID} //creating new store
	for _, RSSFeed := range RSSFeedStoreOld.RSSFeeds {      //recreating entire store and excluding that one RSS feed we don't want
		if RSSFeed.URL != RSSFeedURL {
			newRSSFeedStore.RSSFeeds = append(newRSSFeedStore.RSSFeeds, RSSFeed)
		}
	}
	err := db.Update(&newRSSFeedStore)
	if err != nil {
		fmt.Println("Error deleting RSS feed from db", err)
	}
}
