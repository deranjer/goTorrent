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

var _ref = _react2.default.createElement('path', { d: 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z' });

var SkipNext = function SkipNext(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

SkipNext = (0, _pure2.default)(SkipNext);
SkipNext.muiName = 'SvgIcon';

exports.default = SkipNext;