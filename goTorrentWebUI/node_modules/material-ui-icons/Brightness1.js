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

var _ref = _react2.default.createElement('circle', { cx: '12', cy: '12', r: '10' });

var Brightness1 = function Brightness1(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

Brightness1 = (0, _pure2.default)(Brightness1);
Brightness1.muiName = 'SvgIcon';

exports.default = Brightness1;