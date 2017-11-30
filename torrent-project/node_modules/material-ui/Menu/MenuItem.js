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

var _ref;
// @inheritedComponent ListItem

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ListItem = require('../List/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_ElementType = require('react').babelPluginFlowReactPropTypes_proptype_ElementType || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: (0, _extends3.default)({}, theme.typography.subheading, {
      height: 24,
      boxSizing: 'content-box',
      background: 'none',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '&:focus': {
        background: theme.palette.text.divider
      },
      '&:hover': {
        backgroundColor: theme.palette.text.divider
      }
    }),
    selected: {
      backgroundColor: theme.palette.text.divider
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Menu item contents.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType),

  /**
   * @ignore
   */
  role: require('prop-types').string,

  /**
   * Use to apply selected styling.
   */
  selected: require('prop-types').bool
};


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

MenuItem.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  role: require('prop-types').string.isRequired,
  selected: require('prop-types').bool.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'component', typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType)), (0, _defineProperty3.default)(_ref, 'role', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'selected', require('prop-types').bool), _ref) : {};
MenuItem.defaultProps = {
  role: 'menuitem',
  selected: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiMenuItem' })(MenuItem);