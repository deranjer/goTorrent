'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactBootstrapTableAllMin = require('../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

var _reactBootstrapTableAllMin2 = _interopRequireDefault(_reactBootstrapTableAllMin);

var _reactBootstrapTable = require('react-bootstrap-table');

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _dxReactGrid = require('@devexpress/dx-react-grid');

var _dxReactGridMaterialUi = require('@devexpress/dx-react-grid-material-ui');

var _progressBarCell = require('./CustomCells/progressBarCell');

var _reactRedux = require('react-redux');

var _actions = require('./store/actions');

var actionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//react redux


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

function sendEvent(message) {
    ws.send(message);
    console.log('Sending message... ', message);
}

var TorrentListTable = function (_React$Component) {
    _inherits(TorrentListTable, _React$Component);

    function TorrentListTable(props) {
        _classCallCheck(this, TorrentListTable);

        var _this = _possibleConstructorReturn(this, (TorrentListTable.__proto__ || Object.getPrototypeOf(TorrentListTable)).call(this, props));

        _this.determineSelectionHashes = function (selectedRows) {
            //console.log("CurrentSelectionHashes", this.props.selectionHashes)
            var selectionHashes = []; //rebuilding our selection hashes from our currently selected rows
            selectedRows.forEach(function (element) {
                selectionHashes.push(element.TorrentHashString); //push the selection hash to the temp array
            });
            _this.props.sendSelectionHashes(selectionHashes); //push the result to redux
        };

        _this.changeSelection = function (selection) {
            //console.log("TOrrentlist is changing selection now", selection)
            _this.props.changeSelection(selection); //dispatch selection to redux, also clear out anything tied to the old selection (peerlists, filelists, etc)

            if (selection.length === 0) {
                //if selection is empty buttons will be default and selectionHashes will be blanked out and pushed to redux
                _this.props.setButtonState(selection); //if no selection dispatch that to redux
            } else {
                // if we have selection continue on with logic to determine button state
                var selectedRows = []; //array of all the selected Rows
                selection.forEach(function (element) {
                    selectedRows.push(_this.props.torrentList[element]); //pushing the selected rows out of torrentlist
                });
                //console.log("Determining selection hashses")
                _this.determineSelectionHashes(selectedRows); //pulling the torrent hashes for the selcted rows
                _this.props.setButtonState(selection);
            }
        };

        _this.filterHandler = function (filter) {
            //TODO, figure out how to do multiple filter
            //console.log("Changing FIlter", filter)
            if (filter.value === "Active") {
                console.log("This filter doesn't fucking work");
            }
        };

        _this.state = { //rows are stored in redux they are sent over from the server
            columns: [{ name: 'TorrentName', title: 'Torrent Name' }, { name: 'DownloadedSize', title: 'Dl Size' }, { name: 'Size', title: 'Size' }, { name: 'PercentDone', title: 'Percent Done' }, { name: 'Status', title: 'Status' }, { name: 'DownloadSpeed', title: 'DL Speed' }, { name: 'UploadSpeed', title: 'UL Speed' }, { name: 'ActivePeers', title: 'Active Peers' }, { name: 'ETA', title: 'ETA' }, { name: 'Ratio', title: 'Ratio' }, { name: 'DateAdded', title: 'Date Added' }, { name: 'Availability', title: 'Availability' }],
            columnOrder: ['TorrentName', 'DownloadedSize', 'Size', 'PercentDone', 'Status', 'DownloadSpeed', 'UploadSpeed', 'ActivePeers', 'ETA', 'Ratio', 'DateAdded', 'Availability'],
            columnWidths: { TorrentName: 250, DownloadedSize: 100, Size: 100, PercentDone: 175, Status: 150, DownloadSpeed: 100, UploadSpeed: 100, ActivePeers: 100, ETA: 100, Ratio: 75, DateAdded: 100, Availability: 75 },
            prevSelection: [], //just used to pull data from cell (temp Prevcell holder), real selection is in Redux
            pageSizes: [5, 10, 15, 0],
            currentPage: 0
        };

        _this.changeColumnOrder = function (columnOrder) {
            return _this.setState({ columnOrder: columnOrder });
        };
        _this.changeColumnWidths = function (columnWidths) {
            return _this.setState({ columnWidths: columnWidths });
        };
        _this.changePageSize = function (pageSize) {
            return _this.setState({ pageSize: pageSize });
        };
        _this.changeCurrentPage = function (currentPage) {
            return _this.setState({ currentPage: currentPage });
        };
        return _this;
    }

    _createClass(TorrentListTable, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            //this is for setting the filter when the left menu activates a new filter
            if (this.props.filter != nextProps.filter) {
                this.filterHandler(nextProps.filter);
            }
            //console.log("Recieving new props", nextProps.selection)
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _Paper2.default,
                null,
                _react2.default.createElement(
                    _dxReactGridMaterialUi.Grid,
                    { rows: this.props.torrentList, columns: this.state.columns },
                    _react2.default.createElement(_dxReactGrid.FilteringState, { filters: this.props.filter }),
                    _react2.default.createElement(_dxReactGrid.SortingState, { sorting: this.props.sorting, onSortingChange: this.props.changeSorting }),
                    _react2.default.createElement(_dxReactGrid.SelectionState, { onSelectionChange: this.changeSelection, selection: this.props.selection }),
                    _react2.default.createElement(_dxReactGrid.LocalFiltering, null),
                    _react2.default.createElement(_dxReactGrid.LocalSorting, null),
                    _react2.default.createElement(_dxReactGridMaterialUi.VirtualTableView, { height: 530, tableCellTemplate: function tableCellTemplate(_ref) {
                            var row = _ref.row,
                                column = _ref.column,
                                style = _ref.style;

                            if (column.name === 'PercentDone') {
                                return _react2.default.createElement(_progressBarCell.ProgressBarCell, { value: row.PercentDone * 100, style: style });
                            }
                            return undefined;
                        } }),
                    _react2.default.createElement(_dxReactGridMaterialUi.DragDropContext, null),
                    _react2.default.createElement(_dxReactGridMaterialUi.TableColumnResizing, { columnWidths: this.state.columnWidths, onColumnWidthsChange: this.changeColumnWidths }),
                    _react2.default.createElement(_dxReactGridMaterialUi.TableColumnReordering, { order: this.state.columnOrder, onOrderChange: this.changeColumnOrder }),
                    _react2.default.createElement(_dxReactGridMaterialUi.TableSelection, { selectByRowClick: true, highlightSelected: true }),
                    _react2.default.createElement(_dxReactGridMaterialUi.TableHeaderRow, { allowSorting: true, allowResizing: true, allowDragging: true })
                )
            );
        }
    }]);

    return TorrentListTable;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        filter: state.filter,
        torrentList: state.torrentList,
        buttonState: state.buttonState,
        buttonStateDefault: state.buttonStateDefault, //all default
        selectionHashes: state.selectionHashes,
        selection: state.selection
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        changeSorting: function changeSorting(sorting) {
            return dispatch({ type: actionTypes.SORTLIST, sorting: sorting });
        },
        changeSelection: function changeSelection(selection) {
            return dispatch({ type: actionTypes.CHANGE_SELECTION, selection: selection });
        },
        setButtonState: function setButtonState(buttonState) {
            return dispatch({ type: actionTypes.SET_BUTTON_STATE, buttonState: buttonState });
        },
        sendSelectionHashes: function sendSelectionHashes(selectionHashes) {
            return dispatch({ type: actionTypes.SELECTION_HASHES, selectionHashes: selectionHashes });
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TorrentListTable);