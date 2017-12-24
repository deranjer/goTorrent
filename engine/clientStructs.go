package engine

import (
	"encoding/json"
	"time"

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/metainfo"
)

//All the message types are first, first the server handling messages from the client

//Message contains the JSON messages from the client, we first unmarshal to get the messagetype, then each module unmarshalls the actual message once we know the type
type Message struct {
	MessageType string
	Payload     json.RawMessage
}

//GenericPayload is for any request to the server that only requires the TorrentHashString for matching (which is a lot of requests)
type GenericPayload struct {
	TorrentHashString string
}

//MagnetMessage contains the magnet link entered by the user under ADD MAGNET link on the top toolbar
type MagnetMessage struct {
	MagnetLink string `json:MagnetLink`
}

//TorrentCommandMessage contains a slice of strings that has the list of torrents to be acted on.
type TorrentCommandMessage struct {
	TorrentHashStrings []string
}

//Next are the messages the server sends to the client

//TorrentList struct contains the torrent list that is sent to the client
type TorrentList struct { //helps create the JSON structure that react expects to recieve
	MessageType    string     `json:"MessageType"`
	Totaltorrents  int        `json:"total"`
	ClientDBstruct []ClientDB `json:"data"`
}

//TorrentFileList supplies a list of files attached to a single torrent along with some additional information
type TorrentFileList struct {
	MessageType string
	TotalFiles  int            `json:"total"`
	FileList    []torrent.File `json:"fileList"`
}

//PeerFileList returns a slice of peers
type PeerFileList struct {
	MessageType string
	TotalPeers  int
	PeerList    []torrent.Peer
}

//ClientDB struct contains the struct that is used to compose the torrentlist
type ClientDB struct {
	TorrentName      string `json:"TorrentName"`
	DownloadedSize   string `json:"DownloadedSize"`
	Size             string `json:"Size"`
	DownloadSpeed    string `json:"DownloadSpeed"`
	downloadSpeedInt int64
	UploadSpeed      string `json:"UploadSpeed"`
	//UploadSpeedInt    int64
	DataBytesWritten  int64
	DataBytesRead     int64
	ActivePeers       string `json:"ActivePeers"`
	TorrentHashString string `json:"TorrentHashString"`
	PercentDone       string `json:"PercentDone"`
	TorrentHash       metainfo.Hash
	StoragePath       string `json:"StorageLocation"`
	DateAdded         string
	KnownSwarm        []torrent.Peer
	Status            string `json:"Status"`
	BytesCompleted    int64
	UpdatedAt         time.Time
	AddedAt           string
	ETA               string `json:"ETA"`
	Label             string
	SourceLocation    string
}
