'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

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

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _reactScrollbarSize = require('react-scrollbar-size');

var _reactScrollbarSize2 = _interopRequireDefault(_reactScrollbarSize);

var _normalizeScrollLeft = require('normalize-scroll-left');

var _scroll = require('scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _TabIndicator = require('./TabIndicator');

var _TabIndicator2 = _interopRequireDefault(_TabIndicator);

var _TabScrollButton = require('./TabScrollButton');

var _TabScrollButton2 = _interopRequireDefault(_TabScrollButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      overflow: 'hidden',
      minHeight: 48,
      WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.
    },
    flexContainer: {
      display: 'flex'
    },
    scrollingContainer: {
      position: 'relative',
      display: 'inline-block',
      flex: '1 1 auto',
      whiteSpace: 'nowrap'
    },
    fixed: {
      overflowX: 'hidden',
      width: '100%'
    },
    scrollable: {
      overflowX: 'scroll'
    },
    centered: {
      justifyContent: 'center'
    },
    buttonAuto: (0, _defineProperty3.default)({}, theme.breakpoints.down('xs'), {
      display: 'none'
    })
  };
};

var Tabs = function (_React$Component) {
  (0, _inherits3.default)(Tabs, _React$Component);

  function Tabs() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Tabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tabs.__proto__ || (0, _getPrototypeOf2.default)(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      indicatorStyle: {},
      scrollerStyle: {
        marginBottom: 0
      },
      showLeftScroll: false,
      showRightScroll: false,
      mounted: false
    }, _this.getConditionalElements = function () {
      var _this$props = _this.props,
          classes = _this$props.classes,
          buttonClassName = _this$props.buttonClassName,
          scrollable = _this$props.scrollable,
          scrollButtons = _this$props.scrollButtons,
          TabScrollButtonProp = _this$props.TabScrollButton,
          theme = _this$props.theme;

      var conditionalElements = {};
      conditionalElements.scrollbarSizeListener = scrollable ? _react2.default.createElement(_reactScrollbarSize2.default, {
        onLoad: _this.handleScrollbarSizeChange,
        onChange: _this.handleScrollbarSizeChange
      }) : null;

      var showScrollButtons = scrollable && (scrollButtons === 'auto' || scrollButtons === 'on');

      conditionalElements.scrollButtonLeft = showScrollButtons ? _react2.default.createElement(TabScrollButtonProp, {
        direction: theme && theme.direction === 'rtl' ? 'right' : 'left',
        onClick: _this.handleLeftScrollClick,
        visible: _this.state.showLeftScroll,
        className: (0, _classnames2.default)((0, _defineProperty3.default)({}, classes.buttonAuto, scrollButtons === 'auto'), buttonClassName)
      }) : null;

      conditionalElements.scrollButtonRight = showScrollButtons ? _react2.default.createElement(TabScrollButtonProp, {
        direction: theme && theme.direction === 'rtl' ? 'left' : 'right',
        onClick: _this.handleRightScrollClick,
        visible: _this.state.showRightScroll,
        className: (0, _classnames2.default)((0, _defineProperty3.default)({}, classes.buttonAuto, scrollButtons === 'auto'), buttonClassName)
      }) : null;

      return conditionalElements;
    }, _this.getTabsMeta = function (value, direction) {
      var tabsMeta = void 0;
      if (_this.tabs) {
        var rect = _this.tabs.getBoundingClientRect();
        // create a new object with ClientRect class props + scrollLeft
        tabsMeta = {
          clientWidth: _this.tabs ? _this.tabs.clientWidth : 0,
          scrollLeft: _this.tabs ? _this.tabs.scrollLeft : 0,
          scrollLeftNormalized: _this.tabs ? (0, _normalizeScrollLeft.getNormalizedScrollLeft)(_this.tabs, direction) : 0,
          scrollWidth: _this.tabs ? _this.tabs.scrollWidth : 0,
          left: rect.left,
          right: rect.right
        };
      }

      var tabMeta = void 0;
      if (_this.tabs && value !== false) {
        var children = _this.tabs.children[0].children;

        if (children.length > 0) {
          var tab = children[_this.valueToIndex[value]];
          process.env.NODE_ENV !== "production" ? (0, _warning2.default)(tab, 'Material-UI: the value provided `' + value + '` is invalid') : void 0;
          tabMeta = tab ? tab.getBoundingClientRect() : null;
        }
      }
      return { tabsMeta: tabsMeta, tabMeta: tabMeta };
    }, _this.tabs = undefined, _this.valueToIndex = {}, _this.handleResize = (0, _debounce2.default)(function () {
      _this.updateIndicatorState(_this.props);
      _this.updateScrollButtonState();
    }, 166), _this.handleLeftScrollClick = function () {
      if (_this.tabs) {
        _this.moveTabsScroll(-_this.tabs.clientWidth);
      }
    }, _this.handleRightScrollClick = function () {
      if (_this.tabs) {
        _this.moveTabsScroll(_this.tabs.clientWidth);
      }
    }, _this.handleScrollbarSizeChange = function (_ref2) {
      var scrollbarHeight = _ref2.scrollbarHeight;

      _this.setState({
        scrollerStyle: {
          marginBottom: -scrollbarHeight
        }
      });
    }, _this.handleTabsScroll = (0, _debounce2.default)(function () {
      _this.updateScrollButtonState();
    }, 166), _this.moveTabsScroll = function (delta) {
      var theme = _this.props.theme;


      if (_this.tabs) {
        var multiplier = theme.direction === 'rtl' ? -1 : 1;
        var nextScrollLeft = _this.tabs.scrollLeft + delta * multiplier;
        // Fix for Edge
        var invert = theme.direction === 'rtl' && (0, _normalizeScrollLeft.detectScrollType)() === 'reverse' ? -1 : 1;
        _scroll2.default.left(_this.tabs, invert * nextScrollLeft);
      }
    }, _this.scrollSelectedIntoView = function () {
      var _this$props2 = _this.props,
          theme = _this$props2.theme,
          value = _this$props2.value;

      var _this$getTabsMeta = _this.getTabsMeta(value, theme.direction),
          tabsMeta = _this$getTabsMeta.tabsMeta,
          tabMeta = _this$getTabsMeta.tabMeta;

      if (!tabMeta || !tabsMeta) {
        return;
      }

      if (tabMeta.left < tabsMeta.left) {
        // left side of button is out of view
        var nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
        _scroll2.default.left(_this.tabs, nextScrollLeft);
      } else if (tabMeta.right > tabsMeta.right) {
        // right side of button is out of view
        var _nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
        _scroll2.default.left(_this.tabs, _nextScrollLeft);
      }
    }, _this.updateScrollButtonState = function () {
      var _this$props3 = _this.props,
          scrollable = _this$props3.scrollable,
          scrollButtons = _this$props3.scrollButtons,
          theme = _this$props3.theme;


      if (_this.tabs && scrollable && scrollButtons !== 'off') {
        var _this$tabs = _this.tabs,
            scrollWidth = _this$tabs.scrollWidth,
            clientWidth = _this$tabs.clientWidth;

        var scrollLeft = (0, _normalizeScrollLeft.getNormalizedScrollLeft)(_this.tabs, theme.direction);

        var showLeftScroll = theme.direction === 'rtl' ? scrollWidth > clientWidth + scrollLeft : scrollLeft > 0;

        var showRightScroll = theme.direction === 'rtl' ? scrollLeft > 0 : scrollWidth > clientWidth + scrollLeft;

        if (showLeftScroll !== _this.state.showLeftScroll || showRightScroll !== _this.state.showRightScroll) {
          _this.setState({ showLeftScroll: showLeftScroll, showRightScroll: showRightScroll });
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Tabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ mounted: true });
      this.updateIndicatorState(this.props);
      this.updateScrollButtonState();

      if (this.props.action) {
        this.props.action({
          updateIndicator: this.handleResize
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this.updateScrollButtonState();

      // The index might have changed at the same time.
      // We need to check again the right indicator position.
      this.updateIndicatorState(this.props);

      if (this.state.indicatorStyle !== prevState.indicatorStyle) {
        this.scrollSelectedIntoView();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.handleResize.cancel();
      this.handleTabsScroll.cancel();
    }
  }, {
    key: 'updateIndicatorState',
    value: function updateIndicatorState(props) {
      var theme = props.theme,
          value = props.value;

      var _getTabsMeta = this.getTabsMeta(value, theme.direction),
          tabsMeta = _getTabsMeta.tabsMeta,
          tabMeta = _getTabsMeta.tabMeta;

      var left = 0;

      if (tabMeta && tabsMeta) {
        var correction = theme.direction === 'rtl' ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
        left = tabMeta.left - tabsMeta.left + correction;
      }

      var indicatorStyle = {
        left: left,
        // May be wrong until the font is loaded.
        width: tabMeta ? tabMeta.width : 0
      };

      if ((indicatorStyle.left !== this.state.indicatorStyle.left || indicatorStyle.width !== this.state.indicatorStyle.width) && !(0, _isNan2.default)(indicatorStyle.left) && !(0, _isNan2.default)(indicatorStyle.width)) {
        this.setState({ indicatorStyle: indicatorStyle });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames3,
          _this2 = this;

      var _props = this.props,
          action = _props.action,
          buttonClassName = _props.buttonClassName,
          centered = _props.centered,
          childrenProp = _props.children,
          classes = _props.classes,
          classNameProp = _props.className,
          fullWidth = _props.fullWidth,
          indicatorClassName = _props.indicatorClassName,
          indicatorColor = _props.indicatorColor,
          onChange = _props.onChange,
          scrollable = _props.scrollable,
          scrollButtons = _props.scrollButtons,
          TabScrollButtonProp = _props.TabScrollButton,
          textColor = _props.textColor,
          theme = _props.theme,
          value = _props.value,
          other = (0, _objectWithoutProperties3.default)(_props, ['action', 'buttonClassName', 'centered', 'children', 'classes', 'className', 'fullWidth', 'indicatorClassName', 'indicatorColor', 'onChange', 'scrollable', 'scrollButtons', 'TabScrollButton', 'textColor', 'theme', 'value']);


      var className = (0, _classnames2.default)(classes.root, classNameProp);
      var scrollerClassName = (0, _classnames2.default)(classes.scrollingContainer, (_classNames3 = {}, (0, _defineProperty3.default)(_classNames3, classes.fixed, !scrollable), (0, _defineProperty3.default)(_classNames3, classes.scrollable, scrollable), _classNames3));
      var tabItemContainerClassName = (0, _classnames2.default)(classes.flexContainer, (0, _defineProperty3.default)({}, classes.centered, centered && !scrollable));

      var indicator = _react2.default.createElement(_TabIndicator2.default, {
        style: this.state.indicatorStyle,
        className: indicatorClassName,
        color: indicatorColor
      });

      this.valueToIndex = {};
      var childIndex = 0;
      var children = _react2.default.Children.map(childrenProp, function (child) {
        if (!_react2.default.isValidElement(child)) {
          return null;
        }

        var childValue = child.props.value || childIndex;
        _this2.valueToIndex[childValue] = childIndex;
        var selected = childValue === value;

        childIndex += 1;
        return _react2.default.cloneElement(child, {
          fullWidth: fullWidth,
          indicator: selected && !_this2.state.mounted && indicator,
          selected: selected,
          onChange: onChange,
          textColor: textColor,
          value: childValue
        });
      });

      var conditionalElements = this.getConditionalElements();

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: className }, other),
        _react2.default.createElement(_reactEventListener2.default, { target: 'window', onResize: this.handleResize }),
        conditionalElements.scrollbarSizeListener,
        _react2.default.createElement(
          'div',
          { className: classes.flexContainer },
          conditionalElements.scrollButtonLeft,
          _react2.default.createElement(
            'div',
            {
              className: scrollerClassName,
              style: this.state.scrollerStyle,
              ref: function ref(node) {
                _this2.tabs = node;
              },
              role: 'tablist',
              onScroll: this.handleTabsScroll
            },
            _react2.default.createElement(
              'div',
              { className: tabItemContainerClassName },
              children
            ),
            this.state.mounted && indicator
          ),
          conditionalElements.scrollButtonRight
        )
      );
    }
  }]);
  return Tabs;
}(_react2.default.Component);

Tabs.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports `updateIndicator()` action.
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: _propTypes2.default.func,
  /**
   * The CSS class name of the scroll button elements.
   */
  buttonClassName: _propTypes2.default.string,
  /**
   * If `true`, the tabs will be centered.
   * This property is intended for large views.
   */
  centered: _propTypes2.default.bool,
  /**
   * The content of the component.
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
   * If `true`, the tabs will grow to use all the available space.
   * This property is intended for small views, like on mobile.
   */
  fullWidth: _propTypes2.default.bool,
  /**
   * The CSS class name of the indicator element.
   */
  indicatorClassName: _propTypes2.default.string,
  /**
   * Determines the color of the indicator.
   */
  indicatorColor: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.oneOf(['secondary', 'primary'])]),
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {number} value We default to the index of the child
   */
  onChange: _propTypes2.default.func,
  /**
   * True invokes scrolling properties and allow for horizontally scrolling
   * (or swiping) the tab bar.
   */
  scrollable: _propTypes2.default.bool,
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll
   * `auto` will only present them on medium and larger viewports
   * `on` will always present them
   * `off` will never present them
   */
  scrollButtons: _propTypes2.default.oneOf(['auto', 'on', 'off']),
  /**
   * The component used to render the scroll buttons.
   */
  TabScrollButton: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  /**
   * Determines the color of the `Tab`.
   */
  textColor: _propTypes2.default.oneOf(['secondary', 'primary', 'inherit']),
  /**
   * @ignore
   */
  theme: _propTypes2.default.object.isRequired,
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: _propTypes2.default.any
} : {};

Tabs.defaultProps = {
  centered: false,
  fullWidth: false,
  indicatorColor: 'secondary',
  scrollable: false,
  scrollButtons: 'auto',
  TabScrollButton: _TabScrollButton2.default,
  textColor: 'inherit'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTabs', withTheme: true })(Tabs);