'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _SwitchBase = require('../internal/SwitchBase');

var _SwitchBase2 = _interopRequireDefault(_SwitchBase);

var _IndeterminateCheckBox = require('../svg-icons/IndeterminateCheckBox');

var _IndeterminateCheckBox2 = _interopRequireDefault(_IndeterminateCheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    default: {
      color: theme.palette.text.secondary
    },
    checked: {
      color: theme.palette.primary[500]
    },
    disabled: {
      color: theme.palette.action.disabled
    }
  };
};

var SwitchBase = (0, _SwitchBase2.default)();

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * If `true`, the component is checked.
   */
  checked: require('prop-types').oneOfType([require('prop-types').bool, require('prop-types').string]),

  /**
   * The CSS class name of the root element when checked.
   */
  checkedClassName: require('prop-types').string,

  /**
   * The icon to display when the component is checked.
   * If a string is provided, it will be used as a font ligature.
   */
  checkedIcon: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * @ignore
   */
  defaultChecked: require('prop-types').bool,

  /**
   * If `true`, the switch will be disabled.
   */
  disabled: require('prop-types').bool,

  /**
   * The CSS class name of the root element when disabled.
   */
  disabledClassName: require('prop-types').string,

  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: require('prop-types').bool,

  /**
   * The icon to display when the component is unchecked.
   * If a string is provided, it will be used as a font ligature.
   */
  icon: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * If `true`, the component appears indeterminate.
   */
  indeterminate: require('prop-types').bool,

  /**
   * The icon to display when the component is indeterminate.
   * If a string is provided, it will be used as a font ligature.
   */
  indeterminateIcon: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * Properties applied to the `input` element.
   */
  inputProps: require('prop-types').object,

  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: require('prop-types').func,

  /*
   * @ignore
   */
  name: require('prop-types').string,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: require('prop-types').func,

  /**
   * @ignore
   */
  tabIndex: require('prop-types').oneOfType([require('prop-types').number, require('prop-types').string]),

  /**
   * The value of the component.
   */
  value: require('prop-types').string
};


function Checkbox(props) {
  var checkedIcon = props.checkedIcon,
      icon = props.icon,
      indeterminate = props.indeterminate,
      indeterminateIcon = props.indeterminateIcon,
      other = (0, _objectWithoutProperties3.default)(props, ['checkedIcon', 'icon', 'indeterminate', 'indeterminateIcon']);


  return _react2.default.createElement(SwitchBase, (0, _extends3.default)({
    checkedIcon: indeterminate ? indeterminateIcon : checkedIcon,
    icon: indeterminate ? indeterminateIcon : icon
  }, other));
}

Checkbox.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  checked: require('prop-types').oneOfType([require('prop-types').bool, require('prop-types').string]),
  checkedClassName: require('prop-types').string,
  checkedIcon: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'defaultChecked', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'disabled', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'disabledClassName', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'disableRipple', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'icon', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)), (0, _defineProperty3.default)(_ref, 'indeterminate', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'indeterminateIcon', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)), (0, _defineProperty3.default)(_ref, 'inputProps', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'inputRef', require('prop-types').func), (0, _defineProperty3.default)(_ref, 'name', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'onChange', require('prop-types').func), (0, _defineProperty3.default)(_ref, 'tabIndex', require('prop-types').oneOfType([require('prop-types').number, require('prop-types').string])), (0, _defineProperty3.default)(_ref, 'value', require('prop-types').string), _ref) : {};
Checkbox.defaultProps = {
  indeterminate: false,
  indeterminateIcon: _react2.default.createElement(_IndeterminateCheckBox2.default, null)
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiCheckbox' })(Checkbox);