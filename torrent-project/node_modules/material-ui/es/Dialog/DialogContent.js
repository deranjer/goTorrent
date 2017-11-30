var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => {
  const spacing = theme.spacing.unit * 3;
  return {
    root: {
      flex: '1 1 auto',
      overflowY: 'auto',
      padding: `0 ${spacing}px ${spacing}px ${spacing}px`,
      '&:first-child': {
        paddingTop: spacing
      }
    }
  };
};

function DialogContent(props) {
  const { classes, children, className } = props,
        other = _objectWithoutProperties(props, ['classes', 'children', 'className']);

  return React.createElement(
    'div',
    _extends({ className: classNames(classes.root, className) }, other),
    children
  );
}

export default withStyles(styles, { name: 'MuiDialogContent' })(DialogContent);