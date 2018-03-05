'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CheckCircle = require('../internal/svg-icons/CheckCircle');

var _CheckCircle2 = _interopRequireDefault(_CheckCircle);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _StepPositionIcon = require('./StepPositionIcon');

var _StepPositionIcon2 = _interopRequireDefault(_StepPositionIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'block'
    },
    completed: {
      color: theme.palette.primary.main
    }
  };
};

function StepIcon(props) {
  var completed = props.completed,
      icon = props.icon,
      active = props.active,
      classes = props.classes;


  if (typeof icon === 'number' || typeof icon === 'string') {
    if (completed) {
      return _react2.default.createElement(_CheckCircle2.default, { className: (0, _classnames2.default)(classes.root, classes.completed) });
    }
    return _react2.default.createElement(_StepPositionIcon2.default, { className: classes.root, position: icon, active: active });
  }

  return icon;
}

StepIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Whether this step is active.
   */
  active: _propTypes2.default.bool,
  /**
   * Classses for component style customizations.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: _propTypes2.default.bool,
  /**
   * The icon displayed by the step label.
   */
  icon: _propTypes2.default.node.isRequired
} : {};

StepIcon.defaultProps = {
  active: false,
  completed: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiStepIcon' })(StepIcon);