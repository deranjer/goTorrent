package engine //Settings.go contains all of the program settings

import (
	"github.com/anacrolix/dht"
	"github.com/anacrolix/torrent"
)

//FullCLientSettings struct is a struct that can be read into anacrolix/torrent to setup a torrent client
type FullClientSettings struct {
	Version int
	torrent.Config
	TFileUploadFolder string
}

//FullClientSettingsNew creates a new torrent client config TODO read from a TOML file
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
