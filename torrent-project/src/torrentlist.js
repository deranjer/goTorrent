import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {
    SortingState, LocalSorting, PagingState, VirtualTableLayout, SelectionState, 
} from '@devexpress/dx-react-grid';

import {
    Grid, TableView, TableHeaderRow, PagingPanel, VirtualTableView, TableSelection, TableColumnResizing,
    DragDropContext, TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';

//react redux
import {connect} from 'react-redux';
import * as actionTypes from './store/actions';


/* var torrentLinkSubmit = document.getElementById('torrentLinkSubmit');
var magnetLink = document.getElementById('magnetLink');
var myTextArea = document.getElementById("loggerData");
var torrentHash = document.getElementById("hash");
initialize an empty torrents field before update.
 var torrentLinkSubmit = document.getElementById('torrentLinkSubmit');
var magnetLink = document.getElementById('magnetLink');
var myTextArea = document.getElementById("loggerData");
var torrentHash = document.getElementById("hash");
var torrentLinkSubmit = document.getElementById('torrentLinkSubmit');
var torrentLinkModal = document.getElementById('addTorrentLinkModal');
var btnTorrentLink = document.getElementById("addTorrentLink"); 
*/

var title = document.title; //Set the number of active torrents in the title
let torrents= []; 

//websocket is started in kickwebsocket.js and is picked up here so "ws" is already defined
ws.onmessage = function (evt) //When we recieve a message from the websocket
{
  if(evt.data == "clientUpdate") {
        console.log("Client Update Incoming...")
    } else {
            console.log("Recieved Client Update...")
            var clientUpdate = JSON.parse(evt.data);
            // myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + "Client Update Event...";
            //myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + clientUpdate.LocalTorrentInfo.DateAdded;
            // myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + evt.data;
            //myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + clientUpdate[0].TorrentHashString;

            // torrentHash.innerHTML = "Hash: " + clientUpdate.data[0].TorrentHashString;
            torrents = []; //clearing out the torrent array to make room for new (so that it does keep adding)
            for(var i = 0; i < clientUpdate.total; i++){
                //console.log("TorrentName: ", clientUpdate.data[i].TorrentName)
                torrents.push({
                    TorrentHashString: clientUpdate.data[i].TorrentHashString,
                    TorrentName: clientUpdate.data[i].TorrentName,
                    DownloadedSize: clientUpdate.data[i].DownloadedSize,
                    DownloadSpeed: clientUpdate.data[i].DownloadedSpeed,
                    UploadSpeed: clientUpdate.data[i].UploadSpeed,
                    PercentDone: clientUpdate.data[i].PercentDone,
                    StoragePath: clientUpdate.data[i].StoragePath,
                    DateAdded: clientUpdate.data[i].DateAdded,
                    Status: clientUpdate.data[i].Status,
                    BytesCompleted: clientUpdate.data[i].BytesCompleted,
                    ActivePeers: clientUpdate.data[i].ActivePeers,
                    TotalPeers: clientUpdate.data[i].TotalPeers,
                })
                
            }

            var newTitle = '(' + clientUpdate.total + ')' + title; //updating the title
            document.title = newTitle;
        }
    }
ws.onclose = function()
{
    //var myTextArea = document.getElementById("loggerData");
    //myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + "Connection closed";
    console.log('Closing connection')
};

function sendEvent(message)
{
    ws.send(message);
    console.log('Sending message... ', message)
}


class TorrentListTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            torrentList: torrents, 
            columns: [
                { name: 'TorrentName', title: 'Torrent Name' },
                { name: 'DownloadedSize', title: 'Dl Size'},
                { name: 'Size', title: 'Size'},
                { name: 'Done', title: 'Percent Done'},
                { name: 'Status', title: 'Status'},
                { name: 'DownloadSpeed', title: 'Download Speed'},
                { name: 'UploadSpeed', title: 'Upload Speed'},
                { name: 'ActivePeers', title: 'Active Peers' },
                { name: 'TotalPeers', title: 'Total Peers' },
                { name: 'ETA', title: 'ETA'},
                { name: 'Ratio', title: 'Ratio'},
                { name: 'Availability', title: 'Availability'},
                { name: 'TorrentHashString', title: 'Torrent Hash' }
            ],
            columnOrder: ['TorrentName', 'DownloadedSize', 'Size', 'Done', 'Status', 'DownloadSpeed', 'UploadSpeed','ActivePeers', 'TotalPeers', 'ETA', 'Ratio', 'Availability', 'TorrentHashString'],
            columnWidths: {TorrentName: 250, DownloadedSize: 175, Size: 175, Done: 175, Status: 250, DownloadSpeed: 100, UploadSpeed: 100, ActivePeers: 100, TotalPeers: 100, ETA: 175, Ratio: 175, Availability: 175, TorrentHashString: 250,}

        };
 
        this.changeColumnOrder = columnOrder => this.setState({columnOrder});
        this.changeColumnWidths = columnWidths => this.setState({columnWidths});
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

    tick() {
        ws.send("clientUpdateRequest")//talking to the server to get the torrent list
        this.setState({torrentList: torrents});
        //console.log("STATE:", this.state.torrentList)
        //console.log("Torrents", torrents);
        
    }

    render() {
        return (   
            <Grid rows={this.state.torrentList} columns={this.state.columns}>
                <SortingState sorting={this.props.sorting} onSortingChange={this.props.changeSorting} />
                <LocalSorting />
                <SelectionState onSelectionChange={this.props.changeSelection} selection={this.props.selection}/>
                <TableView />
                <DragDropContext />
                <TableColumnResizing columnWidths={this.state.columnWidths} onColumnWidthsChange={this.changeColumnWidths}/>
                <TableColumnReordering order={this.state.columnOrder} onOrderChange={this.changeColumnOrder} />
                <TableSelection selectByRowClick highlightSelected />
                <TableHeaderRow allowSorting allowResizing allowDragging />
            </Grid>


        );
    }
}

const mapStateToProps = state => {
    return {

    };
  }




const mapDispatchToProps = dispatch => {
    return {
        changeSorting: (sorting) => dispatch({type: actionTypes.SORTLIST, sorting }),
        changeSelection: (selection) => dispatch({type: actionTypes.CHANGE_SELECTION, selection}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TorrentListTable);