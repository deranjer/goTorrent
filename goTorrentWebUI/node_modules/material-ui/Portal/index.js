'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _LegacyPortal = require('./LegacyPortal');

var _LegacyPortal2 = _interopRequireDefault(_LegacyPortal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _reactDom2.default.createPortal ? _Portal2.default : _LegacyPortal2.default;