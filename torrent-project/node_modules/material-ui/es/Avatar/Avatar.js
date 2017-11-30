var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { emphasize } from '../styles/colorManipulator';

export const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none'
  },
  colorDefault: {
    color: theme.palette.background.default,
    backgroundColor: emphasize(theme.palette.background.default, 0.26)
  },
  img: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto'
  }
});

function Avatar(props) {
  const {
    alt,
    classes,
    className: classNameProp,
    children: childrenProp,
    childrenClassName: childrenClassNameProp,
    component: ComponentProp,
    imgProps,
    sizes,
    src,
    srcSet
  } = props,
        other = _objectWithoutProperties(props, ['alt', 'classes', 'className', 'children', 'childrenClassName', 'component', 'imgProps', 'sizes', 'src', 'srcSet']);

  const className = classNames(classes.root, {
    [classes.colorDefault]: childrenProp && !src && !srcSet
  }, classNameProp);
  let children = null;

  if (childrenProp) {
    if (childrenClassNameProp && typeof childrenProp !== 'string' && React.isValidElement(childrenProp)) {
      const childrenClassName = classNames(childrenClassNameProp, childrenProp.props.className);
      children = React.cloneElement(childrenProp, { className: childrenClassName });
    } else {
      children = childrenProp;
    }
  } else if (src || srcSet) {
    children = React.createElement('img', _extends({
      alt: alt,
      src: src,
      srcSet: srcSet,
      sizes: sizes,
      className: classes.img
    }, imgProps));
  }

  return React.createElement(
    ComponentProp,
    _extends({ className: className }, other),
    children
  );
}

Avatar.defaultProps = {
  component: 'div'
};

export default withStyles(styles, { name: 'MuiAvatar' })(Avatar);