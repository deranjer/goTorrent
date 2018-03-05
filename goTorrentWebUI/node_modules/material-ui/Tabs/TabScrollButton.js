'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _KeyboardArrowLeft = require('../internal/svg-icons/KeyboardArrowLeft');

var _KeyboardArrowLeft2 = _interopRequireDefault(_KeyboardArrowLeft);

var _KeyboardArrowRight = require('../internal/svg-icons/KeyboardArrowRight');

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ButtonBase = require('../ButtonBase');

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      color: 'inherit',
      flex: '0 0 ' + theme.spacing.unit * 7 + 'px'
    }
  };
};

/**
 * @ignore - internal component.
 */

var _ref = _react2.default.createElement(_KeyboardArrowLeft2.default, null);

var _ref2 = _react2.default.createElement(_KeyboardArrowRight2.default, null);

function TabScrollButton(props) {
  var classes = props.classes,
      classNameProp = props.className,
      direction = props.direction,
      onClick = props.onClick,
      visible = props.visible,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'direction', 'onClick', 'visible']);


  var className = (0, _classnames2.default)(classes.root, classNameProp);

  if (!visible) {
    return _react2.default.createElement('div', { className: className });
  }

  return _react2.default.createElement(
    _ButtonBase2.default,
    (0, _extends3.default)({ className: className, onClick: onClick, tabIndex: -1 }, other),
    direction === 'left' ? _ref : _ref2
  );
}

TabScrollButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * Which direction should the button indicate?
   */
  direction: _propTypes2.default.oneOf(['left', 'right']),
  /**
   * Callback to execute for button press.
   */
  onClick: _propTypes2.default.func,
  /**
   * Should the button be present or just consume space.
   */
  visible: _propTypes2.default.bool
} : {};

TabScrollButton.defaultProps = {
  visible: true
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTabScrollButton' })(TabScrollButton);