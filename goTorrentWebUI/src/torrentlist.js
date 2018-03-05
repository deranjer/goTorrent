import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Paper from 'material-ui/Paper';

import {
    SortingState, IntegratedSorting,  VirtualTableLayout, SelectionState, FilteringState, IntegratedFiltering,
} from '@devexpress/dx-react-grid';

import {
    Grid, TableHeaderRow, VirtualTable, TableSelection, TableColumnResizing,
    DragDropProvider, TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';


import { ProgressBarCell } from './CustomCells/progressBarCell';
//react redux
import {connect} from 'react-redux';
import * as actionTypes from './store/actions';


class TorrentListTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { //rows are stored in redux they are sent over from the server
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
                { name: 'DateAdded', title: 'Date Added'},
                { name: 'Availability', title: 'Availability'},
            ],
            columnOrder: ['TorrentName', 'DownloadedSize', 'Size', 'PercentDone', 'Status', 'DownloadSpeed', 'UploadSpeed','ActivePeers', 'ETA', 'Ratio', 'DateAdded', 'Availability'],
            columnWidths: [
                {columnName: 'TorrentName', width: 250}, 
                {columnName: 'DownloadedSize', width: 100}, 
                {columnName: 'Size', width: 100}, 
                {columnName: 'PercentDone', width: 175}, 
                {columnName: 'Status', width: 150}, 
                {columnName: 'DownloadSpeed', width: 100}, 
                {columnName: 'UploadSpeed', width: 100}, 
                {columnName: 'ActivePeers', width: 100},
                {columnName: 'ETA', width: 100}, 
                {columnName: 'Ratio', width: 75},
                {columnName: 'DateAdded', width: 100}, 
                {columnName: 'Availability', width: 75},
            ],
            prevSelection: [], //just used to pull data from cell (temp Prevcell holder), real selection is in Redux
            pageSizes: [5, 10, 15, 0],
            currentPage: 0,
        };
 
        this.changeColumnOrder = columnOrder => this.setState({columnOrder});
        this.changeColumnWidths = columnWidths => this.setState({columnWidths});
        this.changePageSize = pageSize => this.setState({ pageSize });
        this.changeCurrentPage = currentPage => this.setState({ currentPage });
    }

    progressBar = (props) => {
        if(props.column.name == 'PercentDone'){
            return (
                <ProgressBarCell value={props.row.PercentDone * 100} style={props.style} />
            );
        }
        return <VirtualTable.Cell {...props} />;
    }


    componentWillReceiveProps (nextProps){  //this is for setting the filter when the left menu activates a new filter
        if (this.props.filter != nextProps.filter){
            this.filterHandler(nextProps.filter)
        }
        //console.log("Recieving new props", nextProps.selection)
    }


    determineSelectionHashes = (selectedRows) => {
        //console.log("CurrentSelectionHashes", this.props.selectionHashes)
        let selectionHashes = [] //rebuilding our selection hashes from our currently selected rows
        selectedRows.forEach(element => {
            selectionHashes.push(element.TorrentHashString) //push the selection hash to the temp array
        })
        this.props.sendSelectionHashes(selectionHashes) //push the result to redux
    }


    changeSelection = (selection) => {
        //console.log("TOrrentlist is changing selection now", selection)
        this.props.changeSelection(selection) //dispatch selection to redux, also clear out anything tied to the old selection (peerlists, filelists, etc)

         if (selection.length === 0) { //if selection is empty buttons will be default and selectionHashes will be blanked out and pushed to redux
            this.props.setButtonState(selection) //if no selection dispatch that to redux
        } else { // if we have selection continue on with logic to determine button state
            const selectedRows = [] //array of all the selected Rows
            selection.forEach(element => {   
                selectedRows.push(this.props.torrentList[element])   //pushing the selected rows out of torrentlist
            });
            //console.log("Determining selection hashses")
            this.determineSelectionHashes(selectedRows) //pulling the torrent hashes for the selcted rows
            this.props.setButtonState(selection)
        }
       
    }

    filterHandler = (filter) => { //TODO, figure out how to do multiple filter
        //console.log("Changing FIlter", filter)
        
    }

    render() {
        return (
            <Paper>   
                <Grid rows={this.props.torrentList} columns={this.state.columns}>
                    <FilteringState filters={this.props.filter} />
                    
                    <SortingState sorting={this.props.sorting} onSortingChange={this.props.changeSorting} />
                    
                    <SelectionState onSelectionChange={this.changeSelection} selection={this.props.selection}/> 

                    <IntegratedFiltering />
                    <IntegratedSorting />

                    <VirtualTable height={530} cellComponent={this.progressBar} />

                    <DragDropProvider/>
                    <TableColumnResizing columnWidths={this.state.columnWidths} onColumnWidthsChange={this.changeColumnWidths}/>
                    <TableColumnReordering order={this.state.columnOrder} onOrderChange={this.changeColumnOrder} />
                    <TableSelection selectByRowClick highlightSelected />
                    <TableHeaderRow allowSorting allowResizing allowDragging />
                </Grid>
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {
        filter: state.filter,
        torrentList: state.torrentList,
        buttonState: state.buttonState,
        buttonStateDefault: state.buttonStateDefault, //all default
        selectionHashes: state.selectionHashes,
        selection: state.selection,
    };
  }

const mapDispatchToProps = dispatch => {
    return {
        changeSorting: (sorting) => dispatch({type: actionTypes.SORTLIST, sorting }),
        changeSelection: (selection) => dispatch({type: actionTypes.CHANGE_SELECTION, selection}),
        setButtonState: (buttonState) => dispatch({type: actionTypes.SET_BUTTON_STATE, buttonState}),
        sendSelectionHashes: (selectionHashes) => dispatch({type: actionTypes.SELECTION_HASHES, selectionHashes}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TorrentListTable);