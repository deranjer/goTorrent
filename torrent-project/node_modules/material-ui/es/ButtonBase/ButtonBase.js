var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import React from 'react';

import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import keycode from 'keycode';
import withStyles from '../styles/withStyles';
import { listenForFocusKeys, detectKeyboardFocus, focusKeyPressed } from '../utils/keyboardFocus';
import TouchRipple from './TouchRipple';
import createRippleHandler from './createRippleHandler';

export const styles = theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // Remove grey highlight
    WebkitTapHighlightColor: theme.palette.common.transparent,
    backgroundColor: 'transparent', // Reset default value
    outline: 'none',
    border: 0,
    borderRadius: 0,
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none' // Remove Firefox dotted outline.
    }
  },
  disabled: {
    pointerEvents: 'none', // Disable link interactions
    cursor: 'default'
  }
});

class ButtonBase extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      keyboardFocused: false
    }, this.onKeyboardFocusHandler = event => {
      this.keyDown = false;
      this.setState({ keyboardFocused: true });

      if (this.props.onKeyboardFocus) {
        this.props.onKeyboardFocus(event);
      }
    }, this.ripple = null, this.keyDown = false, this.button = null, this.keyboardFocusTimeout = null, this.keyboardFocusCheckTime = 30, this.keyboardFocusMaxCheckTimes = 5, this.handleKeyDown = event => {
      const { component, focusRipple, onKeyDown, onClick } = this.props;
      const key = keycode(event);

      // Check if key is already down to avoid repeats being counted as multiple activations
      if (focusRipple && !this.keyDown && this.state.keyboardFocused && key === 'space') {
        this.keyDown = true;
        event.persist();
        this.ripple.stop(event, () => {
          this.ripple.start(event);
        });
      }

      if (onKeyDown) {
        onKeyDown(event);
      }

      // Keyboard accessibility for non interactive elements
      if (event.target === this.button && onClick && component && component !== 'a' && component !== 'button' && (key === 'space' || key === 'enter')) {
        event.preventDefault();
        onClick(event);
      }
    }, this.handleKeyUp = event => {
      if (this.props.focusRipple && keycode(event) === 'space' && this.state.keyboardFocused) {
        this.keyDown = false;
        event.persist();
        this.ripple.stop(event, () => this.ripple.pulsate(event));
      }
      if (this.props.onKeyUp) {
        this.props.onKeyUp(event);
      }
    }, this.handleMouseDown = createRippleHandler(this, 'MouseDown', 'start', () => {
      clearTimeout(this.keyboardFocusTimeout);
      focusKeyPressed(false);
      if (this.state.keyboardFocused) {
        this.setState({ keyboardFocused: false });
      }
    }), this.handleMouseUp = createRippleHandler(this, 'MouseUp', 'stop'), this.handleMouseLeave = createRippleHandler(this, 'MouseLeave', 'stop', event => {
      if (this.state.keyboardFocused) {
        event.preventDefault();
      }
    }), this.handleTouchStart = createRippleHandler(this, 'TouchStart', 'start'), this.handleTouchEnd = createRippleHandler(this, 'TouchEnd', 'stop'), this.handleTouchMove = createRippleHandler(this, 'TouchEnd', 'stop'), this.handleBlur = createRippleHandler(this, 'Blur', 'stop', () => {
      clearTimeout(this.keyboardFocusTimeout);
      focusKeyPressed(false);
      this.setState({ keyboardFocused: false });
    }), this.handleFocus = event => {
      if (this.props.disabled) {
        return;
      }

      // Fix for https://github.com/facebook/react/issues/7769
      if (!this.button) {
        this.button = event.currentTarget;
      }

      event.persist();
      const keyboardFocusCallback = this.onKeyboardFocusHandler.bind(this, event);
      detectKeyboardFocus(this, this.button, keyboardFocusCallback);

      if (this.props.onFocus) {
        this.props.onFocus(event);
      }
    }, _temp;
  }

  componentDidMount() {
    this.button = findDOMNode(this);
    listenForFocusKeys();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.focusRipple && nextState.keyboardFocused && !this.state.keyboardFocused && !this.props.disableRipple) {
      this.ripple.pulsate();
    }
  }

  componentWillUnmount() {
    this.button = null;
    clearTimeout(this.keyboardFocusTimeout);
  } // Used to help track keyboard activation keyDown


  renderRipple() {
    if (!this.props.disableRipple && !this.props.disabled) {
      return React.createElement(TouchRipple, {
        innerRef: node => {
          this.ripple = node;
        },
        center: this.props.centerRipple
      });
    }

    return null;
  }

  render() {
    const _props = this.props,
          {
      centerRipple,
      children,
      classes,
      className: classNameProp,
      component,
      disabled,
      disableRipple,
      focusRipple,
      keyboardFocusedClassName,
      onBlur,
      onFocus,
      onKeyboardFocus,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      rootRef,
      tabIndex,
      type
    } = _props,
          other = _objectWithoutProperties(_props, ['centerRipple', 'children', 'classes', 'className', 'component', 'disabled', 'disableRipple', 'focusRipple', 'keyboardFocusedClassName', 'onBlur', 'onFocus', 'onKeyboardFocus', 'onKeyDown', 'onKeyUp', 'onMouseDown', 'onMouseLeave', 'onMouseUp', 'onTouchEnd', 'onTouchMove', 'onTouchStart', 'rootRef', 'tabIndex', 'type']);

    const className = classNames(classes.root, {
      [classes.disabled]: disabled,
      [keyboardFocusedClassName || '']: this.state.keyboardFocused
    }, classNameProp);

    const buttonProps = {};

    let ComponentProp = component;

    if (!ComponentProp) {
      if (other.href) {
        ComponentProp = 'a';
      } else {
        ComponentProp = 'button';
      }
    }

    if (ComponentProp === 'button') {
      buttonProps.type = type || 'button';
    }

    if (ComponentProp !== 'a') {
      buttonProps.role = buttonProps.role || 'button';
      buttonProps.disabled = disabled;
    }

    return React.createElement(
      ComponentProp,
      _extends({
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        onKeyUp: this.handleKeyUp,
        onMouseDown: this.handleMouseDown,
        onMouseLeave: this.handleMouseLeave,
        onMouseUp: this.handleMouseUp,
        onTouchEnd: this.handleTouchEnd,
        onTouchMove: this.handleTouchMove,
        onTouchStart: this.handleTouchStart,
        tabIndex: disabled ? -1 : tabIndex,
        className: className
      }, buttonProps, other, {
        ref: rootRef
      }),
      children,
      this.renderRipple()
    );
  }
}

ButtonBase.defaultProps = {
  centerRipple: false,
  focusRipple: false,
  disableRipple: false,
  tabIndex: 0,
  type: 'button'
};
export default withStyles(styles, { name: 'MuiButtonBase' })(ButtonBase);