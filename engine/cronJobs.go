package engine

import (
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

//RefreshRSSCron refreshes all of the RSS feeds on an hourly basis
func RefreshRSSCron(c *cron.Cron, db *storm.DB, tclient *torrent.Client, torrentLocalStorage Storage.TorrentLocal, dataDir string) {
	c.AddFunc("@hourly", func() {
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
				clientTorrent, err := tclient.AddMagnet(RSSTorrent.Link)
				if err != nil {
					Logger.WithFields(logrus.Fields{"err": err, "Torrent": RSSTorrent.Title}).Warn("Unable to add torrent to torrent client!")
					break //break out of the loop entirely for this message since we hit an error
				}
				StartTorrent(clientTorrent, torrentLocalStorage, db, dataDir, "magnet", "", dataDir) //TODO let user specify torrent default storage location and let change on fly
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
