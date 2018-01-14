var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent CSSTransition

import React from 'react';

import CSSTransition from 'react-transition-group/CSSTransition';
import withTheme from '../styles/withTheme';


// Only exported for tests.
export function getScale(value) {
  return `scale(${value}, ${Math.pow(value, 2)})`;
}

/**
 * The Grow transition is used by the Popover component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Grow extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.autoTimeout = undefined, this.handleEnter = node => {
      node.style.opacity = '0';
      node.style.transform = getScale(0.75);

      if (this.props.onEnter) {
        this.props.onEnter(node);
      }
    }, this.handleEntering = node => {
      const { theme, timeout } = this.props;
      let duration = 0;

      if (timeout === 'auto') {
        duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
        this.autoTimeout = duration;
      } else if (typeof timeout === 'number') {
        duration = timeout;
      } else if (timeout) {
        duration = timeout.enter;
      } else {
        // The propType will warn in this case.
      }

      node.style.transition = [theme.transitions.create('opacity', {
        duration
      }), theme.transitions.create('transform', {
        duration: duration * 0.666
      })].join(',');

      node.style.opacity = '1';
      node.style.transform = getScale(1);

      if (this.props.onEntering) {
        this.props.onEntering(node);
      }
    }, this.handleExit = node => {
      const { theme, timeout } = this.props;
      let duration = 0;

      if (timeout === 'auto') {
        duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
        this.autoTimeout = duration;
      } else if (typeof timeout === 'number') {
        duration = timeout;
      } else if (timeout) {
        duration = timeout.exit;
      } else {
        // The propType will warn in this case.
      }

      node.style.transition = [theme.transitions.create('opacity', {
        duration
      }), theme.transitions.create('transform', {
        duration: duration * 0.666,
        delay: duration * 0.333
      })].join(',');

      node.style.opacity = '0';
      node.style.transform = getScale(0.75);

      if (this.props.onExit) {
        this.props.onExit(node);
      }
    }, this.addEndListener = (node, next) => {
      let timeout;

      if (this.props.timeout === 'auto') {
        timeout = this.autoTimeout || 0;
      } else {
        timeout = this.props.timeout;
      }

      setTimeout(next, timeout);
    }, _temp;
  }

  render() {
    const _props = this.props,
          {
      appear,
      children,
      onEnter,
      onEntering,
      onExit,
      rootRef,
      style: styleProp,
      transitionClasses,
      timeout,
      theme
    } = _props,
          other = _objectWithoutProperties(_props, ['appear', 'children', 'onEnter', 'onEntering', 'onExit', 'rootRef', 'style', 'transitionClasses', 'timeout', 'theme']);

    const style = _extends({}, children.props.style, styleProp);

    // For server side rendering.
    if (!this.props.in || appear) {
      style.opacity = '0';
    }

    return React.createElement(
      CSSTransition,
      _extends({
        classNames: transitionClasses,
        onEnter: this.handleEnter,
        onEntering: this.handleEntering,
        onExit: this.handleExit,
        addEndListener: this.addEndListener,
        appear: appear,
        style: style
      }, other, {
        ref: rootRef
      }),
      children
    );
  }
}

Grow.defaultProps = {
  appear: true,
  timeout: 'auto',
  transitionClasses: {}
};
export default withTheme()(Grow);