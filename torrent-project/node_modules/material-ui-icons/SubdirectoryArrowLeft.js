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

var _ref = _react2.default.createElement('path', { d: 'M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z' });

var SubdirectoryArrowLeft = function SubdirectoryArrowLeft(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

SubdirectoryArrowLeft = (0, _pure2.default)(SubdirectoryArrowLeft);
SubdirectoryArrowLeft.muiName = 'SvgIcon';

exports.default = SubdirectoryArrowLeft;