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

var _ref = _react2.default.createElement('path', { d: 'M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z' });

var VerticalAlignBottom = function VerticalAlignBottom(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

VerticalAlignBottom = (0, _pure2.default)(VerticalAlignBottom);
VerticalAlignBottom.muiName = 'SvgIcon';

exports.default = VerticalAlignBottom;