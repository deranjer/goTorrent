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

var _styles = require('../styles');

var _exactProp = require('../utils/exactProp');

var _exactProp2 = _interopRequireDefault(_exactProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    '@global': {
      html: {
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        // Change from `box-sizing: content-box` so that `width`
        // is not affected by `padding` or `border`.
        boxSizing: 'border-box'
      },
      '*, *::before, *::after': {
        boxSizing: 'inherit'
      },
      body: {
        margin: 0, // Remove the margin in all browsers.
        backgroundColor: theme.palette.background.default,
        '@media print': {
          // Save printer ink.
          backgroundColor: theme.palette.common.white
        }
      }
    }
  };
};

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */

var Reboot = function (_React$Component) {
  (0, _inherits3.default)(Reboot, _React$Component);

  function Reboot() {
    (0, _classCallCheck3.default)(this, Reboot);
    return (0, _possibleConstructorReturn3.default)(this, (Reboot.__proto__ || (0, _getPrototypeOf2.default)(Reboot)).apply(this, arguments));
  }

  (0, _createClass3.default)(Reboot, [{
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return Reboot;
}(_react2.default.Component);

Reboot.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * You can only provide a single element with react@15, a node with react@16.
   */
  children: _propTypes2.default.node,
  /**
   * @ignore
   */
  classes: _propTypes2.default.object.isRequired
} : {};

Reboot.propTypes = process.env.NODE_ENV !== "production" ? (0, _exactProp2.default)(Reboot.propTypes, 'Reboot') : {};

Reboot.defaultProps = {
  children: null
};

exports.default = (0, _styles.withStyles)(styles, { name: 'MuiReboot' })(Reboot);