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

var _ref;

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
      userSelect: 'none'
    },
    colorAccent: {
      color: theme.palette.secondary.A200
    },
    colorAction: {
      color: theme.palette.action.active
    },
    colorContrast: {
      color: theme.palette.getContrastText(theme.palette.primary[500])
    },
    colorDisabled: {
      color: theme.palette.action.disabled
    },
    colorError: {
      color: theme.palette.error[500]
    },
    colorPrimary: {
      color: theme.palette.primary[500]
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Color = require('prop-types').oneOf(['inherit', 'accent', 'action', 'contrast', 'disabled', 'error', 'primary']);

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * The name of the icon font ligature.
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
  color: require('prop-types').oneOf(['inherit', 'accent', 'action', 'contrast', 'disabled', 'error', 'primary'])
};


function Icon(props) {
  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'color']);


  var className = (0, _classnames2.default)('material-icons', classes.root, (0, _defineProperty3.default)({}, classes['color' + (0, _helpers.capitalizeFirstLetter)(color)], color !== 'inherit'), classNameProp);

  return _react2.default.createElement(
    'span',
    (0, _extends3.default)({ className: className, 'aria-hidden': 'true' }, other),
    children
  );
}

Icon.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  color: require('prop-types').oneOf(['inherit', 'accent', 'action', 'contrast', 'disabled', 'error', 'primary']).isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'color', require('prop-types').oneOf(['inherit', 'accent', 'action', 'contrast', 'disabled', 'error', 'primary'])), _ref) : {};
Icon.defaultProps = {
  color: 'inherit'
};

Icon.muiName = 'Icon';

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiIcon' })(Icon);