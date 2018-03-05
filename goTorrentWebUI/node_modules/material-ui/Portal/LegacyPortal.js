'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ownerDocument = require('dom-helpers/ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _exactProp = require('../utils/exactProp');

var _exactProp2 = _interopRequireDefault(_exactProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return _reactDom2.default.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return (0, _ownerDocument2.default)(_reactDom2.default.findDOMNode(element));
}

/**
 * @ignore - internal component.
 *
 * This module will soon be gone. We should drop it as soon as React@15.x support stop.
 */

var LegacyPortal = function (_React$Component) {
  (0, _inherits3.default)(LegacyPortal, _React$Component);

  function LegacyPortal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LegacyPortal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LegacyPortal.__proto__ || (0, _getPrototypeOf2.default)(LegacyPortal)).call.apply(_ref, [this].concat(args))), _this), _this.getMountNode = function () {
      return _this.mountNode;
    }, _this.mountOverlayTarget = function () {
      if (!_this.overlayTarget) {
        _this.overlayTarget = document.createElement('div');
        _this.mountNode = getContainer(_this.props.container, getOwnerDocument(_this).body);
        _this.mountNode.appendChild(_this.overlayTarget);
      }
    }, _this.unmountOverlayTarget = function () {
      if (_this.overlayTarget) {
        _this.mountNode.removeChild(_this.overlayTarget);
        _this.overlayTarget = null;
      }
      _this.mountNode = null;
    }, _this.unrenderOverlay = function () {
      if (_this.overlayTarget) {
        _reactDom2.default.unmountComponentAtNode(_this.overlayTarget);
        _this.overlayInstance = null;
      }
    }, _this.renderOverlay = function () {
      var overlay = _this.props.children;
      _this.mountOverlayTarget();
      var initialRender = !_this.overlayInstance;
      _this.overlayInstance = _reactDom2.default.unstable_renderSubtreeIntoContainer(_this, overlay, _this.overlayTarget, function () {
        if (initialRender && _this.props.onRendered) {
          _this.props.onRendered();
        }
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LegacyPortal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      this.renderOverlay();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.overlayTarget && nextProps.container !== this.props.container) {
        this.mountNode.removeChild(this.overlayTarget);
        this.mountNode = getContainer(nextProps.container, getOwnerDocument(this).body);
        this.mountNode.appendChild(this.overlayTarget);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderOverlay();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      this.unrenderOverlay();
      this.unmountOverlayTarget();
    }

    /**
     * @public
     */

  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return LegacyPortal;
}(_react2.default.Component);

LegacyPortal.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.element.isRequired,
  container: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
  onRendered: _propTypes2.default.func
} : {};

LegacyPortal.propTypes = process.env.NODE_ENV !== "production" ? (0, _exactProp2.default)(LegacyPortal.propTypes, 'LegacyPortal') : {};

exports.default = LegacyPortal;