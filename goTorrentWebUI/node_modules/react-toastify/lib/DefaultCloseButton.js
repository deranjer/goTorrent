'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint react/require-default-props: 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _glamor = require('glamor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(isDefault) {
  return (0, _glamor.css)({
    color: isDefault ? '#000' : '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
    background: 'transparent',
    outline: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    opacity: isDefault ? '0.3' : '0.7',
    transition: '.3s ease',
    alignSelf: 'flex-start',
    ':hover, :focus': {
      opacity: 1
    }
  });
};

function DefaultCloseButton(_ref) {
  var closeToast = _ref.closeToast,
      type = _ref.type,
      ariaLabel = _ref.ariaLabel;

  return _react2.default.createElement(
    'button',
    _extends({}, styles(type === 'default'), {
      type: 'button',
      onClick: closeToast,
      'aria-label': ariaLabel
    }),
    '\u2716'
  );
}

DefaultCloseButton.propTypes = {
  closeToast: _propTypes2.default.func,
  arialLabel: _propTypes2.default.string
};

DefaultCloseButton.defaultProps = {
  ariaLabel: 'close'
};

exports.default = DefaultCloseButton;