package engine //main file for all the calculations and data gathering needed for creating the running torrent arrays

import (
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/asdine/storm"
	Storage "github.com/deranjer/goTorrent/storage"
	"github.com/mmcdole/gofeed"
	"github.com/sirupsen/logrus"
)

//RefreshSingleRSSFeed refreshing a single RSS feed to send to the client (so no updating database) mainly by updating the torrent list to display any changes
func RefreshSingleRSSFeed(db *storm.DB, RSSFeed Storage.SingleRSSFeed) Storage.SingleRSSFeed { //Todo.. duplicate as cron job... any way to merge these to reduce duplication?
	singleRSSFeed := Storage.SingleRSSFeed{URL: RSSFeed.URL, Name: RSSFeed.Name}
	singleRSSTorrent := Storage.SingleRSSTorrent{}
	fp := gofeed.NewParser()
	feed, err := fp.ParseURL(RSSFeed.URL)
	if err != nil {
		Logger.WithFields(logrus.Fields{"RSSFeedURL": RSSFeed.URL, "error": err}).Error("Unable to parse URL")
	}
	for _, RSSTorrent := range feed.Items {
		singleRSSTorrent.Link = RSSTorrent.Link
		singleRSSTorrent.Title = RSSTorrent.Title
		singleRSSTorrent.PubDate = RSSTorrent.Published
		singleRSSFeed.Torrents = append(singleRSSFeed.Torrents, singleRSSTorrent)

	}
	return singleRSSFeed

}

//ForceRSSRefresh forces a refresh (in addition to the cron schedule) to add the new RSS feed
func ForceRSSRefresh(db *storm.DB, RSSFeedStore Storage.RSSFeedStore) { //Todo.. duplicate as cron job... any way to merge these to reduce duplication?
	singleRSSTorrent := Storage.SingleRSSTorrent{}
	newFeedStore := Storage.RSSFeedStore{ID: RSSFeedStore.ID} //creating a new feed store just using old one to parse for new torrents
	fp := gofeed.NewParser()
	Logger.WithFields(logrus.Fields{"RSSFeedStoreLength": len(RSSFeedStore.RSSFeeds)}).Debug("Length of RSS feeds (should be ONE)")
	for _, singleFeed := range RSSFeedStore.RSSFeeds {
		feed, err := fp.ParseURL(singleFeed.URL)
		if err != nil {
			Logger.WithFields(logrus.Fields{"RSSFeedURL": singleFeed.URL, "error": err}).Error("Unable to parse URL")
		}
		for _, RSSTorrent := range feed.Items {
			singleRSSTorrent.Link = RSSTorrent.Link
			singleRSSTorrent.Title = RSSTorrent.Title
			singleRSSTorrent.PubDate = RSSTorrent.Published
			singleFeed.Torrents = append(singleFeed.Torrents, singleRSSTorrent)

		}
		newFeedStore.RSSFeeds = append(newFeedStore.RSSFeeds, singleFeed)
	}
	Storage.UpdateRSSFeeds(db, newFeedStore) //Calling this to fully update storage will all rss feeds
}

//timeOutInfo forcing a timeout of the torrent if it doesn't load from program restart
func timeOutInfo(clientTorrent *torrent.Torrent, seconds time.Duration) (deleted bool) {
	Logger.WithFields(logrus.Fields{"torrentName": clientTorrent.Name()}).Info("Attempting to download info for torrent")
	timeout := make(chan bool, 1) //creating a timeout channel for our gotinfo
	go func() {
		time.Sleep(seconds * time.Second)
		timeout <- true
	}()
	select {
	case <-clientTorrent.GotInfo(): //attempting to retrieve info for torrent
		Logger.WithFields(logrus.Fields{"clientTorrentName": clientTorrent.Name()}).Debug("Recieved torrent info for torrent")
		clientTorrent.DownloadAll()
		return false
	case <-timeout: // getting info for torrent has timed out so purging the torrent
		Logger.WithFields(logrus.Fields{"clientTorrentName": clientTorrent.Name()}).Error("Forced to drop torrent from timeout waiting for info")
		clientTorrent.Drop()
		return true
	}

}

func readTorrentFileFromDB(element *Storage.TorrentLocal, singleTorrent *torrent.Torrent, tclient *torrent.Client, db *storm.DB) {
	tempFile, err := ioutil.TempFile("", "TorrentFileTemp")
	if err != nil {
		Logger.WithFields(logrus.Fields{"tempfile": tempFile, "err": err}).Error("Unable to create tempfile")
	}
	defer os.Remove(tempFile.Name())
	if _, err := tempFile.Write(element.TorrentFile); err != nil { //writing out out the entire file back into the temp dir from boltdb
		Logger.WithFields(logrus.Fields{"tempfile": tempFile, "err": err}).Error("Unable to write to tempfile")
	}
	if err := tempFile.Close(); err != nil { //close the tempfile so that we can add it back into the torrent client
		Logger.WithFields(logrus.Fields{"tempfile": tempFile, "err": err}).Error("Unable to close tempfile")
	}
	singleTorrent, _ = tclient.AddTorrentFromFile(tempFile.Name())
	if _, err := os.Stat(element.TorrentFileName); err == nil { //if we CAN find the torrent, add it
		singleTorrent, _ = tclient.AddTorrentFromFile(element.TorrentFileName)
	} else { //if we cant find the torrent delete it
		Storage.DelTorrentLocalStorage(db, element.Hash)
		Logger.WithFields(logrus.Fields{"tempfile": tempFile, "err": err}).Error("Unable to find Torrent, deleting..")
	}
}

//StartTorrent creates the storage.db entry and starts A NEW TORRENT and adds to the running torrent array
func StartTorrent(clientTorrent *torrent.Torrent, torrentLocalStorage Storage.TorrentLocal, torrentDbStorage *storm.DB, dataDir string, torrentType string, torrentFileName string, torrentStoragePath string) {
	timeOutInfo(clientTorrent, 45) //seeing if adding the torrrent times out (giving 45 seconds)
	var TempHash metainfo.Hash
	TempHash = clientTorrent.InfoHash()
	allStoredTorrents := Storage.FetchAllStoredTorrents(torrentDbStorage)
	for _, runningTorrentHashes := range allStoredTorrents {
		if runningTorrentHashes.Hash == TempHash.String() {
			Logger.WithFields(logrus.Fields{"Hash": TempHash.String()}).Error("Torrent has duplicate hash to already running torrent... will not add to storage")
			return
		}
	}
	torrentLocalStorage.Hash = TempHash.String() // we will store the infohash to add it back later on client restart (if needed)
	torrentLocalStorage.InfoBytes = clientTorrent.Metainfo().InfoBytes
	torrentLocalStorage.DateAdded = time.Now().Format("Jan _2 2006")
	torrentLocalStorage.StoragePath = torrentStoragePath
	torrentLocalStorage.TorrentName = clientTorrent.Name()
	torrentLocalStorage.TorrentStatus = "Running" //by default start all the torrents as downloading.
	torrentLocalStorage.TorrentType = torrentType //either "file" or "magnet" maybe more in the future
	if torrentType == "file" {                    //if it is a file read the entire file into the database for us to spit out later
		torrentLocalStorage.TorrentFileName = torrentFileName
		torrentfile, err := ioutil.ReadFile(torrentFileName)
		if err != nil {
			Logger.WithFields(logrus.Fields{"torrentFile": torrentfile, "error": err}).Error("Unable to read the torrent file")
		}
		torrentLocalStorage.TorrentFile = torrentfile //storing the entire file in to database
	}
	torrentFiles := clientTorrent.Files() //storing all of the files in the database along with the priority
	var TorrentFilePriorityArray = []Storage.TorrentFilePriority{}
	for _, singleFile := range torrentFiles { //creating the database setup for the file array
		var torrentFilePriority = Storage.TorrentFilePriority{}
		torrentFilePriority.TorrentFilePath = singleFile.DisplayPath()
		torrentFilePriority.TorrentFilePriority = "Normal"

		TorrentFilePriorityArray = append(TorrentFilePriorityArray, torrentFilePriority)

	}
	torrentLocalStorage.TorrentFilePriority = TorrentFilePriorityArray
	Storage.AddTorrentLocalStorage(torrentDbStorage, torrentLocalStorage) //writing all of the data to the database
	clientTorrent.DownloadAll()                                           //starting the download
}

//CreateRunningTorrentArray creates the entire torrent list to pass to client
func CreateRunningTorrentArray(tclient *torrent.Client, TorrentLocalArray []*Storage.TorrentLocal, PreviousTorrentArray []ClientDB, config FullClientSettings, db *storm.DB) (RunningTorrentArray []ClientDB) {

	for _, singleTorrentFromStorage := range TorrentLocalArray {

		var singleTorrent *torrent.Torrent
		var TempHash metainfo.Hash

		fullClientDB := new(ClientDB)
		//singleTorrentStorageInfo := Storage.FetchTorrentFromStorage(db, TempHash.String())  //pulling the single torrent info from storage ()

		if singleTorrentFromStorage.TorrentType == "file" { //if it is a file pull it from the uploaded torrent folder
			readTorrentFileFromDB(singleTorrentFromStorage, singleTorrent, tclient, db)
			fullClientDB.SourceType = "Torrent File"
			continue
		} else {
			singleTorrentFromStorageMagnet := "magnet:?xt=urn:btih:" + singleTorrentFromStorage.Hash //For magnet links just need to prepend the magnet part to the hash to readd
			singleTorrent, _ = tclient.AddMagnet(singleTorrentFromStorageMagnet)
			fullClientDB.SourceType = "Magnet Link"
		}

		if len(singleTorrentFromStorage.InfoBytes) == 0 { //TODO.. kind of a fringe scenario.. not sure if needed since the db should always have the infobytes
			timeOut := timeOutInfo(singleTorrent, 45)
			if timeOut == true { // if we did timeout then drop the torrent from the boltdb database
				Storage.DelTorrentLocalStorage(db, singleTorrentFromStorage.Hash) //purging torrent from the local database
				continue
			}
			singleTorrentFromStorage.InfoBytes = singleTorrent.Metainfo().InfoBytes
		}

		TempHash = singleTorrent.InfoHash()
		singleTorrent.SetInfoBytes(singleTorrentFromStorage.InfoBytes) //setting the infobytes back into the torrent

		if (singleTorrent.BytesCompleted() == singleTorrent.Length()) && (singleTorrentFromStorage.TorrentMoved == false) { //if we are done downloading and havent moved torrent yet
			MoveAndLeaveSymlink(config, singleTorrent, db)
		}

		fullStruct := singleTorrent.Stats()

		activePeersString := strconv.Itoa(fullStruct.ActivePeers) //converting to strings
		totalPeersString := fmt.Sprintf("%v", fullStruct.TotalPeers)
		//fetching all the info from the database

		fullClientDB.StoragePath = singleTorrentFromStorage.StoragePath //grabbed from database

		downloadedSizeHumanized := HumanizeBytes(float32(singleTorrent.BytesCompleted())) //convert size to GB if needed
		totalSizeHumanized := HumanizeBytes(float32(singleTorrent.Length()))

		//grabbed from torrent client
		fullClientDB.DownloadedSize = downloadedSizeHumanized
		fullClientDB.Size = totalSizeHumanized
		PercentDone := fmt.Sprintf("%.2f", float32(singleTorrent.BytesCompleted())/float32(singleTorrent.Length()))
		fullClientDB.TorrentHash = TempHash
		fullClientDB.PercentDone = PercentDone
		fullClientDB.DataBytesRead = fullStruct.ConnStats.DataBytesRead       //used for calculations not passed to client calculating up/down speed
		fullClientDB.DataBytesWritten = fullStruct.ConnStats.DataBytesWritten //used for calculations not passed to client calculating up/down speed
		fullClientDB.ActivePeers = activePeersString + " / (" + totalPeersString + ")"
		fullClientDB.TorrentHashString = TempHash.String()
		fullClientDB.StoragePath = singleTorrentFromStorage.StoragePath
		fullClientDB.TorrentName = singleTorrentFromStorage.TorrentName
		fullClientDB.DateAdded = singleTorrentFromStorage.DateAdded
		fullClientDB.BytesCompleted = singleTorrent.BytesCompleted()
		fullClientDB.NumberofFiles = len(singleTorrent.Files())
		CalculateTorrentETA(singleTorrent, fullClientDB)
		//ranging over the previous torrent array to calculate the speed for each torrent
		if len(PreviousTorrentArray) > 0 { //if we actually have  a previous array
			for _, previousElement := range PreviousTorrentArray {
				TempHash := singleTorrent.InfoHash()
				if previousElement.TorrentHashString == TempHash.String() { //matching previous to new
					CalculateTorrentSpeed(singleTorrent, fullClientDB, previousElement)
					fullClientDB.TotalUploadedBytes = singleTorrentFromStorage.UploadedBytes + (fullStruct.ConnStats.DataBytesWritten - previousElement.DataBytesWritten)
				}
			}
		}

		fullClientDB.TotalUploadedSize = HumanizeBytes(float32(fullClientDB.TotalUploadedBytes))
		fullClientDB.UploadRatio = CalculateUploadRatio(singleTorrent, fullClientDB) //calculate the upload ratio

		if float64(fullClientDB.TotalUploadedBytes)/float64(singleTorrent.BytesCompleted()) >= config.SeedRatioStop { //if our upload ratio is over or eq our limit set in config
			singleTorrent.SetMaxEstablishedConns(0) //forcing a stop
			fullClientDB.Status = "Stopped"
		}

		if singleTorrentFromStorage.TorrentStatus != "Stopped" { //if the torrent is not stopped, try to discern the status of the torrent
			singleTorrent.SetMaxEstablishedConns(80)
			fullClientDB.MaxConnections = 80
			singleTorrent.DownloadAll()                         // forcing the client to download all pieces
			CalculateTorrentStatus(singleTorrent, fullClientDB) //calculate the status of the torrent, ie downloading seeding etc
		} else {
			fullClientDB.Status = "Stopped"
			fullClientDB.MaxConnections = 0
			singleTorrent.SetMaxEstablishedConns(0) //since it was stopped forcing the connections to zero
		}

		tickUpdateStruct := Storage.TorrentLocal{} //we are shoving the tick updates into a torrentlocal struct to pass to storage
		tickUpdateStruct.UploadRatio = fullClientDB.UploadRatio
		tickUpdateStruct.UploadedBytes = fullClientDB.TotalUploadedBytes
		tickUpdateStruct.TorrentStatus = fullClientDB.Status
		tickUpdateStruct.Hash = fullClientDB.TorrentHashString //needed for index

		Storage.UpdateStorageTick(db, tickUpdateStruct)
		RunningTorrentArray = append(RunningTorrentArray, *fullClientDB)

	}
	return RunningTorrentArray
}

//CreateFileListArray creates a file list for a single torrent that is selected and sent to the server
func CreateFileListArray(tclient *torrent.Client, selectedHash string) TorrentFileList {
	runningTorrents := tclient.Torrents() //don't need running torrent array since we aren't adding or deleting from storage
	TorrentFileListSelected := TorrentFileList{}
	TorrentFileStruct := TorrentFile{}
	for _, singleTorrent := range runningTorrents {
		tempHash := singleTorrent.InfoHash().String()
		if tempHash == selectedHash { // if our selection hash equals our torrent hash
			torrentFilesRaw := singleTorrent.Files()
			Logger.WithFields(logrus.Fields{"torrentFiles": torrentFilesRaw}).Debug("Unable to close tempfile")
			for _, singleFile := range torrentFilesRaw {
				TorrentFileStruct.TorrentHashString = tempHash
				TorrentFileStruct.FileName = singleFile.DisplayPath()
				TorrentFileStruct.FilePath = singleFile.Path()
				PieceState := singleFile.State()
				var downloadedBytes int64
				for _, piece := range PieceState {
					if piece.Complete {
						downloadedBytes = downloadedBytes + piece.Bytes //adding up the bytes in the completed pieces
					}
				}
				TorrentFileStruct.FilePercent = fmt.Sprintf("%.2f", float32(downloadedBytes)/float32(singleFile.Length()))
				TorrentFileStruct.FilePriority = "Normal" //TODO, figure out how to store this per file in storage and also tie a priority to a file
				TorrentFileStruct.FileSize = HumanizeBytes(float32(singleFile.Length()))
				TorrentFileListSelected.FileList = append(TorrentFileListSelected.FileList, TorrentFileStruct)
			}
			TorrentFileListSelected.MessageType = "torrentFileList"
			TorrentFileListSelected.TotalFiles = len(singleTorrent.Files())
			Logger.WithFields(logrus.Fields{"selectedFiles": TorrentFileListSelected}).Debug("Selected Torrent Files")
			return TorrentFileListSelected
		}

	}
	return TorrentFileListSelected
}

//CreatePeerListArray create a list of peers for the torrent and displays them
func CreatePeerListArray(tclient *torrent.Client, selectedHash string) PeerFileList {
	runningTorrents := tclient.Torrents()
	TorrentPeerList := PeerFileList{}
	for _, singleTorrent := range runningTorrents {
		tempHash := singleTorrent.InfoHash().String()
		if (strings.Compare(tempHash, selectedHash)) == 0 {
			TorrentPeerList.MessageType = "torrentPeerList"
			TorrentPeerList.PeerList = singleTorrent.KnownSwarm()
			TorrentPeerList.TotalPeers = len(TorrentPeerList.PeerList)
			return TorrentPeerList
		}
	}
	return TorrentPeerList
}

//CreateTorrentDetailJSON creates the json response for a request for more torrent information
func CreateTorrentDetailJSON(tclient *torrent.Client, selectedHash string, torrentStorage *storm.DB) ClientDB {

	localTorrentInfo := Storage.FetchTorrentFromStorage(torrentStorage, selectedHash)

	runningTorrents := tclient.Torrents()

	TorrentDetailStruct := ClientDB{}
	for _, singleTorrent := range runningTorrents { //ranging through the running torrents to find the one we are looking for
		tempHash := singleTorrent.InfoHash().String()
		if tempHash == selectedHash {
			Logger.WithFields(logrus.Fields{"torrentHash": tempHash, "detailedInfo": localTorrentInfo}).Info("Creating detailed torrent list")
			return TorrentDetailStruct
		}
	}
	return TorrentDetailStruct
}
