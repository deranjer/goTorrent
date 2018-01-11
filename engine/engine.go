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
)

//RefreshSingleRSSFeed refreshing a single RSS feed to send to the client (so no updating database) mainly by updating the torrent list to display any changes
func RefreshSingleRSSFeed(db *storm.DB, RSSFeed Storage.SingleRSSFeed) Storage.SingleRSSFeed { //Todo.. duplicate as cron job... any way to merge these to reduce duplication?
	singleRSSFeed := Storage.SingleRSSFeed{URL: RSSFeed.URL, Name: RSSFeed.Name}
	singleRSSTorrent := Storage.SingleRSSTorrent{}

	fp := gofeed.NewParser()
	feed, err := fp.ParseURL(RSSFeed.URL)
	if err != nil {
		fmt.Println("Unable to parse URL", RSSFeed.URL, err)
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
	fmt.Println("Length of RSS feeds (should be ONE)", len(RSSFeedStore.RSSFeeds))
	for _, singleFeed := range RSSFeedStore.RSSFeeds {
		feed, err := fp.ParseURL(singleFeed.URL)
		if err != nil {
			fmt.Println("Unable to parse URL", singleFeed.URL, err)
		}
		fmt.Println("SingleFeed is: ", singleFeed)
		for _, RSSTorrent := range feed.Items {
			singleRSSTorrent.Link = RSSTorrent.Link
			singleRSSTorrent.Title = RSSTorrent.Title
			singleRSSTorrent.PubDate = RSSTorrent.Published
			singleFeed.Torrents = append(singleFeed.Torrents, singleRSSTorrent)

		}
		newFeedStore.RSSFeeds = append(newFeedStore.RSSFeeds, singleFeed)
	}
	fmt.Println("ABOUT TO WRITE TO DB", newFeedStore.RSSFeeds)
	Storage.UpdateRSSFeeds(db, newFeedStore) //Calling this to fully update storage will all rss feeds
}

//timeOutInfo forcing a timeout of the torrent if it doesn't load from program restart
func timeOutInfo(clientTorrent *torrent.Torrent, seconds time.Duration) (deleted bool) {
	fmt.Println("Attempting to pull information for torrent... ", clientTorrent.Name())
	timeout := make(chan bool, 1) //creating a timeout channel for our gotinfo
	go func() {
		time.Sleep(seconds * time.Second)
		timeout <- true
	}()
	select {
	case <-clientTorrent.GotInfo(): //attempting to retrieve info for torrent
		//fmt.Println("Recieved torrent info for...", clientTorrent.Name())
		clientTorrent.DownloadAll()
		return false
	case <-timeout: // getting info for torrent has timed out so purging the torrent
		fmt.Println("Dropping Torrent from information timeout...", clientTorrent.Name())
		clientTorrent.Drop()
		return true
	}

}

//StartTorrent creates the storage.db entry and starts A NEW TORRENT and adds to the running torrent array
func StartTorrent(clientTorrent *torrent.Torrent, torrentLocalStorage Storage.TorrentLocal, torrentDbStorage *storm.DB, dataDir string, torrentType string, torrentFileName string) {
	timeOutInfo(clientTorrent, 45) //seeing if adding the torrrent times out (giving 45 seconds)
	var TempHash metainfo.Hash
	TempHash = clientTorrent.InfoHash()
	fmt.Println(clientTorrent.Info().Source)
	torrentLocalStorage.Hash = TempHash.String() // we will store the infohash to add it back later on client restart (if needed)
	torrentLocalStorage.InfoBytes = clientTorrent.Metainfo().InfoBytes
	torrentLocalStorage.DateAdded = time.Now().Format("Jan _2 2006")
	torrentLocalStorage.StoragePath = dataDir //TODO check full path information for torrent storage
	torrentLocalStorage.TorrentName = clientTorrent.Name()
	torrentLocalStorage.TorrentStatus = "Running" //by default start all the torrents as downloading.
	torrentLocalStorage.TorrentType = torrentType //either "file" or "magnet" maybe more in the future
	if torrentType == "file" {                    //if it is a file read the entire file into the database for us to spit out later
		torrentLocalStorage.TorrentFileName = torrentFileName
		torrentfile, err := ioutil.ReadFile(torrentFileName)
		if err != nil {
			fmt.Println("Unable to read the torrent file...")
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
	fmt.Printf("%+v\n", torrentLocalStorage)
	Storage.AddTorrentLocalStorage(torrentDbStorage, torrentLocalStorage) //writing all of the data to the database
	clientTorrent.DownloadAll()                                           //starting the download
}

//CreateRunningTorrentArray creates the entire torrent list to pass to client
func CreateRunningTorrentArray(tclient *torrent.Client, TorrentLocalArray []*Storage.TorrentLocal, PreviousTorrentArray []ClientDB, config FullClientSettings, db *storm.DB) (RunningTorrentArray []ClientDB) {

	for _, element := range TorrentLocalArray { //re-adding all the torrents we had stored from last shutdown or just added via file or magnet link

		var singleTorrent *torrent.Torrent

		if element.TorrentType == "file" { //if it is a file pull it from the uploaded torrent folder
			//fmt.Println("Filename", element.TorrentFileName)
			tempFile, err := ioutil.TempFile("", "TorrentFileTemp")
			if err != nil {
				fmt.Println("Unable to create a temp file for adding file torrent in", err)
			}

			defer os.Remove(tempFile.Name())

			if _, err := tempFile.Write(element.TorrentFile); err != nil {
				fmt.Println("Unable to write to the temp file...", err)
			}
			if err := tempFile.Close(); err != nil {
				fmt.Println("Error closing Temp file", err)
			}
			singleTorrent, _ = tclient.AddTorrentFromFile(tempFile.Name())
			if _, err := os.Stat(element.TorrentFileName); err == nil { //if we CAN find the torrent, add it
				//fmt.Println("Adding file name...", element.TorrentFileName)
				singleTorrent, _ = tclient.AddTorrentFromFile(element.TorrentFileName)

			} else { //if we cant find the torrent delete it
				fmt.Println("File Error", err)
				Storage.DelTorrentLocalStorage(db, element.Hash)
				continue
			}

		} else {
			elementMagnet := "magnet:?xt=urn:btih:" + element.Hash //For magnet links just need to prepend the magnet part to the hash to readd
			singleTorrent, _ = tclient.AddMagnet(elementMagnet)
		}
		var TempHash metainfo.Hash
		TempHash = singleTorrent.InfoHash()

		singleTorrentStorageInfo := Storage.FetchTorrentFromStorage(db, TempHash.String())
		singleTorrent.SetInfoBytes(singleTorrentStorageInfo.InfoBytes) //setting the infobytes back into the torrent

		/* timeOut := timeOutInfo(singleTorrent, 45) //Shouldn't need this anymore as we pull in the infohash from the database
		if timeOut == true { // if we did timeout then drop the torrent from the boltdb database
			Storage.DelTorrentLocalStorage(db, element.Hash) //purging torrent from the local database
			continue
		} */

		fullClientDB := new(ClientDB)
		fullStruct := singleTorrent.Stats()

		//ranging over the previous torrent array to calculate the speed for each torrent
		if len(PreviousTorrentArray) > 0 { //if we actually have  a previous array
			for _, previousElement := range PreviousTorrentArray {
				TempHash := singleTorrent.InfoHash()
				if previousElement.TorrentHashString == TempHash.String() { //matching previous to new
					CalculateTorrentSpeed(singleTorrent, fullClientDB, previousElement)
				}
			}
		}
		activePeersString := strconv.Itoa(fullStruct.ActivePeers) //converting to strings
		totalPeersString := fmt.Sprintf("%v", fullStruct.TotalPeers)
		//fetching all the info from the database
		var torrentTypeTemp string
		torrentTypeTemp = singleTorrentStorageInfo.TorrentType //either "file" or "magnet" maybe more in the future
		if torrentTypeTemp == "file" {
			fullClientDB.SourceType = "Torrent file"
		} else {
			fullClientDB.SourceType = "Magnet Link"
		}
		fullClientDB.StoragePath = singleTorrentStorageInfo.StoragePath //grabbed from database

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
		fullClientDB.StoragePath = element.StoragePath
		fullClientDB.TorrentName = element.TorrentName
		fullClientDB.DateAdded = element.DateAdded
		fullClientDB.BytesCompleted = singleTorrent.BytesCompleted()
		fullClientDB.NumberofFiles = len(singleTorrent.Files())
		CalculateTorrentETA(singleTorrent, fullClientDB) //calculating the ETA for the torrent

		fullClientDB.TotalUploadedBytes = singleTorrentStorageInfo.UploadedBytes
		fullClientDB.TotalUploadedSize = HumanizeBytes(float32(fullClientDB.TotalUploadedBytes))
		fullClientDB.UploadRatio = CalculateUploadRatio(singleTorrent, fullClientDB) //calculate the upload ratio
		tickUpdateStruct := Storage.TorrentLocal{}                                   //we are shoving the tick updates into a torrentlocal struct to pass to storage
		tickUpdateStruct.UploadRatio = fullClientDB.UploadRatio
		tickUpdateStruct.UploadedBytes = fullClientDB.DataBytesWritten

		tickUpdateStruct.Hash = fullClientDB.TorrentHashString //needed for index

		Storage.UpdateStorageTick(db, tickUpdateStruct)
		if singleTorrentStorageInfo.TorrentStatus != "Stopped" { //if the torrent is not stopped, try to discern the status of the torrent
			CalculateTorrentStatus(singleTorrent, fullClientDB) //calculate the status of the torrent, ie downloading seeding etc
		} else {
			fullClientDB.Status = "Stopped"
		}

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
			fmt.Println(torrentFilesRaw)
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
			fmt.Println("filelist", TorrentFileListSelected)
			return TorrentFileListSelected
		}

	}
	return TorrentFileListSelected
}

//CreatePeerListArray create a list of peers for the torrent and displays them
func CreatePeerListArray(tclient *torrent.Client, selectedHash string) PeerFileList {
	runningTorrents := tclient.Torrents()
	fmt.Println("Hash String", selectedHash)
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
			fmt.Println("CreateTorrentDetail", localTorrentInfo)
			return TorrentDetailStruct
		}
	}
	return TorrentDetailStruct
}
