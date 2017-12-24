import React from 'react';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import * as actionTypes from '../store/actions';

import ReactTooltip from 'react-tooltip'

import BackendIcon from 'material-ui-icons/InfoOutline';



var title = document.title; //Set the number of active torrents in the title
let torrents= []; 


var torrentListRequest = {
    messageType: "torrentListRequest"
}


//websocket is started in kickwebsocket.js and is picked up here so "ws" is already defined 22
ws.onmessage = function (evt) { //When we recieve a message from the websocket
    var serverMessage = JSON.parse(evt.data)
    if (serverMessage.MessageType == "torrentList"){
        console.log("Recieved Client Update...")
        //var serverMessage = JSON.parse(evt.data);
        
        torrents = []; //clearing out the torrent array to make room for new (so that it does keep adding)
        for(var i = 0; i < serverMessage.total; i++){
            torrents.push({
                TorrentHashString: serverMessage.data[i].TorrentHash,
                TorrentName: serverMessage.data[i].TorrentName,
                DownloadedSize: serverMessage.data[i].DownloadedSize,
                Size: serverMessage.data[i].Size,
                DownloadSpeed: serverMessage.data[i].DownloadSpeed,
                UploadSpeed: serverMessage.data[i].UploadSpeed,
                PercentDone: serverMessage.data[i].PercentDone,
                StoragePath: serverMessage.data[i].StoragePath,
                DateAdded: serverMessage.data[i].DateAdded,
                Status: serverMessage.data[i].Status,
                BytesCompleted: serverMessage.data[i].BytesCompleted,
                ActivePeers: serverMessage.data[i].ActivePeers,
                ETA: serverMessage.data[i].ETA,
            })    
        } 
        var newTitle = '(' + serverMessage.total + ')' + title; //updating the title
        document.title = newTitle;
            
    } else if (serverMessage.MessageType == "fileList"){
        console.log("Recieved FileListUpdate", serverMessage.fileList)
        fileList = [];
        for (var i = 0; i < serverMessage.total; i++){
            fileList.push({
                FileList: serverMessage.fileList[i]


            })
        }



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
    
    
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          2000
        );    
 
    } 

    componentWillUnmount() {
        clearInterval(this.timerID);
    } 

    tick() {
        ws.send(JSON.stringify(torrentListRequest))//talking to the server to get the torrent list
        this.props.newTorrentList(torrents)      
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
    };
  }




const mapDispatchToProps = dispatch => {
    return {
        newTorrentList: (torrentList) => dispatch({type: actionTypes.TORRENT_LIST, torrentList }),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BackendSocket);