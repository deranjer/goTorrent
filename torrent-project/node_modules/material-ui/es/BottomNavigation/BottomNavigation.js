var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: 56,
    backgroundColor: theme.palette.background.paper
  }
});

function BottomNavigation(props) {
  const {
    children: childrenProp,
    classes,
    className: classNameProp,
    onChange,
    showLabels,
    value
  } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'onChange', 'showLabels', 'value']);

  const className = classNames(classes.root, classNameProp);

  const children = React.Children.map(childrenProp, (child, childIndex) => {
    const childValue = child.props.value || childIndex;
    return React.cloneElement(child, {
      selected: childValue === value,
      showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabels,
      value: childValue,
      onChange
    });
  });

  return React.createElement(
    'div',
    _extends({ className: className }, other),
    children
  );
}

BottomNavigation.defaultProps = {
  showLabels: false
};

export default withStyles(styles, { name: 'MuiBottomNavigation' })(BottomNavigation);