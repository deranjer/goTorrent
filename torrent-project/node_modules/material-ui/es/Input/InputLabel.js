var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { FormLabel } from '../Form';

export const styles = theme => ({
  root: {
    transformOrigin: `top ${theme.direction === 'ltr' ? 'left' : 'right'}`
  },
  formControl: {
    position: 'absolute',
    left: 0,
    top: 0,
    // slight alteration to spec spacing to match visual spec result
    transform: `translate(0, ${theme.spacing.unit * 3 - 1}px) scale(1)`
  },
  labelDense: {
    // Compensation for the `Input.inputDense` style.
    transform: `translate(0, ${theme.spacing.unit * 2.5 + 1}px) scale(1)`
  },
  shrink: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: `top ${theme.direction === 'ltr' ? 'left' : 'right'}`
  },
  animated: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut
    })
  },
  disabled: {
    color: theme.palette.input.disabled
  }
});

function InputLabel(props, context) {
  const {
    disabled,
    disableAnimation,
    children,
    classes,
    className: classNameProp,
    FormControlClasses,
    shrink: shrinkProp,
    margin: marginProp
  } = props,
        other = _objectWithoutProperties(props, ['disabled', 'disableAnimation', 'children', 'classes', 'className', 'FormControlClasses', 'shrink', 'margin']);

  const { muiFormControl } = context;
  let shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.dirty || muiFormControl.focused || muiFormControl.adornedStart;
  }

  let margin = marginProp;
  if (typeof margin === 'undefined' && muiFormControl) {
    margin = muiFormControl.margin;
  }

  const className = classNames(classes.root, {
    [classes.formControl]: muiFormControl,
    [classes.animated]: !disableAnimation,
    [classes.shrink]: shrink,
    [classes.disabled]: disabled,
    [classes.labelDense]: margin === 'dense'
  }, classNameProp);

  return React.createElement(
    FormLabel,
    _extends({ 'data-shrink': shrink, className: className, classes: FormControlClasses }, other),
    children
  );
}

InputLabel.defaultProps = {
  disabled: false,
  disableAnimation: false
};

InputLabel.contextTypes = {
  muiFormControl: PropTypes.object
};

export default withStyles(styles, { name: 'MuiInputLabel' })(InputLabel);