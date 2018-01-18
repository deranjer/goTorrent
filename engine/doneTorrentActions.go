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
	"github.com/sirupsen/logrus"
)

//MoveAndLeaveSymlink takes the file from the default download dir and moves it to the user specified directory and then leaves a symlink behind.
func MoveAndLeaveSymlink(config FullClientSettings, singleTorrent *torrent.Torrent, db *storm.DB) {
	tStorage := Storage.FetchTorrentFromStorage(db, singleTorrent.InfoHash().String())
	oldFilePath := filepath.Join(config.TorrentConfig.DataDir, singleTorrent.Name())
	newFilePath := filepath.Join(tStorage.StoragePath, singleTorrent.Name())
	if oldFilePath != newFilePath {
		if runtime.GOOS == "windows" { //TODO the windows symlink is broken on windows 10 creator edition, so doing a copy for now until Go 1.11
			srcFile, err := os.Open(oldFilePath)
			if err != nil {
				Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "error": err}).Error("Windows: Cannot open old file for copy")
				return
			}
			destFile, err := os.Create(newFilePath) // creating new file to copy old one to
			if err != nil {
				Logger.WithFields(logrus.Fields{"New File Path": newFilePath, "error": err}).Error("Windows: Cannot open new file for copying into")
				return
			}
			_, err = io.Copy(srcFile, destFile)
			if err != nil {
				Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath, "error": err}).Error("Windows: Cannot copy old file into new")
				return
			}
			Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath}).Info("Windows Torrent Copy Completed")
		} else {
			err := os.Symlink(oldFilePath, newFilePath) //For all other OS's create a symlink
			if err != nil {
				Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath, "error": err}).Error("Error creating symlink")
				return
			}
			Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath}).Info("Moving completed torrent")
		}
	}
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
