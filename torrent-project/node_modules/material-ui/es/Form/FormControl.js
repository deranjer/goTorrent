var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { isDirty, isAdornedStart } from '../Input/Input';
import { isMuiElement } from '../utils/reactHelpers';

export const styles = theme => ({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    // Reset fieldset default style
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0
  },
  marginNormal: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  marginDense: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 2
  },
  fullWidth: {
    width: '100%'
  }
});

/**
 * Provides context such as dirty/focused/error/required for form inputs.
 * Relying on the context provides high flexibilty and ensures that the state always stay
 * consitent across the children of the `FormControl`.
 * This context is used by the following components:
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 */
class FormControl extends React.Component {

  constructor(props, context) {
    super(props, context);

    // We need to iterate through the children and find the Input in order
    // to fully support server side rendering.
    this.state = {
      adornedStart: false,
      dirty: false,
      focused: false
    };

    this.handleFocus = event => {
      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
      if (!this.state.focused) {
        this.setState({ focused: true });
      }
    };

    this.handleBlur = event => {
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
      if (this.state.focused) {
        this.setState({ focused: false });
      }
    };

    this.handleDirty = () => {
      if (!this.state.dirty) {
        this.setState({ dirty: true });
      }
    };

    this.handleClean = () => {
      if (this.state.dirty) {
        this.setState({ dirty: false });
      }
    };

    const { children } = this.props;
    if (children) {
      React.Children.forEach(children, child => {
        if (isMuiElement(child, ['Input', 'Select']) && isDirty(child.props, true)) {
          this.state.dirty = true;
        }
        if (isMuiElement(child, ['Input']) && isAdornedStart(child.props)) {
          this.state.adornedStart = true;
        }
      });
    }
  }

  getChildContext() {
    const { disabled, error, required, margin } = this.props;
    const { adornedStart, dirty, focused } = this.state;

    return {
      muiFormControl: {
        adornedStart,
        dirty,
        disabled,
        error,
        focused,
        margin,
        required,
        onDirty: this.handleDirty,
        onClean: this.handleClean,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }
    };
  }

  render() {
    const _props = this.props,
          {
      children,
      classes,
      className,
      component: ComponentProp,
      disabled,
      error,
      fullWidth,
      margin
    } = _props,
          other = _objectWithoutProperties(_props, ['children', 'classes', 'className', 'component', 'disabled', 'error', 'fullWidth', 'margin']);

    return React.createElement(
      ComponentProp,
      _extends({
        className: classNames(classes.root, {
          [classes.marginNormal]: margin === 'normal',
          [classes.marginDense]: margin === 'dense',
          [classes.fullWidth]: fullWidth
        }, className)
      }, other, {
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }),
      children
    );
  }
}

FormControl.defaultProps = {
  component: 'div',
  disabled: false,
  error: false,
  fullWidth: false,
  margin: 'none',
  required: false
};
FormControl.childContextTypes = {
  muiFormControl: PropTypes.object.isRequired
};
export default withStyles(styles, { name: 'MuiFormControl' })(FormControl);