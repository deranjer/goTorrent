function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';

import warning from 'warning';
import { keys as breakpointKeys } from '../styles/createBreakpoints';
import { capitalizeFirstLetter } from '../utils/helpers';
import withStyles from '../styles/withStyles';


function generateStyles(theme) {
  const hidden = {
    display: 'none'
  };

  return breakpointKeys.reduce((styles, key) => {
    styles[`only${capitalizeFirstLetter(key)}`] = {
      [theme.breakpoints.only(key)]: hidden
    };
    styles[`${key}Up`] = {
      [theme.breakpoints.up(key)]: hidden
    };
    styles[`${key}Down`] = {
      [theme.breakpoints.down(key)]: hidden
    };

    return styles;
  }, {});
}

const styles = theme => generateStyles(theme);

/**
 * @ignore - internal component.
 */
function HiddenCss(props) {
  const {
    children,
    classes,
    only,
    xsUp,
    smUp,
    mdUp,
    lgUp,
    xlUp,
    xsDown,
    smDown,
    mdDown,
    lgDown,
    xlDown
  } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'only', 'xsUp', 'smUp', 'mdUp', 'lgUp', 'xlUp', 'xsDown', 'smDown', 'mdDown', 'lgDown', 'xlDown']);

  warning(Object.keys(other).length === 0 || Object.keys(other).length === 1 && other.hasOwnProperty('ref'), `Material-UI: unsupported properties received ${Object.keys(other).join(', ')} by \`<Hidden />\`.`);

  const className = [];

  for (let i = 0; i < breakpointKeys.length; i += 1) {
    const breakpoint = breakpointKeys[i];
    const breakpointUp = props[`${breakpoint}Up`];
    const breakpointDown = props[`${breakpoint}Down`];

    if (breakpointUp) {
      className.push(classes[`${breakpoint}Up`]);
    }
    if (breakpointDown) {
      className.push(classes[`${breakpoint}Down`]);
    }
  }

  if (only) {
    className.push(classes[`only${capitalizeFirstLetter(only)}`]);
  }

  return React.createElement(
    'span',
    { className: className },
    children
  );
}

export default withStyles(styles, { name: 'MuiHiddenCss' })(HiddenCss);