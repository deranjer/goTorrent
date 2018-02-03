package engine

import (
	"os"
	"path/filepath"
	"runtime"

	"github.com/asdine/storm"
	Storage "github.com/deranjer/goTorrent/storage"
	pushbullet "github.com/mitsuse/pushbullet-go"
	"github.com/mitsuse/pushbullet-go/requests"
	folderCopy "github.com/otiai10/copy"
	"github.com/sirupsen/logrus"
)

//MoveAndLeaveSymlink takes the file from the default download dir and moves it to the user specified directory and then leaves a symlink behind.
func MoveAndLeaveSymlink(config FullClientSettings, tHash string, db *storm.DB, moveDone bool, oldPath string) { //moveDone and oldPath are for moving a completed torrent
	tStorage := Storage.FetchTorrentFromStorage(db, tHash)
	Logger.WithFields(logrus.Fields{"Torrent Name": tStorage.TorrentName}).Info("Move and Create symlink started for torrent")
	var oldFilePath string
	if moveDone { //only occurs on manual move
		oldFilePathTemp := filepath.Join(oldPath, tStorage.TorrentName)
		var err error
		oldFilePath, err = filepath.Abs(oldFilePathTemp)
		if err != nil {
			Logger.WithFields(logrus.Fields{"Torrent Name": tStorage.TorrentName, "Filepath": oldFilePath}).Error("Cannot create absolute file path!")
		}
	} else {
		oldFilePathTemp := filepath.Join(config.TorrentConfig.DataDir, tStorage.TorrentName)
		var err error
		oldFilePath, err = filepath.Abs(oldFilePathTemp)
		if err != nil {
			Logger.WithFields(logrus.Fields{"Torrent Name": tStorage.TorrentName, "Filepath": oldFilePath}).Error("Cannot create absolute file path!")
		}
	}
	newFilePathTemp := filepath.Join(tStorage.StoragePath, tStorage.TorrentName)
	newFilePath, err := filepath.Abs(newFilePathTemp)
	if err != nil {
		Logger.WithFields(logrus.Fields{"Torrent Name": tStorage.TorrentName, "Filepath": newFilePath}).Error("Cannot create absolute file path for new file path!")
	}
	_, err = os.Stat(tStorage.StoragePath)
	if os.IsNotExist(err) {
		err := os.MkdirAll(tStorage.StoragePath, 0755)
		if err != nil {
			Logger.WithFields(logrus.Fields{"New File Path": newFilePath, "error": err}).Error("Cannot create new directory")
		}
	}
	oldFileInfo, err := os.Stat(oldFilePath)
	if err != nil {
		Logger.WithFields(logrus.Fields{"Old File info": oldFileInfo, "Old File Path": oldFilePath, "error": err}).Error("Cannot find the old file to copy/symlink!")
		return
	}

	if oldFilePath != newFilePath {
		newFilePathDir := filepath.Dir(newFilePath)
		os.Mkdir(newFilePathDir, 0755)
		err := folderCopy.Copy(oldFilePath, newFilePath) //copy the folder to the new location
		if err != nil {
			Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath, "error": err}).Error("Error Copying Folder!")
		}
		os.Chmod(newFilePath, 0777)
		if runtime.GOOS != "windows" { //TODO the windows symlink is broken on windows 10 creator edition, so on the other platforms create symlink (windows will copy) until Go1.11
			os.RemoveAll(oldFilePath)
			err = os.Symlink(newFilePath, oldFilePath)
			if err != nil {
				Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath, "error": err}).Error("Error creating symlink")
			}
		}
		if moveDone == false {
			tStorage.TorrentMoved = true     //TODO error handling instead of just saying torrent was moved when it was not
			notifyUser(tStorage, config, db) //Only notify if we haven't moved yet, don't want to push notify user every time user uses change storage button
		}
		Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath}).Info("Moving completed torrent")
		tStorage.StoragePath = filepath.Dir(newFilePath)
		Storage.UpdateStorageTick(db, tStorage)
	}

}

func notifyUser(tStorage Storage.TorrentLocal, config FullClientSettings, db *storm.DB) {
	Logger.WithFields(logrus.Fields{"New File Path": tStorage.StoragePath, "Torrent Name": tStorage.TorrentName}).Info("Attempting to notify user..")
	tStorage.TorrentMoved = true
	//Storage.AddTorrentLocalStorage(db, tStorage) //Updating the fact that we moved the torrent
	Storage.UpdateStorageTick(db, tStorage)
	if config.PushBulletToken != "" {
		pb := pushbullet.New(config.PushBulletToken)
		n := requests.NewNote()
		n.Title = tStorage.TorrentName
		n.Body = "Completed and moved to " + tStorage.StoragePath
		if _, err := pb.PostPushesNote(n); err != nil {
			Logger.WithFields(logrus.Fields{"Torrent": tStorage.TorrentName, "New File Path": tStorage.StoragePath, "error": err}).Error("Error pushing PushBullet Note")
			return
		}
		Logger.WithFields(logrus.Fields{"Torrent": tStorage.TorrentName, "New File Path": tStorage.StoragePath}).Info("Pushbullet note sent")
	} else {
		Logger.WithFields(logrus.Fields{"New File Path": tStorage.StoragePath, "Torrent Name": tStorage.TorrentName}).Info("No pushbullet API key set, not notifying")
	}
}
