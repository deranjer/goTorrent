var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//  weak

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styles = theme => ({
  root: {
    position: 'absolute',
    height: 2,
    bottom: 0,
    width: '100%',
    transition: theme.transitions.create(),
    willChange: 'left, width'
  },
  colorAccent: {
    backgroundColor: theme.palette.secondary.A200
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary[500]
  }
});

/**
 * @ignore - internal component.
 */
function TabIndicator(props) {
  const { classes, className: classNameProp, color, style: styleProp } = props;
  const colorPredefined = ['primary', 'accent'].indexOf(color) !== -1;
  const className = classNames(classes.root, {
    [classes[`color${capitalizeFirstLetter(color)}`]]: colorPredefined
  }, classNameProp);

  const style = colorPredefined ? styleProp : _extends({}, styleProp, {
    backgroundColor: color
  });

  return React.createElement('div', { className: className, style: style });
}

export default withStyles(styles, { name: 'MuiTabIndicator' })(TabIndicator);