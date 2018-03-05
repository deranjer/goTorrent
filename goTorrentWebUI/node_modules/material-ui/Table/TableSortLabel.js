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

var _ArrowDownward = require('../internal/svg-icons/ArrowDownward');

var _ArrowDownward2 = _interopRequireDefault(_ArrowDownward);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ButtonBase = require('../ButtonBase');

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @inheritedComponent ButtonBase

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'flex-start',
      flexDirection: 'inherit',
      alignItems: 'center',
      '&:hover': {
        color: theme.palette.text.primary
      },
      '&:focus': {
        color: theme.palette.text.primary
      }
    },
    active: {
      color: theme.palette.text.primary,
      '& $icon': {
        opacity: 1
      }
    },
    icon: {
      height: 16,
      marginRight: 4,
      marginLeft: 4,
      opacity: 0,
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter
      }),
      userSelect: 'none',
      width: 16
    },
    desc: {
      transform: 'rotate(0deg)'
    },
    asc: {
      transform: 'rotate(180deg)'
    }
  };
};

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
function TableSortLabel(props) {
  var active = props.active,
      classes = props.classes,
      classNameProp = props.className,
      children = props.children,
      direction = props.direction,
      other = (0, _objectWithoutProperties3.default)(props, ['active', 'classes', 'className', 'children', 'direction']);

  var className = (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.active, active), classNameProp);

  var iconClassName = (0, _classnames2.default)(classes.icon, (0, _defineProperty3.default)({}, classes[direction], !!direction));

  return _react2.default.createElement(
    _ButtonBase2.default,
    (0, _extends3.default)({ className: className, component: 'span', disableRipple: true }, other),
    children,
    _react2.default.createElement(_ArrowDownward2.default, { className: iconClassName })
  );
}

TableSortLabel.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   */
  active: _propTypes2.default.bool,
  /**
   * Label contents, the arrow will be appended automatically.
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
   * The current sort direction.
   */
  direction: _propTypes2.default.oneOf(['asc', 'desc'])
} : {};

TableSortLabel.defaultProps = {
  active: false,
  direction: 'desc'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTableSortLabel' })(TableSortLabel);