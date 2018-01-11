package engine

import (
	"fmt"

	"golang.org/x/time/rate"

	"github.com/anacrolix/dht"

	"github.com/anacrolix/torrent"
	"github.com/spf13/viper"
)

type FullClientSettings struct {
	Version           int
	TorrentConfig     torrent.Config
	TFileUploadFolder string
}

func defaultConfig() FullClientSettings {
	var Config FullClientSettings
	Config.Version = 1.0
	Config.TorrentConfig.DataDir = "downloads" //the full OR relative path of the default download directory for torrents
	Config.TFileUploadFolder = "uploadedTorrents"
	Config.TorrentConfig.Seed = true

	Config.TorrentConfig.DHTConfig = dht.ServerConfig{
		StartingNodes: dht.GlobalBootstrapAddrs,
	}

	return Config
}

func dhtServerSettings(dhtConfig dht.ServerConfig) dht.ServerConfig {

	viper.UnmarshalKey("DHTConfig", &dhtConfig)
	fmt.Println("dhtconfig", dhtConfig)

	return dhtConfig
}

func FullClientSettingsNew() FullClientSettings {
	viper.SetConfigName("config")
	viper.AddConfigPath("./")
	err := viper.ReadInConfig()
	if err != nil {
		fmt.Println("Error reading in config, using defaults", err)
		FullClientSettings := defaultConfig()
		return FullClientSettings
	}

	dataDir := viper.GetString("torrentClientConfig.DownloadDir")
	listenAddr := viper.GetString("torrentClientConfig.ListenAddr")
	disablePex := viper.GetBool("torrentClientConfig.DisablePEX")
	noDHT := viper.GetBool("torrentClientConfig.NoDHT")
	noUpload := viper.GetBool("torrentClientConfig.NoUpload")
	seed := viper.GetBool("torrentClientConfig.Seed")
	peerID := viper.GetString("torrentClientConfig.PeerID")
	disableUTP := viper.GetBool("torrentClientConfig.DisableUTP")
	disableTCP := viper.GetBool("torrentClientConfig.DisableTCP")
	disableIPv6 := viper.GetBool("torrentClientConfig.DisableIPv6")
	debug := viper.GetBool("torrentClientConfig.Debug")

	dhtServerConfig := dht.ServerConfig{
		StartingNodes: dht.GlobalBootstrapAddrs,
	}
	if viper.IsSet("DHTConfig") {
		fmt.Println("Reading in custom DHT config")
		dhtServerConfig = dhtServerSettings(dhtServerConfig)
	}

	uploadRateLimiter := new(rate.Limiter)
	viper.UnmarshalKey("UploadRateLimiter", &uploadRateLimiter)

	downloadRateLimiter := new(rate.Limiter)
	viper.UnmarshalKey("DownloadRateLimiter", &downloadRateLimiter)

	rreferNoEncryption := viper.GetBool("EncryptionPolicy.PreferNoEncryption")
	fmt.Println("Encryption", rreferNoEncryption)

	encryptionPolicy := torrent.EncryptionPolicy{
		DisableEncryption:  viper.GetBool("EncryptionPolicy.DisableEncryption"),
		ForceEncryption:    viper.GetBool("EncryptionPolicy.ForceEncryption"),
		PreferNoEncryption: viper.GetBool("EncryptionPolicy.PreferNoEncryption"),
	}

	tConfig := torrent.Config{
		DataDir:    dataDir,
		ListenAddr: listenAddr,
		DisablePEX: disablePex,
		NoDHT:      noDHT,
		DHTConfig:  dhtServerConfig,
		NoUpload:   noUpload,
		Seed:       seed,
		//UploadRateLimiter:   uploadRateLimiter,
		//DownloadRateLimiter: downloadRateLimiter,
		PeerID:           peerID,
		DisableUTP:       disableUTP,
		DisableTCP:       disableTCP,
		DisableIPv6:      disableIPv6,
		Debug:            debug,
		EncryptionPolicy: encryptionPolicy,
	}

	Config := FullClientSettings{TorrentConfig: tConfig, TFileUploadFolder: "uploadedTorrents"}

	return Config

}
