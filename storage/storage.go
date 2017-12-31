package storage

import (
	"fmt"

	"github.com/asdine/storm"
)

//TorrentLocal is local storage of the torrents for readd on server restart, marshalled into the database using Storm
type TorrentLocal struct {
	Hash            string `storm:"id,unique"` //Hash should be unique for every torrent... if not we are re-adding an already added torrent \\TODO check for re-add of same torrent
	DateAdded       string
	StoragePath     string
	TorrentName     string
	TorrentStatus   string
	TorrentType     string //magnet or .torrent file
	TorrentFileName string
	Label           string //for labeling torrent files
	UploadedBytes   int64
	DownloadedBytes int64 //TODO not sure if needed since we should have the file which contains the bytes
	UploadRatio     string
}

//ReadInTorrents is called to read in ALL local stored torrents in the boltdb database (called on server restart)
func ReadInTorrents(torrentStorage *storm.DB) (torrentLocalArray []*TorrentLocal) {
	err := torrentStorage.Init(&TorrentLocal{}) //initializing buckets and indexes since this function runs on start
	if err != nil {
		fmt.Println("Error initializing and indexing database....", err)
	}
	torrentLocalArray = []*TorrentLocal{} //creating the array of the torrentlocal struct

	err = torrentStorage.All(&torrentLocalArray) //unmarshalling the database into the []torrentlocal
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
func DelTorrentLocalStorage(torrentStorage *storm.DB, local *TorrentLocal) { //TODO do a ONE and purge the torrent that way
	println("Deleting torrent", local.TorrentFileName)
	err := torrentStorage.DeleteStruct(&local)
	if err != nil {
		fmt.Println("Error deleting torrent from database", err)
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
