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

var _ref = _react2.default.createElement(
  'g',
  null,
  _react2.default.createElement('circle', { cx: '9', cy: '12', r: '8' }),
  _react2.default.createElement('path', { d: 'M17 4.26v2.09c2.33.82 4 3.04 4 5.65s-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74s-2.55-6.85-6-7.74z' })
);

var FiberSmartRecord = function FiberSmartRecord(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

FiberSmartRecord = (0, _pure2.default)(FiberSmartRecord);
FiberSmartRecord.muiName = 'SvgIcon';

exports.default = FiberSmartRecord;