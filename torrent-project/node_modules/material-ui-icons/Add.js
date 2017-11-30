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

var _ref = _react2.default.createElement('path', { d: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' });

var Add = function Add(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

Add = (0, _pure2.default)(Add);
Add.muiName = 'SvgIcon';

exports.default = Add;