package settings

import (
	"github.com/anacrolix/dht"
	"github.com/anacrolix/torrent"
)

type FullClientSettings struct {
	Version int
	torrent.Config
	TFileUploadFolder string
}

func FullClientSettingsNew() FullClientSettings {
	//Config := fullClientSettings //generate a new struct

	var Config FullClientSettings

	Config.Version = 1.0
	Config.DataDir = "downloads" //the full OR relative path of the default download directory for torrents
	Config.TFileUploadFolder = "uploadedTorrents"
	Config.Seed = true

	Config.DHTConfig = dht.ServerConfig{
		StartingNodes: dht.GlobalBootstrapAddrs,
	}

	return Config

}
