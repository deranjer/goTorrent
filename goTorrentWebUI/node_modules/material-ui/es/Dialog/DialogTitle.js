var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = theme => ({
  root: {
    margin: 0,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px \
      20px ${theme.spacing.unit * 3}px`,
    flex: '0 0 auto'
  }
});

function DialogTitle(props) {
  const { children, classes, className, disableTypography } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'disableTypography']);

  return React.createElement(
    'div',
    _extends({ 'data-mui-test': 'DialogTitle', className: classNames(classes.root, className) }, other),
    disableTypography ? children : React.createElement(
      Typography,
      { type: 'title' },
      children
    )
  );
}

DialogTitle.defaultProps = {
  disableTypography: false
};

export default withStyles(styles, { name: 'MuiDialogTitle' })(DialogTitle);