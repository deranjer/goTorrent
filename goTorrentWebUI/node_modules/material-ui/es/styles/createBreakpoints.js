var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const keys = ['xs', 'sm', 'md', 'lg', 'xl'];

// Keep in mind that @media is inclusive by the CSS specification.


export default function createBreakpoints(breakpoints) {
  const {
    values = {
      xs: 360,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    },
    unit = 'px',
    step = 5
  } = breakpoints,
        other = _objectWithoutProperties(breakpoints, ['values', 'unit', 'step']);

  function up(key) {
    let value;
    // min-width of xs starts at 0
    if (key === 'xs') {
      value = 0;
    } else {
      value = values[key] || key;
    }
    return `@media (min-width:${value}${unit})`;
  }

  function down(key) {
    const value = values[key] || key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start, end) {
    const startIndex = keys.indexOf(start);
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${values[keys[startIndex]]}${unit}) and ` + `(max-width:${values[keys[endIndex + 1]] - step / 100}${unit})`;
  }

  function only(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === keys.length - 1) {
      return up(key);
    }
    return between(key, key);
  }

  function width(key) {
    return values[key];
  }

  return _extends({
    keys,
    values,
    up,
    down,
    between,
    only,
    width
  }, other);
}