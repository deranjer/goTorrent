'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactPopup = require('react-popup');

var _reactPopup2 = _interopRequireDefault(_reactPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    'h1',
    null,
    'Hello, world!'
), _react2.default.createElement(_reactPopup2.default, null), document.getElementById('app'));