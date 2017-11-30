var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    width: 36,
    height: 36,
    fontSize: theme.typography.pxToRem(18),
    marginRight: 4
  },
  icon: {
    width: 20,
    height: 20,
    fontSize: theme.typography.pxToRem(20)
  }
});

/**
 * It's a simple wrapper to apply the `dense` mode styles to `Avatar`.
 */
function ListItemAvatar(props, context) {
  if (context.dense === undefined) {
    warning(false, `Material-UI: <ListItemAvatar> is a simple wrapper to apply the dense styles
      to <Avatar>. You do not need it unless you are controlling the <List> dense property.`);
    return props.children;
  }

  const { children, classes, className: classNameProp } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className']);

  return React.cloneElement(children, _extends({
    className: classNames({ [classes.root]: context.dense }, classNameProp, children.props.className),
    childrenClassName: classNames({ [classes.icon]: context.dense }, children.props.childrenClassName)
  }, other));
}

ListItemAvatar.contextTypes = {
  dense: PropTypes.bool
};

ListItemAvatar.muiName = 'ListItemAvatar';

export default withStyles(styles, { name: 'MuiListItemAvatar' })(ListItemAvatar);