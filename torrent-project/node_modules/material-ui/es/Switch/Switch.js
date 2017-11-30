var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import createSwitch from '../internal/SwitchBase';

export const styles = theme => ({
  root: {
    display: 'inline-flex',
    width: 62,
    position: 'relative',
    flexShrink: 0
  },
  bar: {
    borderRadius: 7,
    display: 'block',
    position: 'absolute',
    width: 34,
    height: 14,
    top: '50%',
    marginTop: -7,
    left: '50%',
    marginLeft: -17,
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest
    }),
    backgroundColor: theme.palette.type === 'light' ? '#000' : '#fff',
    opacity: theme.palette.type === 'light' ? 0.38 : 0.3
  },
  icon: {
    boxShadow: theme.shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%'
  },
  // For SwitchBase
  default: {
    zIndex: 1,
    color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  checked: {
    color: theme.palette.primary[500],
    transform: 'translateX(14px)',
    '& + $bar': {
      backgroundColor: theme.palette.primary[500],
      opacity: 0.5
    }
  },
  disabled: {
    color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
    '& + $bar': {
      backgroundColor: theme.palette.type === 'light' ? '#000' : '#fff',
      opacity: theme.palette.type === 'light' ? 0.12 : 0.1
    }
  }
});

const SwitchBase = createSwitch();

function Switch(props) {
  const { classes, className } = props,
        other = _objectWithoutProperties(props, ['classes', 'className']);
  const icon = React.createElement('div', { className: classes.icon });

  return React.createElement(
    'div',
    { className: classNames(classes.root, className) },
    React.createElement(SwitchBase, _extends({
      icon: icon,
      classes: {
        default: classes.default,
        checked: classes.checked,
        disabled: classes.disabled
      },
      checkedIcon: icon
    }, other)),
    React.createElement('div', { className: classes.bar })
  );
}

export default withStyles(styles, { name: 'MuiSwitch' })(Switch);