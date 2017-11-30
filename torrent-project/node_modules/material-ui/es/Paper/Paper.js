var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import warning from 'warning';
import withStyles from '../styles/withStyles';

export const styles = theme => {
  const shadows = {};

  theme.shadows.forEach((shadow, index) => {
    shadows[`shadow${index}`] = {
      boxShadow: shadow
    };
  });

  return _extends({
    root: {
      backgroundColor: theme.palette.background.paper
    },
    rounded: {
      borderRadius: 2
    }
  }, shadows);
};

function Paper(props) {
  const {
    classes,
    className: classNameProp,
    component: ComponentProp,
    square,
    elevation
  } = props,
        other = _objectWithoutProperties(props, ['classes', 'className', 'component', 'square', 'elevation']);

  warning(elevation >= 0 && elevation < 25, `Material-UI: this elevation \`${elevation}\` is not implemented.`);

  const className = classNames(classes.root, classes[`shadow${elevation >= 0 ? elevation : 0}`], {
    [classes.rounded]: !square
  }, classNameProp);

  return React.createElement(ComponentProp, _extends({ className: className }, other));
}

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: false
};

export default withStyles(styles, { name: 'MuiPaper' })(Paper);