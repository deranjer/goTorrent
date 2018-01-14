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

var _ref = _react2.default.createElement('path', { d: 'M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z' });

var FormatTextdirectionRToL = function FormatTextdirectionRToL(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

FormatTextdirectionRToL = (0, _pure2.default)(FormatTextdirectionRToL);
FormatTextdirectionRToL.muiName = 'SvgIcon';

exports.default = FormatTextdirectionRToL;