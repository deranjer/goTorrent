package engine

import (
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/anacrolix/torrent"
	"github.com/asdine/storm"
	Storage "github.com/deranjer/goTorrent/storage"
	"github.com/mmcdole/gofeed"
	"github.com/robfig/cron"
	"github.com/sirupsen/logrus"
)

//Logger is the global variable pulled in from main.go
var Logger *logrus.Logger

//InitializeCronEngine initializes and starts the cron engine so we can add tasks as needed, returns pointer to the engine
func InitializeCronEngine() *cron.Cron {
	c := cron.New()
	c.Start()
	return c
}

//CheckTorrentWatchFolder adds torrents from a watch folder //TODO see if you can use filepath.Abs instead of changing directory
func CheckTorrentWatchFolder(c *cron.Cron, db *storm.DB, tclient *torrent.Client, torrentLocalStorage Storage.TorrentLocal, config FullClientSettings) {
	c.AddFunc("@every 5m", func() {
		Logger.WithFields(logrus.Fields{"Watch Folder": config.TorrentWatchFolder}).Info("Running the watch folder cron job")
		torrentFiles, err := ioutil.ReadDir(config.TorrentWatchFolder)
		if err != nil {
			Logger.WithFields(logrus.Fields{"Folder": config.TorrentWatchFolder, "Error": err}).Error("Unable to read from the torrent upload folder")
			return
		}
		for _, file := range torrentFiles {
			if filepath.Ext(file.Name()) != ".torrent" {
				Logger.WithFields(logrus.Fields{"File": file.Name(), "error": err}).Error("Not a torrent file..")
			} else {
				fullFilePath := filepath.Join(config.TorrentWatchFolder, file.Name())
				clientTorrent, err := tclient.AddTorrentFromFile(fullFilePath)
				if err != nil {
					Logger.WithFields(logrus.Fields{"err": err, "Torrent": file.Name()}).Warn("Unable to add torrent to torrent client!")
					break //break out of the loop entirely for this message since we hit an error
				}
				fullNewFilePath := filepath.Join(config.TFileUploadFolder, file.Name())
				StartTorrent(clientTorrent, torrentLocalStorage, db, config.TorrentConfig.DataDir, "file", file.Name(), config.DefaultMoveFolder)
				CopyFile(fullFilePath, fullNewFilePath)
				os.Remove(fullFilePath) //delete the torrent after adding it and copying it over
				Logger.WithFields(logrus.Fields{"Source Folder": config.TorrentWatchFolder, "Destination Folder": config.TFileUploadFolder, "Torrent": file.Name()}).Info("Added torrent from watch folder, and moved torrent file")
			}
		}
	})
}

//RefreshRSSCron refreshes all of the RSS feeds on an hourly basis
func RefreshRSSCron(c *cron.Cron, db *storm.DB, tclient *torrent.Client, torrentLocalStorage Storage.TorrentLocal, config FullClientSettings) {
	c.AddFunc("@hourly", func() {
		torrentHashHistory := Storage.FetchHashHistory(db)
		RSSFeedStore := Storage.FetchRSSFeeds(db)
		singleRSSTorrent := Storage.SingleRSSTorrent{}
		newFeedStore := Storage.RSSFeedStore{ID: RSSFeedStore.ID} //creating a new feed store just using old one to parse for new torrents
		fp := gofeed.NewParser()
		for _, singleFeed := range RSSFeedStore.RSSFeeds {
			feed, err := fp.ParseURL(singleFeed.URL)
			if err != nil {
				Logger.WithFields(logrus.Fields{"err": err, "url": singleFeed.URL}).Error("Failed to parse RSS URL")
			}
			for _, RSSTorrent := range feed.Items {
				Logger.WithFields(logrus.Fields{"Torrent": RSSTorrent.Title}).Info("Found new torrent")
				singleRSSTorrent.Link = RSSTorrent.Link
				singleRSSTorrent.Title = RSSTorrent.Title
				singleRSSTorrent.PubDate = RSSTorrent.Published
				for _, hash := range torrentHashHistory.HashList {
					linkHash := singleRSSTorrent.Link[20:60] //cutting the infohash out of the link
					if linkHash == hash {
						Logger.WithFields(logrus.Fields{"Torrent": RSSTorrent.Title}).Warn("Torrent already added for this RSS item, skipping torrent")
					}
				}
				clientTorrent, err := tclient.AddMagnet(RSSTorrent.Link)
				if err != nil {
					Logger.WithFields(logrus.Fields{"err": err, "Torrent": RSSTorrent.Title}).Warn("Unable to add torrent to torrent client!")
					break //break out of the loop entirely for this message since we hit an error
				}
				StartTorrent(clientTorrent, torrentLocalStorage, db, config.TorrentConfig.DataDir, "magnet", "", config.DefaultMoveFolder) //TODO let user specify torrent default storage location and let change on fly
				singleFeed.Torrents = append(singleFeed.Torrents, singleRSSTorrent)

			}
			newFeedStore.RSSFeeds = append(newFeedStore.RSSFeeds, singleFeed)
		}
		Storage.UpdateRSSFeeds(db, newFeedStore) //Calling this to fully update storage will all rss feeds
	})

}

//LogCronStatus prints out the status of the cron jobs to the log
func LogCronStatus(c *cron.Cron) { //TODO add a cron to inspect cron jobs and log the outputs

}
