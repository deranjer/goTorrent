var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';

export const styles = {
  root: {
    height: 52,
    display: 'flex',
    alignItems: 'center',
    padding: '2px 4px'
  },
  actionSpacing: {
    margin: '0 4px'
  }
};

function CardActions(props) {
  const { disableActionSpacing, children, classes, className } = props,
        other = _objectWithoutProperties(props, ['disableActionSpacing', 'children', 'classes', 'className']);

  return React.createElement(
    'div',
    _extends({ className: classNames(classes.root, className) }, other),
    disableActionSpacing ? children : cloneChildrenWithClassName(children, classes.actionSpacing)
  );
}

CardActions.defaultProps = {
  disableActionSpacing: false
};

export default withStyles(styles, { name: 'MuiCardActions' })(CardActions);