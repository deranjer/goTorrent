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

var _ref = _react2.default.createElement('path', { d: 'M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29c-.39-.39-1.02-.39-1.41 0L15 2.25 18.75 6l1.96-1.96z' });

var _ref2 = _react2.default.createElement('path', { fillOpacity: '.36', d: 'M0 20h24v4H0z' });

var BorderColor = function BorderColor(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref,
    _ref2
  );
};

BorderColor = (0, _pure2.default)(BorderColor);
BorderColor.muiName = 'SvgIcon';

exports.default = BorderColor;