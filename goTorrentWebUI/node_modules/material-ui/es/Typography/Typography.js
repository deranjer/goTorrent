var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styles = theme => ({
  root: {
    display: 'block',
    margin: 0
  },
  display4: theme.typography.display4,
  display3: theme.typography.display3,
  display2: theme.typography.display2,
  display1: theme.typography.display1,
  headline: theme.typography.headline,
  title: theme.typography.title,
  subheading: theme.typography.subheading,
  body2: theme.typography.body2,
  body1: theme.typography.body1,
  caption: theme.typography.caption,
  button: theme.typography.button,
  alignLeft: {
    textAlign: 'left'
  },
  alignCenter: {
    textAlign: 'center'
  },
  alignRight: {
    textAlign: 'right'
  },
  alignJustify: {
    textAlign: 'justify'
  },
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  gutterBottom: {
    marginBottom: '0.35em'
  },
  paragraph: {
    marginBottom: theme.spacing.unit * 2
  },
  colorInherit: {
    color: 'inherit'
  },
  colorPrimary: {
    color: theme.palette.primary[500]
  },
  colorSecondary: {
    color: theme.palette.text.secondary
  },
  colorAccent: {
    color: theme.palette.secondary.A400
  },
  colorError: {
    color: theme.palette.error.A400
  }
});

function Typography(props) {
  const {
    align,
    classes,
    className: classNameProp,
    component: componentProp,
    color,
    gutterBottom,
    headlineMapping,
    noWrap,
    paragraph,
    type
  } = props,
        other = _objectWithoutProperties(props, ['align', 'classes', 'className', 'component', 'color', 'gutterBottom', 'headlineMapping', 'noWrap', 'paragraph', 'type']);

  const className = classNames(classes.root, classes[type], {
    [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'default',
    [classes.noWrap]: noWrap,
    [classes.gutterBottom]: gutterBottom,
    [classes.paragraph]: paragraph,
    [classes[`align${capitalizeFirstLetter(align)}`]]: align !== 'inherit'
  }, classNameProp);

  const Component = componentProp || (paragraph ? 'p' : headlineMapping[type]) || 'span';

  return React.createElement(Component, _extends({ className: className }, other));
}

Typography.defaultProps = {
  align: 'inherit',
  color: 'default',
  gutterBottom: false,
  headlineMapping: {
    display4: 'h1',
    display3: 'h1',
    display2: 'h1',
    display1: 'h1',
    headline: 'h1',
    title: 'h2',
    subheading: 'h3',
    body2: 'aside',
    body1: 'p'
  },
  noWrap: false,
  paragraph: false,
  type: 'body1'
};

export default withStyles(styles, { name: 'MuiTypography' })(Typography);