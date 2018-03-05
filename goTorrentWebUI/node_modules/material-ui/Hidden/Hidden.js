'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _HiddenJs = require('./HiddenJs');

var _HiddenJs2 = _interopRequireDefault(_HiddenJs);

var _HiddenCss = require('./HiddenCss');

var _HiddenCss2 = _interopRequireDefault(_HiddenCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

Hidden.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: _propTypes2.default.node,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for server
   * side rendering.
   */
  implementation: _propTypes2.default.oneOf(['js', 'css']),
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
  initialWidth: _propTypes2.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /**
   * If true, screens this size and down will be hidden.
   */
  lgDown: _propTypes2.default.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  lgUp: _propTypes2.default.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  mdDown: _propTypes2.default.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  mdUp: _propTypes2.default.bool,
  /**
   * Hide the given breakpoint(s).
   */
  only: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['xs', 'sm', 'md', 'lg', 'xl']))]),
  /**
   * If true, screens this size and down will be hidden.
   */
  smDown: _propTypes2.default.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  smUp: _propTypes2.default.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  xlDown: _propTypes2.default.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xlUp: _propTypes2.default.bool,
  /**
   * If true, screens this size and down will be hidden.
   */
  xsDown: _propTypes2.default.bool,
  /**
   * If true, screens this size and up will be hidden.
   */
  xsUp: _propTypes2.default.bool
} : {};

Hidden.defaultProps = {
  implementation: 'js',
  lgDown: false,
  lgUp: false,
  mdDown: false,
  mdUp: false,
  smDown: false,
  smUp: false,
  xlDown: false,
  xlUp: false,
  xsDown: false,
  xsUp: false
};

exports.default = Hidden;