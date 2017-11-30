var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent Transition

import React from 'react';
import classNames from 'classnames';

import Transition from 'react-transition-group/Transition';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';


export const styles = theme => ({
  container: {
    height: 0,
    overflow: 'hidden',
    transition: theme.transitions.create('height')
  },
  entered: {
    height: 'auto'
  },
  wrapper: {
    // Hack to get children with a negative margin to not falsify the height computation.
    display: 'flex'
  },
  wrapperInner: {
    width: '100%'
  }
});

class Collapse extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.wrapper = null, this.autoTransitionDuration = undefined, this.handleEnter = node => {
      node.style.height = this.props.collapsedHeight;

      if (this.props.onEnter) {
        this.props.onEnter(node);
      }
    }, this.handleEntering = node => {
      const { timeout, theme } = this.props;
      const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

      if (timeout === 'auto') {
        const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
        node.style.transitionDuration = `${duration2}ms`;
        this.autoTransitionDuration = duration2;
      } else if (typeof timeout === 'number') {
        node.style.transitionDuration = `${timeout}ms`;
      } else if (timeout) {
        node.style.transitionDuration = `${timeout.enter}ms`;
      } else {
        // The propType will warn in this case.
      }

      node.style.height = `${wrapperHeight}px`;

      if (this.props.onEntering) {
        this.props.onEntering(node);
      }
    }, this.handleEntered = node => {
      node.style.height = 'auto';

      if (this.props.onEntered) {
        this.props.onEntered(node);
      }
    }, this.handleExit = node => {
      const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;
      node.style.height = `${wrapperHeight}px`;

      if (this.props.onExit) {
        this.props.onExit(node);
      }
    }, this.handleExiting = node => {
      const { timeout, theme } = this.props;
      const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

      if (timeout === 'auto') {
        const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
        node.style.transitionDuration = `${duration2}ms`;
        this.autoTransitionDuration = duration2;
      } else if (typeof timeout === 'number') {
        node.style.transitionDuration = `${timeout}ms`;
      } else if (timeout) {
        node.style.transitionDuration = `${timeout.exit}ms`;
      } else {
        // The propType will warn in this case.
      }

      node.style.height = this.props.collapsedHeight;

      if (this.props.onExiting) {
        this.props.onExiting(node);
      }
    }, this.addEndListener = (node, next) => {
      let timeout;

      if (this.props.timeout === 'auto') {
        timeout = this.autoTransitionDuration || 0;
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
      classes,
      collapsedHeight,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      style,
      timeout,
      theme
    } = _props,
          other = _objectWithoutProperties(_props, ['appear', 'children', 'classes', 'collapsedHeight', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'style', 'timeout', 'theme']);

    return React.createElement(
      Transition,
      _extends({
        appear: appear,
        onEntering: this.handleEntering,
        onEnter: this.handleEnter,
        onEntered: this.handleEntered,
        onExiting: this.handleExiting,
        onExit: this.handleExit,
        addEndListener: this.addEndListener,
        style: _extends({ minHeight: collapsedHeight }, style)
      }, other),
      state => {
        return React.createElement(
          'div',
          {
            className: classNames(classes.container, {
              [classes.entered]: state === 'entered'
            })
          },
          React.createElement(
            'div',
            {
              className: classes.wrapper,
              ref: node => {
                this.wrapper = node;
              }
            },
            React.createElement(
              'div',
              { className: classes.wrapperInner },
              children
            )
          )
        );
      }
    );
  }
}

Collapse.defaultProps = {
  appear: false,
  collapsedHeight: '0px',
  timeout: duration.standard
};
export default withStyles(styles, {
  withTheme: true,
  name: 'MuiCollapse'
})(Collapse);