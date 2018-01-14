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

var _ref = _react2.default.createElement('path', { d: 'M18.2 1H9.8C8.81 1 8 1.81 8 2.8v14.4c0 .99.81 1.79 1.8 1.79l8.4.01c.99 0 1.8-.81 1.8-1.8V2.8c0-.99-.81-1.8-1.8-1.8zM14 3c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm0 13.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z' });

var _ref2 = _react2.default.createElement('circle', { cx: '14', cy: '12.5', r: '2.5' });

var _ref3 = _react2.default.createElement('path', { d: 'M6 5H4v16c0 1.1.89 2 2 2h10v-2H6V5z' });

var SpeakerGroup = function SpeakerGroup(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref,
    _ref2,
    _ref3
  );
};

SpeakerGroup = (0, _pure2.default)(SpeakerGroup);
SpeakerGroup.muiName = 'SvgIcon';

exports.default = SpeakerGroup;