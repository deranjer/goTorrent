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
 * This component shares many concepts with
 * [react-overlays](https://react-bootstrap.github.io/react-overlays/#portals)
 * But has been forked in order to fix some bugs, reduce the number of dependencies
 * and take the control of our destiny.
 */

var Portal = function (_React$Component) {
  (0, _inherits3.default)(Portal, _React$Component);

  function Portal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Portal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Portal.__proto__ || (0, _getPrototypeOf2.default)(Portal)).call.apply(_ref, [this].concat(args))), _this), _this.getMountNode = function () {
      return _this.mountNode;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setContainer(this.props.container);
      this.forceUpdate(this.props.onRendered);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.container !== this.props.container) {
        this.setContainer(nextProps.container);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mountNode = null;
    }
  }, {
    key: 'setContainer',
    value: function setContainer(container) {
      this.mountNode = getContainer(container, getOwnerDocument(this).body);
    }

    /**
     * @public
     */

  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;


      return this.mountNode ? _reactDom2.default.createPortal(children, this.mountNode) : null;
    }
  }]);
  return Portal;
}(_react2.default.Component);

Portal.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The children to render into the `container`.
   */
  children: _propTypes2.default.node.isRequired,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it's using the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: _propTypes2.default.func
} : {};

Portal.propTypes = process.env.NODE_ENV !== "production" ? (0, _exactProp2.default)(Portal.propTypes, 'Portal') : {};

exports.default = Portal;