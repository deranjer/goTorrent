package main

import (
	"fmt"
	"github.com/anacrolix/torrent"
	"log"
	"os"
	"path/filepath"
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

// NewClientConfig creates a new default configuration.
func NewClientConfig() ClientConfig {
	return ClientConfig{
		Port:           8080,
		TorrentPort:    50007,
		Seed:           false,
		TCP:            true,
		MaxConnections: 200,
		DownloadDir:    "Download",
	}
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

func NewClient(cfg ClientConfig) (client Client, err error) {

	var t *torrent.Torrent
	var c *torrent.Client

	client.Config = cfg

	//create the download directory
	_, err := os.Create(cfg.DownloadDir)
	if err != nil {
		log.Println(err)
		return
	}

	c, err = torrent.NewClient(&torrent.Config{
		DataDir:    cfg.DownloadDir,
		NoUpload:   !cfg.Seed,
		Seed:       cfg.Seed,
		DisableTCP: !cfg.TCP,
		ListenAddr: fmt.Sprintf("%d", cfg.TorrentPort),
	})
	if err != nil {
		return client, ClientError{Type: "creating torrent client", Origin: err}
	}

	client.Client = c

	//adding torrents

}
