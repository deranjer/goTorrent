var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent Paper

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import Typography from '../Typography';

export const styles = theme => {
  const type = theme.palette.type === 'light' ? 'dark' : 'light';
  const backgroundColor = theme.palette.shades[type].background.default;

  return {
    root: {
      pointerEvents: 'initial',
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: `6px ${theme.spacing.unit * 3}px`,
      [theme.breakpoints.up('md')]: {
        minWidth: 288,
        maxWidth: 568,
        borderRadius: 2
      },
      [theme.breakpoints.down('md')]: {
        flexGrow: 1
      }
    },
    message: {
      padding: `${theme.spacing.unit}px 0`
    },
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: theme.spacing.unit * 3,
      marginRight: -theme.spacing.unit
    }
  };
};

function SnackbarContent(props) {
  const { action, classes, className, message } = props,
        other = _objectWithoutProperties(props, ['action', 'classes', 'className', 'message']);

  return React.createElement(
    Paper,
    _extends({
      component: Typography,
      headlineMapping: {
        body1: 'div'
      },
      role: 'alertdialog',
      square: true,
      elevation: 6,
      className: classNames(classes.root, className)
    }, other),
    React.createElement(
      'div',
      { className: classes.message },
      message
    ),
    action ? React.createElement(
      'div',
      { className: classes.action },
      action
    ) : null
  );
}

export default withStyles(styles, { name: 'MuiSnackbarContent' })(SnackbarContent);