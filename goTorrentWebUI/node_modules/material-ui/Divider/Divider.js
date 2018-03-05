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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _colorManipulator = require('../styles/colorManipulator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      height: 1,
      margin: 0, // Reset browser default style.
      border: 'none',
      flexShrink: 0
    },
    inset: {
      marginLeft: 72
    },
    default: {
      backgroundColor: theme.palette.divider
    },
    light: {
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.divider, 0.08)
    },
    absolute: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    }
  };
};

function Divider(props) {
  var _classNames;

  var absolute = props.absolute,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      inset = props.inset,
      light = props.light,
      other = (0, _objectWithoutProperties3.default)(props, ['absolute', 'classes', 'className', 'component', 'inset', 'light']);


  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.absolute, absolute), (0, _defineProperty3.default)(_classNames, classes.inset, inset), _classNames), light ? classes.light : classes.default, classNameProp);

  return _react2.default.createElement(Component, (0, _extends3.default)({ className: className }, other));
}

Divider.propTypes = process.env.NODE_ENV !== "production" ? {
  absolute: _propTypes2.default.bool,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  /**
   * If `true`, the divider will be indented.
   */
  inset: _propTypes2.default.bool,
  /**
   * If `true`, the divider will have a lighter color.
   */
  light: _propTypes2.default.bool
} : {};

Divider.defaultProps = {
  absolute: false,
  component: 'hr',
  inset: false,
  light: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiDivider' })(Divider);