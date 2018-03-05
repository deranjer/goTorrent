import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import { ProgressBarCell } from '../../CustomCells/progressBarCell';


import {
    SortingState, IntegratedSorting, VirtualTableLayout, SelectionState,
} from '@devexpress/dx-react-grid';

import {
    Grid, TableHeaderRow, PagingPanel, VirtualTable, TableColumnResizing,
    DragDropProvider, TableColumnReordering, TableSelection,
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
                { name: 'FilePercent', title: 'File Percent'},
                { name: 'FilePriority', title: 'File Priority'}, 
            ],
            sorting: [],
            columnOrder: ['FileName', 'FilePath', 'FileSize', 'FilePercent', 'FilePriority'],
            columnWidths: [
                {columnName: 'FileName', width: 450},
                {columnName: 'FilePath', width: 650},
                {columnName: 'FileSize', width: 100},
                {columnName: 'FilePercent', width: 100},
                {columnName: 'FilePriority', width: 75},
            ],
            fileSelection: [],
            selected: [],
 
        };
        this.changeColumnOrder = columnOrder => this.setState({columnOrder});
        this.changeColumnWidths = columnWidths => this.setState({columnWidths});
        this.changeSorting = sorting => this.setState({sorting});

    }

    progressBar = (props) => {
        if(props.column.name == 'FilePercent'){
            return (
                <ProgressBarCell value={props.row.FilePercent * 100} style={props.style} />
            );
        }
        return <VirtualTable.Cell {...props} />;
    }

    changeSelection = (selection) => {
        console.log("Filelist is changing selection now", selection)
        this.setState({selected: selection})
         if (selection.length > 0) { //if selection is empty buttons will be default and selectionHashes will be blanked out and pushed to redux
            console.log("Getting the selected Rows")
            const selectedRows = [] //array of all the selected Rows
            selection.forEach(element => {   
                selectedRows.push(this.props.fileList[element])   //pushing the selected rows out of torrentlist
            });
           this.setState({fileSelection: selectedRows})
        }  
    }

    sendPriorityRequest = (priority, selectionHash) =>  {
        let filePaths = []
        this.state.fileSelection.forEach(element => {
            console.log("element", element)
            filePaths.push(element.FilePath)
        })
        let setFilePriority = {
            MessageType: "setFilePriority",
            Payload: {"TorrentHash": selectionHash, "FilePriority": priority, "FilePaths": filePaths}
        }

        console.log(JSON.stringify(setFilePriority))
        ws.send(JSON.stringify(setFilePriority))
    }

    setHighPriority = () => {
        let priority = "High"
        let selectionHash = this.props.selectionHashes[0] //getting the first element (should be the only one)
        this.sendPriorityRequest(priority, selectionHash)
    }
    setNormalPriority = () => {
        let priority = "Normal"
        let selectionHash = this.props.selectionHashes[0] //getting the first element (should be the only one)
        this.sendPriorityRequest(priority, selectionHash)
    }
    setCancelPriority = () => {
        let priority = "Cancel"
        let selectionHash = this.props.selectionHashes[0] //getting the first element (should be the only one)
        this.sendPriorityRequest(priority, selectionHash)
    }

    render() {
        return (  
            //Buttons here 
            <div>
                Set File Priority: 
                <Button variant="raised" color="primary" onClick={this.setHighPriority}>
                    High
                </Button>
                <Button variant="raised" color="primary" onClick={this.setNormalPriority}>
                    Normal
                </Button>
                <Button variant="raised" color="secondary" onClick={this.setCancelPriority}>
                    Do Not Download
                </Button>
                <Paper>
                    <Grid rows={this.props.fileList} columns={this.state.columns}>
                        <SortingState sorting={this.state.sorting} onSortingChange={this.changeSorting} />
                        <IntegratedSorting />
                        <DragDropProvider />
                        <SelectionState onSelectionChange={this.changeSelection} selection={this.state.selection}/>
                    
                        <VirtualTable height={300} cellComponent={this.progressBar} />
        
                        <TableColumnResizing columnWidths={this.state.columnWidths} onColumnWidthsChange={this.changeColumnWidths}/>
                        <TableColumnReordering order={this.state.columnOrder} onOrderChange={this.changeColumnOrder} />
                        <TableSelection selectByRowClick highlightSelected />
                        <TableHeaderRow allowSorting allowResizing allowDragging />
                    </Grid>
                </Paper>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        selectionHashes: state.selectionHashes,
        fileList: state.fileList,
    };
  }

  const mapDispatchToProps = dispatch => {
    return {
        sendSelectionHashes: (selectionHashes) => dispatch({type: actionTypes.SELECTION_HASHES, selectionHashes}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileTab)