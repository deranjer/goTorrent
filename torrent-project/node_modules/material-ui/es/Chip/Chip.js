var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import keycode from 'keycode';
import withStyles from '../styles/withStyles';
import CancelIcon from '../svg-icons/Cancel';
import { emphasize, fade } from '../styles/colorManipulator';
import Avatar from '../Avatar/Avatar';

export const styles = theme => {
  const height = 32;
  const backgroundColor = emphasize(theme.palette.background.default, 0.12);
  const deleteIconColor = fade(theme.palette.text.primary, 0.26);

  return {
    root: {
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height,
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      borderRadius: height / 2,
      whiteSpace: 'nowrap',
      width: 'fit-content',
      transition: theme.transitions.create(),
      // label will inherit this from root, then `clickable` class overrides this for both
      cursor: 'default',
      outline: 'none', // No outline on focused element in Chrome (as triggered by tabIndex prop)
      border: 'none', // Remove `button` border
      padding: 0 // Remove `button` padding
    },
    clickable: {
      // Remove grey highlight
      WebkitTapHighlightColor: theme.palette.common.transparent,
      cursor: 'pointer',
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08)
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12)
      }
    },
    deletable: {
      '&:focus': {
        backgroundColor: emphasize(backgroundColor, 0.08)
      }
    },
    avatar: {
      marginRight: -4,
      width: 32,
      height: 32,
      fontSize: theme.typography.pxToRem(16)
    },
    avatarChildren: {
      width: 19,
      height: 19
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 12,
      userSelect: 'none',
      whiteSpace: 'nowrap',
      cursor: 'inherit'
    },
    deleteIcon: {
      // Remove grey highlight
      WebkitTapHighlightColor: theme.palette.common.transparent,
      color: deleteIconColor,
      cursor: 'pointer',
      height: 'auto',
      margin: '0 4px 0 -8px',
      '&:hover': {
        color: fade(deleteIconColor, 0.4)
      }
    }
  };
};

/**
 * Chips represent complex entities in small blocks, such as a contact.
 */
class Chip extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.chipRef = null, this.handleDeleteIconClick = event => {
      // Stop the event from bubbling up to the `Chip`
      event.stopPropagation();
      const { onRequestDelete } = this.props;
      if (onRequestDelete) {
        onRequestDelete(event);
      }
    }, this.handleKeyDown = event => {
      const { onClick, onRequestDelete, onKeyDown } = this.props;
      const key = keycode(event);

      if (onClick && (key === 'space' || key === 'enter')) {
        event.preventDefault();
        onClick(event);
      } else if (onRequestDelete && key === 'backspace') {
        event.preventDefault();
        onRequestDelete(event);
      } else if (key === 'esc') {
        event.preventDefault();
        if (this.chipRef) {
          this.chipRef.blur();
        }
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    }, _temp;
  }

  render() {
    const _props = this.props,
          {
      avatar: avatarProp,
      classes,
      className: classNameProp,
      label,
      onClick,
      onKeyDown,
      onRequestDelete,
      deleteIcon: deleteIconProp,
      tabIndex: tabIndexProp
    } = _props,
          other = _objectWithoutProperties(_props, ['avatar', 'classes', 'className', 'label', 'onClick', 'onKeyDown', 'onRequestDelete', 'deleteIcon', 'tabIndex']);

    const className = classNames(classes.root, { [classes.clickable]: onClick }, { [classes.deletable]: onRequestDelete }, classNameProp);

    let deleteIcon = null;
    if (onRequestDelete && deleteIconProp && React.isValidElement(deleteIconProp)) {
      deleteIcon = React.cloneElement(deleteIconProp, {
        onClick: this.handleDeleteIconClick,
        className: classNames(classes.deleteIcon, deleteIconProp.props.className)
      });
    } else if (onRequestDelete) {
      deleteIcon = React.createElement(CancelIcon, { className: classes.deleteIcon, onClick: this.handleDeleteIconClick });
    }

    let avatar = null;
    if (avatarProp && React.isValidElement(avatarProp)) {
      // $FlowFixMe - this looks strictly correct, not sure why it errors.
      avatar = React.cloneElement(avatarProp, {
        className: classNames(classes.avatar, avatarProp.props.className),
        childrenClassName: classNames(classes.avatarChildren, avatarProp.props.childrenClassName)
      });
    }

    let tabIndex = tabIndexProp;

    if (!tabIndex) {
      tabIndex = onClick || onRequestDelete ? 0 : -1;
    }

    return React.createElement(
      'div',
      _extends({
        role: 'button',
        className: className,
        tabIndex: tabIndex,
        onClick: onClick,
        onKeyDown: this.handleKeyDown
      }, other, {
        ref: node => {
          this.chipRef = node;
        }
      }),
      avatar,
      React.createElement(
        'span',
        { className: classes.label },
        label
      ),
      deleteIcon
    );
  }
}

export default withStyles(styles, { name: 'MuiChip' })(Chip);