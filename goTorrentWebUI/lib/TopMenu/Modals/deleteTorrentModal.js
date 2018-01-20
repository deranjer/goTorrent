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

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _styles = require('material-ui/styles');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _AddBox = require('material-ui-icons/AddBox');

var _AddBox2 = _interopRequireDefault(_AddBox);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Delete = require('material-ui-icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _reactRedux = require('react-redux');

var _actions = require('../../store/actions');

var actionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import InsertLinkIcon from 'material-ui-icons/Link';

//import Icon from 'material-ui/Icon';


//Redux


var button = {
  fontSize: '60px',
  paddingRight: '20px',
  paddingLeft: '20px'
};

var inlineStyle = {
  display: 'inline-block'
};

var DeleteTorrentModal = function (_React$Component) {
  _inherits(DeleteTorrentModal, _React$Component);

  function DeleteTorrentModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DeleteTorrentModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DeleteTorrentModal.__proto__ || Object.getPrototypeOf(DeleteTorrentModal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.handleDeleteTorrent = function () {
      var selection = [];
      var deleteTorrentHashes = {
        MessageType: "deleteTorrents",
        MessageDetail: "true",
        Payload: _this.props.selectionHashes
      };
      console.log("Deleting Torrents", deleteTorrentHashes);
      ws.send(JSON.stringify(deleteTorrentHashes));
      _this.props.setButtonState(_this.props.selection); //TODO this currently just forces a button refresh, should be a better way to do this
      _this.props.changeSelection(selection); //purging out our selection after deleting a torent
      _this.setState({ open: false });
    }, _this.handleDeleteData = function () {
      var selection = [];

      var deleteTorrentHashes = {
        MessageType: "deleteTorrents",
        MessageDetail: "true",
        Payload: _this.props.selectionHashes
      };
      console.log("Deleting Torrents and Data", deleteTorrentHashes);
      ws.send(JSON.stringify(deleteTorrentHashes));
      _this.props.setButtonState(_this.props.selection); //TODO this currently just forces a button refresh, should be a better way to do this
      _this.props.changeSelection(selection); //purging out our selection after deleting a torent
      _this.setState({ open: false });
    }, _this.handleClickOpen = function () {
      if (_this.props.selection.length > 0) {
        _this.setState({ open: true });
      } else {
        console.log("Select a torrent to delete..");
      }
    }, _this.handleRequestClose = function () {
      _this.setState({ open: false });
    }, _this.setTextValue = function (event) {
      _this.setState({ textValue: event.target.value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DeleteTorrentModal, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onRequestClose = _props.onRequestClose,
          handleRequestClose = _props.handleRequestClose,
          handleSubmit = _props.handleSubmit;

      return _react2.default.createElement(
        'div',
        { style: inlineStyle },
        _react2.default.createElement(
          _IconButton2.default,
          { color: this.props.buttonState[0].deleteButton, 'data-tip': 'Delete Torrent', style: button, onClick: this.handleClickOpen, 'aria-label': 'Delete Torrent' },
          _react2.default.createElement(_reactTooltip2.default, { place: 'top', type: 'error', effect: 'float' }),
          _react2.default.createElement(_Delete2.default, null)
        ),
        _react2.default.createElement(
          _Dialog2.default,
          { open: this.state.open, onRequestClose: this.handleRequestClose, onEscapeKeyUp: this.handleRequestClose, maxWidth: 'md' },
          _react2.default.createElement(
            _Dialog.DialogTitle,
            null,
            'Delete Torrent'
          ),
          _react2.default.createElement(
            _Dialog.DialogContent,
            null,
            'Are you sure you want to delete Torrent?'
          ),
          _react2.default.createElement(
            _Dialog.DialogActions,
            null,
            _react2.default.createElement(
              _Button2.default,
              { onClick: this.handleRequestClose, color: 'primary' },
              'Cancel'
            ),
            _react2.default.createElement(
              _Button2.default,
              { onClick: this.handleDeleteData, color: 'primary' },
              'Delete with Data'
            ),
            _react2.default.createElement(
              _Button2.default,
              { onClick: this.handleDeleteTorrent, color: 'primary' },
              'Delete just Torrent'
            )
          )
        )
      );
    }
  }]);

  return DeleteTorrentModal;
}(_react2.default.Component);

;

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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DeleteTorrentModal);