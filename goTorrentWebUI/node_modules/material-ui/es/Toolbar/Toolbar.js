var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: _extends({
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  }, theme.mixins.toolbar),
  gutters: theme.mixins.gutters({})
});

function Toolbar(props) {
  const { children, classes, className: classNameProp, disableGutters } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'disableGutters']);

  const className = classNames(classes.root, {
    [classes.gutters]: !disableGutters
  }, classNameProp);

  return React.createElement(
    'div',
    _extends({ className: className }, other),
    children
  );
}

Toolbar.defaultProps = {
  disableGutters: false
};

export default withStyles(styles, { name: 'MuiToolbar' })(Toolbar);