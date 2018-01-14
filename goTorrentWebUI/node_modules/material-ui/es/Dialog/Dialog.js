var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';
import Modal from '../internal/Modal';
import Fade from '../transitions/Fade';
import { duration } from '../styles/transitions';
import Paper from '../Paper';


export const styles = theme => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    display: 'flex',
    margin: theme.spacing.unit * 4,
    flexDirection: 'column',
    flex: '0 1 auto',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto', // Fix IE11 issue, to remove at some point.
    '&:focus': {
      outline: 'none'
    }
  },
  paperWidthXs: {
    maxWidth: theme.breakpoints.values.xs
  },
  paperWidthSm: {
    maxWidth: theme.breakpoints.values.sm
  },
  paperWidthMd: {
    maxWidth: theme.breakpoints.values.md
  },
  fullWidth: {
    width: '100%'
  },
  fullScreen: {
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: '100%',
    borderRadius: 0
  }
});

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
function Dialog(props) {
  const {
    children,
    classes,
    className,
    fullScreen,
    ignoreBackdropClick,
    ignoreEscapeKeyUp,
    transitionDuration,
    maxWidth,
    fullWidth,
    open,
    onBackdropClick,
    onEscapeKeyUp,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    onRequestClose,
    transition: TransitionProp
  } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'fullScreen', 'ignoreBackdropClick', 'ignoreEscapeKeyUp', 'transitionDuration', 'maxWidth', 'fullWidth', 'open', 'onBackdropClick', 'onEscapeKeyUp', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited', 'onRequestClose', 'transition']);

  return React.createElement(
    Modal,
    _extends({
      className: classNames(classes.root, className),
      BackdropTransitionDuration: transitionDuration,
      ignoreBackdropClick: ignoreBackdropClick,
      ignoreEscapeKeyUp: ignoreEscapeKeyUp,
      onBackdropClick: onBackdropClick,
      onEscapeKeyUp: onEscapeKeyUp,
      onRequestClose: onRequestClose,
      show: open
    }, other),
    React.createElement(
      TransitionProp,
      {
        appear: true,
        'in': open,
        timeout: transitionDuration,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: onExited
      },
      React.createElement(
        Paper,
        {
          'data-mui-test': 'Dialog',
          elevation: 24,
          className: classNames(classes.paper, classes[`paperWidth${capitalizeFirstLetter(maxWidth)}`], {
            [classes.fullScreen]: fullScreen,
            [classes.fullWidth]: fullWidth
          })
        },
        children
      )
    )
  );
}

Dialog.defaultProps = {
  fullScreen: false,
  ignoreBackdropClick: false,
  ignoreEscapeKeyUp: false,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  },
  maxWidth: 'sm',
  fullWidth: false,
  open: false,
  transition: Fade
};

export default withStyles(styles, { name: 'MuiDialog' })(Dialog);