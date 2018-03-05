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
    root: {
      flex: '1 1 auto'
    },
    horizontal: {},
    vertical: {
      marginLeft: 12, // half icon
      padding: '0 0 ' + theme.spacing.unit + 'px'
    },
    alternativeLabel: {
      position: 'absolute',
      top: theme.spacing.unit + 4,
      left: 'calc(50% + 20px)',
      right: 'calc(-50% + 20px)'
    },
    line: {
      display: 'block',
      borderColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
    },
    lineHorizontal: {
      borderTopStyle: 'solid',
      borderTopWidth: 1
    },
    lineVertical: {
      borderLeftStyle: 'solid',
      borderLeftWidth: 1,
      minHeight: theme.spacing.unit * 3
    }
  };
};

/**
 * @ignore - internal component.
 */
function StepConnector(props) {
  var _classNames2;

  var alternativeLabel = props.alternativeLabel,
      classNameProp = props.className,
      classes = props.classes,
      orientation = props.orientation,
      other = (0, _objectWithoutProperties3.default)(props, ['alternativeLabel', 'className', 'classes', 'orientation']);


  var className = (0, _classnames2.default)(classes.root, classes[orientation], (0, _defineProperty3.default)({}, classes.alternativeLabel, alternativeLabel), classNameProp);
  var lineClassName = (0, _classnames2.default)(classes.line, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.lineHorizontal, orientation === 'horizontal'), (0, _defineProperty3.default)(_classNames2, classes.lineVertical, orientation === 'vertical'), _classNames2));

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    _react2.default.createElement('span', { className: lineClassName })
  );
}

StepConnector.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @ignore
   * Set internally by Step when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: _propTypes2.default.bool,
  /**
   * Useful to extend the style applied to the component.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * @ignore
   */
  orientation: _propTypes2.default.oneOf(['horizontal', 'vertical'])
} : {};

StepConnector.defaultProps = {
  alternativeLabel: false,
  orientation: 'horizontal'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiStepConnector' })(StepConnector);