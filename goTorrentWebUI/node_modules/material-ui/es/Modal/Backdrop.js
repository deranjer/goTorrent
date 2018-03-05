import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Fade from '../transitions/Fade';

export const styles = {
  root: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    willChange: 'opacity',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  invisible: {
    backgroundColor: 'transparent'
  }
};

function Backdrop(props) {
  const { classes, invisible, open, transitionDuration } = props,
        other = _objectWithoutProperties(props, ['classes', 'invisible', 'open', 'transitionDuration']);

  const className = classNames(classes.root, {
    [classes.invisible]: invisible
  });

  return React.createElement(
    Fade,
    _extends({ appear: true, 'in': open, timeout: transitionDuration }, other),
    React.createElement('div', { className: className, 'aria-hidden': 'true' })
  );
}

Backdrop.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible: PropTypes.bool,
  /**
   * If `true`, the backdrop is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })])
} : {};

Backdrop.defaultProps = {
  invisible: false
};

export default withStyles(styles, { name: 'MuiBackdrop' })(Backdrop);