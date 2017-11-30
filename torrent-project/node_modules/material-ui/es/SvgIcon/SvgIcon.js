var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    display: 'inline-block',
    fill: 'currentColor',
    height: 24,
    width: 24,
    userSelect: 'none',
    flexShrink: 0,
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter
    })
  }
});

function SvgIcon(props) {
  const { children, classes, className, titleAccess, viewBox } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'titleAccess', 'viewBox']);

  return React.createElement(
    'svg',
    _extends({
      className: classNames(classes.root, className),
      focusable: 'false',
      viewBox: viewBox,
      'aria-hidden': titleAccess ? 'false' : 'true'
    }, other),
    titleAccess ? React.createElement(
      'title',
      null,
      titleAccess
    ) : null,
    children
  );
}

SvgIcon.defaultProps = {
  viewBox: '0 0 24 24'
};

SvgIcon.muiName = 'SvgIcon';

export default withStyles(styles, { name: 'MuiSvgIcon' })(SvgIcon);