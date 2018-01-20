'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('typeface-roboto');

var _styles = require('material-ui/styles');

var _Icon = require('material-ui/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _addTorrentLinkModal = require('./Modals/addTorrentLinkModal');

var _addTorrentLinkModal2 = _interopRequireDefault(_addTorrentLinkModal);

var _addTorrentFileModal = require('./Modals/addTorrentFileModal');

var _addTorrentFileModal2 = _interopRequireDefault(_addTorrentFileModal);

var _addRSSModal = require('./Modals/RSSModal/addRSSModal');

var _addRSSModal2 = _interopRequireDefault(_addRSSModal);

var _deleteTorrentModal = require('./Modals/deleteTorrentModal');

var _deleteTorrentModal2 = _interopRequireDefault(_deleteTorrentModal);

var _PlayArrow = require('material-ui-icons/PlayArrow');

var _PlayArrow2 = _interopRequireDefault(_PlayArrow);

var _Stop = require('material-ui-icons/Stop');

var _Stop2 = _interopRequireDefault(_Stop);

var _RssFeed = require('material-ui-icons/RssFeed');

var _RssFeed2 = _interopRequireDefault(_RssFeed);

var _Settings = require('material-ui-icons/Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _Delete = require('material-ui-icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _AddShoppingCart = require('material-ui-icons/AddShoppingCart');

var _AddShoppingCart2 = _interopRequireDefault(_AddShoppingCart);

var _backendWebsocket = require('../BackendComm/backendWebsocket');

var _backendWebsocket2 = _interopRequireDefault(_backendWebsocket);

var _reactRedux = require('react-redux');

var _actions = require('../store/actions');

var actionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // contains the font for material UI

//import PauseTorrentIcon from 'material-ui-icons/Pause';


//Redux


var styles = function styles(theme) {
  return {
    button: {
      margin: theme.spacing.unit,
      fontSize: '60px'
    },
    input: {
      display: 'none'
    },
    paddingTest: {
      display: 'inline-block'
    },
    padding: {
      paddingTop: '10px',
      paddingLeft: '10px'
    },
    verticalDivider: {
      borderLeft: '2px solid grey',
      padding: '20px',
      height: '40px',
      position: 'absolute',
      display: 'inline-block',
      paddingRight: '30px',
      paddingLeft: '30px'
    },
    background: {
      backgroundColor: theme.palette.background.paper

    }
  };
};

var IconButtons = function (_React$Component) {
  _inherits(IconButtons, _React$Component);

  function IconButtons(props) {
    _classCallCheck(this, IconButtons);

    var _this = _possibleConstructorReturn(this, (IconButtons.__proto__ || Object.getPrototypeOf(IconButtons)).call(this, props));

    _this.startTorrent = function () {
      console.log("Starting Torrents", _this.props.selectionHashes);
      var startTorrentHashes = {
        MessageType: "startTorrents",
        Payload: _this.props.selectionHashes
        //console.log("Peers tab information requested", peerListHashes)
      };ws.send(JSON.stringify(startTorrentHashes));
      _this.props.setButtonState(_this.props.selection); //TODO this currently just forces a button refresh, should be a better way to do this
    };

    _this.stopTorrent = function () {
      var stopTorrentHashes = {
        MessageType: "stopTorrents",
        Payload: _this.props.selectionHashes
      };
      console.log("Stopping Torrents", stopTorrentHashes);
      ws.send(JSON.stringify(stopTorrentHashes));
      _this.props.setButtonState(_this.props.selection); //TODO this currently just forces a button refresh, should be a better way to do this
    };

    return _this;
  }

  _createClass(IconButtons, [{
    key: 'render',
    value: function render() {
      var classes = this.props.classes;

      return _react2.default.createElement(
        'div',
        { className: classes.padding },
        _react2.default.createElement(_addTorrentFileModal2.default, null),
        _react2.default.createElement(_addTorrentLinkModal2.default, null),
        _react2.default.createElement('div', { className: classes.verticalDivider }),
        _react2.default.createElement(
          _IconButton2.default,
          { color: this.props.buttonState[0].startButton, 'data-tip': 'Start Torrent', className: classes.button, 'aria-label': 'Start Torrent', onClick: this.startTorrent },
          _react2.default.createElement(_reactTooltip2.default, { place: 'top', type: 'light', effect: 'float' }),
          _react2.default.createElement(_PlayArrow2.default, null)
        ),
        _react2.default.createElement(
          _IconButton2.default,
          { color: this.props.buttonState[0].stopButton, 'data-tip': 'Stop Torrent', className: classes.button, onClick: this.stopTorrent, 'aria-label': 'Stop Torrent' },
          _react2.default.createElement(_reactTooltip2.default, { place: 'top', type: 'light', effect: 'float' }),
          _react2.default.createElement(_Stop2.default, null)
        ),
        _react2.default.createElement(_deleteTorrentModal2.default, null),
        _react2.default.createElement('div', { className: classes.verticalDivider }),
        _react2.default.createElement(_addRSSModal2.default, null),
        _react2.default.createElement(
          _IconButton2.default,
          { color: 'primary', 'data-tip': 'Settings', className: classes.button, 'aria-label': 'Settings' },
          _react2.default.createElement(_reactTooltip2.default, { place: 'top', type: 'light', effect: 'float' }),
          _react2.default.createElement(_Settings2.default, null)
        ),
        _react2.default.createElement('div', { className: classes.verticalDivider }),
        _react2.default.createElement(_backendWebsocket2.default, null)
      );
    }
  }]);

  return IconButtons;
}(_react2.default.Component);

IconButtons.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    buttonState: state.buttonState,
    selection: state.selection,
    selectionHashes: state.selectionHashes
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setButtonState: function setButtonState(buttonState) {
      return dispatch({ type: actionTypes.SET_BUTTON_STATE, buttonState: buttonState });
    },
    changeSelection: function changeSelection(selection) {
      return dispatch({ type: actionTypes.CHANGE_SELECTION, selection: selection });
    } //used to force a selection empty after deleting torrent
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(IconButtons));