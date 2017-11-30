'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.getScale = getScale;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CSSTransition = require('react-transition-group/CSSTransition');

var _CSSTransition2 = _interopRequireDefault(_CSSTransition);

var _withTheme = require('../styles/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = require('react').babelPluginFlowReactPropTypes_proptype_Element || require('prop-types').any;
// @inheritedComponent CSSTransition

// Only exported for tests.
var babelPluginFlowReactPropTypes_proptype_TransitionClasses = require('../internal/transition').babelPluginFlowReactPropTypes_proptype_TransitionClasses || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_TransitionCallback = require('../internal/transition').babelPluginFlowReactPropTypes_proptype_TransitionCallback || require('prop-types').any;

function getScale(value) {
  return 'scale(' + value + ', ' + Math.pow(value, 2) + ')';
}

var babelPluginFlowReactPropTypes_proptype_TransitionDuration = require('prop-types').oneOfType([require('prop-types').number, require('prop-types').shape({
  enter: require('prop-types').number,
  exit: require('prop-types').number
}), require('prop-types').oneOf(['auto'])]);

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * @ignore
   */
  appear: require('prop-types').bool,

  /**
   * A single child content element.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element.isRequired ? babelPluginFlowReactPropTypes_proptype_Element.isRequired : babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element).isRequired,

  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in: require('prop-types').bool.isRequired,

  /**
   * @ignore
   */
  onEnter: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * @ignore
   */
  onEntering: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * @ignore
   */
  onEntered: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * @ignore
   */
  onExit: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * @ignore
   */
  onExiting: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * @ignore
   */
  onExited: typeof babelPluginFlowReactPropTypes_proptype_TransitionCallback === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionCallback : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionCallback),

  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef: require('prop-types').func,

  /**
   * @ignore
   */
  style: require('prop-types').object,

  /**
   * The animation classNames applied to the component as it enters or exits.
   * This property is a direct binding to [`CSSTransition.classNames`](https://reactcommunity.org/react-transition-group/#CSSTransition-prop-classNames).
   */
  transitionClasses: typeof babelPluginFlowReactPropTypes_proptype_TransitionClasses === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionClasses : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionClasses),

  /**
   * @ignore
   */
  theme: require('prop-types').object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout: require('prop-types').oneOfType([require('prop-types').number, require('prop-types').shape({
    enter: require('prop-types').number,
    exit: require('prop-types').number
  }), require('prop-types').oneOf(['auto'])])
};

/**
 * The Grow transition is used by the Popover component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
var Grow = function (_React$Component) {
  (0, _inherits3.default)(Grow, _React$Component);

  function Grow() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Grow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Grow.__proto__ || (0, _getPrototypeOf2.default)(Grow)).call.apply(_ref, [this].concat(args))), _this), _this.autoTimeout = undefined, _this.handleEnter = function (node) {
      node.style.opacity = '0';
      node.style.transform = getScale(0.75);

      if (_this.props.onEnter) {
        _this.props.onEnter(node);
      }
    }, _this.handleEntering = function (node) {
      var _this$props = _this.props,
          theme = _this$props.theme,
          timeout = _this$props.timeout;

      var duration = 0;

      if (timeout === 'auto') {
        duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
        _this.autoTimeout = duration;
      } else if (typeof timeout === 'number') {
        duration = timeout;
      } else if (timeout) {
        duration = timeout.enter;
      } else {
        // The propType will warn in this case.
      }

      node.style.transition = [theme.transitions.create('opacity', {
        duration: duration
      }), theme.transitions.create('transform', {
        duration: duration * 0.666
      })].join(',');

      node.style.opacity = '1';
      node.style.transform = getScale(1);

      if (_this.props.onEntering) {
        _this.props.onEntering(node);
      }
    }, _this.handleExit = function (node) {
      var _this$props2 = _this.props,
          theme = _this$props2.theme,
          timeout = _this$props2.timeout;

      var duration = 0;

      if (timeout === 'auto') {
        duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
        _this.autoTimeout = duration;
      } else if (typeof timeout === 'number') {
        duration = timeout;
      } else if (timeout) {
        duration = timeout.exit;
      } else {
        // The propType will warn in this case.
      }

      node.style.transition = [theme.transitions.create('opacity', {
        duration: duration
      }), theme.transitions.create('transform', {
        duration: duration * 0.666,
        delay: duration * 0.333
      })].join(',');

      node.style.opacity = '0';
      node.style.transform = getScale(0.75);

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    }, _this.addEndListener = function (node, next) {
      var timeout = void 0;

      if (_this.props.timeout === 'auto') {
        timeout = _this.autoTimeout || 0;
      } else {
        timeout = _this.props.timeout;
      }

      setTimeout(next, timeout);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Grow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          appear = _props.appear,
          children = _props.children,
          onEnter = _props.onEnter,
          onEntering = _props.onEntering,
          onExit = _props.onExit,
          rootRef = _props.rootRef,
          styleProp = _props.style,
          transitionClasses = _props.transitionClasses,
          timeout = _props.timeout,
          theme = _props.theme,
          other = (0, _objectWithoutProperties3.default)(_props, ['appear', 'children', 'onEnter', 'onEntering', 'onExit', 'rootRef', 'style', 'transitionClasses', 'timeout', 'theme']);


      var style = (0, _extends3.default)({}, children.props.style, styleProp);

      // For server side rendering.
      if (!this.props.in || appear) {
        style.opacity = '0';
      }

      return _react2.default.createElement(
        _CSSTransition2.default,
        (0, _extends3.default)({
          classNames: transitionClasses,
          onEnter: this.handleEnter,
          onEntering: this.handleEntering,
          onExit: this.handleExit,
          addEndListener: this.addEndListener,
          appear: appear,
          style: style
        }, other, {
          ref: rootRef
        }),
        children
      );
    }
  }]);
  return Grow;
}(_react2.default.Component);

Grow.defaultProps = {
  appear: true,
  timeout: 'auto',
  transitionClasses: {}
};
exports.default = (0, _withTheme2.default)()(Grow);