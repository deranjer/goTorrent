import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {
    SortingState, IntegratedSorting, VirtualTableLayout, SelectionState,
} from '@devexpress/dx-react-grid';

import {
    Grid, TableHeaderRow, VirtualTable, TableColumnResizing,
    DragDropProvider, TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';


import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


class PeerTab extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { //rows are stored in redux they are sent over from the server
            columns: [
                { name: 'PeerID', title: 'Peer ID' },
                { name: 'IP', title: 'IP Address'},
                //{ name: 'Country', title: 'Country of Origin'}, //TODO map IP to country
                { name: 'Port', title: 'Port'},
                { name: 'Source', title: 'Source'}, //T=Tracker, I=Incoming, Hg=DHTGetPeers, Ha=DHTAnnouncePeer, X=PEX
                { name: 'SupportsEncryption', title: 'Supports Encryption'},
            ],
            sorting: [],
            columnOrder: ['PeerID', 'IP', 'Port', 'Source', 'SupportsEncryption'],
            columnWidths: [
                {columnName: 'PeerID', width: 250},
                {columnName: 'IP', width: 150},
                {columnName: 'Port', width: 100},
                {columnName: 'Source', width: 150},
                {columnName: 'SupportsEncryption', width: 150},
            ]
        };
 
        this.changeColumnOrder = columnOrder => this.setState({columnOrder});
        this.changeColumnWidths = columnWidths => this.setState({columnWidths});
        this.changeSorting = sorting => this.setState({sorting});
    }

    render() {
        return (
            <Paper>   
                <Grid rows={this.props.peerList} columns={this.state.columns}>
                    <SortingState sorting={this.state.sorting} onSortingChange={this.changeSorting} />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <VirtualTable height={350}/>
                    <TableColumnResizing columnWidths={this.state.columnWidths} onColumnWidthsChange={this.changeColumnWidths}/>
                    <TableColumnReordering order={this.state.columnOrder} onOrderChange={this.changeColumnOrder} />
                    <TableHeaderRow allowSorting allowResizing allowDragging />
                </Grid>
            </Paper>
        );
    }


}

const mapStateToProps = state => {
    return {
        selectionHashes: state.selectionHashes,
        peerList: state.peerList,
    };
  }

export default connect(mapStateToProps)(PeerTab)