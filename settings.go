package main

import (

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/dht"
)


type fullClientSettings struct {
	version int
	torrent.Config

}


func fullClientSettingsNew()(fullClientSettings){
	//Config := fullClientSettings //generate a new struct

	var Config fullClientSettings


	Config.version = 1.0
	Config.DataDir = "downloads" //the full OR relative path of the default download directory for torrents

	Config.DHTConfig = dht.ServerConfig{
		StartingNodes: dht.GlobalBootstrapAddrs,
	}

	return Config

}