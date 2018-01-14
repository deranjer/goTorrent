'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createMixins;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMixins(breakpoints, spacing, mixins) {
  var _toolbar;

  return (0, _extends3.default)({
    gutters: function gutters(styles) {
      styles.paddingLeft = spacing.unit * 2;
      styles.paddingRight = spacing.unit * 2;
      styles[breakpoints.up('sm')] = {
        paddingLeft: spacing.unit * 3,
        paddingRight: spacing.unit * 3
      };
      return styles;
    },
    toolbar: (_toolbar = {
      minHeight: 56
    }, (0, _defineProperty3.default)(_toolbar, breakpoints.up('xs') + ' and (orientation: landscape)', {
      minHeight: 48
    }), (0, _defineProperty3.default)(_toolbar, breakpoints.up('sm'), {
      minHeight: 64
    }), _toolbar)
  }, mixins);
}