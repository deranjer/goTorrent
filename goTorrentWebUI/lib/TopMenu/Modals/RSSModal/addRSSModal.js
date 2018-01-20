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

var _List = require('material-ui/List');

var _List2 = _interopRequireDefault(_List);

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

var _RssFeed = require('material-ui-icons/RssFeed');

var _RssFeed2 = _interopRequireDefault(_RssFeed);

var _AddCircle = require('material-ui-icons/AddCircle');

var _AddCircle2 = _interopRequireDefault(_AddCircle);

var _RSSModalLayout = require('./RSSModalLayout');

var _RSSModalLayout2 = _interopRequireDefault(_RSSModalLayout);

var _reactRedux = require('react-redux');

var _actions = require('../../../store/actions');

var actionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Redux


var button = {
  fontSize: '60px',
  paddingRight: '20px',
  paddingLeft: '20px'
};

var inlineStyle = {
  display: 'inline-block',
  backdrop: 'static'
};

var AddRSSModal = function (_React$Component) {
  _inherits(AddRSSModal, _React$Component);

  function AddRSSModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AddRSSModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddRSSModal.__proto__ || Object.getPrototypeOf(AddRSSModal)).call.apply(_ref, [this].concat(args))), _this), _this.rssModalOpenState = function () {
      console.log("Opening RSS Modal");
      _this.props.rssModalOpenState(true);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AddRSSModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //Immediatly request an update of the feed when loading app
      var RSSRequest = {
        messageType: "rssFeedRequest"
      };
      ws.send(JSON.stringify(RSSRequest));
    }
  }, {
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
          { onClick: this.rssModalOpenState, color: 'primary', 'data-tip': 'Add RSS URL', style: button, 'aria-label': 'RSS Feeds' },
          _react2.default.createElement(_reactTooltip2.default, { place: 'top', type: 'light', effect: 'float' }),
          _react2.default.createElement(_RssFeed2.default, null)
        ),
        _react2.default.createElement(
          _Dialog2.default,
          { fullScreen: true, open: this.props.RSSModalOpen, onRequestClose: this.handleRequestClose },
          _react2.default.createElement(
            _Dialog.DialogTitle,
            null,
            'Manage RSS Feeds'
          ),
          _react2.default.createElement(_RSSModalLayout2.default, null)
        )
      );
    }
  }]);

  return AddRSSModal;
}(_react2.default.Component);

;

var mapStateToProps = function mapStateToProps(state) {
  return {
    RSSModalOpen: state.RSSModalOpen
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    rssModalOpenState: function rssModalOpenState(RSSModalOpen) {
      return dispatch({ type: actionTypes.RSS_MODAL_OPEN_STATE, RSSModalOpen: RSSModalOpen });
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddRSSModal);