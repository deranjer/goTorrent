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

var _dxReactGrid = require('@devexpress/dx-react-grid');

var _dxReactGridMaterialUi = require('@devexpress/dx-react-grid-material-ui');

var _reactRedux = require('react-redux');

var _actions = require('../../../store/actions');

var actionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tableStyle = {};

var RSSTorrentList = function (_React$Component) {
    _inherits(RSSTorrentList, _React$Component);

    function RSSTorrentList(props) {
        _classCallCheck(this, RSSTorrentList);

        var _this = _possibleConstructorReturn(this, (RSSTorrentList.__proto__ || Object.getPrototypeOf(RSSTorrentList)).call(this, props));

        _this.changeSelection = function (selection) {
            console.log("TorrentList is changing selection now", selection);
            _this.setState({ selected: selection });
            if (selection.length > 0) {
                //if selection is empty buttons will be default and selectionHashes will be blanked out and pushed to redux
                console.log("Getting the selected Rows");
                var selectedRows = []; //array of all the selected Rows
                selection.forEach(function (element) {
                    selectedRows.push(_this.props.RSSTorrentList[element]); //pushing the selected rows out of torrentlist
                });
                _this.setState({ fileSelection: selectedRows });
            }
        };

        _this.sendMagnetLinks = function () {
            var sendMagnetLinks = [];
            _this.state.fileSelection.forEach(function (element) {
                //fileselection contains the currently selected rows
                console.log("element", element);
                sendMagnetLinks.push(element.TorrentLink);
            });
            var magnetLinkSubmit = {
                MessageType: "magnetLinkSubmit",
                Payload: sendMagnetLinks
            };
            console.log(JSON.stringify(magnetLinkSubmit));
            ws.send(JSON.stringify(magnetLinkSubmit));
        };

        _this.state = { //rows are stored in redux they are sent over from the server
            columns: [{ name: 'TorrentName', title: 'Title' }, { name: 'TorrentLink', title: 'Magnet Link' }, { name: 'PublishDate', title: 'Date Published' }],
            sorting: [],
            columnOrder: ['TorrentName', 'TorrentLink', 'PublishDate'],
            columnWidths: { TorrentName: 450, TorrentLink: 650, PublishDate: 200 },
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

    _createClass(RSSTorrentList, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            console.log("New torrentlist", this.props.RSSTorrentList);
        }
    }, {
        key: 'render',
        value: function render() {
            return (
                //Buttons here 
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _Button2.default,
                        { raised: true, color: 'primary', onClick: this.sendMagnetLinks },
                        'Download Torrents'
                    ),
                    _react2.default.createElement(
                        _dxReactGridMaterialUi.Grid,
                        { rows: this.props.RSSTorrentList, columns: this.state.columns },
                        _react2.default.createElement(_dxReactGrid.SortingState, { sorting: this.state.sorting, onSortingChange: this.changeSorting }),
                        _react2.default.createElement(_dxReactGrid.LocalSorting, null),
                        _react2.default.createElement(_dxReactGridMaterialUi.DragDropContext, null),
                        _react2.default.createElement(_dxReactGrid.SelectionState, { onSelectionChange: this.changeSelection, selection: this.state.selection }),
                        _react2.default.createElement(_dxReactGridMaterialUi.VirtualTableView, { height: 500 }),
                        _react2.default.createElement(_dxReactGridMaterialUi.TableColumnResizing, { columnWidths: this.state.columnWidths, onColumnWidthsChange: this.changeColumnWidths }),
                        _react2.default.createElement(_dxReactGridMaterialUi.TableColumnReordering, { order: this.state.columnOrder, onOrderChange: this.changeColumnOrder }),
                        _react2.default.createElement(_dxReactGridMaterialUi.TableSelection, { selectByRowClick: true, highlightSelected: true }),
                        _react2.default.createElement(_dxReactGridMaterialUi.TableHeaderRow, { allowSorting: true, allowResizing: true, allowDragging: true })
                    )
                )
            );
        }
    }]);

    return RSSTorrentList;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        selectionHashes: state.selectionHashes,
        RSSTorrentList: state.RSSTorrentList
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(RSSTorrentList);