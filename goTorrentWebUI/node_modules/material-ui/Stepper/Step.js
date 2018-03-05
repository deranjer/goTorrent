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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {},
    horizontal: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      '&:first-child': {
        paddingLeft: 0
      },
      '&:last-child': {
        paddingRight: 0
      }
    },
    vertical: {},
    alternativeLabel: {
      flex: 1,
      position: 'relative'
    }
  };
};

function Step(props) {
  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      completed = props.completed,
      connector = props.connector,
      disabled = props.disabled,
      index = props.index,
      last = props.last,
      orientation = props.orientation,
      other = (0, _objectWithoutProperties3.default)(props, ['active', 'alternativeLabel', 'children', 'classes', 'className', 'completed', 'connector', 'disabled', 'index', 'last', 'orientation']);


  var className = (0, _classnames2.default)(classes.root, classes[orientation], (0, _defineProperty3.default)({}, classes.alternativeLabel, alternativeLabel), classNameProp);

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    _react2.default.Children.map(children, function (child) {
      return _react2.default.cloneElement(child, (0, _extends3.default)({
        active: active,
        alternativeLabel: alternativeLabel,
        completed: completed,
        disabled: disabled,
        icon: index + 1,
        last: last,
        orientation: orientation
      }, child.props));
    }),
    connector && alternativeLabel && !last && _react2.default.cloneElement(connector, { orientation: orientation, alternativeLabel: alternativeLabel })
  );
}

Step.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active: _propTypes2.default.bool,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: _propTypes2.default.bool,
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
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
   * Mark the step as completed. Is passed to child components.
   */
  completed: _propTypes2.default.bool,
  /**
   * @ignore
   * Passed down from Stepper if alternativeLabel is also set.
   */
  connector: _propTypes2.default.element,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: _propTypes2.default.bool,
  /**
   * @ignore
   * Used internally for numbering.
   */
  index: _propTypes2.default.number,
  /**
   * @ignore
   */
  last: _propTypes2.default.bool,
  /**
   * @ignore
   */
  orientation: _propTypes2.default.oneOf(['horizontal', 'vertical'])
} : {};

Step.defaultProps = {
  active: false,
  completed: false,
  disabled: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiStep' })(Step);