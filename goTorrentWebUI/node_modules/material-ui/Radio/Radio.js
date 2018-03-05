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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SwitchBase = require('../internal/SwitchBase');

var _SwitchBase2 = _interopRequireDefault(_SwitchBase);

var _RadioButtonChecked = require('../internal/svg-icons/RadioButtonChecked');

var _RadioButtonChecked2 = _interopRequireDefault(_RadioButtonChecked);

var _RadioButtonUnchecked = require('../internal/svg-icons/RadioButtonUnchecked');

var _RadioButtonUnchecked2 = _interopRequireDefault(_RadioButtonUnchecked);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    default: {
      color: theme.palette.text.secondary
    },
    checked: {},
    checkedPrimary: {
      color: theme.palette.primary.main
    },
    checkedSecondary: {
      color: theme.palette.secondary.main
    },
    disabled: {
      color: theme.palette.action.disabled
    }
  };
};

var _ref = _react2.default.createElement(_RadioButtonUnchecked2.default, null);

var _ref2 = _react2.default.createElement(_RadioButtonChecked2.default, null);

function Radio(props) {
  var _classNames;

  var classes = props.classes,
      color = props.color,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'color']);

  var checkedClass = (0, _classnames2.default)(classes.checked, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.checkedPrimary, color === 'primary'), (0, _defineProperty3.default)(_classNames, classes.checkedSecondary, color === 'secondary'), _classNames));

  return _react2.default.createElement(_SwitchBase2.default, (0, _extends3.default)({
    type: 'radio',
    icon: _ref,
    checkedIcon: _ref2,
    classes: {
      default: classes.default,
      checked: checkedClass,
      disabled: classes.disabled
    }
  }, other));
}

Radio.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the component is checked.
   */
  checked: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: _propTypes2.default.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: _propTypes2.default.oneOf(['primary', 'secondary']),
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: _propTypes2.default.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: _propTypes2.default.bool,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: _propTypes2.default.node,
  /**
   * The id of the `input` element.
   */
  id: _propTypes2.default.string,
  /**
   * Properties applied to the `input` element.
   */
  inputProps: _propTypes2.default.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: _propTypes2.default.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: _propTypes2.default.func,
  /**
   * The input component property `type`.
   */
  type: _propTypes2.default.string,
  /**
   * The value of the component.
   */
  value: _propTypes2.default.string
} : {};

Radio.defaultProps = {
  color: 'secondary'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiRadio' })(Radio);