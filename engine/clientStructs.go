package engine

import (
	"time"

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/metainfo"
)

//All the message types are first, first the server handling messages from the client

//Message contains the JSON messages from the client, we first unmarshal to get the messagetype, then pass it on to each module
type Message struct {
	MessageType string
	Payload     interface{}
}

//Next are the messages the server sends to the client

//ServerPushMessage is information (usually logs and status messages) that the server pushes to the client
type ServerPushMessage struct {
	MessageType  string
	MessageLevel string //can be "success", "error", "warn", "info"
	Payload      string //the actual message
}

//RSSJSONList is a slice of gofeed.Feeds sent to the client
type RSSJSONList struct {
	MessageType   string
	TotalRSSFeeds int
	RSSFeeds      []RSSFeedsNames //strings of the full rss feed
}

//RSSFeedsNames stores all of the feeds by name and with URL
type RSSFeedsNames struct {
	RSSName    string
	RSSFeedURL string
}

//TorrentList struct contains the torrent list that is sent to the client
type TorrentList struct { //helps create the JSON structure that react expects to receive
	MessageType    string     `json:"MessageType"`
	Totaltorrents  int        `json:"total"`
	ClientDBstruct []ClientDB `json:"data"`
}

//TorrentFileList supplies a list of files attached to a single torrent along with some additional information
type TorrentFileList struct {
	MessageType string
	TotalFiles  int           `json:"TotalFiles"`
	FileList    []TorrentFile `json:"FileList"`
}

//PeerFileList returns a slice of peers
type PeerFileList struct {
	MessageType string
	TotalPeers  int
	PeerList    []torrent.Peer
}

//TorrentFile describes a single file that a torrent client is downloading for a single torrent
type TorrentFile struct {
	TorrentHashString string //Used to tie the file to a torrent //TODO not sure if needed
	FileName          string //The name of the file
	FilePath          string //The relative filepath to the file
	FileSize          string //Humanized file size display
	FilePercent       string //String value of percent of individual file percent done
	FilePriority      string //Currently "High", "Normal", or "Cancel"
}

//ClientDB struct contains the struct that is used to compose the torrentlist
type ClientDB struct { //TODO maybe separate out the internal bits into another client struct
	TorrentHashString  string         //Passed to client for displaying hash and is used to uniquely identify all torrents
	TorrentName        string         //String of the name of the torrent
	DownloadedSize     string         //how much the client has downloaded total
	Size               string         //total size of the torrent
	DownloadSpeed      string         //the dl speed of the torrent
	Status             string         //Passed to client for display
	PercentDone        string         //Passed to client to show percent done
	ActivePeers        string         //passed to client
	UploadSpeed        string         //passed to client to show Uploadspeed
	StoragePath        string         //Passed to client (and stored in stormdb)
	DateAdded          string         //Passed to client (and stored in stormdb)
	ETA                string         //Passed to client
	TorrentLabel       string         //Passed to client and stored in stormdb
	SourceType         string         //Stores whether the torrent came from a torrent file or a magnet link
	KnownSwarm         []torrent.Peer //Passed to client for Peer Tab
	UploadRatio        string         //Passed to client, stores the string for uploadratio stored in stormdb
	TotalUploadedSize  string         //Humanized version of TotalUploadedBytes to pass to the client
	TotalUploadedBytes int64          `json:"-"` //includes bytes that happened before reboot (from stormdb)
	downloadSpeedInt   int64          //Internal used for calculating dl speed
	BytesCompleted     int64          `json:"-"` //Internal used for calculating the dl speed
	DataBytesWritten   int64          `json:"-"` //Internal used for calculating dl speed
	DataBytesRead      int64          `json:"-"` //Internal used for calculating dl speed
	UpdatedAt          time.Time      `json:"-"` //Internal used for calculating speeds of upload and download
	TorrentHash        metainfo.Hash  `json:"-"` //Used to create string for TorrentHashString... not sure why I have it... make that a TODO I guess
	NumberofFiles      int            //Number of files in the torrent
	NumberofPieces     int            //Total number of pieces in the torrent (Not currently used)
	MaxConnections     int            //Used to stop the torrent by limiting the max allowed connections
}
