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

var _ref = _react2.default.createElement('path', { d: 'M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zM2 22h16V8h4V2L2 22z' });

var SignalCellularConnectedNoInternet4Bar = function SignalCellularConnectedNoInternet4Bar(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

SignalCellularConnectedNoInternet4Bar = (0, _pure2.default)(SignalCellularConnectedNoInternet4Bar);
SignalCellularConnectedNoInternet4Bar.muiName = 'SvgIcon';

exports.default = SignalCellularConnectedNoInternet4Bar;