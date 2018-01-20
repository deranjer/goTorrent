'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _progressBarCell = require('../../CustomCells/progressBarCell');

var _dxReactGrid = require('@devexpress/dx-react-grid');

var _dxReactGridMaterialUi = require('@devexpress/dx-react-grid-material-ui');

var _reactRedux = require('react-redux');

var _actions = require('../../store/actions');

var actionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileTab = function (_React$Component) {
    _inherits(FileTab, _React$Component);

    function FileTab(props) {
        _classCallCheck(this, FileTab);

        var _this = _possibleConstructorReturn(this, (FileTab.__proto__ || Object.getPrototypeOf(FileTab)).call(this, props));

        _this.changeSelection = function (selection) {
            console.log("Filelist is changing selection now", selection);
            _this.setState({ selected: selection });
            if (selection.length > 0) {
                //if selection is empty buttons will be default and selectionHashes will be blanked out and pushed to redux
                console.log("Getting the selected Rows");
                var selectedRows = []; //array of all the selected Rows
                selection.forEach(function (element) {
                    selectedRows.push(_this.props.fileList[element]); //pushing the selected rows out of torrentlist
                });
                _this.setState({ fileSelection: selectedRows });
            }
        };

        _this.sendPriorityRequest = function (priority, sendfileNames) {
            _this.state.fileSelection.forEach(function (element) {
                console.log("element", element);
                sendFileNames.push(element.FilePath);
            });
            var setFilePriority = {
                MessageType: "setFilePriority",
                Payload: sendFileNames
            };
            console.log(JSON.stringify(setFilePriority));
            ws.send(JSON.stringify(setFilePriority));
        };

        _this.setHighPriority = function () {
            var priorty = "High";
            var selectionHash = _this.props.selectionHashes[0]; //getting the first element (should be the only one)
            var sendFileNames = [selectionHash, "High"]; // adding the selection hash as the first element will be stripped out by the server, second element is the prioty request
        };

        _this.setNormalPriority = function () {
            var priorty = "Normal";
            var selectionHash = _this.props.selectionHashes[0]; //getting the first element (should be the only one)
            var sendFileNames = [selectionHash, "Normal"]; // adding the selection hash as the first element will be stripped out by the server, second element is the prioty request
        };

        _this.setCancelPriority = function () {
            var priorty = "Cancel";
            var selectionHash = _this.props.selectionHashes[0]; //getting the first element (should be the only one)
            var sendFileNames = [selectionHash, "Cancel"]; // adding the selection hash as the first element will be stripped out by the server, second element is the prioty request
        };

        _this.state = { //rows are stored in redux they are sent over from the server
            columns: [{ name: 'FileName', title: 'File Name' }, { name: 'FilePath', title: 'File Path' }, { name: 'FileSize', title: 'File Size' }, { name: 'FilePercent', title: 'File Percent' }, { name: 'FilePriority', title: 'File Priority' }],
            sorting: [],
            columnOrder: ['FileName', 'FilePath', 'FileSize', 'FilePercent', 'FilePriority'],
            columnWidths: { FileName: 450, FilePath: 650, FileSize: 100, FilePercent: 100, FilePriority: 75 },
            fileSelection: [],
            selected: []

        };

        _this.changeColumnOrder = function (columnOrder) {
            return _this.setState({ columnOrder: columnOrder });
        };
        _this.changeColumnWidths = function (columnWidths) {
            return _this.setState({ columnWidths: columnWidths });
        };
        _this.changeSorting = function (sorting) {
            return _this.setState({ sorting: sorting });
        };

        return _this;
    }

    _createClass(FileTab, [{
        key: 'render',
        value: function render() {
            return (
                //Buttons here 
                _react2.default.createElement(
                    'div',
                    null,
                    'Set File Priority:',
                    _react2.default.createElement(
                        _Button2.default,
                        { raised: true, color: 'primary', onClick: this.setHighPriority },
                        'High'
                    ),
                    _react2.default.createElement(
                        _Button2.default,
                        { raised: true, color: 'primary', onClick: this.setNormalPriority },
                        'Normal'
                    ),
                    _react2.default.createElement(
                        _Button2.default,
                        { raised: true, color: 'accent', onClick: this.setCancelPriority },
                        'Do Not Download'
                    ),
                    _react2.default.createElement(
                        _dxReactGridMaterialUi.Grid,
                        { rows: this.props.fileList, columns: this.state.columns },
                        _react2.default.createElement(_dxReactGrid.SortingState, { sorting: this.state.sorting, onSortingChange: this.changeSorting }),
                        _react2.default.createElement(_dxReactGrid.LocalSorting, null),
                        _react2.default.createElement(_dxReactGridMaterialUi.DragDropContext, null),
                        _react2.default.createElement(_dxReactGrid.SelectionState, { onSelectionChange: this.changeSelection, selection: this.state.selection }),
                        _react2.default.createElement(_dxReactGridMaterialUi.VirtualTableView, { height: 300, tableCellTemplate: function tableCellTemplate(_ref) {
                                var row = _ref.row,
                                    column = _ref.column,
                                    style = _ref.style;

                                if (column.name === 'FilePercent') {
                                    return _react2.default.createElement(_progressBarCell.ProgressBarCell, { value: row.FilePercent * 100, style: style });
                                }
                                return undefined;
                            } }),
                        '/>',
                        _react2.default.createElement(_dxReactGridMaterialUi.TableColumnResizing, { columnWidths: this.state.columnWidths, onColumnWidthsChange: this.changeColumnWidths }),
                        _react2.default.createElement(_dxReactGridMaterialUi.TableColumnReordering, { order: this.state.columnOrder, onOrderChange: this.changeColumnOrder }),
                        _react2.default.createElement(_dxReactGridMaterialUi.TableSelection, { selectByRowClick: true, highlightSelected: true }),
                        _react2.default.createElement(_dxReactGridMaterialUi.TableHeaderRow, { allowSorting: true, allowResizing: true, allowDragging: true })
                    )
                )
            );
        }
    }]);

    return FileTab;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        selectionHashes: state.selectionHashes,
        fileList: state.fileList
        //fileSelectionNames: state.fileSelectionNames,
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {

        //changeFileSelection: (fileSelection) => dispatch({type: actionTypes.CHANGE_FILE_SELECTION, fileSelection}),

        sendSelectionHashes: function sendSelectionHashes(selectionHashes) {
            return dispatch({ type: actionTypes.SELECTION_HASHES, selectionHashes: selectionHashes });
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FileTab);