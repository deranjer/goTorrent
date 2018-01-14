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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Typography = require('../Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      flex: '1 1 auto',
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
    text: {}, // Present to allow external customization
    textDense: {
      fontSize: 'inherit'
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, that can be useful to can render an h4 instead of a
   */
  disableTypography: require('prop-types').bool,

  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   */
  inset: require('prop-types').bool,
  primary: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),
  secondary: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
};


function ListItemText(props, context) {
  var _classNames;

  var classes = props.classes,
      classNameProp = props.className,
      disableTypography = props.disableTypography,
      primary = props.primary,
      secondary = props.secondary,
      inset = props.inset,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'disableTypography', 'primary', 'secondary', 'inset']);
  var dense = context.dense;

  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.dense, dense), (0, _defineProperty3.default)(_classNames, classes.inset, inset), _classNames), classNameProp);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    primary && (disableTypography ? primary : _react2.default.createElement(
      _Typography2.default,
      {
        type: 'subheading',
        className: (0, _classnames2.default)(classes.text, (0, _defineProperty3.default)({}, classes.textDense, dense))
      },
      primary
    )),
    secondary && (disableTypography ? secondary : _react2.default.createElement(
      _Typography2.default,
      {
        color: 'secondary',
        type: 'body1',
        className: (0, _classnames2.default)(classes.text, (0, _defineProperty3.default)({}, classes.textDense, dense))
      },
      secondary
    ))
  );
}

ListItemText.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'disableTypography', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'inset', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'primary', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)), (0, _defineProperty3.default)(_ref, 'secondary', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)), _ref) : {};
ListItemText.defaultProps = {
  disableTypography: false,
  primary: false,
  secondary: false,
  inset: false
};

ListItemText.contextTypes = {
  dense: _propTypes2.default.bool
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiListItemText' })(ListItemText);