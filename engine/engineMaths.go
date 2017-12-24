package engine

import (
	"fmt"
	"time"

	"github.com/anacrolix/torrent"
)

func secondsToMinutes(inSeconds int64) string {
	minutes := inSeconds / 60
	seconds := inSeconds % 60
	minutesString := fmt.Sprintf("%d", minutes)
	secondsString := fmt.Sprintf("%d", seconds)
	str := minutesString + " Min/ " + secondsString + " Sec"
	return str
}

//ConvertSizetoGB changes the sizes
func ConvertSizetoGB(t float32, d float32) (tDelta string, dDelta string) { //converting sizes to MB or GB as needed and adding string
	if t > 1024 && d > 1024 {
		t := fmt.Sprintf("%.2f", t/1024)
		t = t + " GB"
		d := fmt.Sprintf("%.2f", d/1024)
		d = d + " GB"
		return t, d
	} else if d > 1024 || t > 1024 {
		if d > 1024 {
			d := fmt.Sprintf("%.2f", d/1024)
			d = d + " GB"
			t := fmt.Sprintf("%.2f", t)
			t = t + " MB"
			return t, d
		}
		d := fmt.Sprintf("%.2f", d)
		d = d + " MB"
		t := fmt.Sprintf("%.2f", t/1024)
		t = t + " GB"
		return t, d
	} else {
		d := fmt.Sprintf("%.2f", d)
		t := fmt.Sprintf("%.2f", t)
		t = t + " MB"
		d = d + " MB"
		return t, d
	}
}

//CalculateTorrentSpeed is used to calculate the torrent upload and download speed over time
func CalculateTorrentSpeed(t *torrent.Torrent, c *ClientDB, oc ClientDB) {
	now := time.Now()
	bytes := t.BytesCompleted()
	bytesUpload := t.Stats().DataBytesWritten
	dt := float32(now.Sub(oc.UpdatedAt))     // get the delta time length between now and last updated
	db := float32(bytes - oc.BytesCompleted) //getting the delta bytes
	rate := db * (float32(time.Second) / dt) // converting into seconds
	dbU := float32(bytesUpload - oc.DataBytesWritten)
	//fmt.Println("BytesWritten", bytesUpload)
	//fmt.Println("WireBytes", t.Stats().DataBytesWritten)
	//fmt.Println("ChunksWritten", t.Stats().ChunksWritten)
	rateUpload := dbU * (float32(time.Second) / dt)
	if rate >= 0 {
		rate = rate / 1024 / 1024 //creating integer to calculate ETA
		c.DownloadSpeed = fmt.Sprintf("%.2f", rate)
		c.DownloadSpeed = c.DownloadSpeed + " MB/s"
		c.downloadSpeedInt = int64(rate)
	}
	if rateUpload >= 0 {
		rateUpload = rateUpload / 1024 / 1024
		c.UploadSpeed = fmt.Sprintf("%.2f", rateUpload)
		c.UploadSpeed = c.UploadSpeed + " MB/s"

	}
	c.UpdatedAt = now
}

//CalculateTorrentETA is used to estimate the remaining dl time of the torrent based on the speed that the MB are being downloaded
func CalculateTorrentETA(t *torrent.Torrent, c *ClientDB) {
	missingBytes := t.Length() - t.BytesCompleted()
	missingMB := missingBytes / 1024 / 1024
	if missingMB == 0 {
		c.ETA = "Done"
	} else if c.downloadSpeedInt == 0 {
		c.ETA = "N/A"
	} else {
		ETASeconds := missingMB / c.downloadSpeedInt
		str := secondsToMinutes(ETASeconds) //converting seconds to minutes + seconds
		c.ETA = str
	}
}

//CalculateTorrentStatus is used to determine what the STATUS column of the frontend will display ll2
func CalculateTorrentStatus(t *torrent.Torrent, c *ClientDB) {
	if t.Seeding() && t.Stats().ActivePeers > 0 && t.BytesMissing() == 0 {
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
