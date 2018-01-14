'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIZE = 50;

function getRelativeValue(value, min, max) {
  var clampedValue = Math.min(Math.max(min, value), max);
  return (clampedValue - min) / (max - min);
}

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'inline-block'
    },
    primaryColor: {
      color: theme.palette.primary[500]
    },
    accentColor: {
      color: theme.palette.secondary.A200
    },
    svgIndeterminate: {
      animation: 'mui-progress-circular-rotate 1.4s linear infinite'
    },
    svgDeterminate: {
      transform: 'rotate(-90deg)'
    },
    circle: {
      stroke: 'currentColor',
      strokeLinecap: 'round'
    },
    circleIndeterminate: {
      animation: 'mui-progress-circular-dash 1.4s ease-in-out infinite',
      // Some default value that looks fine waiting for the animation to kicks in.
      strokeDasharray: '80,200',
      strokeDashoffset: 0
    },
    '@keyframes mui-progress-circular-rotate': {
      '100%': {
        transform: 'rotate(360deg)'
      }
    },
    '@keyframes mui-progress-circular-dash': {
      '0%': {
        strokeDasharray: '1,200',
        strokeDashoffset: 0
      },
      '50%': {
        strokeDasharray: '100,200',
        strokeDashoffset: -15
      },
      '100%': {
        strokeDasharray: '100,200',
        strokeDashoffset: -120
      }
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Color = require('prop-types').oneOf(['primary', 'accent', 'inherit']);

var babelPluginFlowReactPropTypes_proptype_Mode = require('prop-types').oneOf(['determinate', 'indeterminate']);

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: require('prop-types').oneOf(['primary', 'accent', 'inherit']),

  /**
   * The max value of progress in determinate mode.
   */
  max: require('prop-types').number,

  /**
   * The min value of progress in determinate mode.
   */
  min: require('prop-types').number,

  /**
   * The mode of show your progress. Indeterminate
   * for when there is no value for progress.
   * Determinate for controlled progress value.
   */
  mode: require('prop-types').oneOf(['determinate', 'indeterminate']),

  /**
   * The size of the circle.
   */
  size: require('prop-types').number,

  /**
   * @ignore
   */
  style: require('prop-types').object,

  /**
   * The thickness of the circle.
   */
  thickness: require('prop-types').number,

  /**
   * The value of progress in determinate mode.
   */
  value: require('prop-types').number
};


function CircularProgress(props) {
  var _classNames;

  var classes = props.classes,
      className = props.className,
      color = props.color,
      size = props.size,
      style = props.style,
      thickness = props.thickness,
      mode = props.mode,
      value = props.value,
      min = props.min,
      max = props.max,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'color', 'size', 'style', 'thickness', 'mode', 'value', 'min', 'max']);


  var rootProps = {};

  var circleStyle = {};
  if (mode === 'determinate') {
    var relVal = getRelativeValue(value, min, max) * 100;
    var circumference = 2 * Math.PI * (SIZE / 2 - 5);

    circleStyle.strokeDashoffset = Math.round((100 - relVal) / 100 * circumference * 1000) / 1000 + 'px';
    circleStyle.strokeDasharray = Math.round(circumference * 1000) / 1000;

    rootProps['aria-valuenow'] = value;
    rootProps['aria-valuemin'] = min;
    rootProps['aria-valuemax'] = max;
  }

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({
      className: (0, _classnames2.default)(classes.root, color !== 'inherit' && classes[color + 'Color'], className),
      style: (0, _extends3.default)({ width: size, height: size }, style),
      role: 'progressbar'
    }, rootProps, other),
    _react2.default.createElement(
      'svg',
      {
        className: (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.svgIndeterminate, mode === 'indeterminate'), (0, _defineProperty3.default)(_classNames, classes.svgDeterminate, mode === 'determinate'), _classNames)),
        viewBox: '0 0 ' + SIZE + ' ' + SIZE
      },
      _react2.default.createElement('circle', {
        className: (0, _classnames2.default)(classes.circle, (0, _defineProperty3.default)({}, classes.circleIndeterminate, mode === 'indeterminate')),
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

CircularProgress.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  color: require('prop-types').oneOf(['primary', 'accent', 'inherit']).isRequired,
  size: require('prop-types').number.isRequired,
  mode: require('prop-types').oneOf(['determinate', 'indeterminate']).isRequired,
  value: require('prop-types').number.isRequired,
  min: require('prop-types').number.isRequired,
  max: require('prop-types').number.isRequired
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'color', require('prop-types').oneOf(['primary', 'accent', 'inherit'])), (0, _defineProperty3.default)(_ref, 'max', require('prop-types').number), (0, _defineProperty3.default)(_ref, 'min', require('prop-types').number), (0, _defineProperty3.default)(_ref, 'mode', require('prop-types').oneOf(['determinate', 'indeterminate'])), (0, _defineProperty3.default)(_ref, 'size', require('prop-types').number), (0, _defineProperty3.default)(_ref, 'style', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'thickness', require('prop-types').number), (0, _defineProperty3.default)(_ref, 'value', require('prop-types').number), _ref) : {};
CircularProgress.defaultProps = {
  color: 'primary',
  size: 40,
  thickness: 3.6,
  mode: 'indeterminate',
  value: 0,
  min: 0,
  max: 100
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiCircularProgress' })(CircularProgress);