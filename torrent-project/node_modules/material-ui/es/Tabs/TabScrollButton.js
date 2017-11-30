var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import KeyboardArrowLeft from '../svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../svg-icons/KeyboardArrowRight';

export const styles = theme => ({
  root: {
    color: 'inherit',
    flex: `0 0 ${theme.spacing.unit * 7}px`
  }
});

/**
 * @ignore - internal component.
 */
function TabScrollButton(props) {
  const { classes, className: classNameProp, direction, onClick, visible } = props,
        other = _objectWithoutProperties(props, ['classes', 'className', 'direction', 'onClick', 'visible']);

  const className = classNames(classes.root, classNameProp);

  if (!visible) {
    return React.createElement('div', { className: className });
  }

  return React.createElement(
    ButtonBase,
    _extends({ className: className, onClick: onClick, tabIndex: -1 }, other),
    direction === 'left' ? React.createElement(KeyboardArrowLeft, null) : React.createElement(KeyboardArrowRight, null)
  );
}

TabScrollButton.defaultProps = {
  visible: true
};

export default withStyles(styles, { name: 'MuiTabScrollButton' })(TabScrollButton);