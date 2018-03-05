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

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var _reactHelpers = require('../utils/reactHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left'
    },
    container: {
      position: 'relative'
    },
    keyboardFocused: {
      backgroundColor: theme.palette.action.hover
    },
    default: {
      paddingTop: 12,
      paddingBottom: 12
    },
    dense: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    disabled: {
      opacity: 0.5
    },
    divider: {
      borderBottom: '1px solid ' + theme.palette.divider,
      backgroundClip: 'padding-box'
    },
    gutters: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    },
    button: {
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest
      }),
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: theme.palette.action.hover,
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    },
    secondaryAction: {
      // Add some space to avoid collision as `ListItemSecondaryAction`
      // is absolutely positionned.
      paddingRight: theme.spacing.unit * 4
    }
  };
};

var ListItem = function (_React$Component) {
  (0, _inherits3.default)(ListItem, _React$Component);

  function ListItem() {
    (0, _classCallCheck3.default)(this, ListItem);
    return (0, _possibleConstructorReturn3.default)(this, (ListItem.__proto__ || (0, _getPrototypeOf2.default)(ListItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(ListItem, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        dense: this.props.dense || this.context.dense || false
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          button = _props.button,
          childrenProp = _props.children,
          classes = _props.classes,
          classNameProp = _props.className,
          componentProp = _props.component,
          ContainerComponent = _props.ContainerComponent,
          ContainerProps = _props.ContainerProps,
          dense = _props.dense,
          disabled = _props.disabled,
          disableGutters = _props.disableGutters,
          divider = _props.divider,
          other = (0, _objectWithoutProperties3.default)(_props, ['button', 'children', 'classes', 'className', 'component', 'ContainerComponent', 'ContainerProps', 'dense', 'disabled', 'disableGutters', 'divider']);


      var isDense = dense || this.context.dense || false;
      var children = _react2.default.Children.toArray(childrenProp);
      var hasAvatar = children.some(function (value) {
        return (0, _reactHelpers.isMuiElement)(value, ['ListItemAvatar']);
      });
      var hasSecondaryAction = children.length && (0, _reactHelpers.isMuiElement)(children[children.length - 1], ['ListItemSecondaryAction']);

      var className = (0, _classnames2.default)(classes.root, isDense || hasAvatar ? classes.dense : classes.default, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.gutters, !disableGutters), (0, _defineProperty3.default)(_classNames, classes.divider, divider), (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, classes.button, button), (0, _defineProperty3.default)(_classNames, classes.secondaryAction, hasSecondaryAction), _classNames), classNameProp);

      var componentProps = (0, _extends3.default)({ className: className, disabled: disabled }, other);
      var Component = componentProp || 'li';

      if (button) {
        componentProps.component = componentProp || 'div';
        componentProps.keyboardFocusedClassName = classes.keyboardFocused;
        Component = _ButtonBase2.default;
      }

      if (hasSecondaryAction) {
        Component = Component !== _ButtonBase2.default && !componentProp ? 'div' : Component;

        return _react2.default.createElement(
          ContainerComponent,
          (0, _extends3.default)({ className: classes.container }, ContainerProps),
          _react2.default.createElement(
            Component,
            componentProps,
            children
          ),
          children.pop()
        );
      }

      return _react2.default.createElement(
        Component,
        componentProps,
        children
      );
    }
  }]);
  return ListItem;
}(_react2.default.Component);

ListItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * If `true`, the list item will be a button (using `ButtonBase`).
   */
  button: _propTypes2.default.bool,
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
   * By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  /**
   * The container component. Useful when a `ListItemSecondaryAction` is rendered.
   */
  ContainerComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  /**
   * Properties applied to the container element when the component
   * is used to display a `ListItemSecondaryAction`.
   */
  ContainerProps: _propTypes2.default.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense: _propTypes2.default.bool,
  /**
   * @ignore
   */
  disabled: _propTypes2.default.bool,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: _propTypes2.default.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   */
  divider: _propTypes2.default.bool
} : {};

ListItem.defaultProps = {
  button: false,
  ContainerComponent: 'li',
  dense: false,
  disabled: false,
  disableGutters: false,
  divider: false
};

ListItem.contextTypes = {
  dense: _propTypes2.default.bool
};

ListItem.childContextTypes = {
  dense: _propTypes2.default.bool
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiListItem' })(ListItem);