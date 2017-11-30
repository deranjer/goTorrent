var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import Typography from '../Typography';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    'label + div > &': {
      marginTop: -theme.spacing.unit * 2
    }
  },
  positionStart: {
    marginRight: theme.spacing.unit
  },
  positionEnd: {
    marginLeft: theme.spacing.unit
  }
});

function InputAdornment(props) {
  const {
    children,
    component: Component,
    classes,
    className,
    disableTypography,
    position
  } = props,
        other = _objectWithoutProperties(props, ['children', 'component', 'classes', 'className', 'disableTypography', 'position']);

  return React.createElement(
    Component,
    _extends({
      className: classNames(classes.root, {
        [classes.positionStart]: position === 'start',
        [classes.positionEnd]: position === 'end'
      }, className)
    }, other),
    typeof children === 'string' && !disableTypography ? React.createElement(
      Typography,
      { color: 'secondary' },
      children
    ) : children
  );
}

InputAdornment.defaultProps = {
  component: 'div',
  disableTypography: false
};

export default withStyles(styles, { name: 'MuiInputAdornment' })(InputAdornment);