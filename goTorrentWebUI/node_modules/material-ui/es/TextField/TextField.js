var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent FormControl

import React from 'react';
import warning from 'warning';

import Input, { InputLabel } from '../Input';
import FormControl from '../Form/FormControl';
import FormHelperText from '../Form/FormHelperText';
import Select from '../Select/Select';

function TextField(props) {
  const {
    autoComplete,
    autoFocus,
    children,
    className,
    defaultValue,
    disabled,
    error,
    id,
    inputClassName,
    InputClassName,
    inputProps: inputPropsProp,
    InputProps,
    inputRef,
    label,
    labelClassName,
    InputLabelProps,
    helperText,
    helperTextClassName,
    FormHelperTextProps,
    fullWidth,
    required,
    type,
    multiline,
    name,
    onChange,
    placeholder,
    rootRef,
    rows,
    rowsMax,
    select,
    SelectProps,
    value
  } = props,
        other = _objectWithoutProperties(props, ['autoComplete', 'autoFocus', 'children', 'className', 'defaultValue', 'disabled', 'error', 'id', 'inputClassName', 'InputClassName', 'inputProps', 'InputProps', 'inputRef', 'label', 'labelClassName', 'InputLabelProps', 'helperText', 'helperTextClassName', 'FormHelperTextProps', 'fullWidth', 'required', 'type', 'multiline', 'name', 'onChange', 'placeholder', 'rootRef', 'rows', 'rowsMax', 'select', 'SelectProps', 'value']);

  let inputProps = inputPropsProp;

  if (inputClassName) {
    inputProps = _extends({
      className: inputClassName
    }, inputProps);
  }

  warning(!select || Boolean(children), 'Material-UI: `children` must be passed when using the `TextField` component with `select`.');

  const InputComponent = React.createElement(Input, _extends({
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

  return React.createElement(
    FormControl,
    _extends({
      fullWidth: fullWidth,
      className: className,
      error: error,
      required: required
    }, other, {
      ref: rootRef
    }),
    label && React.createElement(
      InputLabel,
      _extends({ htmlFor: id, className: labelClassName }, InputLabelProps),
      label
    ),
    select ? React.createElement(
      Select,
      _extends({ input: InputComponent }, SelectProps),
      children
    ) : InputComponent,
    helperText && React.createElement(
      FormHelperText,
      _extends({ className: helperTextClassName }, FormHelperTextProps),
      helperText
    )
  );
}

TextField.defaultProps = {
  required: false,
  select: false
};

export default TextField;