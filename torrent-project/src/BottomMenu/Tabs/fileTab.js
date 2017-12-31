import React from 'react';
import ReactDOM from 'react-dom';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {
    SortingState, LocalSorting, VirtualTableLayout, SelectionState,
} from '@devexpress/dx-react-grid';

import {
    Grid, TableView, TableHeaderRow, PagingPanel, VirtualTableView, TableColumnResizing,
    DragDropContext, TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';


import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


class FileTab extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { //rows are stored in redux they are sent over from the server
            columns: [
                { name: 'FileName', title: 'File Name'},
                { name: 'FilePath', title: 'File Path' },
                { name: 'FileSize', title: 'File Size'},
                //{ name: 'Country', title: 'Country of Origin'}, //TODO map IP to country
                { name: 'FilePercent', title: 'File Percent'},
                { name: 'FilePriority', title: 'File Priority'}, //T=Tracker, I=Incoming, Hg=DHTGetPeers, Ha=DHTAnnouncePeer, X=PEX
            ],
            sorting: [],
            columnOrder: ['FileName', 'FilePath', 'FileSize', 'FilePercent', 'FilePriority'],
            columnWidths: {FileName: 250, FilePath: 450, FileSize: 100, FilePercent: 100, FilePriority: 75},
        };
 
        this.changeColumnOrder = columnOrder => this.setState({columnOrder});
        this.changeColumnWidths = columnWidths => this.setState({columnWidths});
        this.changeSorting = sorting => this.setState({sorting});
    }

    render() {
        return (   
            <Grid rows={this.props.fileList} columns={this.state.columns}>
                <SortingState sorting={this.state.sorting} onSortingChange={this.changeSorting} />
                <LocalSorting />
                <DragDropContext />
                <TableView />
                <TableColumnResizing columnWidths={this.state.columnWidths} onColumnWidthsChange={this.changeColumnWidths}/>
                <TableColumnReordering order={this.state.columnOrder} onOrderChange={this.changeColumnOrder} />
                <TableHeaderRow allowSorting allowResizing allowDragging />
            </Grid>
        );
    }


}



const mapStateToProps = state => {
    return {
        selectionHashes: state.selectionHashes,
        fileList: state.fileList,
    };
  }

export default connect(mapStateToProps)(FileTab)