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

var _Link = require('material-ui-icons/Link');

var _Link2 = _interopRequireDefault(_Link);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _Icon = require('material-ui/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var button = {
  fontSize: '60px',
  paddingRight: '20px',
  paddingLeft: '20px'
};

var inlineStyle = {
  display: 'inline-block',
  backdrop: 'static'
};

var addTorrentPopup = function (_React$Component) {
  _inherits(addTorrentPopup, _React$Component);

  function addTorrentPopup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, addTorrentPopup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = addTorrentPopup.__proto__ || Object.getPrototypeOf(addTorrentPopup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      magnetLinkValue: "",
      storageValue: ""

    }, _this.handleClickOpen = function () {
      _this.setState({ open: true });
    }, _this.handleRequestClose = function () {
      _this.setState({ open: false });
    }, _this.handleSubmit = function () {
      _this.setState({ open: false });
      //let magnetLinkSubmit = this.state.textValue;
      var magnetLinkMessage = {
        messageType: "magnetLinkSubmit",
        messageDetail: _this.state.storageValue,
        Payload: [_this.state.magnetLinkValue]
      };
      console.log("Sending magnet link: ", magnetLinkMessage);
      ws.send(JSON.stringify(magnetLinkMessage));
    }, _this.setMagnetLinkValue = function (event) {
      _this.setState({ magnetLinkValue: event.target.value });
    }, _this.setStorageValue = function (event) {
      _this.setState({ storageValue: event.target.value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(addTorrentPopup, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          onRequestClose = _props.onRequestClose,
          handleRequestClose = _props.handleRequestClose,
          handleSubmit = _props.handleSubmit;

      return _react2.default.createElement(
        'div',
        { style: inlineStyle },
        _react2.default.createElement(
          _IconButton2.default,
          { onClick: this.handleClickOpen, color: 'primary', 'data-tip': 'Add Magnet Link', style: button, centerRipple: true, 'aria-label': 'Add Magnet Link' },
          _react2.default.createElement(_reactTooltip2.default, { place: 'top', type: 'light', effect: 'float' }),
          _react2.default.createElement(_Link2.default, null)
        ),
        _react2.default.createElement(
          _Dialog2.default,
          { open: this.state.open, onRequestClose: this.handleRequestClose },
          _react2.default.createElement(
            _Dialog.DialogTitle,
            null,
            'Add Magnet Link'
          ),
          _react2.default.createElement(
            _Dialog.DialogContent,
            null,
            _react2.default.createElement(
              _Dialog.DialogContentText,
              null,
              'Add a Magnet Link here and hit submit to add torrent...'
            ),
            _react2.default.createElement(_TextField2.default, {
              autoFocus: true,
              margin: 'dense',
              id: 'name',
              label: 'Magnet Link',
              type: 'text',
              placeholder: 'Enter Magnet Link Here',
              fullWidth: true,
              onChange: this.setMagnetLinkValue
            }),
            _react2.default.createElement(_TextField2.default, { id: 'storagePath', type: 'text', label: 'Storage Path', placeholder: 'Empty will be default torrent storage path', fullWidth: true, onChange: this.setStorageValue })
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
              { onClick: this.handleSubmit, color: 'primary' },
              'Submit'
            )
          )
        )
      );
    }
  }]);

  return addTorrentPopup;
}(_react2.default.Component);

exports.default = addTorrentPopup;
;