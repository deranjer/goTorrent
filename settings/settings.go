package settings

import (
	"crypto/sha256"
	"fmt"
	"path/filepath"
	"strconv"
	"strings"

	"golang.org/x/time/rate"

	"github.com/anacrolix/dht"
	"github.com/anacrolix/torrent"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

//Logger is the injected variable for global logger
var Logger *logrus.Logger

type ClientConnectSettings struct {
	HTTPAddr            string
	HTTPAddrIP          string
	UseProxy            bool
	WebsocketClientPort string
	BaseURL             string
	ClientUsername      string
	ClientPassword      string
	PushBulletToken     string `json:"-"`
}

//FullClientSettings contains all of the settings for our entire application
type FullClientSettings struct {
	ID                 int `storm:"id,unique"`
	LoggingLevel       logrus.Level
	LoggingOutput      string
	Version            int
	TorrentConfig      torrent.ClientConfig `json:"-"`
	TFileUploadFolder  string
	SeedRatioStop      float64
	DefaultMoveFolder  string
	TorrentWatchFolder string
	ClientConnectSettings
	MaxActiveTorrents int
}

//default is called if there is a parsing error
func defaultConfig() FullClientSettings {
	var Config FullClientSettings
	Config.ID = 4 //Unique ID for StormDB
	Config.Version = 1.0
	Config.LoggingLevel = 3                    //Warn level
	Config.TorrentConfig.DataDir = "downloads" //the absolute or relative path of the default download directory for torrents
	Config.TFileUploadFolder = "uploadedTorrents"
	Config.TorrentConfig.Seed = true
	Config.HTTPAddr = ":8000"
	Config.SeedRatioStop = 1.50

	//Config.TorrentConfig.DhtStartingNodes = dht.StartingNodesGetter{
	//	StartingNodes: dht.GlobalBootstrapAddrs,
	//}

	return Config
}

func dhtServerSettings(dhtConfig dht.ServerConfig) dht.ServerConfig {
	viper.UnmarshalKey("DHTConfig", &dhtConfig)
	Logger.WithFields(logrus.Fields{"dhtConfig": dhtConfig}).Info("Displaying DHT Config")
	return dhtConfig
}

func calculateRateLimiters(uploadRate, downloadRate string) (*rate.Limiter, *rate.Limiter) { //TODO reorg
	var uploadRateLimiterSize int
	var downloadRateLimiterSize int
	var downloadRateLimiter *rate.Limiter
	var uploadRateLimiter *rate.Limiter

	switch uploadRate {
	case "Low":
		uploadRateLimiterSize = 50000
	case "Medium":
		uploadRateLimiterSize = 500000
	case "High":
		uploadRateLimiterSize = 1500000
	default:
		downloadRateLimiter = rate.NewLimiter(rate.Inf, 0)
		uploadRateLimiter = rate.NewLimiter(rate.Inf, 0)
		return downloadRateLimiter, uploadRateLimiter
	}

	switch downloadRate {
	case "Low":
		downloadRateLimiterSize = 50000
	case "Medium":
		downloadRateLimiterSize = 500000
		fmt.Println("Medium Rate Limit...")
	case "High":
		downloadRateLimiterSize = 1500000
	default:
		downloadRateLimiter = rate.NewLimiter(rate.Inf, 0)
		uploadRateLimiter = rate.NewLimiter(rate.Inf, 0)
		return downloadRateLimiter, uploadRateLimiter
	}
	uploadRateLimiter = rate.NewLimiter(rate.Limit(uploadRateLimiterSize), uploadRateLimiterSize)
	downloadRateLimiter = rate.NewLimiter(rate.Limit(downloadRateLimiterSize), downloadRateLimiterSize)
	return downloadRateLimiter, uploadRateLimiter
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
	var baseURL string
	var websocketClientPort string
	var logLevel logrus.Level
	//logging
	logLevelString := viper.GetString("serverConfig.LogLevel")
	logOutput := viper.GetString("serverConfig.LogOutput")
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
	//HTTP, proxy
	httpAddrIP := viper.GetString("serverConfig.ServerAddr")
	httpAddrPort := viper.GetString("serverConfig.ServerPort")
	httpAddr = httpAddrIP + httpAddrPort
	proxySet := viper.GetBool("reverseProxy.ProxyEnabled")
	websocketClientPort = strings.TrimLeft(viper.GetString("serverConfig.ServerPort"), ":") //Trimming off the colon in front of the port
	if proxySet {
		baseURL = viper.GetString("reverseProxy.BaseURL")
		fmt.Println("WebsocketClientPort", viper.GetString("serverConfig.ServerPort"))
	}
	//Client Authentication
	clientAuthEnabled := viper.GetBool("goTorrentWebUI.WebUIAuth")
	var webUIUser string
	var webUIPasswordHash string
	if clientAuthEnabled {
		webUIUser = viper.GetString("goTorrentWebUI.WebUIUser")
		webUIPassword := viper.GetString("goTorrentWebUI.WebUIPassword")
		hash256 := sha256.New()
		hash256.Write([]byte(webUIPassword))                    //Hashing the password
		webUIPasswordHash = fmt.Sprintf("%x", hash256.Sum(nil)) //Printing the password out as a string
	}
	//General Settings
	seedRatioStop := viper.GetFloat64("serverConfig.SeedRatioStop")
	defaultMoveFolder := filepath.ToSlash(viper.GetString("serverConfig.DefaultMoveFolder")) //Converting the string literal into a filepath
	defaultMoveFolderAbs, err := filepath.Abs(defaultMoveFolder)
	if err != nil {
		fmt.Println("Failed creating absolute path for defaultMoveFolder", err)
	}
	torrentWatchFolder := filepath.ToSlash(viper.GetString("serverConfig.TorrentWatchFolder"))
	torrentWatchFolderAbs, err := filepath.Abs(torrentWatchFolder)
	if err != nil {
		fmt.Println("Failed creating absolute path for torrentWatchFolderAbs", err)
	}
	//Notifications
	pushBulletToken := viper.GetString("notifications.PushBulletToken")

	//Rate Limiters
	//var uploadRateLimiter *rate.Limiter
	//var downloadRateLimiter *rate.Limiter
	uploadRate := viper.GetString("serverConfig.UploadRateLimit")
	downloadRate := viper.GetString("serverConfig.DownloadRateLimit")
	downloadRateLimiter, uploadRateLimiter := calculateRateLimiters(uploadRate, downloadRate)
	//Internals
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
	maxActiveTorrents := viper.GetInt("serverConfig.MaxActiveTorrents")

	peerID := viper.GetString("torrentClientConfig.PeerID")
	disableUTP := viper.GetBool("torrentClientConfig.DisableUTP")
	disableTCP := viper.GetBool("torrentClientConfig.DisableTCP")
	disableIPv6 := viper.GetBool("torrentClientConfig.DisableIPv6")
	debug := viper.GetBool("torrentClientConfig.Debug")

	//dhtServerConfig := dht.StartingNodesGetter()

	//if viper.IsSet("DHTConfig") {
	//	fmt.Println("Reading in custom DHT config")
	//	dhtServerConfig = dhtServerSettings(dhtServerConfig)
	//}
	httpAddrPortInt64, err := strconv.ParseInt(httpAddrPort, 10, 0)
	if err != nil {
		fmt.Println("Failed creating 64-bit integer for goTorrent Port!", err)
	}
	httpAddrPortInt := int(httpAddrPortInt64) //converting to integer

	encryptionPolicy := torrent.EncryptionPolicy{
		DisableEncryption:  viper.GetBool("EncryptionPolicy.DisableEncryption"),
		ForceEncryption:    viper.GetBool("EncryptionPolicy.ForceEncryption"),
		PreferNoEncryption: viper.GetBool("EncryptionPolicy.PreferNoEncryption"),
	}

	tConfig := torrent.NewDefaultClientConfig()

	tConfig.DataDir = dataDirAbs
	tConfig.ListenPort = httpAddrPortInt
	tConfig.DisablePEX = disablePex
	tConfig.NoDHT = noDHT
	tConfig.NoUpload = noUpload
	tConfig.Seed = seed
	tConfig.UploadRateLimiter = uploadRateLimiter
	tConfig.DownloadRateLimiter = downloadRateLimiter
	tConfig.PeerID = peerID
	tConfig.DisableUTP = disableUTP
	tConfig.DisableTCP = disableTCP
	tConfig.DisableIPv6 = disableIPv6
	tConfig.Debug = debug
	tConfig.EncryptionPolicy = encryptionPolicy
	if listenAddr != "" {
		tConfig.SetListenAddr(listenAddr) //Setting the IP address to listen on
	}

	Config := FullClientSettings{
		LoggingLevel:  logLevel,
		LoggingOutput: logOutput,
		SeedRatioStop: seedRatioStop,
		ClientConnectSettings: ClientConnectSettings{
			HTTPAddr:            httpAddr,
			HTTPAddrIP:          httpAddrIP,
			UseProxy:            proxySet,
			WebsocketClientPort: websocketClientPort,
			ClientUsername:      webUIUser,
			ClientPassword:      webUIPasswordHash,
			BaseURL:             baseURL,
			PushBulletToken:     pushBulletToken,
		},
		TFileUploadFolder:  "uploadedTorrents",
		TorrentConfig:      *tConfig,
		DefaultMoveFolder:  defaultMoveFolderAbs,
		TorrentWatchFolder: torrentWatchFolderAbs,
		MaxActiveTorrents:  maxActiveTorrents,
	}

	return Config

}
