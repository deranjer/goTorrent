var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent Paper

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';
import Paper from '../Paper';

export const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box', // Prevent padding issue with the Modal and fixed positioned AppBar.
    zIndex: theme.zIndex.appBar,
    flexShrink: 0
  },
  positionFixed: {
    position: 'fixed',
    top: 0,
    left: 'auto',
    right: 0
  },
  positionAbsolute: {
    position: 'absolute',
    top: 0,
    left: 'auto',
    right: 0
  },
  positionStatic: {
    position: 'static',
    flexShrink: 0
  },
  colorDefault: {
    backgroundColor: theme.palette.background.appBar,
    color: theme.palette.getContrastText(theme.palette.background.appBar)
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500])
  },
  colorAccent: {
    backgroundColor: theme.palette.secondary.A200,
    color: theme.palette.getContrastText(theme.palette.secondary.A200)
  }
});

function AppBar(props) {
  const { children, classes, className: classNameProp, color, position } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'color', 'position']);

  const className = classNames(classes.root, classes[`position${capitalizeFirstLetter(position)}`], {
    [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'inherit',
    'mui-fixed': position === 'fixed' // Useful for the Dialog
  }, classNameProp);

  return React.createElement(
    Paper,
    _extends({ square: true, component: 'header', elevation: 4, className: className }, other),
    children
  );
}

AppBar.defaultProps = {
  color: 'primary',
  position: 'fixed'
};

export default withStyles(styles, { name: 'MuiAppBar' })(AppBar);