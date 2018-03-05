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

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _StepConnector = require('./StepConnector');

var _StepConnector2 = _interopRequireDefault(_StepConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @inheritedComponent Paper

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      padding: theme.spacing.unit * 3
    },
    horizontal: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    vertical: {
      flexDirection: 'column'
    },
    alternativeLabel: {
      alignItems: 'flex-start'
    }
  };
};

function Stepper(props) {
  var activeStep = props.activeStep,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      connectorProp = props.connector,
      nonLinear = props.nonLinear,
      orientation = props.orientation,
      other = (0, _objectWithoutProperties3.default)(props, ['activeStep', 'alternativeLabel', 'children', 'classes', 'className', 'connector', 'nonLinear', 'orientation']);


  var className = (0, _classnames2.default)(classes.root, classes[orientation], (0, _defineProperty3.default)({}, classes.alternativeLabel, alternativeLabel), classNameProp);

  var connector = _react2.default.isValidElement(connectorProp) ? _react2.default.cloneElement(connectorProp, { orientation: orientation }) : null;
  var childrenArray = _react2.default.Children.toArray(children);
  var steps = childrenArray.map(function (step, index) {
    var controlProps = {
      index: index,
      orientation: orientation,
      active: false,
      completed: false,
      disabled: false,
      last: index + 1 === childrenArray.length,
      alternativeLabel: alternativeLabel,
      connector: connectorProp
    };

    if (activeStep === index) {
      controlProps.active = true;
    } else if (!nonLinear && activeStep > index) {
      controlProps.completed = true;
    } else if (!nonLinear && activeStep < index) {
      controlProps.disabled = true;
    }

    return [!alternativeLabel && connector && index > 0 && _react2.default.cloneElement(connector, {
      key: index // eslint-disable-line react/no-array-index-key
    }), _react2.default.cloneElement(step, (0, _extends3.default)({}, controlProps, step.props))];
  });

  return _react2.default.createElement(
    _Paper2.default,
    (0, _extends3.default)({ square: true, elevation: 0, className: className }, other),
    steps
  );
}

Stepper.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Set the active step (zero based index).
   */
  activeStep: _propTypes2.default.number,
  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel: _propTypes2.default.bool,
  /**
   * Two or more `<Step />` components.
   */
  children: _propTypes2.default.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * A component to be placed between each step.
   */
  connector: _propTypes2.default.element,
  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear: _propTypes2.default.bool,
  /**
   * The stepper orientation (layout flow direction).
   */
  orientation: _propTypes2.default.oneOf(['horizontal', 'vertical'])
} : {};

Stepper.defaultProps = {
  activeStep: 0,
  alternativeLabel: false,
  connector: _react2.default.createElement(_StepConnector2.default, null),
  nonLinear: false,
  orientation: 'horizontal'
};

Stepper.muiName = 'Stepper';

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiStepper' })(Stepper);