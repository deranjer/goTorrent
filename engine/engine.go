package engine //main file for all the calculations and data gathering needed for creating the running torrent array

import (
	"fmt"
)

func calculateTorrentSpeed(t *torrent.Torrent, c *clientDB) {
	now := time.Now()
	bytes := t.BytesCompleted()
	fmt.Println("UpdatedAt: ", c.UpdatedAt)
	if c.UpdatedAt.IsZero() {
		c.UpdatedAt = now
		fmt.Println("Setting Time", c.UpdatedAt)

	} else {
		dt := float32(now.Sub(c.UpdatedAt))
		fmt.Println("Delta Time: ", dt)
		db := float32(bytes - c.BytesCompleted)
		fmt.Println("Delta Bytes:", db)
		rate := db * (float32(time.Second) / dt)

		fmt.Println("form: ", float32(time.Second))
		if rate >= 0 {
			c.DownloadSpeed = rate
		}
	}

}



func calculateTorrentStatus(t *torrent.Torrent, c *clientDB) {
	if t.Seeding() {
		c.Status = "Seeding"
	} else if t.Stats().ActivePeers > 0 && t.BytesMissing() > 0 {
		c.Status = "Downloading"
	} else if t.Stats().ActivePeers == 0 && t.BytesMissing() == 0 {
		c.Status = "Completed"
	} else if t.Stats().ActivePeers == 0 && t.BytesMissing() > 0 {
		c.Status = "Awaiting Peers"
	} else {
		c.Status = "Unknown"
	}
}


