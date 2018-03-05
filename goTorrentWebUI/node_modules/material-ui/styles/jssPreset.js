'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jssGlobal = require('jss-global');

var _jssGlobal2 = _interopRequireDefault(_jssGlobal);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssCamelCase = require('jss-camel-case');

var _jssCamelCase2 = _interopRequireDefault(_jssCamelCase);

var _jssDefaultUnit = require('jss-default-unit');

var _jssDefaultUnit2 = _interopRequireDefault(_jssDefaultUnit);

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

var _jssPropsSort = require('jss-props-sort');

var _jssPropsSort2 = _interopRequireDefault(_jssPropsSort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Subset of jss-preset-default with only the plugins the Material-UI
// components are using.
function jssPreset() {
  return {
    plugins: [(0, _jssGlobal2.default)(), (0, _jssNested2.default)(), (0, _jssCamelCase2.default)(), (0, _jssDefaultUnit2.default)(), (0, _jssVendorPrefixer2.default)(), (0, _jssPropsSort2.default)()]
  };
}

exports.default = jssPreset;