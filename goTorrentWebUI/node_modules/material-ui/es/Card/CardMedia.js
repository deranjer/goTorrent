var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  rootMedia: {
    width: '100%'
  }
};

const mediaComponents = ['video', 'audio', 'picture', 'iframe', 'img'];

function CardMedia(props) {
  const { classes, className, image, style, src, component: ComponentProp } = props,
        other = _objectWithoutProperties(props, ['classes', 'className', 'image', 'style', 'src', 'component']);

  warning(Boolean(image || src), 'Material-UI: either `image` or `src` property must be specified.');

  const isMediaComponent = mediaComponents.indexOf(ComponentProp) !== -1;
  const composedStyle = !isMediaComponent && image ? _extends({ backgroundImage: `url(${image})` }, style) : style;
  const composedClassName = classNames({
    [classes.root]: !isMediaComponent,
    [classes.rootMedia]: isMediaComponent
  }, className);

  return React.createElement(ComponentProp, _extends({
    className: composedClassName,
    style: composedStyle,
    src: isMediaComponent ? image || src : undefined
  }, other));
}

CardMedia.defaultProps = {
  component: 'div'
};

export default withStyles(styles, { name: 'MuiCardMedia' })(CardMedia);