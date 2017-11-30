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

var _ref = _react2.default.createElement('path', { d: 'M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z' });

var FormatTextdirectionLToR = function FormatTextdirectionLToR(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

FormatTextdirectionLToR = (0, _pure2.default)(FormatTextdirectionLToR);
FormatTextdirectionLToR.muiName = 'SvgIcon';

exports.default = FormatTextdirectionLToR;