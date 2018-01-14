'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      height: 1,
      margin: 0, // Reset browser default style.
      border: 'none',
      flexShrink: 0
    },
    default: {
      backgroundColor: theme.palette.text.divider
    },
    inset: {
      marginLeft: 72
    },
    light: {
      backgroundColor: theme.palette.text.lightDivider
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  absolute: require('prop-types').bool,

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * If `true`, the divider will be indented.
   */
  inset: require('prop-types').bool,

  /**
   * If `true`, the divider will have a lighter color.
   */
  light: require('prop-types').bool
};


function Divider(props) {
  var _classNames;

  var absolute = props.absolute,
      classes = props.classes,
      classNameProp = props.className,
      inset = props.inset,
      light = props.light,
      other = (0, _objectWithoutProperties3.default)(props, ['absolute', 'classes', 'className', 'inset', 'light']);


  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.absolute, absolute), (0, _defineProperty3.default)(_classNames, classes.inset, inset), (0, _defineProperty3.default)(_classNames, light ? classes.light : classes.default, true), _classNames), classNameProp);

  return _react2.default.createElement('hr', (0, _extends3.default)({ className: className }, other));
}

Divider.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  absolute: require('prop-types').bool
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'inset', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'light', require('prop-types').bool), _ref) : {};
Divider.defaultProps = {
  absolute: false,
  inset: false,
  light: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiDivider' })(Divider);