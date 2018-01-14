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

var _ref = _react2.default.createElement('circle', { cx: '12', cy: '19', r: '2' });

var _ref2 = _react2.default.createElement('path', { d: 'M10 3h4v12h-4z' });

var PriorityHigh = function PriorityHigh(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref,
    _ref2
  );
};

PriorityHigh = (0, _pure2.default)(PriorityHigh);
PriorityHigh.muiName = 'SvgIcon';

exports.default = PriorityHigh;