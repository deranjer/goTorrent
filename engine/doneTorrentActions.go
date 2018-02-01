package engine

import (
	"fmt"
	"io"
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
	if moveDone {
		oldFilePathTemp := filepath.Join(oldPath, tStorage.TorrentName)
		oldFilePath, err := filepath.Abs(oldFilePathTemp)
		if err != nil {
			Logger.WithFields(logrus.Fields{"Torrent Name": tStorage.TorrentName, "Filepath": oldFilePath}).Error("Cannot create absolute file path!")
		}

		fmt.Println("oldfilepath", oldFilePath)
	} else {
		oldFilePathTemp := filepath.Join(config.TorrentConfig.DataDir, tStorage.TorrentName)
		oldFilePath, err := filepath.Abs(oldFilePathTemp)
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
		if runtime.GOOS == "windows" { //TODO the windows symlink is broken on windows 10 creator edition, so doing a copy for now until Go 1.11
			if oldFileInfo.IsDir() {
				os.Mkdir(newFilePath, 0755)
				if moveDone {
					err := folderCopy.Copy(config.TorrentConfig.DataDir, newFilePath)
					if err != nil {
						Logger.WithFields(logrus.Fields{"Old File Path": config.TorrentConfig.DataDir, "New File Path": newFilePath, "error": err}).Error("Error Copying Folder!")
					}
				} else {
					err := folderCopy.Copy(oldFilePath, newFilePath) //copy the folder to the new location
					if err != nil {
						Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath, "error": err}).Error("Error Copying Folder!")
					}

				}
				os.Chmod(newFilePath, 0777)
				notifyUser(tStorage, config, db)
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
			notifyUser(tStorage, config, db)
		} else {

			folderCopy.Copy(oldFilePath, newFilePath)
			os.Chmod(newFilePath, 0777) //changing permissions on the new file to be permissive
			os.RemoveAll(oldFilePath)
			if moveDone {
				err := os.Symlink(newFilePath, config.TorrentConfig.DataDir)
				if err != nil {
					Logger.WithFields(logrus.Fields{"Old File Path": config.TorrentConfig.DataDir, "New File Path": newFilePath, "error": err}).Error("Error creating symlink")
					return
				}
			} else {
				err := os.Symlink(newFilePath, oldFilePath) //For all other OS's create a symlink
				if err != nil {
					Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath, "error": err}).Error("Error creating symlink")
					return
				}
			}
			notifyUser(tStorage, config, db)
			Logger.WithFields(logrus.Fields{"Old File Path": oldFilePath, "New File Path": newFilePath}).Info("Moving completed torrent")
		}
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
