'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _helpers = require('../utils/helpers');

var _Progress = require('../Progress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: theme.palette.background.default,
      padding: theme.spacing.unit
    },
    positionBottom: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: theme.zIndex.mobileStepper
    },
    positionTop: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: theme.zIndex.mobileStepper
    },
    positionStatic: {},
    dots: {
      display: 'flex',
      flexDirection: 'row'
    },
    dot: {
      backgroundColor: theme.palette.action.disabled,
      borderRadius: '50%',
      width: theme.spacing.unit,
      height: theme.spacing.unit,
      margin: '0 2px'
    },
    dotActive: {
      backgroundColor: theme.palette.primary.main
    },
    progress: {
      width: '50%'
    }
  };
}; // @inheritedComponent Paper

function MobileStepper(props) {
  var activeStep = props.activeStep,
      backButton = props.backButton,
      classes = props.classes,
      classNameProp = props.className,
      nextButton = props.nextButton,
      position = props.position,
      steps = props.steps,
      variant = props.variant,
      other = (0, _objectWithoutProperties3.default)(props, ['activeStep', 'backButton', 'classes', 'className', 'nextButton', 'position', 'steps', 'variant']);


  var className = (0, _classnames2.default)(classes.root, classes['position' + (0, _helpers.capitalize)(position)], classNameProp);

  return _react2.default.createElement(
    _Paper2.default,
    (0, _extends3.default)({ square: true, elevation: 0, className: className }, other),
    backButton,
    variant === 'dots' && _react2.default.createElement(
      'div',
      { className: classes.dots },
      [].concat((0, _toConsumableArray3.default)(new Array(steps))).map(function (_, step) {
        var dotClassName = (0, _classnames2.default)((0, _defineProperty3.default)({}, classes.dotActive, step === activeStep), classes.dot);
        // eslint-disable-next-line react/no-array-index-key
        return _react2.default.createElement('div', { key: step, className: dotClassName });
      })
    ),
    variant === 'progress' && _react2.default.createElement(
      'div',
      { className: classes.progress },
      _react2.default.createElement(_Progress.LinearProgress, { variant: 'determinate', value: Math.ceil(activeStep / (steps - 1) * 100) })
    ),
    nextButton
  );
}

MobileStepper.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   */
  activeStep: _propTypes2.default.number,
  /**
   * A back button element. For instance, it can be be a `Button` or a `IconButton`.
   */
  backButton: _propTypes2.default.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * A next button element. For instance, it can be be a `Button` or a `IconButton`.
   */
  nextButton: _propTypes2.default.node,
  /**
   * Set the positioning type.
   */
  position: _propTypes2.default.oneOf(['bottom', 'top', 'static']),
  /**
   * The total steps.
   */
  steps: _propTypes2.default.number.isRequired,
  /**
   * The type of mobile stepper to use.
   */
  variant: _propTypes2.default.oneOf(['text', 'dots', 'progress'])
} : {};

MobileStepper.defaultProps = {
  activeStep: 0,
  position: 'bottom',
  variant: 'dots'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiMobileStepper' })(MobileStepper);