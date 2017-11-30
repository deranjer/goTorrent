var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    height: 24,
    marginRight: theme.spacing.unit * 2,
    width: 24,
    color: theme.palette.action.active,
    flexShrink: 0
  }
});

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */
function ListItemIcon(props) {
  const { children, classes, className: classNameProp } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className']);

  return React.cloneElement(children, _extends({
    className: classNames(classes.root, classNameProp, children.props.className)
  }, other));
}

export default withStyles(styles, { name: 'MuiListItemIcon' })(ListItemIcon);