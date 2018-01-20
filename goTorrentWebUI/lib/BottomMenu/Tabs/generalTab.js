'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _styles = require('material-ui/styles');

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Grid = require('material-ui/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _reactRedux = require('react-redux');

var _actions = require('../../store/actions');

var actionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
    return {
        root: {
            flexGrow: 1,
            marginTop: 0
        },
        paper: {
            padding: 16,
            textAlign: 'left',
            color: theme.palette.text.primary
        },
        floatRight: {
            float: 'right'
        }
    };
};

var GeneralTab = function (_React$Component) {
    _inherits(GeneralTab, _React$Component);

    function GeneralTab(props) {
        _classCallCheck(this, GeneralTab);

        var _this = _possibleConstructorReturn(this, (GeneralTab.__proto__ || Object.getPrototypeOf(GeneralTab)).call(this, props));

        _this.componentWillReceiveProps = function () {
            //console.log("recieving props in generaltab", "TYPE", this.props.selectionHashes[Object.keys(this.props.selectionHashes)[0]])
            if (_this.props.selectionHashes.length === 1) {
                //if one torrent is selected
                var selectionHashTemp = _this.props.selectionHashes[Object.keys(_this.props.selectionHashes)[0]]; // extract out the hash of the single selection
                var selectedTorrentTemp = [];
                _this.props.torrentList.forEach(function (singleTorrent) {
                    if (singleTorrent.TorrentHashString === selectionHashTemp) {
                        selectedTorrentTemp = singleTorrent;
                    }
                });
                //selectedTorrentTemp = this.props.torrentList.filter(torrent => torrent.TorrentHashString === this.props.selectionHashes)
                //console.log("SelectedTorrentTemp", selectedTorrentTemp)
                _this.setState({ selectedTorrent: selectedTorrentTemp });
            } else {
                _this.setState({ selectedTorrent: [] });
            }
        };

        _this.state = {
            selectedTorrent: []
        };

        return _this;
    }

    _createClass(GeneralTab, [{
        key: 'render',
        value: function render() {
            var classes = this.props.classes;

            return _react2.default.createElement(
                'div',
                { className: classes.root },
                _react2.default.createElement(
                    _Grid2.default,
                    { container: true, spacing: 8 },
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 12, sm: 4 },
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Torrent Name: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["TorrentName"],
                                ' '
                            )
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Torrent Size: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["Size"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Storage Path: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["StoragePath"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Date Added: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                ' ',
                                this.state.selectedTorrent["DateAdded"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Source Type: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                ' ',
                                this.state.selectedTorrent["SourceType"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Label: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                ' None '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Torrent Hash: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                ' ',
                                this.state.selectedTorrent["TorrentHashString"],
                                ' '
                            ),
                            ' '
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 12, sm: 4 },
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Status: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["Status"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Percent Done: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["PercentDone"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Torrent DL Amount: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["DownloadedSize"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Total Upload Amount: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["TotalUploadedSize"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Seeding Ratio: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["Ratio"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'ETA: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["ETA"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Max Connections: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["MaxConnections"],
                                ' '
                            ),
                            ' '
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 12, sm: 4 },
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Number of Files: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["FileNumber"],
                                ' '
                            ),
                            ' '
                        ),
                        _react2.default.createElement(
                            _Paper2.default,
                            { className: classes.paper },
                            'Number of Pieces: ',
                            _react2.default.createElement(
                                'span',
                                { className: classes.floatRight },
                                this.state.selectedTorrent["PieceNumber"],
                                ' '
                            ),
                            ' '
                        )
                    )
                )
            );
        }
    }]);

    return GeneralTab;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        selectionHashes: state.selectionHashes,
        torrentList: state.torrentList
    };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps)(GeneralTab));