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

var _ref = _react2.default.createElement('path', { d: 'M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z' });

var Functions = function Functions(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

Functions = (0, _pure2.default)(Functions);
Functions.muiName = 'SvgIcon';

exports.default = Functions;