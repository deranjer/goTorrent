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

var _ref = _react2.default.createElement('path', { d: 'M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z' });

var KeyboardArrowDown = function KeyboardArrowDown(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

KeyboardArrowDown = (0, _pure2.default)(KeyboardArrowDown);
KeyboardArrowDown.muiName = 'SvgIcon';

exports.default = KeyboardArrowDown;