var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import React from 'react';

import classNames from 'classnames';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    boxSizing: 'border-box',
    flexShrink: 0
  },
  tile: {
    position: 'relative',
    display: 'block', // In case it's not renderd with a div.
    height: '100%',
    overflow: 'hidden'
  },
  imgFullHeight: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%'
  },
  imgFullWidth: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(-50%)',
    top: '50%'
  }
};

class GridListTile extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.imgElement = null, this.handleResize = debounce(() => {
      this.fit();
    }, 166), this.fit = () => {
      const imgElement = this.imgElement;

      if (!imgElement) {
        return;
      }

      if (!imgElement.complete) {
        return;
      }

      if (imgElement.width / imgElement.height > imgElement.parentNode.offsetWidth / imgElement.parentNode.offsetHeight) {
        imgElement.classList.remove(this.props.classes.imgFullWidth);
        imgElement.classList.add(this.props.classes.imgFullHeight);
      } else {
        imgElement.classList.remove(this.props.classes.imgFullHeight);
        imgElement.classList.add(this.props.classes.imgFullWidth);
      }

      imgElement.removeEventListener('load', this.fit);
    }, _temp;
  }

  componentDidMount() {
    this.ensureImageCover();
  }

  componentDidUpdate() {
    this.ensureImageCover();
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  ensureImageCover() {
    if (!this.imgElement) {
      return;
    }

    if (this.imgElement.complete) {
      this.fit();
    } else {
      this.imgElement.addEventListener('load', this.fit);
    }
  }

  render() {
    const _props = this.props,
          {
      children,
      classes,
      className,
      cols,
      // $FlowFixMe - no idea why it cannot find component on intersection
      component: ComponentProp,
      rows
    } = _props,
          other = _objectWithoutProperties(_props, ['children', 'classes', 'className', 'cols', 'component', 'rows']);

    return React.createElement(
      ComponentProp,
      _extends({ className: classNames(classes.root, className) }, other),
      React.createElement(EventListener, { target: 'window', onResize: this.handleResize }),
      React.createElement(
        'div',
        { className: classes.tile },
        React.Children.map(children, child => {
          if (child.type === 'img') {
            return React.cloneElement(child, {
              key: 'img',
              ref: node => {
                this.imgElement = node;
              }
            });
          }

          return child;
        })
      )
    );
  }
}

GridListTile.defaultProps = {
  cols: 1,
  rows: 1,
  component: 'li'
};
export default withStyles(styles, { name: 'MuiGridListTile' })(GridListTile);