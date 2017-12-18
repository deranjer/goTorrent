import React from 'react';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import * as actionTypes from '../store/actions';

import ReactTooltip from 'react-tooltip'

import BackendIcon from 'material-ui-icons/InfoOutline';



var title = document.title; //Set the number of active torrents in the title
let torrents= []; 





//websocket is started in kickwebsocket.js and is picked up here so "ws" is already defined
ws.onmessage = function (evt) { //When we recieve a message from the websocket
    if(evt.data == "clientUpdate") {
        console.log("Client Update Incoming...")
    } else {  // recieving data
        console.log("Recieved Client Update...")
        var clientUpdate = JSON.parse(evt.data);
        if (clientUpdate.total) { // if it has a total field it is a torrentlist update
            torrents = []; //clearing out the torrent array to make room for new (so that it does keep adding)
            for(var i = 0; i < clientUpdate.total; i++){
                torrents.push({
                    TorrentHashString: clientUpdate.data[i].TorrentHash,
                    TorrentName: clientUpdate.data[i].TorrentName,
                    DownloadedSize: clientUpdate.data[i].DownloadedSize,
                    Size: clientUpdate.data[i].Size,
                    DownloadSpeed: clientUpdate.data[i].DownloadSpeed,
                    UploadSpeed: clientUpdate.data[i].UploadSpeed,
                    PercentDone: clientUpdate.data[i].PercentDone,
                    StoragePath: clientUpdate.data[i].StoragePath,
                    DateAdded: clientUpdate.data[i].DateAdded,
                    Status: clientUpdate.data[i].Status,
                    BytesCompleted: clientUpdate.data[i].BytesCompleted,
                    ActivePeers: clientUpdate.data[i].ActivePeers,
                    ETA: clientUpdate.data[i].ETA,
                })    
            } 
            var newTitle = '(' + clientUpdate.total + ')' + title; //updating the title
            document.title = newTitle;
        } else if (clientUpdate) {
            
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
        ws.send("clientUpdateRequest")//talking to the server to get the torrent list
        this.props.newTorrentList(torrents)
        
        //console.log("STATE:", this.state.torrentList)
        //console.log("Torrents", torrents);
        
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