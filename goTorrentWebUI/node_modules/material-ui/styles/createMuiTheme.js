'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _createTypography = require('./createTypography');

var _createTypography2 = _interopRequireDefault(_createTypography);

var _createBreakpoints = require('./createBreakpoints');

var _createBreakpoints2 = _interopRequireDefault(_createBreakpoints);

var _createPalette = require('./createPalette');

var _createPalette2 = _interopRequireDefault(_createPalette);

var _createMixins = require('./createMixins');

var _createMixins2 = _interopRequireDefault(_createMixins);

var _shadows = require('./shadows');

var _shadows2 = _interopRequireDefault(_shadows);

var _transitions = require('./transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _zIndex = require('./zIndex');

var _zIndex2 = _interopRequireDefault(_zIndex);

var _spacing = require('./spacing');

var _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMuiTheme() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$palette = options.palette,
      paletteInput = _options$palette === undefined ? {} : _options$palette,
      _options$breakpoints = options.breakpoints,
      breakpointsInput = _options$breakpoints === undefined ? {} : _options$breakpoints,
      _options$mixins = options.mixins,
      mixinsInput = _options$mixins === undefined ? {} : _options$mixins,
      _options$typography = options.typography,
      typographyInput = _options$typography === undefined ? {} : _options$typography,
      shadowsInput = options.shadows,
      other = (0, _objectWithoutProperties3.default)(options, ['palette', 'breakpoints', 'mixins', 'typography', 'shadows']);


  var palette = (0, _createPalette2.default)(paletteInput);
  var breakpoints = (0, _createBreakpoints2.default)(breakpointsInput);

  var muiTheme = (0, _extends3.default)({
    direction: 'ltr',
    palette: palette,
    typography: (0, _createTypography2.default)(palette, typographyInput),
    mixins: (0, _createMixins2.default)(breakpoints, _spacing2.default, mixinsInput),
    breakpoints: breakpoints,
    shadows: shadowsInput || _shadows2.default
  }, (0, _deepmerge2.default)({
    transitions: _transitions2.default,
    spacing: _spacing2.default,
    zIndex: _zIndex2.default
  }, other));

  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(muiTheme.shadows.length === 25, 'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.') : void 0;

  return muiTheme;
} // < 1kb payload overhead when lodash/merge is > 3kb.
exports.default = createMuiTheme;