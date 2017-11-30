var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import Modal from '../internal/Modal';
import withStyles from '../styles/withStyles';
import Slide from '../transitions/Slide';
import Paper from '../Paper';
import { capitalizeFirstLetter } from '../utils/helpers';
import { duration } from '../styles/transitions';


function getSlideDirection(anchor) {
  if (anchor === 'left') {
    return 'right';
  } else if (anchor === 'right') {
    return 'left';
  } else if (anchor === 'top') {
    return 'down';
  }

  // (anchor === 'bottom')
  return 'up';
}

export const styles = theme => ({
  docked: {
    flex: '0 0 auto'
  },
  paper: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    flex: '1 0 auto',
    position: 'fixed',
    top: 0,
    zIndex: theme.zIndex.navDrawer,
    willChange: 'transform',
    '&:focus': {
      outline: 'none'
    },
    WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.
  },
  paperAnchorLeft: {
    left: 0,
    right: 'auto'
  },
  paperAnchorRight: {
    left: 'auto',
    right: 0
  },
  paperAnchorTop: {
    top: 0,
    left: 0,
    bottom: 'auto',
    right: 0,
    height: 'auto',
    maxHeight: '100vh'
  },
  paperAnchorBottom: {
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100vh'
  },
  paperAnchorDockedLeft: {
    borderRight: `1px solid ${theme.palette.text.divider}`
  },
  paperAnchorDockedRight: {
    borderLeft: `1px solid ${theme.palette.text.divider}`
  },
  modal: {} // Just here so people can override the style.
});

class Drawer extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      // Let's assume that the Drawer will always be rendered on user space.
      // We use that state is order to skip the appear transition during the
      // initial mount of the component.
      firstMount: true
    }, _temp;
  }

  componentWillReceiveProps() {
    this.setState({
      firstMount: false
    });
  }

  render() {
    const _props = this.props,
          {
      anchor: anchorProp,
      children,
      classes,
      className,
      elevation,
      transitionDuration,
      ModalProps,
      onRequestClose,
      open,
      SlideProps,
      theme,
      type
    } = _props,
          other = _objectWithoutProperties(_props, ['anchor', 'children', 'classes', 'className', 'elevation', 'transitionDuration', 'ModalProps', 'onRequestClose', 'open', 'SlideProps', 'theme', 'type']);

    const rtl = theme.direction === 'rtl';
    let anchor = anchorProp;
    if (rtl && ['left', 'right'].includes(anchor)) {
      anchor = anchor === 'left' ? 'right' : 'left';
    }

    const drawer = React.createElement(
      Paper,
      {
        elevation: type === 'temporary' ? elevation : 0,
        square: true,
        className: classNames(classes.paper, {
          [classes[`paperAnchor${capitalizeFirstLetter(anchor)}`]]: type !== 'permanent',
          [classes[`paperAnchorDocked${capitalizeFirstLetter(anchor)}`]]: type !== 'temporary'
        })
      },
      children
    );

    if (type === 'permanent') {
      return React.createElement(
        'div',
        _extends({ className: classNames(classes.docked, className) }, other),
        drawer
      );
    }

    const slidingDrawer = React.createElement(
      Slide,
      _extends({
        'in': open,
        direction: getSlideDirection(anchor),
        timeout: transitionDuration,
        appear: !this.state.firstMount
      }, SlideProps),
      drawer
    );

    if (type === 'persistent') {
      return React.createElement(
        'div',
        _extends({ className: classNames(classes.docked, className) }, other),
        slidingDrawer
      );
    }

    // type === temporary
    return React.createElement(
      Modal,
      _extends({
        BackdropTransitionDuration: transitionDuration,
        className: classNames(classes.modal, className),
        show: open,
        onRequestClose: onRequestClose
      }, other, ModalProps),
      slidingDrawer
    );
  }
}

Drawer.defaultProps = {
  anchor: 'left',
  elevation: 16,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  },
  open: false,
  type: 'temporary' // Mobile first.
};
export default withStyles(styles, { flip: false, withTheme: true, name: 'MuiDrawer' })(Drawer);