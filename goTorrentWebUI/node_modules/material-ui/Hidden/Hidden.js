'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HiddenJs = require('./HiddenJs');

var _HiddenJs2 = _interopRequireDefault(_HiddenJs);

var _HiddenCss = require('./HiddenCss');

var _HiddenCss2 = _interopRequireDefault(_HiddenCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Breakpoint = require('../styles/createBreakpoints').babelPluginFlowReactPropTypes_proptype_Breakpoint || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * The content of the component.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * Hide the given breakpoint(s).
   */
  only: require('prop-types').oneOfType([typeof babelPluginFlowReactPropTypes_proptype_Breakpoint === 'function' ? babelPluginFlowReactPropTypes_proptype_Breakpoint : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Breakpoint), require('prop-types').arrayOf(typeof babelPluginFlowReactPropTypes_proptype_Breakpoint === 'function' ? babelPluginFlowReactPropTypes_proptype_Breakpoint : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Breakpoint))]),

  /**
   * If true, screens this size and up will be hidden.
   */
  xsUp: require('prop-types').bool,

  /**
   * If true, screens this size and up will be hidden.
   */
  smUp: require('prop-types').bool,

  /**
   * If true, screens this size and up will be hidden.
   */
  mdUp: require('prop-types').bool,

  /**
   * If true, screens this size and up will be hidden.
   */
  lgUp: require('prop-types').bool,

  /**
   * If true, screens this size and up will be hidden.
   */
  xlUp: require('prop-types').bool,

  /**
   * If true, screens this size and down will be hidden.
   */
  xsDown: require('prop-types').bool,

  /**
   * If true, screens this size and down will be hidden.
   */
  smDown: require('prop-types').bool,

  /**
   * If true, screens this size and down will be hidden.
   */
  mdDown: require('prop-types').bool,

  /**
   * If true, screens this size and down will be hidden.
   */
  lgDown: require('prop-types').bool,

  /**
   * If true, screens this size and down will be hidden.
   */
  xlDown: require('prop-types').bool,

  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for server
   * side rendering.
   */
  implementation: require('prop-types').oneOf(['js', 'css']),

  /**
   * You can use this property when choosing the `js` implementation with server side rendering.
   *
   * As `window.innerWidth` is unavailable on the server,
   * we default to rendering an empty componenent during the first mount.
   * In some situation you might want to use an heristic to approximate
   * the screen width of the client browser screen width.
   *
   * For instance, you could be using the user-agent or the client-hints.
   * http://caniuse.com/#search=client%20hint
   */
  initialWidth: require('prop-types').number
};


/**
 * Responsively hides children based on the selected implementation.
 */
function Hidden(props) {
  var implementation = props.implementation,
      other = (0, _objectWithoutProperties3.default)(props, ['implementation']);


  if (implementation === 'js') {
    return _react2.default.createElement(_HiddenJs2.default, other);
  }

  return _react2.default.createElement(_HiddenCss2.default, other);
}

Hidden.propTypes = process.env.NODE_ENV !== "production" ? babelPluginFlowReactPropTypes_proptype_Props : {};
Hidden.defaultProps = {
  implementation: 'js',
  xsUp: false,
  smUp: false,
  mdUp: false,
  lgUp: false,
  xlUp: false,
  xsDown: false,
  smDown: false,
  mdDown: false,
  lgDown: false,
  xlDown: false
};

exports.default = Hidden;