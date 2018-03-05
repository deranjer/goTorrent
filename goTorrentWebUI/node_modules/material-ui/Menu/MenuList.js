'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _reactDom = require('react-dom');

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _activeElement = require('dom-helpers/activeElement');

var _activeElement2 = _interopRequireDefault(_activeElement);

var _ownerDocument = require('dom-helpers/ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _List = require('../List');

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @inheritedComponent List

var MenuList = function (_React$Component) {
  (0, _inherits3.default)(MenuList, _React$Component);

  function MenuList() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuList.__proto__ || (0, _getPrototypeOf2.default)(MenuList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentTabIndex: undefined
    }, _this.list = undefined, _this.selectedItem = undefined, _this.blurTimer = undefined, _this.handleBlur = function (event) {
      _this.blurTimer = setTimeout(function () {
        if (_this.list) {
          var list = (0, _reactDom.findDOMNode)(_this.list);
          var currentFocus = (0, _activeElement2.default)((0, _ownerDocument2.default)(list));
          if (!(0, _contains2.default)(list, currentFocus)) {
            _this.resetTabIndex();
          }
        }
      }, 30);

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleKeyDown = function (event) {
      var list = (0, _reactDom.findDOMNode)(_this.list);
      var key = (0, _keycode2.default)(event);
      var currentFocus = (0, _activeElement2.default)((0, _ownerDocument2.default)(list));

      if ((key === 'up' || key === 'down') && (!currentFocus || currentFocus && !(0, _contains2.default)(list, currentFocus))) {
        if (_this.selectedItem) {
          (0, _reactDom.findDOMNode)(_this.selectedItem).focus();
        } else {
          list.firstChild.focus();
        }
      } else if (key === 'down') {
        event.preventDefault();
        if (currentFocus.nextElementSibling) {
          currentFocus.nextElementSibling.focus();
        }
      } else if (key === 'up') {
        event.preventDefault();
        if (currentFocus.previousElementSibling) {
          currentFocus.previousElementSibling.focus();
        }
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(event, key);
      }
    }, _this.handleItemFocus = function (event) {
      var list = (0, _reactDom.findDOMNode)(_this.list);
      if (list) {
        for (var i = 0; i < list.children.length; i += 1) {
          if (list.children[i] === event.currentTarget) {
            _this.setTabIndex(i);
            break;
          }
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MenuList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resetTabIndex();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.blurTimer);
    }
  }, {
    key: 'setTabIndex',
    value: function setTabIndex(index) {
      this.setState({ currentTabIndex: index });
    }
  }, {
    key: 'focus',
    value: function focus() {
      var currentTabIndex = this.state.currentTabIndex;

      var list = (0, _reactDom.findDOMNode)(this.list);
      if (!list || !list.children || !list.firstChild) {
        return;
      }

      if (currentTabIndex && currentTabIndex >= 0) {
        list.children[currentTabIndex].focus();
      } else {
        list.firstChild.focus();
      }
    }
  }, {
    key: 'resetTabIndex',
    value: function resetTabIndex() {
      var list = (0, _reactDom.findDOMNode)(this.list);
      var currentFocus = (0, _activeElement2.default)((0, _ownerDocument2.default)(list));
      var items = [].concat((0, _toConsumableArray3.default)(list.children));
      var currentFocusIndex = items.indexOf(currentFocus);

      if (currentFocusIndex !== -1) {
        return this.setTabIndex(currentFocusIndex);
      }

      if (this.selectedItem) {
        return this.setTabIndex(items.indexOf((0, _reactDom.findDOMNode)(this.selectedItem)));
      }

      return this.setTabIndex(0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          onBlur = _props.onBlur,
          onKeyDown = _props.onKeyDown,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'className', 'onBlur', 'onKeyDown']);


      return _react2.default.createElement(
        _List2.default,
        (0, _extends3.default)({
          role: 'menu',
          ref: function ref(node) {
            _this2.list = node;
          },
          className: className,
          onKeyDown: this.handleKeyDown,
          onBlur: this.handleBlur
        }, other),
        _react2.default.Children.map(children, function (child, index) {
          if (!_react2.default.isValidElement(child)) {
            return null;
          }

          return _react2.default.cloneElement(child, {
            tabIndex: index === _this2.state.currentTabIndex ? 0 : -1,
            ref: child.props.selected ? function (node) {
              _this2.selectedItem = node;
            } : undefined,
            onFocus: _this2.handleItemFocus
          });
        })
      );
    }
  }]);
  return MenuList;
}(_react2.default.Component);

MenuList.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: _propTypes2.default.node,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * @ignore
   */
  onBlur: _propTypes2.default.func,
  /**
   * @ignore
   */
  onKeyDown: _propTypes2.default.func
} : {};

exports.default = MenuList;