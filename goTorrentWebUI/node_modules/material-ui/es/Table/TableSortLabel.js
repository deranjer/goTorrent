var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent ButtonBase

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import ArrowDownwardIcon from '../svg-icons/ArrowDownward';

export const styles = theme => ({
  root: {
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'inherit',
    alignItems: 'center',
    '&:hover': {
      color: theme.palette.text.primary
    },
    '&:focus': {
      color: theme.palette.text.primary
    }
  },
  active: {
    color: theme.palette.text.primary,
    '& $icon': {
      opacity: 1
    }
  },
  icon: {
    height: 16,
    marginRight: 4,
    marginLeft: 4,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shorter
    }),
    userSelect: 'none',
    width: 16
  },
  desc: {
    transform: 'rotate(0deg)'
  },
  asc: {
    transform: 'rotate(180deg)'
  }
});

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
function TableSortLabel(props) {
  const { active, classes, className: classNameProp, children, direction } = props,
        other = _objectWithoutProperties(props, ['active', 'classes', 'className', 'children', 'direction']);
  const className = classNames(classes.root, {
    [classes.active]: active
  }, classNameProp);

  const iconClassName = classNames(classes.icon, {
    [classes[direction]]: !!direction
  });

  return React.createElement(
    ButtonBase,
    _extends({ className: className, component: 'span', disableRipple: true }, other),
    children,
    React.createElement(ArrowDownwardIcon, { className: iconClassName })
  );
}

TableSortLabel.defaultProps = {
  active: false,
  direction: 'desc'
};

export default withStyles(styles, { name: 'MuiTableSortLabel' })(TableSortLabel);