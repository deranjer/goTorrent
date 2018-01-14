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

var _ref = _react2.default.createElement('circle', { cx: '7.2', cy: '14.4', r: '3.2' });

var _ref2 = _react2.default.createElement('circle', { cx: '14.8', cy: '18', r: '2' });

var _ref3 = _react2.default.createElement('circle', { cx: '15.2', cy: '8.8', r: '4.8' });

var BubbleChart = function BubbleChart(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref,
    _ref2,
    _ref3
  );
};

BubbleChart = (0, _pure2.default)(BubbleChart);
BubbleChart.muiName = 'SvgIcon';

exports.default = BubbleChart;