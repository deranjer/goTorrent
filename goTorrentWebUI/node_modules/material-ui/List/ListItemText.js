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

var _Typography = require('../Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      flex: '1 1 auto',
      minWidth: 0,
      padding: '0 16px',
      '&:first-child': {
        paddingLeft: 0
      }
    },
    inset: {
      '&:first-child': {
        paddingLeft: theme.spacing.unit * 7
      }
    },
    dense: {
      fontSize: theme.typography.pxToRem(13)
    },
    primary: {
      '&$textDense': {
        fontSize: 'inherit'
      }
    },
    secondary: {
      '&$textDense': {
        fontSize: 'inherit'
      }
    },
    textDense: {}
  };
};

function ListItemText(props, context) {
  var _classNames;

  var classes = props.classes,
      classNameProp = props.className,
      disableTypography = props.disableTypography,
      inset = props.inset,
      primary = props.primary,
      secondary = props.secondary,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'disableTypography', 'inset', 'primary', 'secondary']);
  var dense = context.dense;

  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.dense, dense), (0, _defineProperty3.default)(_classNames, classes.inset, inset), _classNames), classNameProp);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    primary && (disableTypography ? primary : _react2.default.createElement(
      _Typography2.default,
      {
        variant: 'subheading',
        className: (0, _classnames2.default)(classes.primary, (0, _defineProperty3.default)({}, classes.textDense, dense))
      },
      primary
    )),
    secondary && (disableTypography ? secondary : _react2.default.createElement(
      _Typography2.default,
      {
        variant: 'body1',
        className: (0, _classnames2.default)(classes.secondary, (0, _defineProperty3.default)({}, classes.textDense, dense)),
        color: 'textSecondary'
      },
      secondary
    ))
  );
}

ListItemText.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, that can be useful to can render an h4 instead of a
   */
  disableTypography: _propTypes2.default.bool,
  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   */
  inset: _propTypes2.default.bool,
  primary: _propTypes2.default.node,
  secondary: _propTypes2.default.node
} : {};

ListItemText.defaultProps = {
  disableTypography: false,
  inset: false,
  primary: false,
  secondary: false
};

ListItemText.contextTypes = {
  dense: _propTypes2.default.bool
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiListItemText' })(ListItemText);