import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';

import {
    SortingState, LocalSorting, VirtualTableLayout, SelectionState,
} from '@devexpress/dx-react-grid';

import {
    Grid, TableHeaderRow, PagingPanel, VirtualTableView, TableColumnResizing,
    DragDropContext, TableColumnReordering, TableSelection,
} from '@devexpress/dx-react-grid-material-ui';


import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const tableStyle = {
    
}

class RSSTorrentList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { //rows are stored in redux they are sent over from the server
            columns: [
                { name: 'TorrentName', title: 'Title'},
                { name: 'TorrentLink', title: 'Magnet Link' },
                { name: 'PublishDate', title: 'Date Published'},
            ],
            sorting: [],
            columnOrder: ['TorrentName', 'TorrentLink', 'PublishDate'],
            columnWidths: {TorrentName: 450, TorrentLink: 650, PublishDate: 200},
            fileSelection: [],
            selected: [],
 
            
        };


        this.changeColumnOrder = columnOrder => this.setState({columnOrder});
        this.changeColumnWidths = columnWidths => this.setState({columnWidths});
        this.changeSorting = sorting => this.setState({sorting});

    }

    changeSelection = (selection) => {
        console.log("TorrentList is changing selection now", selection)
        this.setState({selected: selection})
         if (selection.length > 0) { //if selection is empty buttons will be default and selectionHashes will be blanked out and pushed to redux
            console.log("Getting the selected Rows")
            const selectedRows = [] //array of all the selected Rows
            selection.forEach(element => {   
                selectedRows.push(this.props.RSSTorrentList[element])   //pushing the selected rows out of torrentlist
            });
           this.setState({fileSelection: selectedRows})
        }
       
    }

    sendMagnetLinks = (priority, sendfileNames) =>  {
        this.state.fileSelection.forEach(element => {
            console.log("element", element)
            sendFileNames.push(element.FilePath)
        })
        let setFilePriority = {
            MessageType: "setFilePriority",
            Payload: sendFileNames,    
        }
        console.log(JSON.stringify(setFilePriority))
        ws.send(JSON.stringify(setFilePriority))
    }

    componentWillReceiveProps () {
        console.log("New torrentlist", this.props.RSSTorrentList)
    }


    render() {
        return (  
            //Buttons here 
            <div>
                <Button raised color="primary" onClick={this.setHighPriority}>
                    Download Torrents
                </Button>
                <Grid rows={this.props.RSSTorrentList} columns={this.state.columns}>
                    <SortingState sorting={this.state.sorting} onSortingChange={this.changeSorting} />
                    <LocalSorting />
                    <DragDropContext />
                    <SelectionState onSelectionChange={this.changeSelection} selection={this.state.selection}/>
                
                    <VirtualTableView height={300} />
    
                    <TableColumnResizing columnWidths={this.state.columnWidths} onColumnWidthsChange={this.changeColumnWidths}/>
                    <TableColumnReordering order={this.state.columnOrder} onOrderChange={this.changeColumnOrder} />
                    <TableSelection selectByRowClick highlightSelected />
                    <TableHeaderRow allowSorting allowResizing allowDragging />
                </Grid>
            </div>
        );
    }


}



const mapStateToProps = state => {
    return {
        selectionHashes: state.selectionHashes,
        RSSTorrentList: state.RSSTorrentList,
        //fileSelectionNames: state.fileSelectionNames,
    };
  }

  const mapDispatchToProps = dispatch => {
    return {
       
        //changeFileSelection: (fileSelection) => dispatch({type: actionTypes.CHANGE_FILE_SELECTION, fileSelection}),
      
        //sendSelectionHashes: (selectionHashes) => dispatch({type: actionTypes.SELECTION_HASHES, selectionHashes}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RSSTorrentList)