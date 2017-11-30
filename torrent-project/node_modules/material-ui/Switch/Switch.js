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

var _ref; //  weak

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _SwitchBase = require('../internal/SwitchBase');

var _SwitchBase2 = _interopRequireDefault(_SwitchBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'inline-flex',
      width: 62,
      position: 'relative',
      flexShrink: 0
    },
    bar: {
      borderRadius: 7,
      display: 'block',
      position: 'absolute',
      width: 34,
      height: 14,
      top: '50%',
      marginTop: -7,
      left: '50%',
      marginLeft: -17,
      transition: theme.transitions.create(['opacity', 'background-color'], {
        duration: theme.transitions.duration.shortest
      }),
      backgroundColor: theme.palette.type === 'light' ? '#000' : '#fff',
      opacity: theme.palette.type === 'light' ? 0.38 : 0.3
    },
    icon: {
      boxShadow: theme.shadows[1],
      backgroundColor: 'currentColor',
      width: 20,
      height: 20,
      borderRadius: '50%'
    },
    // For SwitchBase
    default: {
      zIndex: 1,
      color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    checked: {
      color: theme.palette.primary[500],
      transform: 'translateX(14px)',
      '& + $bar': {
        backgroundColor: theme.palette.primary[500],
        opacity: 0.5
      }
    },
    disabled: {
      color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
      '& + $bar': {
        backgroundColor: theme.palette.type === 'light' ? '#000' : '#fff',
        opacity: theme.palette.type === 'light' ? 0.12 : 0.1
      }
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


function Switch(props) {
  var classes = props.classes,
      className = props.className,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className']);

  var icon = _react2.default.createElement('div', { className: classes.icon });

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(classes.root, className) },
    _react2.default.createElement(SwitchBase, (0, _extends3.default)({
      icon: icon,
      classes: {
        default: classes.default,
        checked: classes.checked,
        disabled: classes.disabled
      },
      checkedIcon: icon
    }, other)),
    _react2.default.createElement('div', { className: classes.bar })
  );
}

Switch.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  checked: require('prop-types').oneOfType([require('prop-types').bool, require('prop-types').string]),
  checkedClassName: require('prop-types').string,
  checkedIcon: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'defaultChecked', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'disabled', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'disabledClassName', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'disableRipple', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'icon', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)), (0, _defineProperty3.default)(_ref, 'inputProps', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'inputRef', require('prop-types').func), (0, _defineProperty3.default)(_ref, 'name', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'onChange', require('prop-types').func), (0, _defineProperty3.default)(_ref, 'tabIndex', require('prop-types').oneOfType([require('prop-types').number, require('prop-types').string])), (0, _defineProperty3.default)(_ref, 'value', require('prop-types').string), _ref) : {};
exports.default = (0, _withStyles2.default)(styles, { name: 'MuiSwitch' })(Switch);