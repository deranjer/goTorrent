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

var _ref3; //  weak

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _ButtonBase = require('../ButtonBase');

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

var _KeyboardArrowLeft = require('../svg-icons/KeyboardArrowLeft');

var _KeyboardArrowLeft2 = _interopRequireDefault(_KeyboardArrowLeft);

var _KeyboardArrowRight = require('../svg-icons/KeyboardArrowRight');

var _KeyboardArrowRight2 = _interopRequireDefault(_KeyboardArrowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      color: 'inherit',
      flex: '0 0 ' + theme.spacing.unit * 7 + 'px'
    }
  };
};

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
   * Which direction should the button indicate?
   */
  direction: require('prop-types').oneOf(['left', 'right']).isRequired,

  /**
   * Callback to execute for button press.
   */
  onClick: require('prop-types').func,

  /**
   * Should the button be present or just consume space.
   */
  visible: require('prop-types').bool
};

var _ref = _react2.default.createElement(_KeyboardArrowLeft2.default, null);

var _ref2 = _react2.default.createElement(_KeyboardArrowRight2.default, null);

/**
 * @ignore - internal component.
 */
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

TabScrollButton.propTypes = process.env.NODE_ENV !== "production" ? (_ref3 = {
  classes: require('prop-types').object.isRequired
}, (0, _defineProperty3.default)(_ref3, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref3, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref3, 'direction', require('prop-types').oneOf(['left', 'right']).isRequired), (0, _defineProperty3.default)(_ref3, 'onClick', require('prop-types').func), (0, _defineProperty3.default)(_ref3, 'visible', require('prop-types').bool), _ref3) : {};
TabScrollButton.defaultProps = {
  visible: true
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTabScrollButton' })(TabScrollButton);