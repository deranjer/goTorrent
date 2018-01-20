package engine

import (
	"fmt"
	"path/filepath"

	"github.com/anacrolix/dht"
	"github.com/anacrolix/torrent"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"golang.org/x/time/rate"
)

//FullClientSettings contains all of the settings for our entire application
type FullClientSettings struct {
	LoggingLevel      logrus.Level
	LoggingOutput     string
	HTTPAddr          string
	Version           int
	TorrentConfig     torrent.Config
	TFileUploadFolder string
	SeedRatioStop     float64
	PushBulletToken   string
	DefaultMoveFolder string
}

//default is called if there is a parsing error
func defaultConfig() FullClientSettings {
	var Config FullClientSettings
	Config.Version = 1.0
	Config.LoggingLevel = 3                    //Warn level
	Config.TorrentConfig.DataDir = "downloads" //the absolute or relative path of the default download directory for torrents
	Config.TFileUploadFolder = "uploadedTorrents"
	Config.TorrentConfig.Seed = true
	Config.HTTPAddr = ":8000"
	Config.SeedRatioStop = 1.50

	Config.TorrentConfig.DHTConfig = dht.ServerConfig{
		StartingNodes: dht.GlobalBootstrapAddrs,
	}

	return Config
}

func dhtServerSettings(dhtConfig dht.ServerConfig) dht.ServerConfig {
	viper.UnmarshalKey("DHTConfig", &dhtConfig)
	Logger.WithFields(logrus.Fields{"dhtConfig": dhtConfig}).Info("Displaying DHT Config")
	return dhtConfig
}

//FullClientSettingsNew creates a new set of setting from config.toml
func FullClientSettingsNew() FullClientSettings {
	viper.SetConfigName("config")
	viper.AddConfigPath("./")
	err := viper.ReadInConfig()
	if err != nil {
		fmt.Println("Error reading in config, using defaults", err)
		FullClientSettings := defaultConfig()
		return FullClientSettings
	}

	var httpAddr string

	httpAddrIP := viper.GetString("serverConfig.ServerAddr")
	httpAddrPort := viper.GetString("serverConfig.ServerPort")
	seedRatioStop := viper.GetFloat64("serverConfig.SeedRatioStop")
	httpAddr = httpAddrIP + httpAddrPort
	pushBulletToken := viper.GetString("notifications.PushBulletToken")
	defaultMoveFolder := filepath.ToSlash(viper.GetString("serverConfig.DefaultMoveFolder")) //Converting the string literal into a filepath
	defaultMoveFolderAbs, err := filepath.Abs(defaultMoveFolder)
	if err != nil {
		fmt.Println("Failed creating absolute path for defaultMoveFolder", err)
	}

	dataDir := filepath.ToSlash(viper.GetString("torrentClientConfig.DownloadDir")) //Converting the string literal into a filepath
	dataDirAbs, err := filepath.Abs(dataDir)                                        //Converting to an absolute file path
	if err != nil {
		fmt.Println("Failed creating absolute path for dataDir", err)
	}

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
	logLevelString := viper.GetString("serverConfig.LogLevel")
	logOutput := viper.GetString("serverConfig.LogOutput")
	var logLevel logrus.Level
	switch logLevelString { //Options = Debug 5, Info 4, Warn 3, Error 2, Fatal 1, Panic 0
	case "Panic":
		logLevel = 0
	case "Fatal":
		logLevel = 1
	case "Error":
		logLevel = 2
	case "Warn":
		logLevel = 3
	case "Info":
		logLevel = 4
	case "Debug":
		logLevel = 5
	default:
		logLevel = 3

	}

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

	encryptionPolicy := torrent.EncryptionPolicy{
		DisableEncryption:  viper.GetBool("EncryptionPolicy.DisableEncryption"),
		ForceEncryption:    viper.GetBool("EncryptionPolicy.ForceEncryption"),
		PreferNoEncryption: viper.GetBool("EncryptionPolicy.PreferNoEncryption"),
	}

	tConfig := torrent.Config{
		DataDir:    dataDirAbs,
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

	Config := FullClientSettings{
		LoggingLevel:      logLevel,
		LoggingOutput:     logOutput,
		SeedRatioStop:     seedRatioStop,
		HTTPAddr:          httpAddr,
		TorrentConfig:     tConfig,
		TFileUploadFolder: "uploadedTorrents",
		PushBulletToken:   pushBulletToken,
		DefaultMoveFolder: defaultMoveFolderAbs,
	}

	return Config

}
