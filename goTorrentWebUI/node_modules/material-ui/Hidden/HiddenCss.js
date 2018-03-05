'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _createBreakpoints = require('../styles/createBreakpoints');

var _helpers = require('../utils/helpers');

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  var hidden = {
    display: 'none'
  };

  return _createBreakpoints.keys.reduce(function (acc, key) {
    acc['only' + (0, _helpers.capitalize)(key)] = (0, _defineProperty3.default)({}, theme.breakpoints.only(key), hidden);
    acc[key + 'Up'] = (0, _defineProperty3.default)({}, theme.breakpoints.up(key), hidden);
    acc[key + 'Down'] = (0, _defineProperty3.default)({}, theme.breakpoints.down(key), hidden);

    return acc;
  }, {});
};

/**
 * @ignore - internal component.
 */
function HiddenCss(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      lgDown = props.lgDown,
      lgUp = props.lgUp,
      mdDown = props.mdDown,
      mdUp = props.mdUp,
      only = props.only,
      smDown = props.smDown,
      smUp = props.smUp,
      xlDown = props.xlDown,
      xlUp = props.xlUp,
      xsDown = props.xsDown,
      xsUp = props.xsUp,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'lgDown', 'lgUp', 'mdDown', 'mdUp', 'only', 'smDown', 'smUp', 'xlDown', 'xlUp', 'xsDown', 'xsUp']);


  process.env.NODE_ENV !== "production" ? (0, _warning2.default)((0, _keys2.default)(other).length === 0 || (0, _keys2.default)(other).length === 1 && other.hasOwnProperty('ref'), 'Material-UI: unsupported properties received ' + (0, _keys2.default)(other).join(', ') + ' by `<Hidden />`.') : void 0;

  var classNames = [];

  if (className) {
    classNames.push(className);
  }

  for (var i = 0; i < _createBreakpoints.keys.length; i += 1) {
    var breakpoint = _createBreakpoints.keys[i];
    var breakpointUp = props[breakpoint + 'Up'];
    var breakpointDown = props[breakpoint + 'Down'];

    if (breakpointUp) {
      classNames.push(classes[breakpoint + 'Up']);
    }
    if (breakpointDown) {
      classNames.push(classes[breakpoint + 'Down']);
    }
  }

  if (only) {
    var onlyBreakpoints = Array.isArray(only) ? only : [only];
    onlyBreakpoints.forEach(function (breakpoint) {
      classNames.push(classes['only' + (0, _helpers.capitalize)(breakpoint)]);
    });
  }

  return _react2.default.createElement(
    'div',
    { className: classNames.join(' ') },
    children
  );
}

HiddenCss.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: _propTypes2.default.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
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

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiHiddenCss' })(HiddenCss);