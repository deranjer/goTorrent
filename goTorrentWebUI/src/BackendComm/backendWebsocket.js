import React from 'react';
import ReactDOM from 'react-dom';

import ReactTooltip from 'react-tooltip'
import BackendIcon from 'material-ui-icons/InfoOutline';

import {connect} from 'react-redux';
import * as actionTypes from '../store/actions';
import Select from 'material-ui/Select/Select';




var title = document.title; //Set the number of active torrents in the title
let torrents= []; 
let peerList = [];
let fileList = [];
let RSSList = [];
let RSSTorrentList = [];
let serverMessage = [];
let serverPushMessage = [];
let webSocketState = false;

var torrentListRequest = {
    MessageType: "torrentListRequest"
}




//websocket is started in kickwebsocket.js and is picked up here so "ws" is already defined 22
ws.onmessage = function (evt) { //When we recieve a message from the websocket
    var serverMessage = JSON.parse(evt.data)
    console.log("message", serverMessage.MessageType)
    switch (serverMessage.MessageType) {

        case "torrentList":
            //console.log("Recieved Client Update...", serverMessage)
            //var serverMessage = JSON.parse(evt.data);
            
            torrents = []; //clearing out the torrent array to make room for new (so that it does keep adding)
            for(var i = 0; i < serverMessage.total; i++){
                torrents.push({
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
                    Ratio: serverMessage.data[i].UploadRatio,
                    DateAdded: serverMessage.data[i].DateAdded,
                    FileNumber: serverMessage.data[i].NumberofFiles,
                    PieceNumber: serverMessage.data[i].NumberofPieces,
                    MaxConnections: serverMessage.data[i].MaxConnections,
                    TorrentLabel: serverMessage.data[i].TorrentLabel,
                })    
            } 
            var newTitle = '(' + serverMessage.total + ')' + title; //updating the title
            document.title = newTitle;
            break;
        
        case "torrentPeerList":
            peerList = []; //clearing out the peerlist array to make room for new (so that it does keep adding)
            
            for(var i = 0; i < serverMessage.TotalPeers; i++){
                peerList.push({
                    PeerID: serverMessage.PeerList[i].Id.toString(),
                    IP: serverMessage.PeerList[i].IP,
                    Port: serverMessage.PeerList[i].Port,
                    Source: serverMessage.PeerList[i].Source,
                    SupportsEncryption: serverMessage.PeerList[i].SupportsEncryption.toString(),
                })
            }
            break    

        case "torrentFileList":
            fileList = [];
            for (var i = 0; i < serverMessage.TotalFiles; i++){
                fileList.push({
                    FileName: serverMessage.FileList[i].FileName,
                    FilePath: serverMessage.FileList[i].FilePath,
                    FileSize: serverMessage.FileList[i].FileSize,
                    FilePercent: serverMessage.FileList[i].FilePercent,
                    FilePriority: serverMessage.FileList[i].FilePriority,
                })
            }
            console.log("filelist", fileList)
            break

        case "speedTab":
            console.log("Speedtab data requested")
            break;

        case "loggerData":
            console.log("Logger data requested")
            break;
    
        case "rssList":
            console.log("RSSListRequest recieved", evt.data)
            RSSList = [];
            for (var i = 0; i < serverMessage.TotalRSSFeeds; i++){
                RSSList.push({
                    RSSURL: serverMessage.RSSFeeds[i].RSSFeedURL,
                    RSSName: serverMessage.RSSFeeds[i].RSSName,
                })
            }
            console.log("RSSURLS", RSSList)
            console.log("FIRSTURL", RSSList[1])
            console.log("FULLURL", RSSList[1].RSSURL)
            break;

        case "rssTorrentList":
            //console.log("RSSTorrentList recieved", evt.data)
            RSSTorrentList = [];
            for (var i = 0; i < serverMessage.TotalTorrents; i++){
                RSSTorrentList.push({
                    TorrentName: serverMessage.Torrents[i].Title,
                    TorrentLink: serverMessage.Torrents[i].Link,
                    PublishDate: serverMessage.Torrents[i].PubDate,
                })
            }
            break;
        case "serverPushMessage":
            console.log("SERVER PUSHED MESSAGE", serverMessage)
            serverPushMessage = [serverMessage.MessageLevel, serverMessage.Payload];
            break;
    }
                                    
}



ws.onclose = function() {
    console.log('Closing connection')
};


var buttonStyle ={
    fontSize: '60px',
    marginLeft: '20px',
}

const inlineStyle = {
    display: 'inline-block',
    backdrop: 'static',
}

class BackendSocket extends React.Component {
    selectionHandler = (selectionHashes, selectedTab) => {
        switch (selectedTab) {
            case 0:
                console.log("general tab information requested")
                break;
            case 1:
                let peerListHashes = {
                    MessageType: "torrentPeerListRequest",
                    Payload: {"PeerListHash": selectionHashes[0]}    
                }
                console.log("Peers tab information requested", peerListHashes)
                ws.send(JSON.stringify(peerListHashes))
                break;
            case 2:
                let fileListHashes = {
                    MessageType: "torrentFileListRequest",
                    Payload: {"FileListHash": selectionHashes[0]}
                }
                console.log("Files tab information requested", fileListHashes)
                ws.send(JSON.stringify(fileListHashes))
                break;
            case 3:
                console.log("Speed tab information requested")
                break;
            case 4:
                console.log("Logger tab information requested")
                break;
            default:
                console.log("default tab")
                break;
        }      
    }
    
    testSelectionLength = (selection) => {
        if (nextProps.selectionHashes.length > 1){
            return true;
        }
        return false;
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          2000
        ); 
        if (ws.readyState === (ws.CONNECTING || ws.OPEN)){ //checking to make sure we have a websocket connection
            webSocketState = true
            this.props.webSocketStateUpdate(webSocketState)
        }
        
    } 

    componentWillUnmount() {
        clearInterval(this.timerID);
    } 

    tick() { // this tick is the main tick that updates ALL of the components that update on tick... which is a lot 
        if (this.props.RSSList != RSSList & this.props.RSSModalOpen == true) {
            this.props.newRSSFeedStore(RSSList) //pushing the new RSSList to Redux
        }
        if (this.props.RSSTorrentList != RSSTorrentList & this.props.RSSModalOpen == true){
            this.props.RSSTorrentList(RSSTorrentList) //pushing the new RSSTorrentList to Redux
        }
        if (this.props.serverPushMessage != serverPushMessage & serverPushMessage[0] != null){
            console.log("PROPSSERVER", this.props.serverPushMessage, "SERVERPUSH", serverPushMessage)
            this.props.newServerMessage(serverPushMessage)
        }
        
        ws.send(JSON.stringify(torrentListRequest))//talking to the server to get the torrent list
        if (ws.readyState === ws.CLOSED){ //if our websocket gets closed inform the user
            webSocketState = false
            this.props.webSocketStateUpdate(webSocketState)
        }
        //console.log("Torrentlist", torrents)
        this.props.setButtonState(this.props.selection) //forcing an update to the buttons
        this.props.newTorrentList(torrents) //sending the list of torrents to torrentlist.js 
        if (this.props.selectionHashes.length === 1){
            switch(this.props.selectedTab){
                case 1:
                    let peerListHashes = {
                        MessageType: "torrentPeerListRequest",
                        Payload: {"PeerListHash": this.props.selectionHashes[0]}       
                    }
                    ws.send(JSON.stringify(peerListHashes))
                    this.props.newPeerList(peerList)
                    break;
                case 2:
                    let fileListHashes = {
                        MessageType: "torrentFileListRequest",
                        Payload: {"FileListHash": this.props.selectionHashes[0]}
                    }
                    ws.send(JSON.stringify(fileListHashes))
                    this.props.newFileList(fileList)
                    break;

            }

        }     
    }


    componentWillReceiveProps (nextProps) {
        console.log("Length", nextProps.selectionHashes.length, "value", nextProps.selectionHashes)
        if (nextProps.selectionHashes.length === 1){ //if we have a selection pass it on for the tabs to verify
            this.selectionHandler(nextProps.selectionHashes, nextProps.selectedTab)
        }
    }


    render() {
        return (
            <div style={inlineStyle}>
                <BackendIcon style={buttonStyle} color="primary" data-tip="BackendStatus: Green=Good" aria-label="Settings" />
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        selectionHashes: state.selectionHashes,
        selectedTab: state.selectedTab,
        selection: state.selection,
        RSSModalOpen: state.RSSModalOpen,
        RSSTorrentList: state.RSSTorrentList,
        serverPushMessage: state.serverPushMessage
    };
  }

const mapDispatchToProps = dispatch => {
    return {
        newTorrentList: (torrentList) => dispatch({type: actionTypes.TORRENT_LIST, torrentList }),
        newPeerList: (peerList) => dispatch({type: actionTypes.PEER_LIST, peerList}),
        newFileList: (fileList) => dispatch({type: actionTypes.FILE_LIST, fileList}),
        setButtonState: (buttonState) => dispatch({type: actionTypes.SET_BUTTON_STATE, buttonState}),
        newRSSFeedStore: (RSSList) => dispatch({type: actionTypes.NEW_RSS_FEED_STORE, RSSList}),
        RSSTorrentList: (RSSTorrentList) => dispatch({type: actionTypes.RSS_TORRENT_LIST, RSSTorrentList}),
        newServerMessage: (serverPushMessage) => dispatch({type: actionTypes.SERVER_MESSAGE, serverPushMessage}),
        webSocketStateUpdate: (webSocketState) => dispatch({type: actionTypes.WEBSOCKET_STATE, webSocketState}),
        //changeSelection: (selection) => dispatch({type: actionTypes.CHANGE_SELECTION, selection}),//forcing an update to the buttons

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackendSocket);