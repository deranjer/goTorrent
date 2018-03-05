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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      color: 'inherit',
      display: 'table-row',
      height: 48,
      '&:focus': {
        outline: 'none'
      },
      verticalAlign: 'middle'
    },
    typeHead: {
      height: 56
    },
    typeFooter: {
      height: 56
    },
    selected: {
      backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.04)' // grey[100]
      : 'rgba(255, 255, 255, 0.08)'
    },
    hover: {
      '&:hover': {
        backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.07)' // grey[200]
        : 'rgba(255, 255, 255, 0.14)'
      }
    }
  };
};

/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */
function TableRow(props, context) {
  var _classNames;

  var classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      hover = props.hover,
      selected = props.selected,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'component', 'hover', 'selected']);
  var table = context.table;


  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.typeHead, table && table.head), (0, _defineProperty3.default)(_classNames, classes.typeFooter, table && table.footer), (0, _defineProperty3.default)(_classNames, classes.hover, table && hover), (0, _defineProperty3.default)(_classNames, classes.selected, table && selected), _classNames), classNameProp);

  return _react2.default.createElement(Component, (0, _extends3.default)({ className: className }, other));
}

TableRow.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Should be valid `<tr>` children such as `TableCell`.
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  /**
   * If `true`, the table row will shade on hover.
   */
  hover: _propTypes2.default.bool,
  /**
   * If `true`, the table row will have the selected shading.
   */
  selected: _propTypes2.default.bool
} : {};

TableRow.defaultProps = {
  component: 'tr',
  hover: false,
  selected: false
};

TableRow.contextTypes = {
  table: _propTypes2.default.object
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTableRow' })(TableRow);