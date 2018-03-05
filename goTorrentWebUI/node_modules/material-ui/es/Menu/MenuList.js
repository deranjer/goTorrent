import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
// @inheritedComponent List

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import keycode from 'keycode';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';
import ownerDocument from 'dom-helpers/ownerDocument';
import List from '../List';

class MenuList extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      currentTabIndex: undefined
    }, this.list = undefined, this.selectedItem = undefined, this.blurTimer = undefined, this.handleBlur = event => {
      this.blurTimer = setTimeout(() => {
        if (this.list) {
          const list = findDOMNode(this.list);
          const currentFocus = activeElement(ownerDocument(list));
          if (!contains(list, currentFocus)) {
            this.resetTabIndex();
          }
        }
      }, 30);

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    }, this.handleKeyDown = event => {
      const list = findDOMNode(this.list);
      const key = keycode(event);
      const currentFocus = activeElement(ownerDocument(list));

      if ((key === 'up' || key === 'down') && (!currentFocus || currentFocus && !contains(list, currentFocus))) {
        if (this.selectedItem) {
          findDOMNode(this.selectedItem).focus();
        } else {
          list.firstChild.focus();
        }
      } else if (key === 'down') {
        event.preventDefault();
        if (currentFocus.nextElementSibling) {
          currentFocus.nextElementSibling.focus();
        }
      } else if (key === 'up') {
        event.preventDefault();
        if (currentFocus.previousElementSibling) {
          currentFocus.previousElementSibling.focus();
        }
      }

      if (this.props.onKeyDown) {
        this.props.onKeyDown(event, key);
      }
    }, this.handleItemFocus = event => {
      const list = findDOMNode(this.list);
      if (list) {
        for (let i = 0; i < list.children.length; i += 1) {
          if (list.children[i] === event.currentTarget) {
            this.setTabIndex(i);
            break;
          }
        }
      }
    }, _temp;
  }

  componentDidMount() {
    this.resetTabIndex();
  }

  componentWillUnmount() {
    clearTimeout(this.blurTimer);
  }

  setTabIndex(index) {
    this.setState({ currentTabIndex: index });
  }

  focus() {
    const { currentTabIndex } = this.state;
    const list = findDOMNode(this.list);
    if (!list || !list.children || !list.firstChild) {
      return;
    }

    if (currentTabIndex && currentTabIndex >= 0) {
      list.children[currentTabIndex].focus();
    } else {
      list.firstChild.focus();
    }
  }

  resetTabIndex() {
    const list = findDOMNode(this.list);
    const currentFocus = activeElement(ownerDocument(list));
    const items = [...list.children];
    const currentFocusIndex = items.indexOf(currentFocus);

    if (currentFocusIndex !== -1) {
      return this.setTabIndex(currentFocusIndex);
    }

    if (this.selectedItem) {
      return this.setTabIndex(items.indexOf(findDOMNode(this.selectedItem)));
    }

    return this.setTabIndex(0);
  }

  render() {
    const _props = this.props,
          { children, className, onBlur, onKeyDown } = _props,
          other = _objectWithoutProperties(_props, ['children', 'className', 'onBlur', 'onKeyDown']);

    return React.createElement(
      List,
      _extends({
        role: 'menu',
        ref: node => {
          this.list = node;
        },
        className: className,
        onKeyDown: this.handleKeyDown,
        onBlur: this.handleBlur
      }, other),
      React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          tabIndex: index === this.state.currentTabIndex ? 0 : -1,
          ref: child.props.selected ? node => {
            this.selectedItem = node;
          } : undefined,
          onFocus: this.handleItemFocus
        });
      })
    );
  }
}

MenuList.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func
} : {};

export default MenuList;