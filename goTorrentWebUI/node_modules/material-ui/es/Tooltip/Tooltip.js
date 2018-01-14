var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable react/no-multi-comp, no-underscore-dangle */
import React, { Children } from 'react';

import { findDOMNode } from 'react-dom';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import warning from 'warning';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import { capitalizeFirstLetter } from '../utils/helpers';
import common from '../colors/common';
import grey from '../colors/grey';
import withStyles from '../styles/withStyles';

// Use a class component so we can get a reference.
class TargetChildren extends React.Component {
  render() {
    return this.props.element;
  }
}

export const styles = theme => ({
  root: {
    display: 'inline',
    flexDirection: 'inherit' // Makes the wrapper more transparent.
  },
  popper: {
    zIndex: theme.zIndex.tooltip
  },
  popperClose: {
    pointerEvents: 'none'
  },
  tooltip: {
    background: grey[700],
    borderRadius: 2,
    color: common.fullWhite,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(14),
    minHeight: theme.spacing.unit * 4,
    lineHeight: '32px',
    opacity: 0,
    padding: `0 ${theme.spacing.unit}px`,
    transform: 'scale(0)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shortest
    }),
    [theme.breakpoints.up('sm')]: {
      minHeight: 22,
      lineHeight: '22px',
      padding: `0 ${theme.spacing.unit}px`,
      fontSize: theme.typography.pxToRem(10)
    }
  },
  tooltipLeft: {
    transformOrigin: 'right center',
    margin: `0 ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px'
    }
  },
  tooltipRight: {
    transformOrigin: 'left center',
    margin: `0 ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px'
    }
  },
  tooltipTop: {
    transformOrigin: 'center bottom',
    margin: `${theme.spacing.unit * 3}px 0`,
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0'
    }
  },
  tooltipBottom: {
    transformOrigin: 'center top',
    margin: `${theme.spacing.unit * 3}px 0`,
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0'
    }
  },
  tooltipOpen: {
    opacity: 0.9,
    transform: 'scale(1)'
  }
});

function flipPlacement(placement) {
  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

class Tooltip extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {}, this.enterTimer = null, this.leaveTimer = null, this.touchTimer = null, this.isControlled = null, this.popper = null, this.children = null, this.ignoreNonTouchEvents = false, this.handleResize = debounce(() => {
      if (this.popper) {
        this.popper._popper.scheduleUpdate();
      }
    }, 166), this.handleRequestOpen = event => {
      const { children } = this.props;
      if (typeof children !== 'string') {
        const childrenProps = Children.only(children).props;

        if (event.type === 'focus' && childrenProps.onFocus) {
          childrenProps.onFocus(event);
        }

        if (event.type === 'mouseover' && childrenProps.onMouseOver) {
          childrenProps.onMouseOver(event);
        }
      }

      if (this.ignoreNonTouchEvents && event.type !== 'touchstart') {
        return;
      }

      clearTimeout(this.leaveTimer);
      if (this.props.enterDelay > 0) {
        this.leaveTimer = setTimeout(() => {
          this.requestOpen(event);
        }, this.props.enterDelay);
      } else {
        this.requestOpen(event);
      }
    }, this.requestOpen = event => {
      if (!this.isControlled) {
        this.setState({ open: true });
      }

      if (this.props.onRequestOpen) {
        this.props.onRequestOpen(event, true);
      }
    }, this.handleRequestClose = event => {
      const { children } = this.props;
      if (typeof children !== 'string') {
        const childrenProps = Children.only(children).props;

        if (event.type === 'blur' && childrenProps.onBlur) {
          childrenProps.onBlur(event);
        }

        if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
          childrenProps.onMouseLeave(event);
        }
      }

      clearTimeout(this.leaveTimer);
      if (this.props.leaveDelay) {
        this.leaveTimer = setTimeout(() => {
          this.requestClose(event);
        }, this.props.leaveDelay);
      } else {
        this.requestClose(event);
      }
    }, this.requestClose = event => {
      this.ignoreNonTouchEvents = false;

      if (!this.isControlled) {
        this.setState({ open: false });
      }

      if (this.props.onRequestClose) {
        this.props.onRequestClose(event, false);
      }
    }, this.handleTouchStart = event => {
      this.ignoreNonTouchEvents = true;
      const { children } = this.props;
      if (typeof children !== 'string') {
        const childrenProps = Children.only(children).props;

        if (childrenProps.onTouchStart) {
          childrenProps.onTouchStart(event);
        }
      }

      clearTimeout(this.touchTimer);
      event.persist();
      this.touchTimer = setTimeout(() => {
        this.handleRequestOpen(event);
      }, 1e3);
    }, this.handleTouchEnd = event => {
      const { children } = this.props;
      if (typeof children !== 'string') {
        const childrenProps = Children.only(children).props;

        if (childrenProps.onTouchEnd) {
          childrenProps.onTouchEnd(event);
        }
      }

      clearTimeout(this.touchTimer);
      clearTimeout(this.leaveTimer);
      event.persist();
      this.leaveTimer = setTimeout(() => {
        this.requestClose(event);
      }, 1500 + this.props.leaveDelay);
    }, _temp;
  }

  componentWillMount() {
    const { props } = this;

    this.isControlled = props.open !== undefined;

    if (!this.isControlled) {
      // not controlled, use internal state
      this.setState({
        open: false
      });
    }
  }

  componentDidMount() {
    warning(!this.children || !this.children.disabled ||
    // $FlowFixMe
    !this.children.tagName.toLowerCase() === 'button', ['Material-UI: you are providing a disabled button children to the Tooltip component.', 'A disabled element do not fire events.', 'But the Tooltip needs to listen to the children element events to display the title.', '', 'Place a `div` over top of the element.'].join('\n'));
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    this.handleResize.cancel();
  }

  render() {
    const _props = this.props,
          {
      children: childrenProp,
      classes,
      className,
      disableTriggerFocus,
      disableTriggerHover,
      disableTriggerTouch,
      enterDelay,
      id,
      leaveDelay,
      open: openProp,
      onRequestClose,
      onRequestOpen,
      theme,
      title,
      placement: rawPlacement,
      PopperProps: { PopperClassName } = {}
    } = _props,
          PopperOther = _objectWithoutProperties(_props.PopperProps, ['PopperClassName']),
          other = _objectWithoutProperties(_props, ['children', 'classes', 'className', 'disableTriggerFocus', 'disableTriggerHover', 'disableTriggerTouch', 'enterDelay', 'id', 'leaveDelay', 'open', 'onRequestClose', 'onRequestOpen', 'theme', 'title', 'placement', 'PopperProps']);

    const placement = theme.direction === 'rtl' ? flipPlacement(rawPlacement) : rawPlacement;
    const open = this.isControlled ? openProp : this.state.open;
    const childrenProps = {};

    childrenProps['aria-describedby'] = id;

    if (!disableTriggerTouch) {
      childrenProps.onTouchStart = this.handleTouchStart;
      childrenProps.onTouchEnd = this.handleTouchEnd;
    }

    if (!disableTriggerHover) {
      childrenProps.onMouseOver = this.handleRequestOpen;
      childrenProps.onMouseLeave = this.handleRequestClose;
    }

    if (!disableTriggerFocus) {
      childrenProps.onFocus = this.handleRequestOpen;
      childrenProps.onBlur = this.handleRequestClose;
    }

    if (typeof childrenProp !== 'string' && childrenProp.props) {
      warning(!childrenProp.props.title, ['Material-UI: you have been providing a `title` property to the child of <Tooltip />.', `Remove this title property \`${childrenProp.props.title}\` or the Tooltip component.`].join('\n'));
    }

    return React.createElement(
      EventListener,
      { target: 'window', onResize: this.handleResize },
      React.createElement(
        Manager,
        _extends({ className: classNames(classes.root, className) }, other),
        React.createElement(
          Target,
          null,
          ({ targetProps }) => React.createElement(TargetChildren, {
            element: typeof childrenProp !== 'string' ? React.cloneElement(childrenProp, childrenProps) : childrenProp,
            ref: node => {
              this.children = findDOMNode(node);
              targetProps.ref(this.children);
            }
          })
        ),
        React.createElement(
          Popper,
          _extends({
            placement: placement,
            eventsEnabled: open,
            className: classNames(classes.popper, { [classes.popperClose]: !open }, PopperClassName)
          }, PopperOther, {
            ref: node => {
              this.popper = node;
            }
          }),
          React.createElement(
            'div',
            {
              id: id,
              role: 'tooltip',
              'aria-hidden': !open,
              className: classNames(classes.tooltip, { [classes.tooltipOpen]: open }, classes[`tooltip${capitalizeFirstLetter(placement.split('-')[0])}`])
            },
            title
          )
        )
      )
    );
  }
}

Tooltip.defaultProps = {
  disableTriggerFocus: false,
  disableTriggerHover: false,
  disableTriggerTouch: false,
  enterDelay: 0,
  leaveDelay: 0,
  placement: 'bottom'
};
export default withStyles(styles, { name: 'MuiTooltip', withTheme: true })(Tooltip);