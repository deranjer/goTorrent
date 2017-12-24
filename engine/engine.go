package engine //main file for all the calculations and data gathering needed for creating the running torrent arrays

import (
	"fmt"
	"os"
	"time"

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/metainfo"
	"github.com/boltdb/bolt"
	Storage "github.com/deranjer/goTorrent/storage"
)

func timeOutInfo(clientTorrent *torrent.Torrent, seconds time.Duration) (deleted bool) { //forcing a timeout of the torrent if it doesn't load
	timeout := make(chan bool, 1) //creating a timeout channel for our gotinfo
	go func() {
		time.Sleep(seconds * time.Second)
		timeout <- true
	}()
	select {
	case <-clientTorrent.GotInfo(): //attempting to retrieve info for torrent
		fmt.Println("Recieved torrent info for...", clientTorrent.Name())
		clientTorrent.DownloadAll()
		return false
	case <-timeout: // getting info for torrent has timed out so purging the torrent
		fmt.Println("Dropping Torrent")
		clientTorrent.Drop()
		return true
	}

}

//StartTorrent creates the storage.db entry and starts the torrent and adds to the running torrent array
func StartTorrent(clientTorrent *torrent.Torrent, torrentLocalStorage *Storage.TorrentLocal, torrentDbStorage *bolt.DB, dataDir string, torrentFile string, torrentFileName string) {

	timeOutInfo(clientTorrent, 45) //seeing if adding the torrrent times out (giving 45 seconds)
	var TempHash metainfo.Hash
	TempHash = clientTorrent.InfoHash()
	fmt.Println(clientTorrent.Info().Source)
	torrentLocalStorage.Hash = TempHash.String() // we will store the infohash to add it back later on client restart (if needed)
	torrentLocalStorage.DateAdded = time.Now().Format("Jan _2 2006")
	torrentLocalStorage.StoragePath = dataDir //TODO check full path information for torrent storage
	torrentLocalStorage.TorrentName = clientTorrent.Name()
	torrentLocalStorage.TorrentStatus = "downloading" //by default start all the torrents as downloading.
	torrentLocalStorage.TorrentType = torrentFile     //either "file" or "magnet" maybe more in the future
	if torrentFile == "file" {
		torrentLocalStorage.TorrentFileName = torrentFileName
	} else {
		torrentLocalStorage.TorrentFileName = ""
	}
	fmt.Printf("%+v\n", torrentLocalStorage)
	Storage.AddTorrentLocalStorage(torrentDbStorage, torrentLocalStorage) //writing all of the data to the database
	clientTorrent.DownloadAll()                                           //starting the download
}

//CreateRunningTorrentArray creates the entire torrent list to pass to client
func CreateRunningTorrentArray(tclient *torrent.Client, TorrentLocalArray []*Storage.TorrentLocal, PreviousTorrentArray []ClientDB, config FullClientSettings, db *bolt.DB) (RunningTorrentArray []ClientDB) {

	for _, element := range TorrentLocalArray { //re-adding all the torrents we had stored from last shutdown or just added via file or magnet link

		var singleTorrent *torrent.Torrent

		if element.TorrentType == "file" { //if it is a file pull it from the uploaded torrent folder
			//fmt.Println("Filename", element.TorrentFileName)
			if _, err := os.Stat(element.TorrentFileName); err == nil { //if we CAN find the torrent, add it
				//fmt.Println("Adding file name...", element.TorrentFileName)
				singleTorrent, _ = tclient.AddTorrentFromFile(element.TorrentFileName)
			} else { //if we cant find the torrent delete it
				fmt.Println("File Error", err)
				Storage.DelTorrentLocalStorage(db, element)
				continue
			}

		} else {
			elementMagnet := "magnet:?xt=urn:btih:" + element.Hash //For magnet links just need to prepend the magnet part to the hash to readd
			singleTorrent, _ = tclient.AddMagnet(elementMagnet)
		}

		timeOut := timeOutInfo(singleTorrent, 45)
		if timeOut == true { // if we did timeout then drop the torrent from the boltdb database
			Storage.DelTorrentLocalStorage(db, element) //purging torrent from the local database
		}

		fullClientDB := new(ClientDB)
		fullStruct := singleTorrent.Stats()

		//ranging over the previous torrent array to calculate the speed for each torrent
		if len(PreviousTorrentArray) > 0 { //if we actually have  a previous array
			for _, previousElement := range PreviousTorrentArray {
				TempHash := singleTorrent.InfoHash()
				if previousElement.TorrentHashString == TempHash.AsString() { //matching previous to new
					CalculateTorrentSpeed(singleTorrent, fullClientDB, previousElement)
				}
			}
		}
		activePeersString := fmt.Sprintf("%v", fullStruct.ActivePeers) //converting to strings
		totalPeersString := fmt.Sprintf("%v", fullStruct.TotalPeers)
		bytesCompletedMB := float32(singleTorrent.BytesCompleted() / 1024 / 1024)
		totalSizeMB := float32(singleTorrent.Length() / 1024 / 1024)
		//downloadSizeString := fmt.Sprintf("%d", bytesCompletedMB)

		tSize, dSize := ConvertSizetoGB(totalSizeMB, bytesCompletedMB) //convert size to GB if needed
		var TempHash metainfo.Hash
		TempHash = singleTorrent.InfoHash()

		fullClientDB.DownloadedSize = dSize
		fullClientDB.Size = tSize
		PercentDone := fmt.Sprintf("%.2f", bytesCompletedMB/totalSizeMB)
		fullClientDB.TorrentHash = TempHash
		fullClientDB.PercentDone = PercentDone
		fullClientDB.DataBytesRead = fullStruct.ConnStats.DataBytesRead
		fullClientDB.DataBytesWritten = fullStruct.ConnStats.DataBytesWritten
		fullClientDB.ActivePeers = activePeersString + " / (" + totalPeersString + ")"
		fullClientDB.TorrentHashString = TempHash.AsString()
		fullClientDB.StoragePath = element.StoragePath
		fullClientDB.TorrentName = element.TorrentName
		fullClientDB.DateAdded = element.DateAdded
		fullClientDB.BytesCompleted = singleTorrent.BytesCompleted()
		CalculateTorrentETA(singleTorrent, fullClientDB) //calculating the ETA for the torrent
		//fmt.Println("Download Speed: ", fullClientDB.DownloadSpeed)
		//fmt.Println("Percent Done: ", fullClientDB.PercentDone)
		//tclient.WriteStatus(os.Stdout)
		CalculateTorrentStatus(singleTorrent, fullClientDB) //calculate the status of the torrent, ie downloading seeding etc

		RunningTorrentArray = append(RunningTorrentArray, *fullClientDB)

	}
	fmt.Println("RunningTorrentArrayCreated...")
	return RunningTorrentArray
}

//CreateFileListArray creates a file list for a single torrent that is selected and sent to the server
func CreateFileListArray(tclient *torrent.Client, selectedHash string) TorrentFileList {
	runningTorrents := tclient.Torrents() //don't need running torrent array since we aren't adding or deleting from storage
	TorrentFileListSelected := TorrentFileList{}
	for _, singleTorrent := range runningTorrents {
		tempHash := singleTorrent.InfoHash()
		if tempHash.AsString() == selectedHash { // if our selection hash equals our torrent hash
			TorrentFileListSelected.FileList = singleTorrent.Files()
			TorrentFileListSelected.MessageType = "torrentFileList"
			TorrentFileListSelected.TotalFiles = len(singleTorrent.Files())
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
		tempHash := singleTorrent.InfoHash()
		if tempHash.AsString() == selectedHash {
			TorrentPeerList.MessageType = "torrentPeerList"
			TorrentPeerList.TotalPeers = len(TorrentPeerList.PeerList)
			TorrentPeerList.PeerList = singleTorrent.KnownSwarm()
			return TorrentPeerList
			break //only looking for one result
		}
	}
	return TorrentPeerList

}

//CreateTorrentDetailJSON creates the json response for a request for more torrent information
func CreateTorrentDetailJSON(tclient *torrent.Client, selectedHash string, torrentStorage *bolt.DB) ClientDB {

	localTorrentInfo := Storage.FetchTorrentFromStorage(torrentStorage, []byte(selectedHash))

	runningTorrents := tclient.Torrents()

	TorrentDetailStruct := ClientDB{}
	for _, singleTorrent := range runningTorrents { //ranging through the running torrents to find the one we are looking for
		tempHash := singleTorrent.InfoHash()
		if tempHash.AsString() == selectedHash {
			fmt.Println("CreateTorrentDetail", localTorrentInfo)
			return TorrentDetailStruct
			break //only looking for one result
		}
	}
	return TorrentDetailStruct
}
