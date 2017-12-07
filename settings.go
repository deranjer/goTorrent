package main

import (
	"github.com/anacrolix/dht"
	"github.com/anacrolix/torrent"
)

type fullClientSettings struct {
	version int
	torrent.Config
	tFileUploadFolder string
}

func fullClientSettingsNew() fullClientSettings {
	//Config := fullClientSettings //generate a new struct

	var Config fullClientSettings

	Config.version = 1.0
	Config.DataDir = "downloads" //the full OR relative path of the default download directory for torrents
	Config.tFileUploadFolder = "uploadedTorrents"

	Config.DHTConfig = dht.ServerConfig{
		StartingNodes: dht.GlobalBootstrapAddrs,
	}

	return Config

}
