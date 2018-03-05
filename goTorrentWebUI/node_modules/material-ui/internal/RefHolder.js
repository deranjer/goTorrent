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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ignore - internal component.
 *
 * Internal helper component to allow attaching a ref to a
 * child element that may not accept refs (functional component).
 */
var RefHolder = function (_React$Component) {
  (0, _inherits3.default)(RefHolder, _React$Component);

  function RefHolder() {
    (0, _classCallCheck3.default)(this, RefHolder);
    return (0, _possibleConstructorReturn3.default)(this, (RefHolder.__proto__ || (0, _getPrototypeOf2.default)(RefHolder)).apply(this, arguments));
  }

  (0, _createClass3.default)(RefHolder, [{
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return RefHolder;
}(_react2.default.Component);

RefHolder.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes2.default.node
} : {};

exports.default = RefHolder;