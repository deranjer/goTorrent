import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import wrapDisplayName from 'recompose/wrapDisplayName';
import hoistNonReactStatics from 'hoist-non-react-statics';
import withTheme from '../styles/withTheme';
import { keys as breakpointKeys } from '../styles/createBreakpoints';

// By default, returns true if screen width is the same or greater than the given breakpoint.
export const isWidthUp = (breakpoint, width, inclusive = true) => {
  if (inclusive) {
    return breakpointKeys.indexOf(breakpoint) <= breakpointKeys.indexOf(width);
  }
  return breakpointKeys.indexOf(breakpoint) < breakpointKeys.indexOf(width);
};

// By default, returns true if screen width is the same or less than the given breakpoint.
export const isWidthDown = (breakpoint, width, inclusive = true) => {
  if (inclusive) {
    return breakpointKeys.indexOf(width) <= breakpointKeys.indexOf(breakpoint);
  }
  return breakpointKeys.indexOf(width) < breakpointKeys.indexOf(breakpoint);
};

const withWidth = (options = {}) => Component => {
  const {
    resizeInterval = 166, // Corresponds to 10 frames at 60 Hz.
    withTheme: withThemeOption = false
  } = options;

  class WithWidth extends React.Component {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), this.state = {
        width: undefined
      }, this.handleResize = debounce(() => {
        this.updateWidth(window.innerWidth);
      }, resizeInterval), _temp;
    }

    componentDidMount() {
      this.updateWidth(window.innerWidth);
    }

    componentWillUnmount() {
      this.handleResize.cancel();
    }

    updateWidth(innerWidth) {
      const breakpoints = this.props.theme.breakpoints;
      let width = null;

      /**
       * Start with the slowest value as low end devices often have a small screen.
       *
       * innerWidth |xs      sm      md      lg      xl
       *            |-------|-------|-------|-------|------>
       * width      |  xs   |  sm   |  md   |  lg   |  xl
       */
      let index = 1;
      while (width === null && index < breakpointKeys.length) {
        const currentWidth = breakpointKeys[index];

        // @media are inclusive, so reproduce the behavior here.
        if (innerWidth < breakpoints.values[currentWidth]) {
          width = breakpointKeys[index - 1];
          break;
        }

        index += 1;
      }

      width = width || 'xl';

      if (width !== this.state.width) {
        this.setState({
          width
        });
      }
    }

    render() {
      const _props = this.props,
            { initialWidth, theme, width } = _props,
            other = _objectWithoutProperties(_props, ['initialWidth', 'theme', 'width']);
      const props = _extends({
        width: width || this.state.width || initialWidth
      }, other);
      const more = {};

      if (withThemeOption) {
        more.theme = theme;
      }

      // When rendering the component on the server,
      // we have no idea about the client browser screen width.
      // In order to prevent blinks and help the reconciliation of the React tree
      // we are not rendering the child component.
      //
      // An alternative is to use the `initialWidth` property.
      if (props.width === undefined) {
        return null;
      }

      return React.createElement(
        EventListener,
        { target: 'window', onResize: this.handleResize },
        React.createElement(Component, _extends({}, more, props))
      );
    }
  }

  WithWidth.propTypes = process.env.NODE_ENV !== "production" ? {
    /**
     * As `window.innerWidth` is unavailable on the server,
     * we default to rendering an empty componenent during the first mount.
     * In some situation you might want to use an heristic to approximate
     * the screen width of the client browser screen width.
     *
     * For instance, you could be using the user-agent or the client-hints.
     * http://caniuse.com/#search=client%20hint
     */
    initialWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    /**
     * @ignore
     */
    theme: PropTypes.object.isRequired,
    /**
     * Bypass the width calculation logic.
     */
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
  } : {};

  if (process.env.NODE_ENV !== 'production') {
    WithWidth.displayName = wrapDisplayName(Component, 'WithWidth');
  }

  hoistNonReactStatics(WithWidth, Component);

  return withTheme()(WithWidth);
};

export default withWidth;