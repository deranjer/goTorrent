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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ButtonBase = require('../ButtonBase');

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

var _IconButton = require('../IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @inheritedComponent ButtonBase

var styles = exports.styles = function styles(theme) {
  var transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    root: {
      display: 'flex',
      minHeight: theme.spacing.unit * 6,
      transition: theme.transitions.create(['min-height', 'background-color'], transition),
      padding: '0 ' + theme.spacing.unit * 3 + 'px 0 ' + theme.spacing.unit * 3 + 'px',
      '&:hover:not($disabled)': {
        cursor: 'pointer'
      }
    },
    expanded: {
      minHeight: 64
    },
    focused: {
      backgroundColor: theme.palette.grey[300]
    },
    disabled: {
      opacity: 0.38
    },
    content: {
      display: 'flex',
      flexGrow: 1,
      transition: theme.transitions.create(['margin'], transition),
      margin: '12px 0',
      '& > :last-child': {
        paddingRight: theme.spacing.unit * 4
      }
    },
    contentExpanded: {
      margin: '20px 0'
    },
    expandIcon: {
      position: 'absolute',
      top: '50%',
      right: theme.spacing.unit,
      transform: 'translateY(-50%) rotate(0deg)',
      transition: theme.transitions.create('transform', transition)
    },
    expandIconExpanded: {
      transform: 'translateY(-50%) rotate(180deg)'
    }
  };
};

var ExpansionPanelSummary = function (_React$Component) {
  (0, _inherits3.default)(ExpansionPanelSummary, _React$Component);

  function ExpansionPanelSummary() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ExpansionPanelSummary);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ExpansionPanelSummary.__proto__ || (0, _getPrototypeOf2.default)(ExpansionPanelSummary)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focused: false
    }, _this.handleFocus = function () {
      _this.setState({
        focused: true
      });
    }, _this.handleBlur = function () {
      _this.setState({
        focused: false
      });
    }, _this.handleChange = function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onClick = _this$props.onClick;

      if (onChange) {
        onChange(event);
      }
      if (onClick) {
        onClick(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ExpansionPanelSummary, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          disabled = _props.disabled,
          expanded = _props.expanded,
          expandIcon = _props.expandIcon,
          onChange = _props.onChange,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'classes', 'className', 'disabled', 'expanded', 'expandIcon', 'onChange']);
      var focused = this.state.focused;


      return _react2.default.createElement(
        _ButtonBase2.default,
        (0, _extends3.default)({
          focusRipple: false,
          disableRipple: true,
          disabled: disabled,
          component: 'div',
          'aria-expanded': expanded,
          className: (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, classes.expanded, expanded), (0, _defineProperty3.default)(_classNames, classes.focused, focused), _classNames), className)
        }, other, {
          onKeyboardFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onClick: this.handleChange
        }),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(classes.content, (0, _defineProperty3.default)({}, classes.contentExpanded, expanded)) },
          children
        ),
        expandIcon && _react2.default.createElement(
          _IconButton2.default,
          {
            disabled: disabled,
            className: (0, _classnames2.default)(classes.expandIcon, (0, _defineProperty3.default)({}, classes.expandIconExpanded, expanded)),
            component: 'div',
            tabIndex: -1,
            'aria-hidden': 'true'
          },
          expandIcon
        )
      );
    }
  }]);
  return ExpansionPanelSummary;
}(_react2.default.Component);

ExpansionPanelSummary.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the expansion panel summary.
   */
  children: _propTypes2.default.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * @ignore
   * If `true`, the summary will be displayed in a disabled state.
   */
  disabled: _propTypes2.default.bool,
  /**
   * @ignore
   * If `true`, expands the summary, otherwise collapse it.
   */
  expanded: _propTypes2.default.bool,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: _propTypes2.default.node,
  /**
   * @ignore
   */
  onChange: _propTypes2.default.func,
  /**
   * @ignore
   */
  onClick: _propTypes2.default.func
} : {};

ExpansionPanelSummary.defaultProps = {
  disabled: false
};

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiExpansionPanelSummary' })(ExpansionPanelSummary);