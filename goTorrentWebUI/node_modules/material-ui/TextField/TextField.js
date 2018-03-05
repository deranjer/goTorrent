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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

var _FormControl = require('../Form/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormHelperText = require('../Form/FormHelperText');

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _Select = require('../Select/Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The `TextField` is a convenience wrapper for the most common cases (80%).
 * It cannot be all things to all people, otherwise the API would grow out of control.
 *
 * ## Advanced Configuration
 *
 * It's important to understand that the text field is a simple abstraction
 * on top of the following components:
 * - [FormControl](/api/form-control)
 * - [InputLabel](/api/input-label)
 * - [Input](/api/input)
 * - [FormHelperText](/api/form-helper-text)
 *
 * If you wish to alter the properties applied to the native input, you can do as follow:
 *
 * ```jsx
 * const inputProps = {
 *   step: 300,
 * };
 *
 * return <TextField id="time" type="time" inputProps={inputProps} />;
 * ```
 *
 * For advanced cases, please look at the source of TextField by clicking on the
 * "Edit this page" button above. Consider either:
 * - using the upper case props for passing values direct to the components.
 * - using the underlying components directly as shown in the demos.
 */
function TextField(props) {
  var autoComplete = props.autoComplete,
      autoFocus = props.autoFocus,
      children = props.children,
      className = props.className,
      defaultValue = props.defaultValue,
      disabled = props.disabled,
      error = props.error,
      FormHelperTextProps = props.FormHelperTextProps,
      fullWidth = props.fullWidth,
      helperText = props.helperText,
      helperTextClassName = props.helperTextClassName,
      id = props.id,
      InputLabelProps = props.InputLabelProps,
      inputProps = props.inputProps,
      InputProps = props.InputProps,
      inputRef = props.inputRef,
      label = props.label,
      labelClassName = props.labelClassName,
      multiline = props.multiline,
      name = props.name,
      onChange = props.onChange,
      placeholder = props.placeholder,
      required = props.required,
      rows = props.rows,
      rowsMax = props.rowsMax,
      select = props.select,
      SelectProps = props.SelectProps,
      type = props.type,
      value = props.value,
      other = (0, _objectWithoutProperties3.default)(props, ['autoComplete', 'autoFocus', 'children', 'className', 'defaultValue', 'disabled', 'error', 'FormHelperTextProps', 'fullWidth', 'helperText', 'helperTextClassName', 'id', 'InputLabelProps', 'inputProps', 'InputProps', 'inputRef', 'label', 'labelClassName', 'multiline', 'name', 'onChange', 'placeholder', 'required', 'rows', 'rowsMax', 'select', 'SelectProps', 'type', 'value']);


  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!select || Boolean(children), 'Material-UI: `children` must be passed when using the `TextField` component with `select`.') : void 0;

  var helperTextId = helperText && id ? id + '-helper-text' : undefined;
  var InputComponent = _react2.default.createElement(_Input2.default, (0, _extends3.default)({
    autoComplete: autoComplete,
    autoFocus: autoFocus,
    defaultValue: defaultValue,
    disabled: disabled,
    fullWidth: fullWidth,
    multiline: multiline,
    name: name,
    rows: rows,
    rowsMax: rowsMax,
    type: type,
    value: value,
    id: id,
    inputRef: inputRef,
    onChange: onChange,
    placeholder: placeholder,
    inputProps: inputProps
  }, InputProps));

  return _react2.default.createElement(
    _FormControl2.default,
    (0, _extends3.default)({
      'aria-describedby': helperTextId,
      className: className,
      error: error,
      fullWidth: fullWidth,
      required: required
    }, other),
    label && _react2.default.createElement(
      _Input.InputLabel,
      (0, _extends3.default)({ htmlFor: id, className: labelClassName }, InputLabelProps),
      label
    ),
    select ? _react2.default.createElement(
      _Select2.default,
      (0, _extends3.default)({ value: value, input: InputComponent }, SelectProps),
      children
    ) : InputComponent,
    helperText && _react2.default.createElement(
      _FormHelperText2.default,
      (0, _extends3.default)({ className: helperTextClassName, id: helperTextId }, FormHelperTextProps),
      helperText
    )
  );
} // @inheritedComponent FormControl

TextField.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it here:
   * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
   */
  autoComplete: _propTypes2.default.string,
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus: _propTypes2.default.bool,
  /**
   * @ignore
   */
  children: _propTypes2.default.node,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * The default value of the `Input` element.
   */
  defaultValue: _propTypes2.default.string,
  /**
   * If `true`, the input will be disabled.
   */
  disabled: _propTypes2.default.bool,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: _propTypes2.default.bool,
  /**
   * Properties applied to the `FormHelperText` element.
   */
  FormHelperTextProps: _propTypes2.default.object,
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: _propTypes2.default.bool,
  /**
   * The helper text content.
   */
  helperText: _propTypes2.default.node,
  /**
   * The CSS class name of the helper text element.
   */
  helperTextClassName: _propTypes2.default.string,
  /**
   * The id of the `input` element.
   * Use that property to make `label` and `helperText` accessible for screen readers.
   */
  id: _propTypes2.default.string,
  /**
   * Properties applied to the `InputLabel` element.
   */
  InputLabelProps: _propTypes2.default.object,
  /**
   * Properties applied to the `Input` element.
   */
  InputProps: _propTypes2.default.object,
  /**
   * Properties applied to the native `input` element.
   */
  inputProps: _propTypes2.default.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: _propTypes2.default.func,
  /**
   * The label content.
   */
  label: _propTypes2.default.node,
  /**
   * The CSS class name of the label element.
   */
  labelClassName: _propTypes2.default.string,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   */
  margin: _propTypes2.default.oneOf(['none', 'dense', 'normal']),
  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  multiline: _propTypes2.default.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: _propTypes2.default.string,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback
   */
  onChange: _propTypes2.default.func,
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: _propTypes2.default.string,
  /**
   * If `true`, the label is displayed as required.
   */
  required: _propTypes2.default.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * Render a `Select` element while passing the `Input` element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   */
  select: _propTypes2.default.bool,
  /**
   * Properties applied to the `Select` element.
   */
  SelectProps: _propTypes2.default.object,
  /**
   * Type attribute of the `Input` element. It should be a valid HTML5 input type.
   */
  type: _propTypes2.default.string,
  /**
   * The value of the `Input` element, required for a controlled component.
   */
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]))])
} : {};

TextField.defaultProps = {
  required: false,
  select: false
};

exports.default = TextField;