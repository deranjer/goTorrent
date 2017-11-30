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

var _ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_ElementType = require('react').babelPluginFlowReactPropTypes_proptype_ElementType || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  var focusColor = theme.palette.primary[theme.palette.type === 'light' ? 'A700' : 'A200'];
  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.input.labelText,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: 1,
      padding: 0
    },
    focused: {
      color: focusColor
    },
    error: {
      color: theme.palette.error.A400
    },
    disabled: {
      color: theme.palette.input.disabled
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * The content of the component.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType),

  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: require('prop-types').bool,

  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: require('prop-types').bool,

  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: require('prop-types').bool,

  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: require('prop-types').bool
};


function FormLabel(props, context) {
  var _classNames;

  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      disabledProp = props.disabled,
      errorProp = props.error,
      focusedProp = props.focused,
      requiredProp = props.required,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'component', 'disabled', 'error', 'focused', 'required']);
  var muiFormControl = context.muiFormControl;


  var required = requiredProp;
  var focused = focusedProp;
  var disabled = disabledProp;
  var error = errorProp;

  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
    if (typeof focused === 'undefined') {
      focused = muiFormControl.focused;
    }
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }
  }

  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.focused, focused), (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, classes.error, error), _classNames), classNameProp);

  var asteriskClassName = (0, _classnames2.default)((0, _defineProperty3.default)({}, classes.error, error));

  return _react2.default.createElement(
    Component,
    (0, _extends3.default)({ className: className }, other),
    children,
    required && _react2.default.createElement(
      'span',
      { className: asteriskClassName },
      '\u2009*'
    )
  );
}

FormLabel.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  component: typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType.isRequired ? babelPluginFlowReactPropTypes_proptype_ElementType.isRequired : babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType).isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'component', typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType)), (0, _defineProperty3.default)(_ref, 'disabled', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'error', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'focused', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'required', require('prop-types').bool), _ref) : {};
FormLabel.defaultProps = {
  component: 'label'
};

FormLabel.contextTypes = {
  muiFormControl: _propTypes2.default.object
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiFormLabel' })(FormLabel);