'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPopper = require('react-popper');

var _helpers = require('../utils/helpers');

var _RefHolder = require('../internal/RefHolder');

var _RefHolder2 = _interopRequireDefault(_RefHolder);

var _common = require('../colors/common');

var _common2 = _interopRequireDefault(_common);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/no-multi-comp, no-underscore-dangle */

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'inline',
      flexDirection: 'inherit' // Makes the wrapper more transparent.
    },
    popper: {
      zIndex: theme.zIndex.tooltip
    },
    popperClose: {
      pointerEvents: 'none'
    },
    tooltip: (0, _defineProperty3.default)({
      backgroundColor: theme.palette.grey[700],
      borderRadius: 2,
      color: _common2.default.white,
      fontFamily: theme.typography.fontFamily,
      opacity: 0,
      transform: 'scale(0)',
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shortest
      }),
      minHeight: 0,
      padding: theme.spacing.unit,
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.round(16 / 14) + 'em'
    }, theme.breakpoints.up('sm'), {
      padding: theme.spacing.unit / 2 + 'px ' + theme.spacing.unit + 'px',
      fontSize: theme.typography.pxToRem(10),
      lineHeight: theme.typography.round(14 / 10) + 'em'
    }),
    tooltipLeft: (0, _defineProperty3.default)({
      transformOrigin: 'right center',
      margin: '0 ' + theme.spacing.unit * 3 + 'px'
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),
    tooltipRight: (0, _defineProperty3.default)({
      transformOrigin: 'left center',
      margin: '0 ' + theme.spacing.unit * 3 + 'px'
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),
    tooltipTop: (0, _defineProperty3.default)({
      transformOrigin: 'center bottom',
      margin: theme.spacing.unit * 3 + 'px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    }),
    tooltipBottom: (0, _defineProperty3.default)({
      transformOrigin: 'center top',
      margin: theme.spacing.unit * 3 + 'px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    }),
    tooltipOpen: {
      opacity: 0.9,
      transform: 'scale(1)'
    }
  };
};

function flipPlacement(placement) {
  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

var Tooltip = function (_React$Component) {
  (0, _inherits3.default)(Tooltip, _React$Component);

  function Tooltip() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tooltip.__proto__ || (0, _getPrototypeOf2.default)(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.enterTimer = null, _this.leaveTimer = null, _this.touchTimer = null, _this.isControlled = null, _this.popper = null, _this.children = null, _this.ignoreNonTouchEvents = false, _this.handleResize = (0, _debounce2.default)(function () {
      if (_this.popper) {
        _this.popper._popper.scheduleUpdate();
      }
    }, 166), _this.handleRequestOpen = function (event) {
      var children = _this.props.children;

      var childrenProps = children.props;

      if (event.type === 'focus' && childrenProps.onFocus) {
        childrenProps.onFocus(event);
      }

      if (event.type === 'mouseover' && childrenProps.onMouseOver) {
        childrenProps.onMouseOver(event);
      }

      if (_this.ignoreNonTouchEvents && event.type !== 'touchstart') {
        return;
      }

      clearTimeout(_this.leaveTimer);
      if (_this.props.enterDelay > 0) {
        _this.leaveTimer = setTimeout(function () {
          _this.requestOpen(event);
        }, _this.props.enterDelay);
      } else {
        _this.requestOpen(event);
      }
    }, _this.requestOpen = function (event) {
      if (!_this.isControlled) {
        _this.setState({ open: true });
      }

      if (_this.props.onOpen) {
        _this.props.onOpen(event, true);
      }
    }, _this.handleClose = function (event) {
      var children = _this.props.children;

      var childrenProps = children.props;

      if (event.type === 'blur' && childrenProps.onBlur) {
        childrenProps.onBlur(event);
      }

      if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
        childrenProps.onMouseLeave(event);
      }

      clearTimeout(_this.leaveTimer);
      if (_this.props.leaveDelay) {
        _this.leaveTimer = setTimeout(function () {
          _this.requestClose(event);
        }, _this.props.leaveDelay);
      } else {
        _this.requestClose(event);
      }
    }, _this.requestClose = function (event) {
      _this.ignoreNonTouchEvents = false;

      if (!_this.isControlled) {
        _this.setState({ open: false });
      }

      if (_this.props.onClose) {
        _this.props.onClose(event, false);
      }
    }, _this.handleTouchStart = function (event) {
      _this.ignoreNonTouchEvents = true;
      var children = _this.props.children;

      var childrenProps = children.props;

      if (childrenProps.onTouchStart) {
        childrenProps.onTouchStart(event);
      }

      clearTimeout(_this.touchTimer);
      event.persist();
      _this.touchTimer = setTimeout(function () {
        _this.handleRequestOpen(event);
      }, 1e3);
    }, _this.handleTouchEnd = function (event) {
      var children = _this.props.children;

      var childrenProps = children.props;

      if (childrenProps.onTouchEnd) {
        childrenProps.onTouchEnd(event);
      }

      clearTimeout(_this.touchTimer);
      clearTimeout(_this.leaveTimer);
      event.persist();
      _this.leaveTimer = setTimeout(function () {
        _this.requestClose(event);
      }, 1500 + _this.props.leaveDelay);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Tooltip, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var props = this.props;


      this.isControlled = props.open != null;

      if (!this.isControlled) {
        // not controlled, use internal state
        this.setState({
          open: false
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!this.children || !this.children.disabled || !this.children.tagName.toLowerCase() === 'button', ['Material-UI: you are providing a disabled button children to the Tooltip component.', 'A disabled element do not fire events.', 'But the Tooltip needs to listen to the children element events to display the title.', '', 'Place a `div` over top of the element.'].join('\n')) : void 0;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.enterTimer);
      clearTimeout(this.leaveTimer);
      this.handleResize.cancel();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          childrenProp = _props.children,
          classes = _props.classes,
          className = _props.className,
          disableTriggerFocus = _props.disableTriggerFocus,
          disableTriggerHover = _props.disableTriggerHover,
          disableTriggerTouch = _props.disableTriggerTouch,
          enterDelay = _props.enterDelay,
          id = _props.id,
          leaveDelay = _props.leaveDelay,
          onClose = _props.onClose,
          onOpen = _props.onOpen,
          openProp = _props.open,
          rawPlacement = _props.placement,
          _props$PopperProps = _props.PopperProps;
      _props$PopperProps = _props$PopperProps === undefined ? {} : _props$PopperProps;
      var PopperClassName = _props$PopperProps.PopperClassName,
          PopperOther = (0, _objectWithoutProperties3.default)(_props$PopperProps, ['PopperClassName']),
          theme = _props.theme,
          title = _props.title,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'classes', 'className', 'disableTriggerFocus', 'disableTriggerHover', 'disableTriggerTouch', 'enterDelay', 'id', 'leaveDelay', 'onClose', 'onOpen', 'open', 'placement', 'PopperProps', 'theme', 'title']);


      var placement = theme.direction === 'rtl' ? flipPlacement(rawPlacement) : rawPlacement;
      var open = this.isControlled ? openProp : this.state.open;
      var childrenProps = {};

      if (title === '') {
        open = false;
      }

      childrenProps['aria-describedby'] = id;

      if (!disableTriggerTouch) {
        childrenProps.onTouchStart = this.handleTouchStart;
        childrenProps.onTouchEnd = this.handleTouchEnd;
      }

      if (!disableTriggerHover) {
        childrenProps.onMouseOver = this.handleRequestOpen;
        childrenProps.onMouseLeave = this.handleClose;
      }

      if (!disableTriggerFocus) {
        childrenProps.onFocus = this.handleRequestOpen;
        childrenProps.onBlur = this.handleClose;
      }

      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!childrenProp.props.title, ['Material-UI: you have been providing a `title` property to the child of <Tooltip />.', 'Remove this title property `' + childrenProp.props.title + '` or the Tooltip component.'].join('\n')) : void 0;

      return _react2.default.createElement(
        _reactEventListener2.default,
        { target: 'window', onResize: this.handleResize },
        _react2.default.createElement(
          _reactPopper.Manager,
          (0, _extends3.default)({ className: (0, _classnames2.default)(classes.root, className) }, other),
          _react2.default.createElement(
            _reactPopper.Target,
            null,
            function (_ref2) {
              var targetProps = _ref2.targetProps;
              return _react2.default.createElement(
                _RefHolder2.default,
                {
                  ref: function ref(node) {
                    _this2.children = (0, _reactDom.findDOMNode)(node);
                    targetProps.ref(_this2.children);
                  }
                },
                _react2.default.cloneElement(childrenProp, childrenProps)
              );
            }
          ),
          _react2.default.createElement(
            _reactPopper.Popper,
            (0, _extends3.default)({
              placement: placement,
              eventsEnabled: open,
              className: (0, _classnames2.default)(classes.popper, (0, _defineProperty3.default)({}, classes.popperClose, !open), PopperClassName)
            }, PopperOther, {
              ref: function ref(node) {
                _this2.popper = node;
              }
            }),
            function (_ref3) {
              var popperProps = _ref3.popperProps,
                  restProps = _ref3.restProps;

              var actualPlacement = popperProps['data-placement'] || placement;
              return _react2.default.createElement(
                'div',
                (0, _extends3.default)({}, popperProps, restProps, {
                  style: (0, _extends3.default)({}, popperProps.style, {
                    top: popperProps.style.top || 0,
                    left: popperProps.style.left || 0
                  }, restProps.style)
                }),
                _react2.default.createElement(
                  'div',
                  {
                    id: id,
                    role: 'tooltip',
                    'aria-hidden': !open,
                    className: (0, _classnames2.default)(classes.tooltip, (0, _defineProperty3.default)({}, classes.tooltipOpen, open), classes['tooltip' + (0, _helpers.capitalize)(actualPlacement.split('-')[0])])
                  },
                  title
                )
              );
            }
          )
        )
      );
    }
  }]);
  return Tooltip;
}(_react2.default.Component);

Tooltip.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Tooltip reference element.
   */
  children: _propTypes2.default.element.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * Do not respond to focus events.
   */
  disableTriggerFocus: _propTypes2.default.bool,
  /**
   * Do not respond to hover events.
   */
  disableTriggerHover: _propTypes2.default.bool,
  /**
   * Do not respond to long press touch events.
   */
  disableTriggerTouch: _propTypes2.default.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   */
  enterDelay: _propTypes2.default.number,
  /**
   * The relationship between the tooltip and the wrapper component is not clear from the DOM.
   * By providing this property, we can use aria-describedby to solve the accessibility issue.
   */
  id: _propTypes2.default.string,
  /**
   * The number of milliseconds to wait before hidding the tooltip.
   */
  leaveDelay: _propTypes2.default.number,
  /**
   * Callback fired when the tooltip requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: _propTypes2.default.func,
  /**
   * Callback fired when the tooltip requests to be open.
   *
   * @param {object} event The event source of the callback
   */
  onOpen: _propTypes2.default.func,
  /**
   * If `true`, the tooltip is shown.
   */
  open: _propTypes2.default.bool,
  /**
   * Tooltip placement
   */
  placement: _propTypes2.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /**
   * Properties applied to the `Popper` element.
   */
  PopperProps: _propTypes2.default.object,
  /**
   * @ignore
   */
  theme: _propTypes2.default.object.isRequired,
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: _propTypes2.default.node.isRequired
} : {};

Tooltip.defaultProps = {
  disableTriggerFocus: false,
  disableTriggerHover: false,
  disableTriggerTouch: false,
  enterDelay: 0,
  leaveDelay: 0,
  placement: 'bottom'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTooltip', withTheme: true })(Tooltip);