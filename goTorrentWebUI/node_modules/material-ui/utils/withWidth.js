'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWidthDown = exports.isWidthUp = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _wrapDisplayName = require('recompose/wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _withTheme = require('../styles/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _createBreakpoints = require('../styles/createBreakpoints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// By default, returns true if screen width is the same or greater than the given breakpoint.
var isWidthUp = exports.isWidthUp = function isWidthUp(breakpoint, width) {
  var inclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (inclusive) {
    return _createBreakpoints.keys.indexOf(breakpoint) <= _createBreakpoints.keys.indexOf(width);
  }
  return _createBreakpoints.keys.indexOf(breakpoint) < _createBreakpoints.keys.indexOf(width);
};

// By default, returns true if screen width is the same or less than the given breakpoint.
var isWidthDown = exports.isWidthDown = function isWidthDown(breakpoint, width) {
  var inclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (inclusive) {
    return _createBreakpoints.keys.indexOf(width) <= _createBreakpoints.keys.indexOf(breakpoint);
  }
  return _createBreakpoints.keys.indexOf(width) < _createBreakpoints.keys.indexOf(breakpoint);
};

var withWidth = function withWidth() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    var _options$resizeInterv = options.resizeInterval,
        resizeInterval = _options$resizeInterv === undefined ? 166 : _options$resizeInterv,
        _options$withTheme = options.withTheme,
        withThemeOption = _options$withTheme === undefined ? false : _options$withTheme;

    var WithWidth = function (_React$Component) {
      (0, _inherits3.default)(WithWidth, _React$Component);

      function WithWidth() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, WithWidth);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WithWidth.__proto__ || (0, _getPrototypeOf2.default)(WithWidth)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          width: undefined
        }, _this.handleResize = (0, _debounce2.default)(function () {
          _this.updateWidth(window.innerWidth);
        }, resizeInterval), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
      }

      (0, _createClass3.default)(WithWidth, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.updateWidth(window.innerWidth);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.handleResize.cancel();
        }
      }, {
        key: 'updateWidth',
        value: function updateWidth(innerWidth) {
          var breakpoints = this.props.theme.breakpoints;
          var width = null;

          /**
           * Start with the slowest value as low end devices often have a small screen.
           *
           * innerWidth |xs      sm      md      lg      xl
           *            |-------|-------|-------|-------|------>
           * width      |  xs   |  sm   |  md   |  lg   |  xl
           */
          var index = 1;
          while (width === null && index < _createBreakpoints.keys.length) {
            var currentWidth = _createBreakpoints.keys[index];

            // @media are inclusive, so reproduce the behavior here.
            if (innerWidth < breakpoints.values[currentWidth]) {
              width = _createBreakpoints.keys[index - 1];
              break;
            }

            index += 1;
          }

          width = width || 'xl';

          if (width !== this.state.width) {
            this.setState({
              width: width
            });
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props,
              initialWidth = _props.initialWidth,
              theme = _props.theme,
              width = _props.width,
              other = (0, _objectWithoutProperties3.default)(_props, ['initialWidth', 'theme', 'width']);

          var props = (0, _extends3.default)({
            width: width || this.state.width || initialWidth
          }, other);
          var more = {};

          if (withThemeOption) {
            more.theme = theme;
          }

          // When rendering the component on the server,
          // we have no idea about the client browser screen width.
          // In order to prevent blinks and help the reconciliation of the React tree
          // we are not rendering the child component.
          //
          // An alternative is to use the `initialWidth` property.
          if (props.width === undefined) {
            return null;
          }

          return _react2.default.createElement(
            _reactEventListener2.default,
            { target: 'window', onResize: this.handleResize },
            _react2.default.createElement(Component, (0, _extends3.default)({}, more, props))
          );
        }
      }]);
      return WithWidth;
    }(_react2.default.Component);

    WithWidth.propTypes = process.env.NODE_ENV !== "production" ? {
      /**
       * As `window.innerWidth` is unavailable on the server,
       * we default to rendering an empty componenent during the first mount.
       * In some situation you might want to use an heristic to approximate
       * the screen width of the client browser screen width.
       *
       * For instance, you could be using the user-agent or the client-hints.
       * http://caniuse.com/#search=client%20hint
       */
      initialWidth: _propTypes2.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
      /**
       * @ignore
       */
      theme: _propTypes2.default.object.isRequired,
      /**
       * Bypass the width calculation logic.
       */
      width: _propTypes2.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
    } : {};

    if (process.env.NODE_ENV !== 'production') {
      WithWidth.displayName = (0, _wrapDisplayName2.default)(Component, 'WithWidth');
    }

    (0, _hoistNonReactStatics2.default)(WithWidth, Component);

    return (0, _withTheme2.default)()(WithWidth);
  };
};

exports.default = withWidth;