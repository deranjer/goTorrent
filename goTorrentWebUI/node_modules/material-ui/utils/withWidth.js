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

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _wrapDisplayName = require('recompose/wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _withTheme = require('../styles/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _createBreakpoints = require('../styles/createBreakpoints');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_HigherOrderComponent = require('react-flow-types').babelPluginFlowReactPropTypes_proptype_HigherOrderComponent || require('prop-types').any; //  weak

// flow sanity check (DO NOT DELETE) https://flow.org/try/#0JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4AoUSWOGATzCTgG84BhXSAOyS5gBUGTAL5xsuAkXQwy5OQHp5cALSq16jZuVwdccorgB3YDAAW-U0hBMAEgHk25JAA9qWAK5cMwCFyMnzS2sAHgAFHDAAZwAuFmEAPgAKcl12Tl9eGFiOcAy+QUZg1jMrJFi7ACMAKyQMOFEAMjhwiCj4gBpyAEps9J58oTCIyPiWOR00ABsUSMi4AHUAi1K4FxheABM55GkAOhzuTKHWyPaWWiCyuEqauoSx1KIuDaQoRK6H1LgiGHcoP2CBzy8GYuzBZmAkV2YGGohK1gAvMwIVDIjAUOtdvCkKJ5PEKKlhAT6ilvkhfv8FktLuRhAolFpGUy1PolMYzMtrHAAKqRFAAcyQ5CmMzmAEFVs51s9tsQYPs+kdipdytVavBGiwULEuO4QBVXmcKjq9QaoPdmHS0L40XBOUgNkD+vAEf4OZdEmKuhQDPMmBtfPh4DwHbQIHAwKK4MA-AADbGx1YAN14Fwg7n5pjgsYAsnQnZlE0QAI7uYBEOYmXbkYL2x2KvhwFBIgCMogqSIATLj4vSVMyB6lWW7TIsNmY4PZHC43LQhHAAEJSADWkBjLoIzki+DgAB8CJEQDv9-gQBtjwRJvyL-hnJNZOR6IwqePTC0onBXcxSTGTMAUJMY5mAA-LES6oKuEDrp0OjGK+oGLiua58J0dJOK40AeF4MA+H47KjsAr7vJ8mCeN4virFwpgoF4SDHFEsRAW+wxJKSqQFnwvS5M6BR0cwcFmGBSFQShcBgrs76RAkMFwD0aTcZkvH0SMYxsXAIqzFSZhMZK0pbIgcoKgpfDKaM35fGSzyvMR5kWepNogr+OEAUxZwCaYoiuii0LDGpjzkn8AIcSC4neTCJyiO5SL4Ie+A9sShIJSSak-IFWkEa+xJEuMZIUn4vDUbRFBoQYA5leow7uHygrCtMmkLrpmyynswVFO5QkQchMBnNqcC6vqhrGn1pqvBapJPC8bwfLZEwOSw7meRckI+ScKUBZSwQbMASZwHipJ0lac1MQ6wWfiOTHvIkC7esOfpwAGXBBn1SChjA4aRppMbZu5iZICmfhmOmmbZnmwVFkgpblkglbyjWx31sZ8DNswbZwB2zDdrt+JAA


/**
 * By default, returns true if screen width is the same or greater than the given breakpoint.
 *
 * @param screenWidth
 * @param breakpoint
 * @param inclusive - defaults to true
 */
var babelPluginFlowReactPropTypes_proptype_Breakpoint = require('../styles/createBreakpoints').babelPluginFlowReactPropTypes_proptype_Breakpoint || require('prop-types').any;

var isWidthUp = exports.isWidthUp = function isWidthUp(breakpoint, screenWidth) {
  var inclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (inclusive) {
    return _createBreakpoints.keys.indexOf(breakpoint) <= _createBreakpoints.keys.indexOf(screenWidth);
  }
  return _createBreakpoints.keys.indexOf(breakpoint) < _createBreakpoints.keys.indexOf(screenWidth);
};

/**
 * By default, returns true if screen width is the same or less than the given breakpoint.
 *
 * @param screenWidth
 * @param breakpoint
 * @param inclusive - defaults to true
 */
var isWidthDown = exports.isWidthDown = function isWidthDown(breakpoint, screenWidth) {
  var inclusive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (inclusive) {
    return _createBreakpoints.keys.indexOf(screenWidth) <= _createBreakpoints.keys.indexOf(breakpoint);
  }
  return _createBreakpoints.keys.indexOf(screenWidth) < _createBreakpoints.keys.indexOf(breakpoint);
};

// optional props introduced by this HOC
var babelPluginFlowReactPropTypes_proptype_HOCProps = {
  /**
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty componenent during the first mount.
   * In some situation you might want to use an heristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * http://caniuse.com/#search=client%20hint
   */
  initialWidth: typeof babelPluginFlowReactPropTypes_proptype_Breakpoint === 'function' ? babelPluginFlowReactPropTypes_proptype_Breakpoint : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Breakpoint),

  /**
   * Bypass the width calculation logic.
   */
  width: typeof babelPluginFlowReactPropTypes_proptype_Breakpoint === 'function' ? babelPluginFlowReactPropTypes_proptype_Breakpoint : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Breakpoint)
};
var babelPluginFlowReactPropTypes_proptype_InjectedProps = {
  width: typeof babelPluginFlowReactPropTypes_proptype_Breakpoint === 'function' ? babelPluginFlowReactPropTypes_proptype_Breakpoint.isRequired ? babelPluginFlowReactPropTypes_proptype_Breakpoint.isRequired : babelPluginFlowReactPropTypes_proptype_Breakpoint : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Breakpoint).isRequired
};


var withWidth = function withWidth() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    var _options$resizeInterv = options.resizeInterval,
        resizeInterval = _options$resizeInterv === undefined ? 166 : _options$resizeInterv;

    // `theme` is injected below by withTheme

    var Width = function (_React$Component) {
      (0, _inherits3.default)(Width, _React$Component);

      function Width() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Width);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Width.__proto__ || (0, _getPrototypeOf2.default)(Width)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          width: undefined
        }, _this.handleResize = (0, _debounce2.default)(function () {
          _this.updateWidth(window.innerWidth);
        }, resizeInterval), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
      }

      (0, _createClass3.default)(Width, [{
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
          if (this.props.theme) {
            var breakpoints = this.props.theme.breakpoints;
            var _width = null;

            /**
             * Start with the slowest value as low end devices often have a small screen.
             *
             * innerWidth |0      xs      sm      md      lg      xl
             *            |-------|-------|-------|-------|-------|------>
             * width      |  xs   |  xs   |  sm   |  md   |  lg   |  xl
             */
            var index = 1;
            while (_width === null && index < _createBreakpoints.keys.length) {
              var currentWidth = _createBreakpoints.keys[index];

              // @media are inclusive, so reproduce the behavior here.
              if (innerWidth < breakpoints.values[currentWidth]) {
                _width = _createBreakpoints.keys[index - 1];
                break;
              }

              index += 1;
            }

            _width = _width || 'xl';

            if (_width !== this.state.width) {
              this.setState({
                width: _width
              });
            }
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
            _react2.default.createElement(Component, props)
          );
        }
      }]);
      return Width;
    }(_react2.default.Component);

    if (process.env.NODE_ENV !== 'production') {
      Width.displayName = (0, _wrapDisplayName2.default)(Component, 'withWidth');
    }

    return (0, _withTheme2.default)()(Width);
  };
};

exports.default = withWidth;