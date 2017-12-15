import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {
    SortingState, LocalSorting, PagingState, VirtualTableLayout, SelectionState, FilteringState, LocalFiltering,
} from '@devexpress/dx-react-grid';

import {
    Grid, TableView, TableHeaderRow, PagingPanel, VirtualTableView, TableSelection, TableColumnResizing,
    DragDropContext, TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';

import { ProgressBarCell } from './ProgressBarCell';
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
            columnName: "Status",
            torrentList: torrents, 
            columns: [
                { name: 'TorrentName', title: 'Torrent Name' },
                { name: 'DownloadedSize', title: 'Dl Size'},
                { name: 'Size', title: 'Size'},
                { name: 'PercentDone', title: 'Percent Done'},
                { name: 'Status', title: 'Status'},
                { name: 'DownloadSpeed', title: 'DL Speed'},
                { name: 'UploadSpeed', title: 'UL Speed'},
                { name: 'ActivePeers', title: 'Active Peers' },
                { name: 'ETA', title: 'ETA'},
                { name: 'Ratio', title: 'Ratio'},
                { name: 'Availability', title: 'Availability'},
                { name: 'TorrentHashString', title: 'Torrent Hash' }
            ],
            columnOrder: ['TorrentName', 'DownloadedSize', 'Size', 'PercentDone', 'Status', 'DownloadSpeed', 'UploadSpeed','ActivePeers', 'ETA', 'Ratio', 'Availability', 'TorrentHashString'],
            columnWidths: {TorrentName: 250, DownloadedSize: 100, Size: 100, PercentDone: 175, Status: 150, DownloadSpeed: 100, UploadSpeed: 100, ActivePeers: 100, ETA: 100, Ratio: 75, Availability: 75, TorrentHashString: 250,}

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

    componentWillReceiveProps (nextProps){
        if (this.props.filter != nextProps.filter){
            this.filterHandler(nextProps.filter)
        }
    }

    tick() {
        ws.send("clientUpdateRequest")//talking to the server to get the torrent list
        this.setState({torrentList: torrents});
        //console.log("STATE:", this.state.torrentList)
        //console.log("Torrents", torrents);
        
    }

    createSelectionold = (selection) => {
        for (i = 0; i < selection.length; i++){
            buttonState = selection[i]
        }

    
    
        switch("downloading"){
        case "paused":
            startTorrentState: "primary"
            pauseTorrentState: "disabled"
            stopTorrentState: "primary"
            deleteTorrentState: "accent"
    
        case "stopped":
            startTorrentState: "primary"
            pauseTorrentState: "disabled"
            stopTorrentState: "primary"
            deleteTorrentState: "accent"
    
        case "downloading":
            startTorrentState: "disabled"
            pauseTorrentState: "primary"
            stopTorrentState: "primary"
            deleteTorrentState: "accent"
    
        default:
            startTorrentState: "disabled"
            pauseTorrentState: "disabled"
            stopTorrentState: "disabled"
            deleteTorrentState: "disabled" 
        }

    }

    selectionHandler = (selection) => {
        console.log("Selection", selection) //prints out row number
        this.props.changeSelection(selection) //dispatch to redux
       
    }

    filterHandler = (filter) => {
        console.log("Changing FIlter", filter)
        console.log("Filter Value", filter[0].value)
        if (filter[0].value === 'Active') {
            console.log("Active Filter")
            values = ['Seeding', 'Downloading'].includes
            this.props.filter == [{columnName: 'Status', value: values}]
            return['Downloading', 'Seeding'].includes(row[filter.columnName]);
        }
    }

    getCellValueFunc = (selection) => {
        //console.log("Selection", selection)
        console.log(selection["Status"])
        if (selection[0] != undefined) {
            console.log("Row", selection[0])
            console.log("Column", "Status")
            console.log("Data", selection[0]["Status"])
        }

    }


    render() {
        return (   
            <Grid rows={this.state.torrentList} columns={this.state.columns}>
                <SortingState sorting={this.props.sorting} onSortingChange={this.props.changeSorting} />
                <LocalSorting />
                <FilteringState filters={this.props.filter} />
                <LocalFiltering />
                <SelectionState onSelectionChange={this.props.changeSelection} selection={this.props.selection}/> 
                <TableView  tableCellTemplate={({ row, column, style }) => {
                    if (column.name === 'PercentDone') {
                    return (
                        <ProgressBarCell value={row.PercentDone * 100} style={style} />
                    );
                    }
                    return undefined;
                }}/>
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
        filter: state.filter
    };
  }




const mapDispatchToProps = dispatch => {
    return {
        changeSorting: (sorting) => dispatch({type: actionTypes.SORTLIST, sorting }),
        changeSelection: (selection) => dispatch({type: actionTypes.CHANGE_SELECTION, selection}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TorrentListTable);