var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import ReactDOM from 'react-dom';
import classNames from 'classnames';
import warning from 'warning';
import keycode from 'keycode';
import canUseDom from 'dom-helpers/util/inDOM';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import addEventListener from '../utils/addEventListener';
import { createChainedFunction } from '../utils/helpers';
import Fade from '../transitions/Fade';
import withStyles from '../styles/withStyles';
import createModalManager from './modalManager';
import Backdrop from './Backdrop';
import Portal from './Portal';


// Modals don't open on the server so this won't break concurrency.
// Could also put this on context.
const modalManager = createModalManager();

export const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: theme.zIndex.dialog,
    top: 0,
    left: 0
  },
  hidden: {
    visibility: 'hidden'
  }
});

/**
 * @ignore - internal component.
 */
class Modal extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), _initialiseProps.call(this), _temp;
  }

  componentWillMount() {
    if (!this.props.show) {
      this.setState({ exited: true });
    }
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.show) {
      this.handleShow();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && this.state.exited) {
      this.setState({ exited: false });
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.show && nextProps.show) {
      this.checkForFocus();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      this.handleShow();
    }
    // We are waiting for the onExited callback to call handleHide.
  }

  componentWillUnmount() {
    if (this.props.show || !this.state.exited) {
      this.handleHide();
    }
    this.mounted = false;
  }

  checkForFocus() {
    if (canUseDom) {
      this.lastFocus = activeElement();
    }
  }

  restoreLastFocus() {
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus();
      this.lastFocus = undefined;
    }
  }

  handleShow() {
    const doc = ownerDocument(ReactDOM.findDOMNode(this));
    this.props.modalManager.add(this);
    this.onDocumentKeyUpListener = addEventListener(doc, 'keyup', this.handleDocumentKeyUp);
    this.onFocusListener = addEventListener(doc, 'focus', this.handleFocusListener, true);
    this.focus();
  }

  focus() {
    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)));
    const modalContent = this.modal && this.modal.lastChild;
    const focusInModal = currentFocus && contains(modalContent, currentFocus);

    if (modalContent && !focusInModal) {
      if (!modalContent.hasAttribute('tabIndex')) {
        modalContent.setAttribute('tabIndex', -1);
        warning(false, 'Material-UI: the modal content node does not accept focus. ' + 'For the benefit of assistive technologies, ' + 'the tabIndex of the node is being set to "-1".');
      }

      modalContent.focus();
    }
  }

  handleHide() {
    this.props.modalManager.remove(this);
    if (this.onDocumentKeyUpListener) this.onDocumentKeyUpListener.remove();
    if (this.onFocusListener) this.onFocusListener.remove();
    this.restoreLastFocus();
  }

  renderBackdrop(other = {}) {
    const {
      BackdropComponent,
      BackdropClassName,
      BackdropTransitionDuration,
      BackdropInvisible,
      show
    } = this.props;

    return React.createElement(
      Fade,
      _extends({ appear: true, 'in': show, timeout: BackdropTransitionDuration }, other),
      React.createElement(BackdropComponent, {
        invisible: BackdropInvisible,
        className: BackdropClassName,
        onClick: this.handleBackdropClick
      })
    );
  }

  render() {
    const _props = this.props,
          {
      disableBackdrop,
      BackdropComponent,
      BackdropClassName,
      BackdropTransitionDuration,
      BackdropInvisible,
      ignoreBackdropClick,
      ignoreEscapeKeyUp,
      children,
      classes,
      className,
      keepMounted,
      modalManager: modalManagerProp,
      onBackdropClick,
      onEscapeKeyUp,
      onRequestClose,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      show
    } = _props,
          other = _objectWithoutProperties(_props, ['disableBackdrop', 'BackdropComponent', 'BackdropClassName', 'BackdropTransitionDuration', 'BackdropInvisible', 'ignoreBackdropClick', 'ignoreEscapeKeyUp', 'children', 'classes', 'className', 'keepMounted', 'modalManager', 'onBackdropClick', 'onEscapeKeyUp', 'onRequestClose', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited', 'show']);

    if (!keepMounted && !show && this.state.exited) {
      return null;
    }

    const transitionCallbacks = {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited: this.handleTransitionExited
    };

    let modalChild = React.Children.only(children);
    const { role, tabIndex } = modalChild.props;
    const childProps = {};

    if (role === undefined) {
      childProps.role = role === undefined ? 'document' : role;
    }

    if (tabIndex === undefined) {
      childProps.tabIndex = tabIndex == null ? -1 : tabIndex;
    }

    let backdropProps;

    // It's a Transition like component
    if (modalChild.props.hasOwnProperty('in')) {
      Object.keys(transitionCallbacks).forEach(key => {
        childProps[key] = createChainedFunction(transitionCallbacks[key], modalChild.props[key]);
      });
    } else {
      backdropProps = transitionCallbacks;
    }

    if (Object.keys(childProps).length) {
      modalChild = React.cloneElement(modalChild, childProps);
    }

    return React.createElement(
      Portal,
      {
        open: true,
        ref: node => {
          this.mountNode = node ? node.getLayer() : null;
        }
      },
      React.createElement(
        'div',
        _extends({
          'data-mui-test': 'Modal',
          className: classNames(classes.root, className, {
            [classes.hidden]: this.state.exited
          })
        }, other, {
          ref: node => {
            this.modal = node;
          }
        }),
        !disableBackdrop && (!keepMounted || show || !this.state.exited) && this.renderBackdrop(backdropProps),
        modalChild
      )
    );
  }
}

Modal.defaultProps = {
  BackdropComponent: Backdrop,
  BackdropTransitionDuration: 300,
  BackdropInvisible: false,
  keepMounted: false,
  disableBackdrop: false,
  ignoreBackdropClick: false,
  ignoreEscapeKeyUp: false,
  modalManager,
  show: false
};

var _initialiseProps = function () {
  this.state = {
    exited: false
  };
  this.onDocumentKeyUpListener = null;
  this.onFocusListener = null;
  this.mounted = false;
  this.lastFocus = undefined;
  this.modal = null;
  this.mountNode = null;

  this.handleFocusListener = () => {
    if (!this.mounted || !this.props.modalManager.isTopModal(this)) {
      return;
    }

    const currentFocus = activeElement(ownerDocument(ReactDOM.findDOMNode(this)));
    const modalContent = this.modal && this.modal.lastChild;

    if (modalContent && modalContent !== currentFocus && !contains(modalContent, currentFocus)) {
      modalContent.focus();
    }
  };

  this.handleDocumentKeyUp = event => {
    if (!this.mounted || !this.props.modalManager.isTopModal(this)) {
      return;
    }

    if (keycode(event) !== 'esc') {
      return;
    }

    const { onEscapeKeyUp, onRequestClose, ignoreEscapeKeyUp } = this.props;

    if (onEscapeKeyUp) {
      onEscapeKeyUp(event);
    }

    if (onRequestClose && !ignoreEscapeKeyUp) {
      onRequestClose(event);
    }
  };

  this.handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const { onBackdropClick, onRequestClose, ignoreBackdropClick } = this.props;

    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (onRequestClose && !ignoreBackdropClick) {
      onRequestClose(event);
    }
  };

  this.handleTransitionExited = (...args) => {
    if (this.props.onExited) {
      this.props.onExited(...args);
    }

    this.setState({ exited: true });
    this.handleHide();
  };
};

export default withStyles(styles, { flip: false, name: 'MuiModal' })(Modal);