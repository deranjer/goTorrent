var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent Transition

import React from 'react';

import Transition from 'react-transition-group/Transition';
import { duration } from '../styles/transitions';
import withTheme from '../styles/withTheme';


const reflow = node => node.scrollTop;

/**
 * The Fade transition is used by the Modal component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Fade extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleEnter = node => {
      node.style.opacity = '0';
      reflow(node);

      if (this.props.onEnter) {
        this.props.onEnter(node);
      }
    }, this.handleEntering = node => {
      const { theme, timeout } = this.props;
      node.style.transition = theme.transitions.create('opacity', {
        duration: typeof timeout === 'number' ? timeout : timeout.enter
      });
      // $FlowFixMe - https://github.com/facebook/flow/pull/5161
      node.style.webkitTransition = theme.transitions.create('opacity', {
        duration: typeof timeout === 'number' ? timeout : timeout.enter
      });
      node.style.opacity = '1';

      if (this.props.onEntering) {
        this.props.onEntering(node);
      }
    }, this.handleExit = node => {
      const { theme, timeout } = this.props;
      node.style.transition = theme.transitions.create('opacity', {
        duration: typeof timeout === 'number' ? timeout : timeout.exit
      });
      // $FlowFixMe - https://github.com/facebook/flow/pull/5161
      node.style.webkitTransition = theme.transitions.create('opacity', {
        duration: typeof timeout === 'number' ? timeout : timeout.exit
      });
      node.style.opacity = '0';

      if (this.props.onExit) {
        this.props.onExit(node);
      }
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
      style: styleProp,
      theme
    } = _props,
          other = _objectWithoutProperties(_props, ['appear', 'children', 'onEnter', 'onEntering', 'onExit', 'style', 'theme']);

    const style = _extends({}, styleProp);

    // For server side rendering.
    if (!this.props.in || appear) {
      style.opacity = '0';
    }

    return React.createElement(
      Transition,
      _extends({
        appear: appear,
        style: style,
        onEnter: this.handleEnter,
        onEntering: this.handleEntering,
        onExit: this.handleExit
      }, other),
      children
    );
  }
}

Fade.defaultProps = {
  appear: true,
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};
export default withTheme()(Fade);