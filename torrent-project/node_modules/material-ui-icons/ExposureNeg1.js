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

var _ref = _react2.default.createElement('path', { d: 'M4 11v2h8v-2H4zm15 7h-2V7.38L14 8.4V6.7L18.7 5h.3v13z' });

var ExposureNeg1 = function ExposureNeg1(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

ExposureNeg1 = (0, _pure2.default)(ExposureNeg1);
ExposureNeg1.muiName = 'SvgIcon';

exports.default = ExposureNeg1;