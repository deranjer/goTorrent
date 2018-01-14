var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import EventListener from 'react-event-listener';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import ClickAwayListener from '../utils/ClickAwayListener';
import { capitalizeFirstLetter, createChainedFunction } from '../utils/helpers';
import Slide from '../transitions/Slide';
import SnackbarContent from './SnackbarContent';


export const styles = theme => {
  const gutter = theme.spacing.unit * 3;
  const top = { top: 0 };
  const bottom = { bottom: 0 };
  const right = { justifyContent: 'flex-end' };
  const left = { justifyContent: 'flex-start' };
  const topSpace = { top: gutter };
  const bottomSpace = { bottom: gutter };
  const rightSpace = { right: gutter };
  const leftSpace = { left: gutter };
  const center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)'
  };

  return {
    root: {
      zIndex: theme.zIndex.snackbar,
      position: 'fixed',
      display: 'flex',
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    anchorTopCenter: {
      extend: [top],
      [theme.breakpoints.up('md')]: {
        extend: [center]
      }
    },
    anchorBottomCenter: {
      extend: [bottom],
      [theme.breakpoints.up('md')]: {
        extend: [center]
      }
    },
    anchorTopRight: {
      extend: [top, right],
      [theme.breakpoints.up('md')]: {
        left: 'auto',
        extend: [topSpace, rightSpace]
      }
    },
    anchorBottomRight: {
      extend: [bottom, right],
      [theme.breakpoints.up('md')]: {
        left: 'auto',
        extend: [bottomSpace, rightSpace]
      }
    },
    anchorTopLeft: {
      extend: [top, left],
      [theme.breakpoints.up('md')]: {
        right: 'auto',
        extend: [topSpace, leftSpace]
      }
    },
    anchorBottomLeft: {
      extend: [bottom, left],
      [theme.breakpoints.up('md')]: {
        right: 'auto',
        extend: [bottomSpace, leftSpace]
      }
    }
  };
};

class Snackbar extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      // Used to only render active snackbars.
      exited: false
    }, this.timerAutoHide = null, this.handleMouseEnter = event => {
      if (this.props.onMouseEnter) {
        this.props.onMouseEnter(event);
      }
      this.handlePause();
    }, this.handleMouseLeave = event => {
      if (this.props.onMouseLeave) {
        this.props.onMouseLeave(event);
      }
      this.handleResume();
    }, this.handleClickAway = event => {
      if (this.props.onRequestClose) {
        this.props.onRequestClose(event, 'clickaway');
      }
    }, this.handlePause = () => {
      clearTimeout(this.timerAutoHide);
    }, this.handleResume = () => {
      if (this.props.autoHideDuration !== undefined) {
        if (this.props.resumeHideDuration !== undefined) {
          this.setAutoHideTimer(this.props.resumeHideDuration);
          return;
        }
        this.setAutoHideTimer((this.props.autoHideDuration || 0) * 0.5);
      }
    }, this.handleTransitionExited = () => {
      this.setState({ exited: true });
    }, _temp;
  }

  componentWillMount() {
    if (!this.props.open) {
      this.setState({ exited: true });
    }
  }

  componentDidMount() {
    if (this.props.open) {
      this.setAutoHideTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && this.state.exited) {
      this.setState({ exited: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      if (this.props.open) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHide);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHide);
  }

  // Timer that controls delay before snackbar auto hides
  setAutoHideTimer(autoHideDuration = null) {
    if (!this.props.onRequestClose || this.props.autoHideDuration === undefined) {
      return;
    }

    clearTimeout(this.timerAutoHide);
    this.timerAutoHide = setTimeout(() => {
      if (!this.props.onRequestClose || this.props.autoHideDuration === undefined) {
        return;
      }

      this.props.onRequestClose(null, 'timeout');
    }, autoHideDuration || this.props.autoHideDuration || 0);
  }

  // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.


  // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.


  render() {
    const _props = this.props,
          {
      action,
      anchorOrigin: { vertical, horizontal },
      autoHideDuration,
      resumeHideDuration,
      children,
      classes,
      className,
      transitionDuration,
      message,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      onMouseEnter,
      onMouseLeave,
      onRequestClose,
      open,
      SnackbarContentProps,
      transition: TransitionProp
    } = _props,
          other = _objectWithoutProperties(_props, ['action', 'anchorOrigin', 'autoHideDuration', 'resumeHideDuration', 'children', 'classes', 'className', 'transitionDuration', 'message', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited', 'onMouseEnter', 'onMouseLeave', 'onRequestClose', 'open', 'SnackbarContentProps', 'transition']);

    if (!open && this.state.exited) {
      return null;
    }

    const transitionProps = {
      in: open,
      appear: true,
      timeout: transitionDuration,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited: createChainedFunction(this.handleTransitionExited, onExited)
    };
    const transitionContent = children || React.createElement(SnackbarContent, _extends({ message: message, action: action }, SnackbarContentProps));

    let transition;
    if (TransitionProp) {
      transition = React.createElement(
        TransitionProp,
        transitionProps,
        transitionContent
      );
    } else {
      transition = React.createElement(
        Slide,
        _extends({ direction: vertical === 'top' ? 'down' : 'up' }, transitionProps),
        transitionContent
      );
    }

    return React.createElement(
      EventListener,
      { target: 'window', onFocus: this.handleResume, onBlur: this.handlePause },
      React.createElement(
        ClickAwayListener,
        { onClickAway: this.handleClickAway },
        React.createElement(
          'div',
          _extends({
            className: classNames(classes.root, classes[`anchor${capitalizeFirstLetter(vertical)}${capitalizeFirstLetter(horizontal)}`], className),
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave
          }, other),
          transition
        )
      )
    );
  }
}

Snackbar.defaultProps = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};
export default withStyles(styles, { flip: false, name: 'MuiSnackbar' })(Snackbar);