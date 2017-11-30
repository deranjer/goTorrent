var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    // Remove grey highlight
    WebkitTapHighlightColor: theme.palette.common.transparent,
    backgroundColor: theme.palette.common.lightBlack,
    transition: theme.transitions.create('opacity'),
    willChange: 'opacity',
    opacity: 0
  },
  invisible: {
    backgroundColor: theme.palette.common.transparent
  }
});

/**
 * @ignore - internal component.
 */
function Backdrop(props) {
  const { children, classes, className, invisible } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'invisible']);

  const backdropClass = classNames(classes.root, {
    [classes.invisible]: invisible
  }, className);

  return React.createElement(
    'div',
    _extends({ 'data-mui-test': 'Backdrop', className: backdropClass, 'aria-hidden': 'true' }, other),
    children
  );
}

Backdrop.defaultProps = {
  invisible: false
};

export default withStyles(styles, { name: 'MuiBackdrop' })(Backdrop);