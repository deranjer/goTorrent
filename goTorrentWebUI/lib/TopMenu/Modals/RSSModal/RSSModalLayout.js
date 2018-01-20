'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('../../../../node_modules/react-grid-layout/css/styles.css');

require('../../../../node_modules/react-resizable/css/styles.css');

var _reactGridLayout = require('react-grid-layout');

var _reactGridLayout2 = _interopRequireDefault(_reactGridLayout);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRedux = require('react-redux');

var _actions = require('../../../store/actions');

var actionTypes = _interopRequireWildcard(_actions);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _styles = require('material-ui/styles');

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

var _Icon = require('material-ui/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _RssFeed = require('material-ui-icons/RssFeed');

var _RssFeed2 = _interopRequireDefault(_RssFeed);

var _AddCircle = require('material-ui-icons/AddCircle');

var _AddCircle2 = _interopRequireDefault(_AddCircle);

var _RSSFeedList = require('./RSSFeedList');

var _RSSFeedList2 = _interopRequireDefault(_RSSFeedList);

var _RSSTorrentList = require('./RSSTorrentList');

var _RSSTorrentList2 = _interopRequireDefault(_RSSTorrentList);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//css for react grid

//react-grid for layout

//Redux

//interior items

var ReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout2.default);

var background = {
  backgroundColor: '#e5e5e5',
  boxShadow: '0 0 20px #000'
};

var button = {
  fontSize: '60px',
  paddingRight: '20px',
  paddingLeft: '20px'
};

var smallButton = {
  width: '36px',
  height: '36px',
  padding: '5px'
};

var rssInput = {
  width: '90%',
  paddingRight: '10px'
};

var inlineStyle = {
  display: 'inline-block',
  backdrop: 'static'
};

var RSSModalLayout = function (_React$Component) {
  _inherits(RSSModalLayout, _React$Component);

  function RSSModalLayout(props) {
    _classCallCheck(this, RSSModalLayout);

    var _this = _possibleConstructorReturn(this, (RSSModalLayout.__proto__ || Object.getPrototypeOf(RSSModalLayout)).call(this, props));

    _this.handleRSSModalClose = function () {
      var closeState = false;
      _this.props.rssModalOpenState(closeState);
    };

    _this.handleAddRSSFeed = function () {
      _this.setState({ textValue: "Clear" }); //clearing out the text submitted
      var RSSURLSubmit = {
        messageType: "addRSSFeed",
        Payload: [_this.state.textValue]
      };
      ws.send(JSON.stringify(RSSURLSubmit));
      var RSSRequest = {
        messageType: "rssFeedRequest"
      };
      ws.send(JSON.stringify(RSSRequest)); //Immediatly request an update of the feed when you add a new URL
    };

    _this.setTextValue = function (event) {
      _this.setState({ textValue: event.target.value });
    };

    var layout = [{ i: 'a', x: 0, y: 0, w: 6, h: 1, static: true }, { i: 'b', x: 0, y: 1, w: 1, h: 5, static: true }, { i: 'c', x: 1, y: 1, w: 5, h: 5, minW: 5, minH: 3, static: true }];
    _this.state = { layout: layout };

    return _this;
  }

  _createClass(RSSModalLayout, [{
    key: 'onLayoutChange',
    value: function onLayoutChange(layout) {
      this.props.onLayoutChange(layout);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      console.log("nextprops", nextProps, "Modal", nextProps.RSSModalOpen);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.log("Mounting grid");
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: inlineStyle },
        _react2.default.createElement(
          _Dialog.DialogContent,
          null,
          _react2.default.createElement(
            ReactGridLayout,
            _extends({ layout: this.state.layout, onLayoutChange: this.onLayoutChange
            }, this.props),
            _react2.default.createElement(
              'div',
              { key: 'a', sytle: background, className: 'DragHandle' },
              _react2.default.createElement(_TextField2.default, {
                style: rssInput,
                autoFocus: true,
                margin: 'dense',
                id: 'name',
                label: 'Add New RSS URL',
                type: 'text',
                placeholder: 'Enter RSS URL Here..',
                onChange: this.setTextValue
              }),
              _react2.default.createElement(
                _IconButton2.default,
                { onClick: this.handleAddRSSFeed, color: 'primary', 'data-tip': 'Add RSS Feed', style: smallButton, 'aria-label': 'Add RSS Feeds' },
                _react2.default.createElement(_reactTooltip2.default, { place: 'top', type: 'light', effect: 'float' }),
                _react2.default.createElement(_AddCircle2.default, null)
              )
            ),
            _react2.default.createElement(
              'div',
              { key: 'b', style: background, className: 'DragHandle' },
              _react2.default.createElement(_RSSFeedList2.default, null)
            ),
            _react2.default.createElement(
              'div',
              { key: 'c', style: background, className: 'DragHandle' },
              _react2.default.createElement(_RSSTorrentList2.default, null)
            )
          )
        ),
        _react2.default.createElement(
          _Dialog.DialogActions,
          null,
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleRSSModalClose, color: 'primary' },
            'Close'
          )
        )
      );
    }
  }]);

  return RSSModalLayout;
}(_react2.default.Component);

RSSModalLayout.propTypes = {
  onLayoutChange: _propTypes2.default.func.isRequired
};
RSSModalLayout.defaultProps = {
  className: "layout",
  items: 4,
  rowHeight: 100,
  onLayoutChange: function onLayoutChange() {},
  cols: 6,
  draggableCancel: '.NoDrag',
  draggableHandle: '.DragHandle'
};
;

//module.exports = RSSModalLayout;

var mapStateToProps = function mapStateToProps(state) {
  return {
    RSSList: state.RSSList,
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RSSModalLayout);