var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak
// @inheritedComponent ButtonBase

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalizeFirstLetter } from '../utils/helpers';
import Icon from '../Icon';
import '../SvgIcon'; // Ensure CSS specificity
import { isMuiElement } from '../utils/reactHelpers';

export const styles = theme => ({
  root: {
    textAlign: 'center',
    flex: '0 0 auto',
    fontSize: theme.typography.pxToRem(24),
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    padding: 0,
    borderRadius: '50%',
    color: theme.palette.action.active,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest
    })
  },
  colorAccent: {
    color: theme.palette.secondary.A200
  },
  colorContrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500])
  },
  colorPrimary: {
    color: theme.palette.primary[500]
  },
  colorInherit: {
    color: 'inherit'
  },
  disabled: {
    color: theme.palette.action.disabled
  },
  label: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit'
  },
  icon: {
    width: '1em',
    height: '1em'
  },
  keyboardFocused: {
    backgroundColor: theme.palette.text.divider
  }
});

/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */
function IconButton(props) {
  const { buttonRef, children, classes, className, color, disabled, rootRef } = props,
        other = _objectWithoutProperties(props, ['buttonRef', 'children', 'classes', 'className', 'color', 'disabled', 'rootRef']);

  return React.createElement(
    ButtonBase,
    _extends({
      className: classNames(classes.root, {
        [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'default',
        [classes.disabled]: disabled
      }, className),
      centerRipple: true,
      keyboardFocusedClassName: classes.keyboardFocused,
      disabled: disabled
    }, other, {
      rootRef: buttonRef,
      ref: rootRef
    }),
    React.createElement(
      'span',
      { className: classes.label },
      typeof children === 'string' ? React.createElement(
        Icon,
        { className: classes.icon },
        children
      ) : React.Children.map(children, child => {
        if (isMuiElement(child, ['Icon', 'SvgIcon'])) {
          return React.cloneElement(child, {
            className: classNames(classes.icon, child.props.className)
          });
        }

        return child;
      })
    )
  );
}

IconButton.defaultProps = {
  color: 'default',
  disabled: false,
  disableRipple: false
};

export default withStyles(styles, { name: 'MuiIconButton' })(IconButton);