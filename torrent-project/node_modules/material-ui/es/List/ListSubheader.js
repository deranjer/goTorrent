var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styles = theme => ({
  root: {
    boxSizing: 'border-box',
    lineHeight: '48px',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(theme.typography.fontSize)
  },
  colorPrimary: {
    color: theme.palette.primary[500]
  },
  colorInherit: {
    color: 'inherit'
  },
  inset: {
    paddingLeft: theme.spacing.unit * 9
  },
  sticky: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: 'inherit'
  }
});

function ListSubheader(props) {
  const {
    children,
    classes,
    className: classNameProp,
    color,
    disableSticky,
    inset
  } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'color', 'disableSticky', 'inset']);
  const className = classNames(classes.root, {
    [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'default',
    [classes.inset]: inset,
    [classes.sticky]: !disableSticky
  }, classNameProp);

  return React.createElement(
    'div',
    _extends({ className: className }, other),
    children
  );
}

ListSubheader.defaultProps = {
  color: 'default',
  disableSticky: false,
  inset: false
};

ListSubheader.muiName = 'ListSubheader';

export default withStyles(styles, { name: 'MuiListSubheader' })(ListSubheader);