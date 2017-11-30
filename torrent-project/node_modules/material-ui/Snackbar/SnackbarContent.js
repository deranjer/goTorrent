'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ref;
// @inheritedComponent Paper

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Typography = require('../Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  var _root;

  var type = theme.palette.type === 'light' ? 'dark' : 'light';
  var backgroundColor = theme.palette.shades[type].background.default;

  return {
    root: (_root = {
      pointerEvents: 'initial',
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor: backgroundColor,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '6px ' + theme.spacing.unit * 3 + 'px'
    }, (0, _defineProperty3.default)(_root, theme.breakpoints.up('md'), {
      minWidth: 288,
      maxWidth: 568,
      borderRadius: 2
    }), (0, _defineProperty3.default)(_root, theme.breakpoints.down('md'), {
      flexGrow: 1
    }), _root),
    message: {
      padding: theme.spacing.unit + 'px 0'
    },
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: theme.spacing.unit * 3,
      marginRight: -theme.spacing.unit
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * The action to display.
   */
  action: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * The message to display.
   */
  message: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired
};


function SnackbarContent(props) {
  var action = props.action,
      classes = props.classes,
      className = props.className,
      message = props.message,
      other = (0, _objectWithoutProperties3.default)(props, ['action', 'classes', 'className', 'message']);


  return _react2.default.createElement(
    _Paper2.default,
    (0, _extends3.default)({
      component: _Typography2.default,
      headlineMapping: {
        body1: 'div'
      },
      role: 'alertdialog',
      square: true,
      elevation: 6,
      className: (0, _classnames2.default)(classes.root, className)
    }, other),
    _react2.default.createElement(
      'div',
      { className: classes.message },
      message
    ),
    action ? _react2.default.createElement(
      'div',
      { className: classes.action },
      action
    ) : null
  );
}

SnackbarContent.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  action: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'message', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired), _ref) : {};
exports.default = (0, _withStyles2.default)(styles, { name: 'MuiSnackbarContent' })(SnackbarContent);