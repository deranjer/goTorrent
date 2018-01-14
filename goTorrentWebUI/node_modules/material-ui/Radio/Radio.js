'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioDocs = exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ref2; //  weak

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _SwitchBase = require('../internal/SwitchBase');

var _SwitchBase2 = _interopRequireDefault(_SwitchBase);

var _RadioButtonChecked = require('../svg-icons/RadioButtonChecked');

var _RadioButtonChecked2 = _interopRequireDefault(_RadioButtonChecked);

var _RadioButtonUnchecked = require('../svg-icons/RadioButtonUnchecked');

var _RadioButtonUnchecked2 = _interopRequireDefault(_RadioButtonUnchecked);

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

var Radio = (0, _withStyles2.default)(styles, { name: 'MuiRadio' })((0, _SwitchBase2.default)({
  inputType: 'radio',
  defaultIcon: _react2.default.createElement(_RadioButtonUnchecked2.default, null),
  defaultCheckedIcon: _react2.default.createElement(_RadioButtonChecked2.default, null)
}));

Radio.displayName = 'Radio';

exports.default = Radio;
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

var _ref = _react2.default.createElement('span', null);

// This is here solely to trigger api doc generation
// eslint-disable-next-line no-unused-vars
var RadioDocs = exports.RadioDocs = function RadioDocs(props) {
  return _ref;
};
RadioDocs.propTypes = process.env.NODE_ENV !== "production" ? (_ref2 = {
  classes: require('prop-types').object.isRequired,
  checked: require('prop-types').oneOfType([require('prop-types').bool, require('prop-types').string]),
  checkedClassName: require('prop-types').string,
  checkedIcon: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref2, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref2, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref2, 'defaultChecked', require('prop-types').bool), (0, _defineProperty3.default)(_ref2, 'disabled', require('prop-types').bool), (0, _defineProperty3.default)(_ref2, 'disabledClassName', require('prop-types').string), (0, _defineProperty3.default)(_ref2, 'disableRipple', require('prop-types').bool), (0, _defineProperty3.default)(_ref2, 'icon', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)), (0, _defineProperty3.default)(_ref2, 'inputProps', require('prop-types').object), (0, _defineProperty3.default)(_ref2, 'inputRef', require('prop-types').func), (0, _defineProperty3.default)(_ref2, 'name', require('prop-types').string), (0, _defineProperty3.default)(_ref2, 'onChange', require('prop-types').func), (0, _defineProperty3.default)(_ref2, 'tabIndex', require('prop-types').oneOfType([require('prop-types').number, require('prop-types').string])), (0, _defineProperty3.default)(_ref2, 'value', require('prop-types').string), _ref2) : {};