var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // Remove grey highlight
    WebkitTapHighlightColor: theme.palette.common.transparent,
    marginLeft: -14,
    marginRight: theme.spacing.unit * 2 // used for row presentation of radio/checkbox
  },
  disabled: {
    color: theme.palette.text.disabled,
    cursor: 'default'
  },
  label: {
    userSelect: 'none'
  }
});

/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
function FormControlLabel(props, context) {
  const {
    checked,
    classes,
    className: classNameProp,
    control,
    disabled: disabledProp,
    inputRef,
    label,
    name,
    onChange,
    value
  } = props,
        other = _objectWithoutProperties(props, ['checked', 'classes', 'className', 'control', 'disabled', 'inputRef', 'label', 'name', 'onChange', 'value']);

  const { muiFormControl } = context;
  let disabled = disabledProp;

  if (typeof control.props.disabled !== 'undefined') {
    if (typeof disabled === 'undefined') {
      disabled = control.props.disabled;
    }
  }

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  const className = classNames(classes.root, {
    [classes.disabled]: disabled
  }, classNameProp);

  return React.createElement(
    'label',
    _extends({ className: className }, other),
    React.cloneElement(control, {
      disabled,
      checked: typeof control.props.checked === 'undefined' ? checked : control.props.checked,
      name: control.props.name || name,
      onChange: control.props.onChange || onChange,
      value: control.props.value || value,
      inputRef: control.props.inputRef || inputRef
    }),
    React.createElement(
      Typography,
      { className: classes.label },
      label
    )
  );
}

FormControlLabel.contextTypes = {
  muiFormControl: PropTypes.object
};

export default withStyles(styles, { name: 'MuiFormControlLabel' })(FormControlLabel);