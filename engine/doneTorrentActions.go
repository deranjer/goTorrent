package engine

import (
	"io"
	"os"
	"path/filepath"
	"runtime"

	"github.com/anacrolix/torrent"
	"github.com/asdine/storm"
	Storage "github.com/deranjer/goTorrent/storage"
	pushbullet "github.com/mitsuse/pushbullet-go"
	"github.com/mitsuse/pushbullet-go/requests"
	folderCopy "github.com/otiai10/copy"
	"github.com/sirupsen/logrus"
)

//MoveAndLeaveSymlink takes the file from the default download dir and moves it to the user specified directory and then leaves a symlink behind.
func MoveAndLeaveSymlink(config FullClientSettings, singleTorrent *torrent.Torrent, db *storm.DB) {
	Logger.WithFields(logrus.Fields{"Torrent Name": singleTorrent.Name()}).Error("Move and Create symlink started for torrent")
	tStorage := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String())
	oldFilePath := filepath.Join(config.TorrentConfig.DataDir, singleTorrent.Name())
	newFilePath := filepath.Join(tStorage.StoragePath, singleTorrent.Name())
	_, err := os.Stat(tStorage.StoragePath)
	if os.IsNotExist(err) {
		err := os.MkdirAll(tStorage.StoragePath, 0644)
		if err != nil {
			Logger.WithFields(logrus.Fields{"New File Path": newFilePath, "error": err}).Error("Cannot create new directory")
		}
	}
	oldFileInfo, err := os.Stat(oldFilePath)
	if err != nil {
		Logger.WithFields(logrus.Fields{"Old File info": oldFileInfo, "error": err}).Error("Cannot find the old file to copy/symlink!")
		return
	}

	if oldFilePath != newFilePath {
		if runtime.GOOS == "windows" { //TODO the windows symlink is broken on windows 10 creator edition, so doing a copy for now until Go 1.11
			if oldFileInfo.IsDir() {
				os.Mkdir(newFilePath, 0644)
				folderCopy.Copy(oldFilePath, newFilePath) //copy the folder to the new location
				notifyUser(tStorage, config, singleTorrent, db)
				return
			}
			srcFile, err := os.Open(oldFilePath)
			defer srcFile.Close()
			if err != nil {
				Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "error": err}).Error("Windows: Cannot open old file for copy")
				return
			}
			destFile, err := os.Create(newFilePath)
			defer destFile.Close()
			if err != nil {
				Logger.WithFields(logrus.Fields{"New File Path": newFilePath, "error": err}).Error("Windows: Cannot open new file for copying into")
				return
			}

			bytesWritten, err := io.Copy(destFile, srcFile)
			if err != nil {
				Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath, "error": err}).Error("Windows: Cannot copy old file into new")
				return
			}
			err = destFile.Sync()
			if err != nil {
				Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath, "error": err}).Error("Windows: Error syncing new file to disk")
			}
			Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath, "bytesWritten": bytesWritten}).Info("Windows Torrent Copy Completed")
			notifyUser(tStorage, config, singleTorrent, db)
		} else {
			folderCopy.Copy(oldFilePath, newFilePath)
			os.RemoveAll(oldFilePath)
			err := os.Symlink(newFilePath, oldFilePath) //For all other OS's create a symlink
			if err != nil {
				Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath, "error": err}).Error("Error creating symlink")
				return
			}
			notifyUser(tStorage, config, singleTorrent, db)
			Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath}).Info("Moving completed torrent")
		}
	}

}

func notifyUser(tStorage Storage.TorrentLocal, config FullClientSettings, singleTorrent *torrent.Torrent, db *storm.DB) {
	tStorage.TorrentMoved = true
	Storage.AddTorrentLocalStorage(db, tStorage) //Updating the fact that we moved the torrent
	if config.PushBulletToken != "" {
		pb := pushbullet.New(config.PushBulletToken)
		n := requests.NewNote()
		n.Title = singleTorrent.Name()
		n.Body = "Completed and moved to " + tStorage.StoragePath
		if _, err := pb.PostPushesNote(n); err != nil {
			Logger.WithFields(logrus.Fields{"Torrent": singleTorrent.Name(), "New File Path": tStorage.StoragePath, "error": err}).Error("Error pushing PushBullet Note")
			return
		}
		Logger.WithFields(logrus.Fields{"Torrent": singleTorrent.Name(), "New File Path": tStorage.StoragePath}).Info("Pushbullet note sent")
	}
}
