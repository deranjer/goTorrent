'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = require('material-ui/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgIconCustom = global.__MUI_SvgIcon__ || _SvgIcon2.default;

var _ref = _react2.default.createElement('path', { d: 'M9 14h6v1.5H9z' });

var _ref2 = _react2.default.createElement('circle', { cx: '15.5', cy: '9.5', r: '1.5' });

var _ref3 = _react2.default.createElement('circle', { cx: '8.5', cy: '9.5', r: '1.5' });

var _ref4 = _react2.default.createElement('path', { d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' });

var SentimentNeutral = function SentimentNeutral(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref,
    _ref2,
    _ref3,
    _ref4
  );
};

SentimentNeutral = (0, _pure2.default)(SentimentNeutral);
SentimentNeutral.muiName = 'SvgIcon';

exports.default = SentimentNeutral;