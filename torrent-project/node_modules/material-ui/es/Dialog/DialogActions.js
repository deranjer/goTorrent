var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import '../Button'; // So we don't have any override priority issue.

export const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: `${theme.spacing.unit}px ${theme.spacing.unit / 2}px`,
    flex: '0 0 auto'
  },
  action: {
    margin: `0 ${theme.spacing.unit / 2}px`
  },
  button: {
    minWidth: 64
  }
});

function DialogActions(props) {
  const { children, classes, className } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className']);

  return React.createElement(
    'div',
    _extends({ 'data-mui-test': 'DialogActions', className: classNames(classes.root, className) }, other),
    React.Children.map(children, button => React.isValidElement(button) && React.createElement(
      'div',
      { className: classes.action },
      React.cloneElement(button, {
        className: classNames(classes.button, button.props.className)
      })
    ))
  );
}

export default withStyles(styles, { name: 'MuiDialogActions' })(DialogActions);