'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactBootstrapTable = require('react-bootstrap-table');

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

var PeerTab = function (_React$Component) {
    _inherits(PeerTab, _React$Component);

    function PeerTab(props) {
        _classCallCheck(this, PeerTab);

        var _this = _possibleConstructorReturn(this, (PeerTab.__proto__ || Object.getPrototypeOf(PeerTab)).call(this, props));

        _this.state = { //rows are stored in redux they are sent over from the server
            columns: [{ name: 'PeerID', title: 'Peer ID' }, { name: 'IP', title: 'IP Address' },
            //{ name: 'Country', title: 'Country of Origin'}, //TODO map IP to country
            { name: 'Port', title: 'Port' }, { name: 'Source', title: 'Source' }, //T=Tracker, I=Incoming, Hg=DHTGetPeers, Ha=DHTAnnouncePeer, X=PEX
            { name: 'SupportsEncryption', title: 'Supports Encryption' }],
            sorting: [],
            columnOrder: ['PeerID', 'IP', 'Port', 'Source', 'SupportsEncryption'],
            columnWidths: { PeerID: 250, IP: 150, Port: 100, Source: 150, SupportsEncryption: 150 }
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

    _createClass(PeerTab, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _dxReactGridMaterialUi.Grid,
                { rows: this.props.peerList, columns: this.state.columns },
                _react2.default.createElement(_dxReactGrid.SortingState, { sorting: this.state.sorting, onSortingChange: this.changeSorting }),
                _react2.default.createElement(_dxReactGrid.LocalSorting, null),
                _react2.default.createElement(_dxReactGridMaterialUi.DragDropContext, null),
                _react2.default.createElement(_dxReactGridMaterialUi.VirtualTableView, { height: 350 }),
                _react2.default.createElement(_dxReactGridMaterialUi.TableColumnResizing, { columnWidths: this.state.columnWidths, onColumnWidthsChange: this.changeColumnWidths }),
                _react2.default.createElement(_dxReactGridMaterialUi.TableColumnReordering, { order: this.state.columnOrder, onOrderChange: this.changeColumnOrder }),
                _react2.default.createElement(_dxReactGridMaterialUi.TableHeaderRow, { allowSorting: true, allowResizing: true, allowDragging: true })
            );
        }
    }]);

    return PeerTab;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        selectionHashes: state.selectionHashes,
        peerList: state.peerList
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(PeerTab);