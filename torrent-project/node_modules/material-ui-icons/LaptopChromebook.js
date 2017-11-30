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

var _ref = _react2.default.createElement('path', { d: 'M22 18V3H2v15H0v2h24v-2h-2zm-8 0h-4v-1h4v1zm6-3H4V5h16v10z' });

var LaptopChromebook = function LaptopChromebook(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

LaptopChromebook = (0, _pure2.default)(LaptopChromebook);
LaptopChromebook.muiName = 'SvgIcon';

exports.default = LaptopChromebook;