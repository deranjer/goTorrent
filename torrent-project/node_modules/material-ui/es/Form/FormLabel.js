var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => {
  const focusColor = theme.palette.primary[theme.palette.type === 'light' ? 'A700' : 'A200'];
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

function FormLabel(props, context) {
  const {
    children,
    classes,
    className: classNameProp,
    component: Component,
    disabled: disabledProp,
    error: errorProp,
    focused: focusedProp,
    required: requiredProp
  } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'component', 'disabled', 'error', 'focused', 'required']);

  const { muiFormControl } = context;

  let required = requiredProp;
  let focused = focusedProp;
  let disabled = disabledProp;
  let error = errorProp;

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

  const className = classNames(classes.root, {
    [classes.focused]: focused,
    [classes.disabled]: disabled,
    [classes.error]: error
  }, classNameProp);

  const asteriskClassName = classNames({
    [classes.error]: error
  });

  return React.createElement(
    Component,
    _extends({ className: className }, other),
    children,
    required && React.createElement(
      'span',
      { className: asteriskClassName, 'data-mui-test': 'FormLabelAsterisk' },
      '\u2009*'
    )
  );
}

FormLabel.defaultProps = {
  component: 'label'
};

FormLabel.contextTypes = {
  muiFormControl: PropTypes.object
};

export default withStyles(styles, { name: 'MuiFormLabel' })(FormLabel);