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

var _Typography = require('../Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      maxHeight: '2em',
      alignItems: 'center'
    },
    positionStart: {
      marginRight: theme.spacing.unit
    },
    positionEnd: {
      marginLeft: theme.spacing.unit
    }
  };
};

function InputAdornment(props) {
  var _classNames;

  var children = props.children,
      Component = props.component,
      classes = props.classes,
      className = props.className,
      disableTypography = props.disableTypography,
      position = props.position,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'component', 'classes', 'className', 'disableTypography', 'position']);


  return _react2.default.createElement(
    Component,
    (0, _extends3.default)({
      className: (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.positionStart, position === 'start'), (0, _defineProperty3.default)(_classNames, classes.positionEnd, position === 'end'), _classNames), className)
    }, other),
    typeof children === 'string' && !disableTypography ? _react2.default.createElement(
      _Typography2.default,
      { color: 'textSecondary' },
      children
    ) : children
  );
}

InputAdornment.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: _propTypes2.default.node.isRequired,
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
   * If children is a string then disable wrapping in a Typography component.
   */
  disableTypography: _propTypes2.default.bool,
  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position: _propTypes2.default.oneOf(['start', 'end'])
} : {};

InputAdornment.defaultProps = {
  component: 'div',
  disableTypography: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiInputAdornment' })(InputAdornment);