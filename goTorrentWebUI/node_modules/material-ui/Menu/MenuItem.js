'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ListItem = require('../List/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: (0, _extends3.default)({}, theme.typography.subheading, {
      height: theme.spacing.unit * 3,
      boxSizing: 'content-box',
      width: 'auto',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '&$selected': {
        backgroundColor: theme.palette.action.selected
      }
    }),
    selected: {}
  };
}; // @inheritedComponent ListItem

function MenuItem(props) {
  var classes = props.classes,
      classNameProp = props.className,
      component = props.component,
      selected = props.selected,
      role = props.role,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'component', 'selected', 'role']);


  var className = (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.selected, selected), classNameProp);

  return _react2.default.createElement(_ListItem2.default, (0, _extends3.default)({
    button: true,
    role: role,
    tabIndex: -1,
    className: className,
    component: component
  }, other));
}

MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Menu item contents.
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
   * @ignore
   */
  role: _propTypes2.default.string,
  /**
   * Use to apply selected styling.
   */
  selected: _propTypes2.default.bool
} : {};

MenuItem.defaultProps = {
  component: 'li',
  role: 'menuitem',
  selected: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiMenuItem' })(MenuItem);