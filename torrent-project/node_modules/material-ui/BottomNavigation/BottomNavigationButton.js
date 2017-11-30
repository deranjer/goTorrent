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

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ButtonBase = require('../ButtonBase');

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = require('react').babelPluginFlowReactPropTypes_proptype_Element || require('prop-types').any;
// @inheritedComponent ButtonBase

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      transition: theme.transitions.create(['color', 'padding-top'], {
        duration: theme.transitions.duration.short
      }),
      paddingTop: 8,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
      minWidth: 80,
      maxWidth: 168,
      color: theme.palette.text.secondary,
      flex: '1'
    },
    selected: {
      paddingTop: 6,
      color: theme.palette.primary[500]
    },
    selectedIconOnly: {
      paddingTop: theme.spacing.unit * 2
    },
    wrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'column'
    },
    label: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(theme.typography.fontSize - 2),
      opacity: 1,
      transition: 'font-size 0.2s, opacity 0.2s',
      transitionDelay: '0.1s'
    },
    selectedLabel: {
      fontSize: theme.typography.pxToRem(theme.typography.fontSize)
    },
    hiddenLabel: {
      opacity: 0,
      transitionDelay: '0s'
    },
    icon: {
      display: 'block',
      margin: 'auto'
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
   * The icon element. If a string is provided, it will be used as a font ligature.
   */
  icon: require('prop-types').oneOfType([require('prop-types').string, typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element)]),

  /**
   * The label element.
   */
  label: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * @ignore
   */
  onChange: require('prop-types').func,

  /**
   * @ignore
   */
  onClick: require('prop-types').func,

  /**
   * @ignore
   */
  selected: require('prop-types').bool,

  /**
   * If `true`, the BottomNavigationButton will show its label.
   */
  showLabel: require('prop-types').bool,

  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: require('prop-types').any
};

var BottomNavigationButton = function (_React$Component) {
  (0, _inherits3.default)(BottomNavigationButton, _React$Component);

  function BottomNavigationButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BottomNavigationButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BottomNavigationButton.__proto__ || (0, _getPrototypeOf2.default)(BottomNavigationButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          value = _this$props.value,
          onClick = _this$props.onClick;


      if (onChange) {
        onChange(event, value);
      }

      if (onClick) {
        onClick(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BottomNavigationButton, [{
    key: 'render',
    value: function render() {
      var _classNames, _classNames2;

      var _props = this.props,
          label = _props.label,
          iconProp = _props.icon,
          selected = _props.selected,
          classes = _props.classes,
          classNameProp = _props.className,
          showLabelProp = _props.showLabel,
          onChange = _props.onChange,
          value = _props.value,
          other = (0, _objectWithoutProperties3.default)(_props, ['label', 'icon', 'selected', 'classes', 'className', 'showLabel', 'onChange', 'value']);


      var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.selected, selected), (0, _defineProperty3.default)(_classNames, classes.selectedIconOnly, !showLabelProp && !selected), _classNames), classNameProp);

      var icon = null;

      if (iconProp) {
        if (_react2.default.isValidElement(iconProp) && typeof iconProp !== 'string') {
          icon = _react2.default.cloneElement(iconProp, {
            className: (0, _classnames2.default)(classes.icon, iconProp.props.className)
          });
        } else {
          icon = _react2.default.createElement(
            _Icon2.default,
            null,
            iconProp
          );
        }
      }

      var labelClassName = (0, _classnames2.default)(classes.label, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.selectedLabel, selected), (0, _defineProperty3.default)(_classNames2, classes.hiddenLabel, !showLabelProp && !selected), _classNames2));

      return _react2.default.createElement(
        _ButtonBase2.default,
        (0, _extends3.default)({ className: className, focusRipple: true }, other, { onClick: this.handleChange }),
        _react2.default.createElement(
          'span',
          { className: classes.wrapper },
          icon,
          _react2.default.createElement(
            'span',
            { className: labelClassName },
            label
          )
        )
      );
    }
  }]);
  return BottomNavigationButton;
}(_react2.default.Component);

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiBottomNavigationButton' })(BottomNavigationButton);