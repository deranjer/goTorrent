'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ref; //  weak

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      position: 'absolute',
      right: 4,
      top: '50%',
      marginTop: -theme.spacing.unit * 3
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * The content of the component, normally an `IconButton` or selection control.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string
};


function ListItemSecondaryAction(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className;


  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(classes.root, className) },
    children
  );
}

ListItemSecondaryAction.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), _ref) : {};
ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiListItemSecondaryAction' })(ListItemSecondaryAction);