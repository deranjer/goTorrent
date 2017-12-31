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

var torrentListRequest = {
    messageType: "torrentListRequest"
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
                })    
            } 
            var newTitle = '(' + serverMessage.total + ')' + title; //updating the title
            document.title = newTitle;
            break;
        
        case "torrentPeerList":
            console.log("Full EVENT", evt.data)
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
            console.log("Peerlist", peerList)
            break    

        case "torrentFileList":
            console.log("Recieved FileListUpdate", evt.data)
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
    }
                                    
}



ws.onclose = function() {
    console.log('Closing connection')
};

var divStyle = {
    display: 'inline-block',
    paddingTop: '10px',
    paddingLeft: '10px',
}

var buttonStyle ={
    fontSize: '60px',
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
                    Payload: selectionHashes,    
                }
                console.log("Peers tab information requested", peerListHashes)
                ws.send(JSON.stringify(peerListHashes))
                break;
            case 2:
                let fileListHashes = {
                    MessageType: "torrentFileListRequest",
                    Payload: selectionHashes,
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
 
    } 

    componentWillUnmount() {
        clearInterval(this.timerID);
    } 

    tick() { // this tick is the main tick that updates ALL of the components that update on tick... which is a lot
        ws.send(JSON.stringify(torrentListRequest))//talking to the server to get the torrent list
        console.log("Torrentlist", torrents)
        this.props.newTorrentList(torrents) //sending the list of torrents to torrentlist.js 
        if (this.props.selectionHashes.length === 1){
            switch(this.props.selectedTab){
                case 1:
                    let peerListHashes = {
                        MessageType: "torrentPeerListRequest",
                        Payload: this.props.selectionHashes,    
                    }
                    ws.send(JSON.stringify(peerListHashes))
                    this.props.newPeerList(peerList)
                    break;
                case 2:
                    let fileListHashes = {
                        MessageType: "torrentFileListRequest",
                        Payload: this.props.selectionHashes,
                    }
                    console.log("Files tab information requested", fileList)
                    ws.send(JSON.stringify(fileListHashes))
                    this.props.newFileList(fileList)
                    break;

            }

        }     
    }


    componentWillReceiveProps (nextProps) {
        console.log("Lenght", nextProps.selectionHashes.length, "value", nextProps.selectionHashes)
        if (nextProps.selectionHashes.length === 1){ //if we have a selection pass it on for the tabs to verify
            this.selectionHandler(nextProps.selectionHashes, nextProps.selectedTab)
        }
        
    }


    render() {
        return (
            <div style={divStyle}>
                <BackendIcon styles={buttonStyle} color="primary" data-tip="BackendStatus: Green=Good" aria-label="Settings" />
            </div>



        );

    }

}

const mapStateToProps = state => {
    return {
        selectionHashes: state.selectionHashes,
        selectedTab: state.selectedTab,
    };
  }




const mapDispatchToProps = dispatch => {
    return {
        newTorrentList: (torrentList) => dispatch({type: actionTypes.TORRENT_LIST, torrentList }),
        newPeerList: (peerList) => dispatch({type: actionTypes.PEER_LIST, peerList}),
        newFileList: (fileList) => dispatch({type: actionTypes.FILE_LIST, fileList}),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BackendSocket);