'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ButtonBase = require('../ButtonBase');

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @inheritedComponent ButtonBase

var styles = exports.styles = function styles(theme) {
  return {
    root: (0, _extends4.default)({}, theme.typography.button, (0, _defineProperty3.default)({
      maxWidth: 264,
      position: 'relative',
      minWidth: 72,
      padding: 0,
      height: 48,
      flex: 'none',
      overflow: 'hidden'
    }, theme.breakpoints.up('md'), {
      minWidth: 160
    })),
    rootLabelIcon: {
      height: 72
    },
    rootInherit: {
      color: 'inherit',
      opacity: 0.7
    },
    rootPrimary: {
      color: theme.palette.text.secondary
    },
    rootPrimarySelected: {
      color: theme.palette.primary.main
    },
    rootPrimaryDisabled: {
      color: theme.palette.text.disabled
    },
    rootSecondary: {
      color: theme.palette.text.secondary
    },
    rootSecondarySelected: {
      color: theme.palette.secondary.main
    },
    rootSecondaryDisabled: {
      color: theme.palette.text.disabled
    },
    rootInheritSelected: {
      opacity: 1
    },
    rootInheritDisabled: {
      opacity: 0.4
    },
    fullWidth: {
      flexGrow: 1
    },
    wrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'column'
    },
    labelContainer: (0, _defineProperty3.default)({
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 12,
      paddingRight: 12
    }, theme.breakpoints.up('md'), {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }),
    label: (0, _defineProperty3.default)({
      fontSize: theme.typography.pxToRem(theme.typography.fontSize),
      whiteSpace: 'normal'
    }, theme.breakpoints.up('md'), {
      fontSize: theme.typography.pxToRem(theme.typography.fontSize - 1)
    }),
    labelWrapped: (0, _defineProperty3.default)({}, theme.breakpoints.down('sm'), {
      fontSize: theme.typography.pxToRem(theme.typography.fontSize - 2)
    })
  };
};

var Tab = function (_React$Component) {
  (0, _inherits3.default)(Tab, _React$Component);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tab.__proto__ || (0, _getPrototypeOf2.default)(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      wrappedText: false
    }, _this.handleChange = function (event) {
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
    }, _this.label = undefined, _this.checkTextWrap = function () {
      if (_this.label) {
        var wrappedText = _this.label.getClientRects().length > 1;
        if (_this.state.wrappedText !== wrappedText) {
          _this.setState({ wrappedText: wrappedText });
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Tab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkTextWrap();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.wrappedText === prevState.wrappedText) {
        /**
         * At certain text and tab lengths, a larger font size may wrap to two lines while the smaller
         * font size still only requires one line.  This check will prevent an infinite render loop
         * fron occurring in that scenario.
         */
        this.checkTextWrap();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _classNames2;

      var _props = this.props,
          classes = _props.classes,
          classNameProp = _props.className,
          disabled = _props.disabled,
          fullWidth = _props.fullWidth,
          icon = _props.icon,
          indicator = _props.indicator,
          labelProp = _props.label,
          onChange = _props.onChange,
          selected = _props.selected,
          styleProp = _props.style,
          textColor = _props.textColor,
          value = _props.value,
          other = (0, _objectWithoutProperties3.default)(_props, ['classes', 'className', 'disabled', 'fullWidth', 'icon', 'indicator', 'label', 'onChange', 'selected', 'style', 'textColor', 'value']);


      var label = void 0;

      if (labelProp !== undefined) {
        label = _react2.default.createElement(
          'span',
          { className: classes.labelContainer },
          _react2.default.createElement(
            'span',
            {
              className: (0, _classnames2.default)(classes.label, (0, _defineProperty3.default)({}, classes.labelWrapped, this.state.wrappedText)),
              ref: function ref(node) {
                _this2.label = node;
              }
            },
            labelProp
          )
        );
      }

      var className = (0, _classnames2.default)(classes.root, classes['root' + (0, _helpers.capitalize)(textColor)], (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes['root' + (0, _helpers.capitalize)(textColor) + 'Disabled'], disabled), (0, _defineProperty3.default)(_classNames2, classes['root' + (0, _helpers.capitalize)(textColor) + 'Selected'], selected), (0, _defineProperty3.default)(_classNames2, classes.rootLabelIcon, icon && label), (0, _defineProperty3.default)(_classNames2, classes.fullWidth, fullWidth), _classNames2), classNameProp);

      var style = {};

      if (textColor !== 'secondary' && textColor !== 'inherit') {
        style.color = textColor;
      }

      style = (0, _keys2.default)(style).length > 0 ? (0, _extends4.default)({}, style, styleProp) : styleProp;

      return _react2.default.createElement(
        _ButtonBase2.default,
        (0, _extends4.default)({
          focusRipple: true,
          className: className,
          style: style,
          role: 'tab',
          'aria-selected': selected,
          disabled: disabled
        }, other, {
          onClick: this.handleChange
        }),
        _react2.default.createElement(
          'span',
          { className: classes.wrapper },
          icon,
          label
        ),
        indicator
      );
    }
  }]);
  return Tab;
}(_react2.default.Component);

Tab.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * If `true`, the tab will be disabled.
   */
  disabled: _propTypes2.default.bool,
  /**
   * @ignore
   */
  fullWidth: _propTypes2.default.bool,
  /**
   * The icon element.
   */
  icon: _propTypes2.default.node,
  /**
   * @ignore
   * For server side rendering consideration, we let the selected tab
   * render the indicator.
   */
  indicator: _propTypes2.default.node,
  /**
   * The label element.
   */
  label: _propTypes2.default.node,
  /**
   * @ignore
   */
  onChange: _propTypes2.default.func,
  /**
   * @ignore
   */
  onClick: _propTypes2.default.func,
  /**
   * @ignore
   */
  selected: _propTypes2.default.bool,
  /**
   * @ignore
   */
  style: _propTypes2.default.object,
  /**
   * @ignore
   */
  textColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.oneOf(['secondary', 'primary', 'inherit'])]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: _propTypes2.default.any
} : {};

Tab.defaultProps = {
  disabled: false,
  textColor: 'inherit'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTab' })(Tab);