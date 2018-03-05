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

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Collapse = require('../transitions/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      marginTop: theme.spacing.unit,
      marginLeft: 12, // half icon
      paddingLeft: theme.spacing.unit + 12, // margin + half icon
      paddingRight: theme.spacing.unit,
      borderLeft: '1px solid ' + (theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600])
    },
    last: {
      borderLeft: 'none'
    },
    transition: {}
  };
};

function StepContent(props) {
  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      completed = props.completed,
      last = props.last,
      optional = props.optional,
      orientation = props.orientation,
      Transition = props.transition,
      transitionDuration = props.transitionDuration,
      other = (0, _objectWithoutProperties3.default)(props, ['active', 'alternativeLabel', 'children', 'classes', 'className', 'completed', 'last', 'optional', 'orientation', 'transition', 'transitionDuration']);


  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(orientation === 'vertical', 'Material-UI: <StepContent /> is only designed for use with the vertical stepper.') : void 0;

  var className = (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.last, last), classNameProp);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    _react2.default.createElement(
      Transition,
      {
        'in': active,
        className: classes.transition,
        timeout: transitionDuration,
        unmountOnExit: true
      },
      children
    )
  );
}

StepContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @ignore
   * Expands the content.
   */
  active: _propTypes2.default.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: _propTypes2.default.bool,
  /**
   * Step content.
   */
  children: _propTypes2.default.node,
  /**
   * @ignore
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * @ignore
   */
  completed: _propTypes2.default.bool,
  /**
   * @ignore
   */
  last: _propTypes2.default.bool,
  /**
   * @ignore
   * Set internally by Step when it's supplied with the optional property.
   */
  optional: _propTypes2.default.bool,
  /**
   * @ignore
   */
  orientation: _propTypes2.default.oneOf(['horizontal', 'vertical']),
  /**
   * Collapse component.
   */
  transition: _propTypes2.default.func,
  /**
   * Adjust the duration of the content expand transition.
   * Passed as a property to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({ enter: _propTypes2.default.number, exit: _propTypes2.default.number }), _propTypes2.default.oneOf(['auto'])])
} : {};

StepContent.defaultProps = {
  transition: _Collapse2.default,
  transitionDuration: 'auto'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiStepContent' })(StepContent);