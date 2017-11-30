var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning';
import createTypography from './createTypography';
import createBreakpoints from './createBreakpoints';
import createPalette from './createPalette';
import createMixins from './createMixins';
import shadows from './shadows';
import transitions from './transitions';
import zIndex from './zIndex';
import spacing from './spacing';

function createMuiTheme(options = {}) {
  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    typography: typographyInput = {},
    shadows: shadowsInput
  } = options,
        other = _objectWithoutProperties(options, ['palette', 'breakpoints', 'mixins', 'typography', 'shadows']);

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);

  const muiTheme = _extends({
    direction: 'ltr',
    palette,
    typography: createTypography(palette, typographyInput),
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    breakpoints,
    shadows: shadowsInput || shadows
  }, deepmerge({
    transitions,
    spacing,
    zIndex
  }, other));

  warning(muiTheme.shadows.length === 25, 'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.');

  return muiTheme;
}

export default createMuiTheme;