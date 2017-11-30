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

var _Modal = require('../internal/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Slide = require('../transitions/Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _helpers = require('../utils/helpers');

var _transitions = require('../styles/transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_TransitionDuration = require('../internal/transition').babelPluginFlowReactPropTypes_proptype_TransitionDuration || require('prop-types').any;

function getSlideDirection(anchor) {
  if (anchor === 'left') {
    return 'right';
  } else if (anchor === 'right') {
    return 'left';
  } else if (anchor === 'top') {
    return 'down';
  }

  // (anchor === 'bottom')
  return 'up';
}

var styles = exports.styles = function styles(theme) {
  return {
    docked: {
      flex: '0 0 auto'
    },
    paper: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flex: '1 0 auto',
      position: 'fixed',
      top: 0,
      zIndex: theme.zIndex.navDrawer,
      willChange: 'transform',
      '&:focus': {
        outline: 'none'
      },
      WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.
    },
    paperAnchorLeft: {
      left: 0,
      right: 'auto'
    },
    paperAnchorRight: {
      left: 'auto',
      right: 0
    },
    paperAnchorTop: {
      top: 0,
      left: 0,
      bottom: 'auto',
      right: 0,
      height: 'auto',
      maxHeight: '100vh'
    },
    paperAnchorBottom: {
      top: 'auto',
      left: 0,
      bottom: 0,
      right: 0,
      height: 'auto',
      maxHeight: '100vh'
    },
    paperAnchorDockedLeft: {
      borderRight: '1px solid ' + theme.palette.text.divider
    },
    paperAnchorDockedRight: {
      borderLeft: '1px solid ' + theme.palette.text.divider
    },
    modal: {} // Just here so people can override the style.
  };
};

var babelPluginFlowReactPropTypes_proptype_Anchor = require('prop-types').oneOf(['left', 'top', 'right', 'bottom']);

var babelPluginFlowReactPropTypes_proptype_Type = require('prop-types').oneOf(['permanent', 'persistent', 'temporary']);

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Side from which the drawer will appear.
   */
  anchor: require('prop-types').oneOf(['left', 'top', 'right', 'bottom']),

  /**
   * The contents of the drawer.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired,

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * The elevation of the drawer.
   */
  elevation: require('prop-types').number,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: typeof babelPluginFlowReactPropTypes_proptype_TransitionDuration === 'function' ? babelPluginFlowReactPropTypes_proptype_TransitionDuration : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_TransitionDuration),

  /**
   * Properties applied to the `Modal` element.
   */
  ModalProps: require('prop-types').object,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onRequestClose: require('prop-types').func,

  /**
   * If `true`, the drawer is open.
   */
  open: require('prop-types').bool,

  /**
   * @igonre
   */
  theme: require('prop-types').object.isRequired,

  /**
   * Properties applied to the `Slide` element.
   */
  SlideProps: require('prop-types').object,

  /**
   * The type of drawer.
   */
  type: require('prop-types').oneOf(['permanent', 'persistent', 'temporary'])
};

var Drawer = function (_React$Component) {
  (0, _inherits3.default)(Drawer, _React$Component);

  function Drawer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Drawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Drawer.__proto__ || (0, _getPrototypeOf2.default)(Drawer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      // Let's assume that the Drawer will always be rendered on user space.
      // We use that state is order to skip the appear transition during the
      // initial mount of the component.
      firstMount: true
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Drawer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({
        firstMount: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          anchorProp = _props.anchor,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          elevation = _props.elevation,
          transitionDuration = _props.transitionDuration,
          ModalProps = _props.ModalProps,
          onRequestClose = _props.onRequestClose,
          open = _props.open,
          SlideProps = _props.SlideProps,
          theme = _props.theme,
          type = _props.type,
          other = (0, _objectWithoutProperties3.default)(_props, ['anchor', 'children', 'classes', 'className', 'elevation', 'transitionDuration', 'ModalProps', 'onRequestClose', 'open', 'SlideProps', 'theme', 'type']);


      var rtl = theme.direction === 'rtl';
      var anchor = anchorProp;
      if (rtl && ['left', 'right'].includes(anchor)) {
        anchor = anchor === 'left' ? 'right' : 'left';
      }

      var drawer = _react2.default.createElement(
        _Paper2.default,
        {
          elevation: type === 'temporary' ? elevation : 0,
          square: true,
          className: (0, _classnames2.default)(classes.paper, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes['paperAnchor' + (0, _helpers.capitalizeFirstLetter)(anchor)], type !== 'permanent'), (0, _defineProperty3.default)(_classNames, classes['paperAnchorDocked' + (0, _helpers.capitalizeFirstLetter)(anchor)], type !== 'temporary'), _classNames))
        },
        children
      );

      if (type === 'permanent') {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({ className: (0, _classnames2.default)(classes.docked, className) }, other),
          drawer
        );
      }

      var slidingDrawer = _react2.default.createElement(
        _Slide2.default,
        (0, _extends3.default)({
          'in': open,
          direction: getSlideDirection(anchor),
          timeout: transitionDuration,
          appear: !this.state.firstMount
        }, SlideProps),
        drawer
      );

      if (type === 'persistent') {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({ className: (0, _classnames2.default)(classes.docked, className) }, other),
          slidingDrawer
        );
      }

      // type === temporary
      return _react2.default.createElement(
        _Modal2.default,
        (0, _extends3.default)({
          BackdropTransitionDuration: transitionDuration,
          className: (0, _classnames2.default)(classes.modal, className),
          show: open,
          onRequestClose: onRequestClose
        }, other, ModalProps),
        slidingDrawer
      );
    }
  }]);
  return Drawer;
}(_react2.default.Component);

Drawer.defaultProps = {
  anchor: 'left',
  elevation: 16,
  transitionDuration: {
    enter: _transitions.duration.enteringScreen,
    exit: _transitions.duration.leavingScreen
  },
  open: false,
  type: 'temporary' // Mobile first.
};
exports.default = (0, _withStyles2.default)(styles, { flip: false, withTheme: true, name: 'MuiDrawer' })(Drawer);