import React from 'react';

import { findDOMNode } from 'react-dom';
import EventListener from 'react-event-listener';

const isDescendant = (el, target) => {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

/**
 * Listen for click events that are triggered outside of the component children.
 */
class ClickAwayListener extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.mounted = false, this.handleClickAway = event => {
      // Ignore events that have been `event.preventDefault()` marked.
      if (event.defaultPrevented) {
        return;
      }

      // IE11 support, which trigger the handleClickAway even after the unbind
      if (this.mounted) {
        const el = findDOMNode(this);

        if (event.target instanceof HTMLElement && document.documentElement && document.documentElement.contains(event.target) && !isDescendant(el, event.target)) {
          this.props.onClickAway(event);
        }
      }
    }, _temp;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return React.createElement(
      EventListener,
      {
        target: 'document',
        onMouseup: this.handleClickAway,
        onTouchend: this.handleClickAway
      },
      this.props.children
    );
  }
}

export default ClickAwayListener;