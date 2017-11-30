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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _createBreakpoints = require('../styles/createBreakpoints');

var _helpers = require('../utils/helpers');

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any; /* eslint-disable flowtype/require-valid-file-annotation */

var babelPluginFlowReactPropTypes_proptype_HiddenProps = require('./types').babelPluginFlowReactPropTypes_proptype_HiddenProps || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Props = (0, _extends3.default)({}, babelPluginFlowReactPropTypes_proptype_HiddenProps === require('prop-types').any ? {} : babelPluginFlowReactPropTypes_proptype_HiddenProps, {
  /**
   * The content of the component.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired,

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object.isRequired
});


function generateStyles(theme) {
  var hidden = {
    display: 'none'
  };

  return _createBreakpoints.keys.reduce(function (styles, key) {
    styles['only' + (0, _helpers.capitalizeFirstLetter)(key)] = (0, _defineProperty3.default)({}, theme.breakpoints.only(key), hidden);
    styles[key + 'Up'] = (0, _defineProperty3.default)({}, theme.breakpoints.up(key), hidden);
    styles[key + 'Down'] = (0, _defineProperty3.default)({}, theme.breakpoints.down(key), hidden);

    return styles;
  }, {});
}

var styles = function styles(theme) {
  return generateStyles(theme);
};

/**
 * @ignore - internal component.
 */
function HiddenCss(props) {
  var children = props.children,
      classes = props.classes,
      only = props.only,
      xsUp = props.xsUp,
      smUp = props.smUp,
      mdUp = props.mdUp,
      lgUp = props.lgUp,
      xlUp = props.xlUp,
      xsDown = props.xsDown,
      smDown = props.smDown,
      mdDown = props.mdDown,
      lgDown = props.lgDown,
      xlDown = props.xlDown,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'only', 'xsUp', 'smUp', 'mdUp', 'lgUp', 'xlUp', 'xsDown', 'smDown', 'mdDown', 'lgDown', 'xlDown']);


  process.env.NODE_ENV !== "production" ? (0, _warning2.default)((0, _keys2.default)(other).length === 0 || (0, _keys2.default)(other).length === 1 && other.hasOwnProperty('ref'), 'Material-UI: unsupported properties received ' + (0, _keys2.default)(other).join(', ') + ' by `<Hidden />`.') : void 0;

  var className = [];

  for (var i = 0; i < _createBreakpoints.keys.length; i += 1) {
    var breakpoint = _createBreakpoints.keys[i];
    var breakpointUp = props[breakpoint + 'Up'];
    var breakpointDown = props[breakpoint + 'Down'];

    if (breakpointUp) {
      className.push(classes[breakpoint + 'Up']);
    }
    if (breakpointDown) {
      className.push(classes[breakpoint + 'Down']);
    }
  }

  if (only) {
    className.push(classes['only' + (0, _helpers.capitalizeFirstLetter)(only)]);
  }

  return _react2.default.createElement(
    'span',
    { className: className },
    children
  );
}

HiddenCss.propTypes = process.env.NODE_ENV !== "production" ? babelPluginFlowReactPropTypes_proptype_Props : {};
exports.default = (0, _withStyles2.default)(styles, { name: 'MuiHiddenCss' })(HiddenCss);