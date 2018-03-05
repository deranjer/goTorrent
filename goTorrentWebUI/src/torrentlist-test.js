import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Paper from 'material-ui/Paper';

import {
    SortingState, LocalSorting, PagingState, VirtualTableLayout, SelectionState, FilteringState, LocalFiltering,
} from '@devexpress/dx-react-grid';

import {
    Grid, TableHeaderRow, PagingPanel, VirtualTableView, VirtualTable, TableSelection, TableColumnResizing, Table,
    DragDropContext, TableColumnReordering, 
} from '@devexpress/dx-react-grid-material-ui';


import { ProgressBarCell } from './CustomCells/progressBarCell';
//react redux
import {connect} from 'react-redux';
import * as actionTypes from './store/actions';


class TorrentListTable extends React.Component {
    
    render() {
        return (
            <Grid
            rows={[
            { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
            { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
            ]}
            columns={[
            { name: 'id', title: 'ID' },
            { name: 'product', title: 'Product' },
            { name: 'owner', title: 'Owner' },
            ]}>
            <Table />
            <TableHeaderRow />
        </Grid>
    )}
}

export default TorrentListTable;