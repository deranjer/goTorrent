package main

import (
	"fmt"
	"github.com/anacrolix/torrent"
	"time"
)

// ClientError formats errors coming from the client.
type ClientError struct {
	Type   string
	Origin error
}

func (clientError ClientError) Error() string {
	return fmt.Sprintf("Error %s: %s\n", clientError.Type, clientError.Origin)
}

type ClientConfig struct {
	TorrentPath    string
	Port           int
	TorrentPort    int
	Seed           bool
	TCP            bool
	MaxConnections int
	DownloadDir    string
}


type Client struct {
	Client        *torrent.Client
	Torrent       *torrent.Torrent
	Name          string
	Progress      int64
	Status        string
	Seeds         int
	Peers         int
	DownloadSpeed int64
	UploadSpeed   int64
	ETA           time.Duration
	Ratio         int
	Avail         int
	Config        ClientConfig
}


