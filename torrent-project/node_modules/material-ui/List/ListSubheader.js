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

var _ref; //  weak

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      boxSizing: 'border-box',
      lineHeight: '48px',
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      color: theme.palette.text.secondary,
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(theme.typography.fontSize)
    },
    colorPrimary: {
      color: theme.palette.primary[500]
    },
    colorInherit: {
      color: 'inherit'
    },
    inset: {
      paddingLeft: theme.spacing.unit * 9
    },
    sticky: {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: 'inherit'
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * The content of the component.
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
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: require('prop-types').oneOf(['default', 'primary', 'inherit']),

  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   */
  disableSticky: require('prop-types').bool,

  /**
   * If `true`, the List Subheader will be indented.
   */
  inset: require('prop-types').bool
};


function ListSubheader(props) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      disableSticky = props.disableSticky,
      inset = props.inset,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'color', 'disableSticky', 'inset']);

  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes['color' + (0, _helpers.capitalizeFirstLetter)(color)], color !== 'default'), (0, _defineProperty3.default)(_classNames, classes.inset, inset), (0, _defineProperty3.default)(_classNames, classes.sticky, !disableSticky), _classNames), classNameProp);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    children
  );
}

ListSubheader.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'color', require('prop-types').oneOf(['default', 'primary', 'inherit'])), (0, _defineProperty3.default)(_ref, 'disableSticky', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'inset', require('prop-types').bool), _ref) : {};
ListSubheader.defaultProps = {
  color: 'default',
  disableSticky: false,
  inset: false
};

ListSubheader.muiName = 'ListSubheader';

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiListSubheader' })(ListSubheader);