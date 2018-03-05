'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIZE = 50;

function getRelativeValue(value, min, max) {
  var clampedValue = Math.min(Math.max(min, value), max);
  return (clampedValue - min) / (max - min);
}

function easeOut(t) {
  t = getRelativeValue(t, 0, 1);
  // https://gist.github.com/gre/1650294
  t = (t -= 1) * t * t + 1;
  return t;
}

function easeIn(t) {
  return t * t;
}

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'inline-block'
    },
    colorPrimary: {
      color: theme.palette.primary.main
    },
    colorSecondary: {
      color: theme.palette.secondary.main
    },
    svg: {},
    svgIndeterminate: {
      animation: 'mui-progress-circular-rotate 1.4s linear infinite'
    },
    circle: {
      stroke: 'currentColor',
      strokeLinecap: 'round'
    },
    circleIndeterminate: {
      animation: 'mui-progress-circular-dash 1.4s ease-in-out infinite',
      // Some default value that looks fine waiting for the animation to kicks in.
      strokeDasharray: '80px, 200px',
      strokeDashoffset: '0px' // Add the unit to fix a Edge 16 and below bug.
    },
    '@keyframes mui-progress-circular-rotate': {
      '100%': {
        transform: 'rotate(360deg)'
      }
    },
    '@keyframes mui-progress-circular-dash': {
      '0%': {
        strokeDasharray: '1px, 200px',
        strokeDashoffset: '0px'
      },
      '50%': {
        strokeDasharray: '100px, 200px',
        strokeDashoffset: '-15px'
      },
      '100%': {
        strokeDasharray: '100px, 200px',
        strokeDashoffset: '-120px'
      }
    }
  };
};

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
function CircularProgress(props) {
  var _classNames2;

  var classes = props.classes,
      className = props.className,
      color = props.color,
      max = props.max,
      min = props.min,
      size = props.size,
      style = props.style,
      thickness = props.thickness,
      value = props.value,
      variant = props.variant,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'color', 'max', 'min', 'size', 'style', 'thickness', 'value', 'variant']);


  var circleStyle = {};
  var rootStyle = {};
  var rootProps = {};

  if (variant === 'determinate' || variant === 'static') {
    var relVal = getRelativeValue(value, min, max) * 100;
    var circumference = 2 * Math.PI * (SIZE / 2 - 5);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(relVal);

    if (variant === 'static') {
      circleStyle.strokeDashoffset = ((100 - relVal) / 100 * circumference).toFixed(3) + 'px';
      rootStyle.transform = 'rotate(-90deg)';
    } else {
      circleStyle.strokeDashoffset = (easeIn((100 - relVal) / 100) * circumference).toFixed(3) + 'px';
      rootStyle.transform = 'rotate(' + (easeOut(relVal / 70) * 270).toFixed(3) + 'deg)';
    }
  }

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({
      className: (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes['color' + (0, _helpers.capitalize)(color)], color !== 'inherit'), className),
      style: (0, _extends3.default)({ width: size, height: size }, rootStyle, style),
      role: 'progressbar'
    }, rootProps, other),
    _react2.default.createElement(
      'svg',
      {
        className: (0, _classnames2.default)(classes.svg, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.svgIndeterminate, variant === 'indeterminate'), (0, _defineProperty3.default)(_classNames2, classes.svgStatic, variant === 'static'), _classNames2)),
        viewBox: '0 0 ' + SIZE + ' ' + SIZE
      },
      _react2.default.createElement('circle', {
        className: (0, _classnames2.default)(classes.circle, (0, _defineProperty3.default)({}, classes.circleIndeterminate, variant === 'indeterminate')),
        style: circleStyle,
        cx: SIZE / 2,
        cy: SIZE / 2,
        r: SIZE / 2 - 5,
        fill: 'none',
        strokeWidth: thickness
      })
    )
  );
}

CircularProgress.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: _propTypes2.default.oneOf(['primary', 'secondary', 'inherit']),
  /**
   * The max value of progress in determinate variant.
   */
  max: _propTypes2.default.number,
  /**
   * The min value of progress in determinate variant.
   */
  min: _propTypes2.default.number,
  /**
   * The size of the circle.
   */
  size: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  /**
   * @ignore
   */
  style: _propTypes2.default.object,
  /**
   * The thickness of the circle.
   */
  thickness: _propTypes2.default.number,
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: _propTypes2.default.number,
  /**
   * The variant of progress indicator. Use indeterminate
   * when there is no progress value.
   */
  variant: _propTypes2.default.oneOf(['determinate', 'indeterminate', 'static'])
} : {};

CircularProgress.defaultProps = {
  color: 'primary',
  max: 100,
  min: 0,
  size: 40,
  thickness: 3.6,
  value: 0,
  variant: 'indeterminate'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiCircularProgress', flip: false })(CircularProgress);