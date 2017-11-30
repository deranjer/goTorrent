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

var _ref = _react2.default.createElement('path', { fillOpacity: '.36', d: 'M0 20h24v4H0z' });

var _ref2 = _react2.default.createElement('path', { d: 'M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z' });

var FormatColorText = function FormatColorText(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref,
    _ref2
  );
};

FormatColorText = (0, _pure2.default)(FormatColorText);
FormatColorText.muiName = 'SvgIcon';

exports.default = FormatColorText;