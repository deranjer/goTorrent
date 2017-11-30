var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { isMuiElement } from '../utils/reactHelpers';

export const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none'
  },
  container: {
    position: 'relative'
  },
  keyboardFocused: {
    background: theme.palette.text.divider
  },
  default: {
    paddingTop: 12,
    paddingBottom: 12
  },
  dense: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  disabled: {
    opacity: 0.5
  },
  divider: {
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`
  },
  gutters: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  button: {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: theme.palette.text.divider,
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      },
      '&$disabled': {
        backgroundColor: 'transparent'
      }
    }
  },
  secondaryAction: {
    // Add some space to avoid collision as `ListItemSecondaryAction`
    // is absolutely positionned.
    paddingRight: theme.spacing.unit * 4
  }
});

class ListItem extends React.Component {

  getChildContext() {
    return {
      dense: this.props.dense || this.context.dense || false
    };
  }

  render() {
    const _props = this.props,
          {
      button,
      children: childrenProp,
      classes,
      className: classNameProp,
      component: componentProp,
      dense,
      disabled,
      divider,
      disableGutters
    } = _props,
          other = _objectWithoutProperties(_props, ['button', 'children', 'classes', 'className', 'component', 'dense', 'disabled', 'divider', 'disableGutters']);
    const isDense = dense || this.context.dense || false;
    const children = React.Children.toArray(childrenProp);

    const hasAvatar = children.some(value => isMuiElement(value, ['ListItemAvatar']));
    const hasSecondaryAction = children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);

    const className = classNames(classes.root, {
      [classes.gutters]: !disableGutters,
      [classes.divider]: divider,
      [classes.disabled]: disabled,
      [classes.button]: button,
      [classes.secondaryAction]: hasSecondaryAction,
      [isDense || hasAvatar ? classes.dense : classes.default]: true
    }, classNameProp);

    const listItemProps = _extends({ className, disabled }, other);
    let ComponentMain = componentProp;

    if (button) {
      ComponentMain = ButtonBase;
      listItemProps.component = componentProp || 'li';
      listItemProps.keyboardFocusedClassName = classes.keyboardFocused;
    }

    if (hasSecondaryAction) {
      return React.createElement(
        'div',
        { className: classes.container },
        React.createElement(
          ComponentMain,
          listItemProps,
          children
        ),
        children.pop()
      );
    }

    return React.createElement(
      ComponentMain,
      listItemProps,
      children
    );
  }
}

ListItem.defaultProps = {
  button: false,
  component: 'li',
  dense: false,
  disabled: false,
  disableGutters: false,
  divider: false
};
ListItem.contextTypes = {
  dense: PropTypes.bool
};

ListItem.childContextTypes = {
  dense: PropTypes.bool
};

export default withStyles(styles, { name: 'MuiListItem' })(ListItem);