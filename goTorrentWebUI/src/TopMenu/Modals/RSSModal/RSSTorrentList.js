import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import {
    SortingState, IntegratedSorting, IntegratedSelection, VirtualTableLayout, SelectionState,
} from '@devexpress/dx-react-grid';

import {
    Grid, TableHeaderRow, VirtualTable, TableColumnResizing,
    DragDropProvider, TableColumnReordering, TableSelection,
} from '@devexpress/dx-react-grid-material-ui';


import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';

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
            columnWidths: [
                {columnName: 'TorrentName', width: 450},
                {columnName: 'TorrentLink', width: 650},
                {columnName: 'PublishDate', width: 200},
            ],
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

    sendMagnetLinks = () =>  {
        let sendMagnetLinks = []
        this.state.fileSelection.forEach(element => { //fileselection contains the currently selected rows
            console.log("element", element)
            sendMagnetLinks.push(element.TorrentLink)
        })
        let magnetLinkMessage = {
            MessageType: "magnetLinkSubmit",
            Payload: {"MagnetLinks": sendMagnetLinks, "Label": "RSS"}
          }
        console.log(JSON.stringify(magnetLinkMessage))
        ws.send(JSON.stringify(magnetLinkMessage))
    }

    componentWillReceiveProps () {
        console.log("New torrentlist", this.props.RSSTorrentList)
    }


    render() {
        return (  
            //Buttons here 
            <div>
                <Button variant="raised" color="primary" onClick={this.sendMagnetLinks}>
                    Download Torrents
                </Button>
                    <Paper>
                    <Grid rows={this.props.RSSTorrentList} columns={this.state.columns}>
                        <SortingState sorting={this.state.sorting} onSortingChange={this.changeSorting} />
                        <IntegratedSorting />
                        <DragDropProvider />
                        <SelectionState onSelectionChange={this.changeSelection} selection={this.state.selection}/>
                    
                        <VirtualTable height={500} />
        
                        <TableColumnResizing columnWidths={this.state.columnWidths} onColumnWidthsChange={this.changeColumnWidths}/>
                        <TableColumnReordering order={this.state.columnOrder} onOrderChange={this.changeColumnOrder} />
                        <IntegratedSelection />
                        <TableSelection selectByRowClick highlightSelected showSelectAll />
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
        RSSTorrentList: state.RSSTorrentList,
    };
  }



export default connect(mapStateToProps)(RSSTorrentList)