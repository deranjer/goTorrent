package engine

import (
	"fmt"

	"github.com/asdine/storm"
	Storage "github.com/deranjer/goTorrent/storage"
	"github.com/mmcdole/gofeed"
	"github.com/robfig/cron"
)

//InitializeCronEngine initializes and starts the cron engine so we can add tasks as needed, returns pointer to the engine
func InitializeCronEngine() *cron.Cron { //TODO add a cron to inspect cron jobs and log the outputs
	c := cron.New()
	c.Start()
	return c
}

//RefreshRSSCron refreshes all of the RSS feeds on an hourly basis
func RefreshRSSCron(c *cron.Cron, db *storm.DB) {
	c.AddFunc("@hourly", func() {
		RSSFeedStore := Storage.FetchRSSFeeds(db)
		singleRSSTorrent := Storage.SingleRSSTorrent{}
		newFeedStore := Storage.RSSFeedStore{ID: RSSFeedStore.ID} //creating a new feed store just using old one to parse for new torrents
		fp := gofeed.NewParser()
		for _, singleFeed := range RSSFeedStore.RSSFeeds {
			feed, err := fp.ParseURL(singleFeed.URL)
			if err != nil {
				fmt.Println("Unable to parse URL", singleFeed.URL, err)
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
	})

}

//LogCronStatus prints out the status of the cron jobs to the log
func LogCronStatus(c *cron.Cron) {

}
