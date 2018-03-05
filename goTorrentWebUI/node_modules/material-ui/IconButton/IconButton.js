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

var _ButtonBase = require('../ButtonBase');

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

var _helpers = require('../utils/helpers');

var _reactHelpers = require('../utils/reactHelpers');

require('../SvgIcon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Ensure CSS specificity

// @inheritedComponent ButtonBase

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      textAlign: 'center',
      flex: '0 0 auto',
      fontSize: theme.typography.pxToRem(24),
      width: theme.spacing.unit * 6,
      height: theme.spacing.unit * 6,
      padding: 0,
      borderRadius: '50%',
      color: theme.palette.action.active,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest
      })
    },
    colorInherit: {
      color: 'inherit'
    },
    colorPrimary: {
      color: theme.palette.primary.main
    },
    colorSecondary: {
      color: theme.palette.secondary.main
    },
    disabled: {
      color: theme.palette.action.disabled
    },
    label: {
      width: '100%',
      display: 'flex',
      alignItems: 'inherit',
      justifyContent: 'inherit'
    }
  };
};

/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */
function IconButton(props) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      className = props.className,
      color = props.color,
      disabled = props.disabled,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'color', 'disabled']);


  return _react2.default.createElement(
    _ButtonBase2.default,
    (0, _extends3.default)({
      className: (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes['color' + (0, _helpers.capitalize)(color)], color !== 'default'), (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), _classNames), className),
      centerRipple: true,
      focusRipple: true,
      disabled: disabled
    }, other),
    _react2.default.createElement(
      'span',
      { className: classes.label },
      _react2.default.Children.map(children, function (child) {
        if ((0, _reactHelpers.isMuiElement)(child, ['Icon', 'SvgIcon'])) {
          return _react2.default.cloneElement(child, { fontSize: true });
        }
        return child;
      })
    )
  );
}

IconButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The icon element.
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
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: _propTypes2.default.oneOf(['default', 'inherit', 'primary', 'secondary']),
  /**
   * If `true`, the button will be disabled.
   */
  disabled: _propTypes2.default.bool,
  /**
   * If `true`, the ripple will be disabled.
   */
  disableRipple: _propTypes2.default.bool
} : {};

IconButton.defaultProps = {
  color: 'default',
  disabled: false,
  disableRipple: false
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiIconButton' })(IconButton);