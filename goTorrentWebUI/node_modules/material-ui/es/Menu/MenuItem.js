var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent ListItem

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ListItem from '../List/ListItem';

export const styles = theme => ({
  root: _extends({}, theme.typography.subheading, {
    height: 24,
    boxSizing: 'content-box',
    background: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:focus': {
      background: theme.palette.text.divider
    },
    '&:hover': {
      backgroundColor: theme.palette.text.divider
    }
  }),
  selected: {
    backgroundColor: theme.palette.text.divider
  }
});

function MenuItem(props) {
  const { classes, className: classNameProp, component, selected, role } = props,
        other = _objectWithoutProperties(props, ['classes', 'className', 'component', 'selected', 'role']);

  const className = classNames(classes.root, {
    [classes.selected]: selected
  }, classNameProp);

  return React.createElement(ListItem, _extends({
    button: true,
    role: role,
    tabIndex: -1,
    className: className,
    component: component
  }, other));
}

MenuItem.defaultProps = {
  role: 'menuitem',
  selected: false
};

export default withStyles(styles, { name: 'MuiMenuItem' })(MenuItem);