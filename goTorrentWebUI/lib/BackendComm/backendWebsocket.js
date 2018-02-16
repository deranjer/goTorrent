'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _InfoOutline = require('material-ui-icons/InfoOutline');

var _InfoOutline2 = _interopRequireDefault(_InfoOutline);

var _reactRedux = require('react-redux');

var _actions = require('../store/actions');

var actionTypes = _interopRequireWildcard(_actions);

var _Select = require('material-ui/Select/Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var title = document.title; //Set the number of active torrents in the title
var torrents = [];
var peerList = [];
var fileList = [];
var RSSList = [];
var RSSTorrentList = [];

var torrentListRequest = {
    MessageType: "torrentListRequest"

    //websocket is started in kickwebsocket.js and is picked up here so "ws" is already defined 22
};ws.onmessage = function (evt) {
    //When we recieve a message from the websocket
    var serverMessage = JSON.parse(evt.data);
    //console.log("message", serverMessage.MessageType)
    switch (serverMessage.MessageType) {

        case "torrentList":
            //console.log("Recieved Client Update...", serverMessage)
            //var serverMessage = JSON.parse(evt.data);

            torrents = []; //clearing out the torrent array to make room for new (so that it does keep adding)
            for (var i = 0; i < serverMessage.total; i++) {
                var _torrents$push;

                torrents.push((_torrents$push = {
                    TorrentHashString: serverMessage.data[i].TorrentHashString,
                    TorrentName: serverMessage.data[i].TorrentName,
                    DownloadedSize: serverMessage.data[i].DownloadedSize,
                    Size: serverMessage.data[i].Size,
                    DownloadSpeed: serverMessage.data[i].DownloadSpeed,
                    UploadSpeed: serverMessage.data[i].UploadSpeed,
                    PercentDone: serverMessage.data[i].PercentDone,
                    StoragePath: serverMessage.data[i].StoragePath,
                    DateAdded: serverMessage.data[i].DateAdded,
                    SourceType: serverMessage.data[i].SourceType,
                    Status: serverMessage.data[i].Status,
                    BytesCompleted: serverMessage.data[i].BytesCompleted,
                    ActivePeers: serverMessage.data[i].ActivePeers,
                    ETA: serverMessage.data[i].ETA,
                    TotalUploadedSize: serverMessage.data[i].TotalUploadedSize,
                    Ratio: serverMessage.data[i].UploadRatio
                }, _defineProperty(_torrents$push, 'DateAdded', serverMessage.data[i].DateAdded), _defineProperty(_torrents$push, 'FileNumber', serverMessage.data[i].NumberofFiles), _defineProperty(_torrents$push, 'PieceNumber', serverMessage.data[i].NumberofPieces), _defineProperty(_torrents$push, 'MaxConnections', serverMessage.data[i].MaxConnections), _torrents$push));
            }
            var newTitle = '(' + serverMessage.total + ')' + title; //updating the title
            document.title = newTitle;
            break;

        case "torrentPeerList":
            peerList = []; //clearing out the peerlist array to make room for new (so that it does keep adding)

            for (var i = 0; i < serverMessage.TotalPeers; i++) {
                peerList.push({
                    PeerID: serverMessage.PeerList[i].Id.toString(),
                    IP: serverMessage.PeerList[i].IP,
                    Port: serverMessage.PeerList[i].Port,
                    Source: serverMessage.PeerList[i].Source,
                    SupportsEncryption: serverMessage.PeerList[i].SupportsEncryption.toString()
                });
            }
            break;

        case "torrentFileList":
            fileList = [];
            for (var i = 0; i < serverMessage.TotalFiles; i++) {
                fileList.push({
                    FileName: serverMessage.FileList[i].FileName,
                    FilePath: serverMessage.FileList[i].FilePath,
                    FileSize: serverMessage.FileList[i].FileSize,
                    FilePercent: serverMessage.FileList[i].FilePercent,
                    FilePriority: serverMessage.FileList[i].FilePriority
                });
            }
            console.log("filelist", fileList);
            break;

        case "speedTab":
            console.log("Speedtab data requested");
            break;

        case "loggerData":
            console.log("Logger data requested");
            break;

        case "rssList":
            console.log("RSSListRequest recieved", evt.data);
            RSSList = [];
            for (var i = 0; i < serverMessage.TotalRSSFeeds; i++) {
                RSSList.push({
                    RSSURL: serverMessage.RSSFeeds[i].RSSFeedURL,
                    RSSName: serverMessage.RSSFeeds[i].RSSName
                });
            }
            console.log("RSSURLS", RSSList);
            console.log("FIRSTURL", RSSList[1]);
            console.log("FULLURL", RSSList[1].RSSURL);
            break;

        case "rssTorrentList":
            //console.log("RSSTorrentList recieved", evt.data)
            RSSTorrentList = [];
            for (var i = 0; i < serverMessage.TotalTorrents; i++) {
                RSSTorrentList.push({
                    TorrentName: serverMessage.Torrents[i].Title,
                    TorrentLink: serverMessage.Torrents[i].Link,
                    PublishDate: serverMessage.Torrents[i].PubDate
                });
            }
    }
};

ws.onclose = function () {
    console.log('Closing connection');
};

var divStyle = {
    display: 'inline-block',
    paddingTop: '10px',
    paddingLeft: '10px'
};

var buttonStyle = {
    fontSize: '60px'
};

var BackendSocket = function (_React$Component) {
    _inherits(BackendSocket, _React$Component);

    function BackendSocket() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BackendSocket);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BackendSocket.__proto__ || Object.getPrototypeOf(BackendSocket)).call.apply(_ref, [this].concat(args))), _this), _this.selectionHandler = function (selectionHashes, selectedTab) {
            switch (selectedTab) {
                case 0:
                    console.log("general tab information requested");
                    break;
                case 1:
                    var peerListHashes = {
                        MessageType: "torrentPeerListRequest",
                        Payload: {"PeerListHash": selectionHashes}
                    };
                    console.log("Peers tab information requested", peerListHashes);
                    ws.send(JSON.stringify(peerListHashes));
                    break;
                case 2:
                    var fileListHashes = {
                        MessageType: "torrentFileListRequest",
                        Payload: {"FileListHash": selectionHashes[0]}
                    };
                    console.log("Files tab information requested", fileListHashes);
                    ws.send(JSON.stringify(fileListHashes));
                    break;
                case 3:
                    console.log("Speed tab information requested");
                    break;
                case 4:
                    console.log("Logger tab information requested");
                    break;
                default:
                    console.log("default tab");
                    break;
            }
        }, _this.testSelectionLength = function (selection) {
            if (nextProps.selectionHashes.length > 1) {
                return true;
            }
            return false;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BackendSocket, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.timerID = setInterval(function () {
                return _this2.tick();
            }, 2000);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(this.timerID);
        }
    }, {
        key: 'tick',
        value: function tick() {
            // this tick is the main tick that updates ALL of the components that update on tick... which is a lot 
            if (this.props.RSSList != RSSList & this.props.RSSModalOpen == true) {
                this.props.newRSSFeedStore(RSSList); //pushing the new RSSList to Redux
            }
            if (this.props.RSSTorrentList != RSSTorrentList & this.props.RSSModalOpen == true) {
                this.props.RSSTorrentList(RSSTorrentList); //pushing the new RSSTorrentList to Redux
            }

            ws.send(JSON.stringify(torrentListRequest)); //talking to the server to get the torrent list
            //console.log("Torrentlist", torrents)
            this.props.setButtonState(this.props.selection); //forcing an update to the buttons
            this.props.newTorrentList(torrents); //sending the list of torrents to torrentlist.js 
            if (this.props.selectionHashes.length === 1) {
                switch (this.props.selectedTab) {
                    case 1:
                        var peerListHashes = {
                            MessageType: "torrentPeerListRequest",
                            Payload: {"PeerListHash": this.props.selectionHashes}
                        };
                        ws.send(JSON.stringify(peerListHashes));
                        this.props.newPeerList(peerList);
                        break;
                    case 2:
                        var fileListHashes = {
                            MessageType: "torrentFileListRequest",
                            Payload: {"FileListHash": this.props.selectionHashes[0]}
                        };
                        ws.send(JSON.stringify(fileListHashes));
                        this.props.newFileList(fileList);
                        break;

                }
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            console.log("Lenght", nextProps.selectionHashes.length, "value", nextProps.selectionHashes);
            if (nextProps.selectionHashes.length === 1) {
                //if we have a selection pass it on for the tabs to verify
                this.selectionHandler(nextProps.selectionHashes, nextProps.selectedTab);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: divStyle },
                _react2.default.createElement(_InfoOutline2.default, { styles: buttonStyle, color: 'primary', 'data-tip': 'BackendStatus: Green=Good', 'aria-label': 'Settings' })
            );
        }
    }]);

    return BackendSocket;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        selectionHashes: state.selectionHashes,
        selectedTab: state.selectedTab,
        selection: state.selection,
        RSSModalOpen: state.RSSModalOpen,
        RSSTorrentList: state.RSSTorrentList
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        newTorrentList: function newTorrentList(torrentList) {
            return dispatch({ type: actionTypes.TORRENT_LIST, torrentList: torrentList });
        },
        newPeerList: function newPeerList(peerList) {
            return dispatch({ type: actionTypes.PEER_LIST, peerList: peerList });
        },
        newFileList: function newFileList(fileList) {
            return dispatch({ type: actionTypes.FILE_LIST, fileList: fileList });
        },
        setButtonState: function setButtonState(buttonState) {
            return dispatch({ type: actionTypes.SET_BUTTON_STATE, buttonState: buttonState });
        },
        newRSSFeedStore: function newRSSFeedStore(RSSList) {
            return dispatch({ type: actionTypes.NEW_RSS_FEED_STORE, RSSList: RSSList });
        },
        RSSTorrentList: function RSSTorrentList(_RSSTorrentList) {
            return dispatch({ type: actionTypes.RSS_TORRENT_LIST, RSSTorrentList: _RSSTorrentList });
        }
        //changeSelection: (selection) => dispatch({type: actionTypes.CHANGE_SELECTION, selection}),//forcing an update to the buttons

    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BackendSocket);