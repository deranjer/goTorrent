'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrapDisplayName = require('recompose/wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _withWidth = require('../utils/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_HigherOrderComponent = require('react-flow-types').babelPluginFlowReactPropTypes_proptype_HigherOrderComponent || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Breakpoint = require('../styles/createBreakpoints').babelPluginFlowReactPropTypes_proptype_Breakpoint || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_InjectedProps = {
  /**
   * If isWidthDown(options.breakpoint), return true.
   */
  fullScreen: require('prop-types').bool.isRequired
};


/**
 * Dialog will responsively be full screen *at or below* the given breakpoint
 * (defaults to 'sm' for mobile devices).
 * Notice that this Higher-order Component is incompatible with server side rendering.
 */
var withMobileDialog = function withMobileDialog() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { breakpoint: 'sm' };
  return function (Component) {
    var breakpoint = options.breakpoint;


    function WithMobileDialog(props) {
      return _react2.default.createElement(Component, (0, _extends3.default)({ fullScreen: (0, _withWidth.isWidthDown)(breakpoint, props.width) }, props));
    }

    WithMobileDialog.propTypes = process.env.NODE_ENV !== "production" ? {
      width: require('prop-types').string.isRequired
    } : {};
    if (process.env.NODE_ENV !== 'production') {
      WithMobileDialog.displayName = (0, _wrapDisplayName2.default)(Component, 'withMobileDialog');
    }

    return (0, _withWidth2.default)()(WithMobileDialog);
  };
};

exports.default = withMobileDialog;