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

var _ref = _react2.default.createElement('path', { d: 'M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z' });

var CallMade = function CallMade(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

CallMade = (0, _pure2.default)(CallMade);
CallMade.muiName = 'SvgIcon';

exports.default = CallMade;