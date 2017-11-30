var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent Transition

import React from 'react';

import { findDOMNode } from 'react-dom';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import Transition from 'react-transition-group/Transition';
import withTheme from '../styles/withTheme';
import { duration } from '../styles/transitions';


const GUTTER = 24;

// Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `translate3d(0, 0, 0)`.`
function getTranslateValue(props, node) {
  const { direction } = props;
  const rect = node.getBoundingClientRect();

  let transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    const computedStyle = window.getComputedStyle(node);
    transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
  }

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform.split('(')[1].split(')')[0].split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return `translateX(100vw) translateX(-${rect.left - offsetX}px)`;
  } else if (direction === 'right') {
    return `translateX(-${rect.left + rect.width + GUTTER - offsetX}px)`;
  } else if (direction === 'up') {
    return `translateY(100vh) translateY(-${rect.top - offsetY}px)`;
  }

  // direction === 'down
  return `translate3d(0, ${0 - (rect.top + rect.height)}px, 0)`;
}

export function setTranslateValue(props, node) {
  const transform = getTranslateValue(props, node);

  if (transform) {
    node.style.transform = transform;
    node.style.webkitTransform = transform;
  }
}

const reflow = node => node.scrollTop;

class Slide extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      // We use this state to handle the server-side rendering.
      firstMount: true
    }, this.transition = null, this.handleResize = debounce(() => {
      // Skip configuration where the position is screen size invariant.
      if (this.props.in || this.props.direction === 'down' || this.props.direction === 'right') {
        return;
      }

      const node = findDOMNode(this.transition);
      if (node instanceof HTMLElement) {
        setTranslateValue(this.props, node);
      }
    }, 166), this.handleEnter = node => {
      setTranslateValue(this.props, node);
      reflow(node);

      if (this.props.onEnter) {
        this.props.onEnter(node);
      }
    }, this.handleEntering = node => {
      const { theme, timeout } = this.props;
      node.style.transition = theme.transitions.create('transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.enter,
        easing: theme.transitions.easing.easeOut
      });
      // $FlowFixMe - https://github.com/facebook/flow/pull/5161
      node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.enter,
        easing: theme.transitions.easing.easeOut
      });
      node.style.transform = 'translate3d(0, 0, 0)';
      node.style.webkitTransform = 'translate3d(0, 0, 0)';
      if (this.props.onEntering) {
        this.props.onEntering(node);
      }
    }, this.handleExit = node => {
      const { theme, timeout } = this.props;
      node.style.transition = theme.transitions.create('transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.exit,
        easing: theme.transitions.easing.sharp
      });
      // $FlowFixMe - https://github.com/facebook/flow/pull/5161
      node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
        duration: typeof timeout === 'number' ? timeout : timeout.exit,
        easing: theme.transitions.easing.sharp
      });
      setTranslateValue(this.props, node);

      if (this.props.onExit) {
        this.props.onExit(node);
      }
    }, _temp;
  }

  componentDidMount() {
    // state.firstMount handle SSR, once the component is mounted, we need
    // to propery hide it.
    if (!this.props.in) {
      // We need to set initial translate values of transition element
      // otherwise component will be shown when in=false.
      const element = findDOMNode(this.transition);
      if (element instanceof HTMLElement) {
        element.style.visibility = 'inherit';
        setTranslateValue(this.props, element);
      }
    }
  }

  componentWillReceiveProps() {
    this.setState({
      firstMount: false
    });
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  render() {
    const _props = this.props,
          { children, onEnter, onEntering, onExit, style: styleProp, theme } = _props,
          other = _objectWithoutProperties(_props, ['children', 'onEnter', 'onEntering', 'onExit', 'style', 'theme']);

    const style = _extends({}, styleProp);

    if (!this.props.in && this.state.firstMount) {
      style.visibility = 'hidden';
    }

    return React.createElement(
      EventListener,
      { target: 'window', onResize: this.handleResize },
      React.createElement(
        Transition,
        _extends({
          onEnter: this.handleEnter,
          onEntering: this.handleEntering,
          onExit: this.handleExit,
          appear: true,
          style: style
        }, other, {
          ref: node => {
            this.transition = node;
          }
        }),
        children
      )
    );
  }
}

Slide.defaultProps = {
  direction: 'down',
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};
export default withTheme()(Slide);