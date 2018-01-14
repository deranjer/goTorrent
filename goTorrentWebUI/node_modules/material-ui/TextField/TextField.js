'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

var _FormControl = require('../Form/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormHelperText = require('../Form/FormHelperText');

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _Select = require('../Select/Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @inheritedComponent FormControl

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_ChildrenArray = require('react').babelPluginFlowReactPropTypes_proptype_ChildrenArray || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusion, it's more like an autofill.
   * You can learn about it with that article
   * https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
   */
  autoComplete: require('prop-types').string,

  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus: require('prop-types').bool,

  /**
   * @ignore
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_ChildrenArray === 'function' ? babelPluginFlowReactPropTypes_proptype_ChildrenArray : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ChildrenArray),

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * The default value of the `Input` element.
   */
  defaultValue: require('prop-types').string,

  /**
   * If `true`, the input will be disabled.
   */
  disabled: require('prop-types').bool,

  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: require('prop-types').bool,

  /**
   * Properties applied to the `FormHelperText` element.
   */
  FormHelperTextProps: require('prop-types').object,

  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: require('prop-types').bool,

  /**
   * The helper text content.
   */
  helperText: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * The CSS class name of the helper text element.
   */
  helperTextClassName: require('prop-types').string,

  /**
   * The id of the `input` element.
   */
  id: require('prop-types').string,

  /**
   * The CSS class name of the `input` element.
   */
  inputClassName: require('prop-types').string,

  /**
   * The CSS class name of the `Input` element.
   */
  InputClassName: require('prop-types').string,

  /**
   * Properties applied to the `InputLabel` element.
   */
  InputLabelProps: require('prop-types').object,

  /**
   * Properties applied to the `input` element.
   */
  inputProps: require('prop-types').object,

  /**
   * Properties applied to the `Input` element.
   */
  InputProps: require('prop-types').object,

  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: require('prop-types').func,

  /**
   * The label content.
   */
  label: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * The CSS class name of the label element.
   */
  labelClassName: require('prop-types').string,

  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  multiline: require('prop-types').bool,

  /**
   * Name attribute of the `input` element.
   */
  name: require('prop-types').string,

  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback
   */
  onChange: require('prop-types').func,

  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: require('prop-types').string,

  /**
   * If `true`, the label is displayed as required.
   */
  required: require('prop-types').bool,

  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef: require('prop-types').func,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: require('prop-types').oneOfType([require('prop-types').string, require('prop-types').number]),

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: require('prop-types').oneOfType([require('prop-types').string, require('prop-types').number]),

  /**
   * Render a `Select` element while passing the `Input` element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   */
  select: require('prop-types').bool,

  /**
   * Properties applied to the `Select` element.
   */
  SelectProps: require('prop-types').object,

  /**
   * Type attribute of the `Input` element. It should be a valid HTML5 input type.
   */
  type: require('prop-types').string,

  /**
   * The value of the `Input` element, required for a controlled component.
   */
  value: require('prop-types').oneOfType([require('prop-types').string, require('prop-types').number]),

  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: require('prop-types').oneOf(['none', 'dense', 'normal'])
};


function TextField(props) {
  var autoComplete = props.autoComplete,
      autoFocus = props.autoFocus,
      children = props.children,
      className = props.className,
      defaultValue = props.defaultValue,
      disabled = props.disabled,
      error = props.error,
      id = props.id,
      inputClassName = props.inputClassName,
      InputClassName = props.InputClassName,
      inputPropsProp = props.inputProps,
      InputProps = props.InputProps,
      inputRef = props.inputRef,
      label = props.label,
      labelClassName = props.labelClassName,
      InputLabelProps = props.InputLabelProps,
      helperText = props.helperText,
      helperTextClassName = props.helperTextClassName,
      FormHelperTextProps = props.FormHelperTextProps,
      fullWidth = props.fullWidth,
      required = props.required,
      type = props.type,
      multiline = props.multiline,
      name = props.name,
      onChange = props.onChange,
      placeholder = props.placeholder,
      rootRef = props.rootRef,
      rows = props.rows,
      rowsMax = props.rowsMax,
      select = props.select,
      SelectProps = props.SelectProps,
      value = props.value,
      other = (0, _objectWithoutProperties3.default)(props, ['autoComplete', 'autoFocus', 'children', 'className', 'defaultValue', 'disabled', 'error', 'id', 'inputClassName', 'InputClassName', 'inputProps', 'InputProps', 'inputRef', 'label', 'labelClassName', 'InputLabelProps', 'helperText', 'helperTextClassName', 'FormHelperTextProps', 'fullWidth', 'required', 'type', 'multiline', 'name', 'onChange', 'placeholder', 'rootRef', 'rows', 'rowsMax', 'select', 'SelectProps', 'value']);


  var inputProps = inputPropsProp;

  if (inputClassName) {
    inputProps = (0, _extends3.default)({
      className: inputClassName
    }, inputProps);
  }

  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!select || Boolean(children), 'Material-UI: `children` must be passed when using the `TextField` component with `select`.') : void 0;

  var InputComponent = _react2.default.createElement(_Input2.default, (0, _extends3.default)({
    autoComplete: autoComplete,
    autoFocus: autoFocus,
    className: InputClassName,
    defaultValue: defaultValue,
    disabled: disabled,
    multiline: multiline,
    name: name,
    rows: rows,
    rowsMax: rowsMax,
    type: type,
    value: value,
    id: id,
    inputProps: inputProps,
    inputRef: inputRef,
    onChange: onChange,
    placeholder: placeholder
  }, InputProps));

  return _react2.default.createElement(
    _FormControl2.default,
    (0, _extends3.default)({
      fullWidth: fullWidth,
      className: className,
      error: error,
      required: required
    }, other, {
      ref: rootRef
    }),
    label && _react2.default.createElement(
      _Input.InputLabel,
      (0, _extends3.default)({ htmlFor: id, className: labelClassName }, InputLabelProps),
      label
    ),
    select ? _react2.default.createElement(
      _Select2.default,
      (0, _extends3.default)({ input: InputComponent }, SelectProps),
      children
    ) : InputComponent,
    helperText && _react2.default.createElement(
      _FormHelperText2.default,
      (0, _extends3.default)({ className: helperTextClassName }, FormHelperTextProps),
      helperText
    )
  );
}

TextField.propTypes = process.env.NODE_ENV !== "production" ? babelPluginFlowReactPropTypes_proptype_Props : {};
TextField.defaultProps = {
  required: false,
  select: false
};

exports.default = TextField;