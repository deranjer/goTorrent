var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent Popover

import React from 'react';

import { findDOMNode } from 'react-dom';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import withStyles from '../styles/withStyles';
import Popover from '../Popover';
import MenuList from './MenuList';


const rtlOrigin = {
  vertical: 'top',
  horizontal: 'right'
};

const ltrOrigin = {
  vertical: 'top',
  horizontal: 'left'
};

export const styles = {
  paper: {
    // specZ: The maximum height of a simple menu should be one or more rows less than the view
    // height. This ensures a tappable area outside of the simple menu with which to dismiss
    // the menu.
    maxHeight: 'calc(100vh - 96px)',
    // Add iOS momentum scrolling.
    WebkitOverflowScrolling: 'touch'
  }
};

class Menu extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.getContentAnchorEl = () => {
      if (!this.menuList || !this.menuList.selectedItem) {
        // $FlowFixMe
        return findDOMNode(this.menuList).firstChild;
      }

      return findDOMNode(this.menuList.selectedItem);
    }, this.menuList = undefined, this.focus = () => {
      if (this.menuList && this.menuList.selectedItem) {
        // $FlowFixMe
        findDOMNode(this.menuList.selectedItem).focus();
        return;
      }

      const menuList = findDOMNode(this.menuList);
      if (menuList && menuList.firstChild) {
        // $FlowFixMe
        menuList.firstChild.focus();
      }
    }, this.handleEnter = element => {
      const { theme } = this.props;

      const menuList = findDOMNode(this.menuList);

      // Focus so the scroll computation of the Popover works as expected.
      this.focus();

      // Let's ignore that piece of logic if users are already overriding the width
      // of the menu.
      // $FlowFixMe
      if (menuList && element.clientHeight < menuList.clientHeight && !menuList.style.width) {
        const size = `${getScrollbarSize()}px`;
        // $FlowFixMe
        menuList.style[theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight'] = size;
        // $FlowFixMe
        menuList.style.width = `calc(100% + ${size})`;
      }

      if (this.props.onEnter) {
        this.props.onEnter(element);
      }
    }, this.handleListKeyDown = (event, key) => {
      if (key === 'tab') {
        event.preventDefault();

        if (this.props.onRequestClose) {
          this.props.onRequestClose(event);
        }
      }
    }, _temp;
  }

  componentDidMount() {
    if (this.props.open) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      // Needs to refocus as when a menu is rendered into another Modal,
      // the first modal might change the focus to prevent any leak.
      this.focus();
    }
  }

  render() {
    const _props = this.props,
          {
      children,
      classes,
      MenuListProps,
      onEnter,
      PaperProps = {},
      PopoverClasses,
      theme
    } = _props,
          other = _objectWithoutProperties(_props, ['children', 'classes', 'MenuListProps', 'onEnter', 'PaperProps', 'PopoverClasses', 'theme']);

    return React.createElement(
      Popover,
      _extends({
        getContentAnchorEl: this.getContentAnchorEl,
        classes: PopoverClasses,
        onEnter: this.handleEnter,
        anchorOrigin: theme.direction === 'rtl' ? rtlOrigin : ltrOrigin,
        transformOrigin: theme.direction === 'rtl' ? rtlOrigin : ltrOrigin,
        PaperProps: _extends({}, PaperProps, {
          classes: _extends({}, PaperProps.classes, {
            root: classes.paper
          })
        })
      }, other),
      React.createElement(
        MenuList,
        _extends({
          'data-mui-test': 'Menu',
          role: 'menu',
          onKeyDown: this.handleListKeyDown
        }, MenuListProps, {
          ref: node => {
            this.menuList = node;
          }
        }),
        children
      )
    );
  }
}

Menu.defaultProps = {
  open: false,
  transitionDuration: 'auto'
};
export default withStyles(styles, { withTheme: true, name: 'MuiMenu' })(Menu);