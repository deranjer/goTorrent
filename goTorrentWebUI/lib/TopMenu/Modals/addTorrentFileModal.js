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

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import InsertLinkIcon from 'material-ui-icons/Link';

//import Icon from 'material-ui/Icon';


var button = {
  fontSize: '60px',
  paddingRight: '20px',
  paddingLeft: '20px'
};

var uploadButton = {
  fontSize: '35px',
  paddingLeft: '0px'
};

var inlineStyle = {
  display: 'inline-block'
};

var input = {
  display: 'none'
};

var addTorrentFilePopup = function (_React$Component) {
  _inherits(addTorrentFilePopup, _React$Component);

  function addTorrentFilePopup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, addTorrentFilePopup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = addTorrentFilePopup.__proto__ || Object.getPrototypeOf(addTorrentFilePopup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      torrentFileName: "",
      torrentFileValue: [],
      storageValue: "",
      showDrop: true
    }, _this.handleClickOpen = function () {
      _this.setState({ open: true });
    }, _this.handleRequestClose = function () {
      _this.setState({ open: false });
    }, _this.handleSubmit = function () {
      _this.setState({ open: false });
      //let magnetLinkSubmit = this.state.textValue;
      console.log("File", _this.state.torrentFileValue);
      var reader = new FileReader();
      var torrentFileBlob = new Blob(_this.state.torrentFileValue);
      console.log("Blob", torrentFileBlob);
      reader.readAsDataURL(torrentFileBlob);
      reader.onloadend = function () {
        var base64data = reader.result;
        console.log("Base64", base64data);

        var torrentFileMessage = {
          MessageType: "torrentFileSubmit",
          MessageDetail: this.state.torrentFileName,
          MessageDetailTwo: this.state.storageValue,
          Payload: [base64data]
        };
        console.log("Sending magnet link: ", torrentFileMessage);
        ws.send(JSON.stringify(torrentFileMessage));
      };
    }, _this.onFileLoad = function (file) {
      _this.setState({ torrentFileName: file[0].name });
      _this.setState({ showDrop: false });
      _this.setState({ torrentFileValue: file });
      console.log("File Name", file[0].name);
    }, _this.setStorageValue = function (event) {
      _this.setState({ storageValue: event.target.value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(addTorrentFilePopup, [{
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
          { onClick: this.handleClickOpen, color: 'primary', 'data-tip': 'Add Torrent File', style: button, centerRipple: true, 'aria-label': 'Add Torrent File' },
          _react2.default.createElement(_reactTooltip2.default, { place: 'top', type: 'light', effect: 'float' }),
          _react2.default.createElement(_AddBox2.default, null)
        ),
        _react2.default.createElement(
          _Dialog2.default,
          { open: this.state.open, onRequestClose: this.handleRequestClose, onEscapeKeyUp: this.handleRequestClose, maxWidth: 'md' },
          _react2.default.createElement(
            _Dialog.DialogTitle,
            null,
            'Add Torrent File'
          ),
          _react2.default.createElement(
            _Dialog.DialogContent,
            null,
            _react2.default.createElement(_Dialog.DialogContentText, null),
            this.state.showDrop && _react2.default.createElement(
              _reactDropzone2.default,
              { disablePreview: true, multiple: false, onDrop: this.onFileLoad },
              'Upload Torrent Here and Add Storage Path'
            ),
            this.state.torrentFileName != "" && this.state.torrentFileName,
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

  return addTorrentFilePopup;
}(_react2.default.Component);

exports.default = addTorrentFilePopup;
;