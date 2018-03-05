'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  var shadows = {};
  theme.shadows.forEach(function (shadow, index) {
    shadows['shadow' + index] = {
      boxShadow: shadow
    };
  });

  return (0, _extends3.default)({
    root: {
      backgroundColor: theme.palette.background.paper
    },
    rounded: {
      borderRadius: 2
    }
  }, shadows);
};

function Paper(props) {
  var classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      square = props.square,
      elevation = props.elevation,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'component', 'square', 'elevation']);


  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(elevation >= 0 && elevation < 25, 'Material-UI: this elevation `' + elevation + '` is not implemented.') : void 0;

  var className = (0, _classnames2.default)(classes.root, classes['shadow' + elevation], (0, _defineProperty3.default)({}, classes.rounded, !square), classNameProp);

  return _react2.default.createElement(Component, (0, _extends3.default)({ className: className }, other));
}

Paper.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: _propTypes2.default.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It's accepting values between 0 and 24 inclusive.
   */
  elevation: _propTypes2.default.number,
  /**
   * If `true`, rounded corners are disabled.
   */
  square: _propTypes2.default.bool
} : {};

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPaper' })(Paper);