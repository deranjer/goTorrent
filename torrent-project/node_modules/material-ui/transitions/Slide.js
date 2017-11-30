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

exports.setTranslateValue = setTranslateValue;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _Transition = require('react-transition-group/Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _withTheme = require('../styles/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _transitions = require('../styles/transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = require('react').babelPluginFlowReactPropTypes_proptype_Element || require('prop-types').any;
// @inheritedComponent Transition

var babelPluginFlowReactPropTypes_proptype_TransitionCallback = require('../internal/transition').babelPluginFlowReactPropTypes_proptype_TransitionCallback || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_TransitionDuration = require('../internal/transition').babelPluginFlowReactPropTypes_proptype_TransitionDuration || require('prop-types').any;

var GUTTER = 24;

// Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `translate3d(0, 0, 0)`.`
function getTranslateValue(props, node) {
  var direction = props.direction;

  var rect = node.getBoundingClientRect();

  var transform = void 0;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    var computedStyle = window.getComputedStyle(node);
    transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
  }

  var offsetX = 0;
  var offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    var transformValues = transform.split('(')[1].split(')')[0].split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return 'translateX(100vw) translateX(-' + (rect.left - offsetX) + 'px)';
  } else if (direction === 'right') {
    return 'translateX(-' + (rect.left + rect.width + GUTTER - offsetX) + 'px)';
  } else if (direction === 'up') {
    return 'translateY(100vh) translateY(-' + (rect.top - offsetY) + 'px)';
  }

  // direction === 'down
  return 'translate3d(0, ' + (0 - (rect.top + rect.height)) + 'px, 0)';
}

function setTranslateValue(props, node) {
  var transform = getTranslateValue(props, node);

  if (transform) {
    node.style.transform = transform;
    node.style.webkitTransform = transform;
  }
}

var babelPluginFlowReactPropTypes_proptype_Direction = require('prop-types').oneOf(['left', 'right', 'up', 'down']);

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * A single child content element.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element.isRequired ? babelPluginFlowReactPropTypes_proptype_Element.isRequired : babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element).isRequired,

  /**
   * Direction the child node will enter from.
   */
  direction: require('prop-types').oneOf(['left', 'right', 'up', 'down']),

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
   * @ignore
   */
  style: require('prop-types').object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: typeof babelPluginFlowReactPropTypes_proptype_TransitionDuration === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionDuration : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionDuration),

  /**
   * @ignore
   */
  theme: require('prop-types').object
};


var reflow = function reflow(node) {
  return node.scrollTop;
};

var Slide = function (_React$Component) {
  (0, _inherits3.default)(Slide, _React$Component);

  function Slide() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Slide);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Slide.__proto__ || (0, _getPrototypeOf2.default)(Slide)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      // We use this state to handle the server-side rendering.
      firstMount: true
    }, _this.transition = null, _this.handleResize = (0, _debounce2.default)(function () {
      // Skip configuration where the position is screen size invariant.
      if (_this.props.in || _this.props.direction === 'down' || _this.props.direction === 'right') {
        return;
      }

      var node = (0, _reactDom.findDOMNode)(_this.transition);
      if (node instanceof HTMLElement) {
        setTranslateValue(_this.props, node);
      }
    }, 166), _this.handleEnter = function (node) {
      setTranslateValue(_this.props, node);
      reflow(node);

      if (_this.props.onEnter) {
        _this.props.onEnter(node);
      }
    }, _this.handleEntering = function (node) {
      var _this$props = _this.props,
          theme = _this$props.theme,
          timeout = _this$props.timeout;

      node.style.transition = theme.transitions.create('transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.enter,
        easing: theme.transitions.easing.easeOut
      });
      // $FlowFixMe - https://github.com/facebook/flow/pull/5161
      node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.enter,
        easing: theme.transitions.easing.easeOut
      });
      node.style.transform = 'translate3d(0, 0, 0)';
      node.style.webkitTransform = 'translate3d(0, 0, 0)';
      if (_this.props.onEntering) {
        _this.props.onEntering(node);
      }
    }, _this.handleExit = function (node) {
      var _this$props2 = _this.props,
          theme = _this$props2.theme,
          timeout = _this$props2.timeout;

      node.style.transition = theme.transitions.create('transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.exit,
        easing: theme.transitions.easing.sharp
      });
      // $FlowFixMe - https://github.com/facebook/flow/pull/5161
      node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.exit,
        easing: theme.transitions.easing.sharp
      });
      setTranslateValue(_this.props, node);

      if (_this.props.onExit) {
        _this.props.onExit(node);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Slide, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // state.firstMount handle SSR, once the component is mounted, we need
      // to propery hide it.
      if (!this.props.in) {
        // We need to set initial translate values of transition element
        // otherwise component will be shown when in=false.
        var element = (0, _reactDom.findDOMNode)(this.transition);
        if (element instanceof HTMLElement) {
          element.style.visibility = 'inherit';
          setTranslateValue(this.props, element);
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({
        firstMount: false
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.handleResize.cancel();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          onEnter = _props.onEnter,
          onEntering = _props.onEntering,
          onExit = _props.onExit,
          styleProp = _props.style,
          theme = _props.theme,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'onEnter', 'onEntering', 'onExit', 'style', 'theme']);


      var style = (0, _extends3.default)({}, styleProp);

      if (!this.props.in && this.state.firstMount) {
        style.visibility = 'hidden';
      }

      return _react2.default.createElement(
        _reactEventListener2.default,
        { target: 'window', onResize: this.handleResize },
        _react2.default.createElement(
          _Transition2.default,
          (0, _extends3.default)({
            onEnter: this.handleEnter,
            onEntering: this.handleEntering,
            onExit: this.handleExit,
            appear: true,
            style: style
          }, other, {
            ref: function ref(node) {
              _this2.transition = node;
            }
          }),
          children
        )
      );
    }
  }]);
  return Slide;
}(_react2.default.Component);

Slide.defaultProps = {
  direction: 'down',
  timeout: {
    enter: _transitions.duration.enteringScreen,
    exit: _transitions.duration.leavingScreen
  }
};
exports.default = (0, _withTheme2.default)()(Slide);