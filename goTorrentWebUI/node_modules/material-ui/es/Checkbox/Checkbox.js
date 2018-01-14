var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import withStyles from '../styles/withStyles';
import createSwitch from '../internal/SwitchBase';
import IndeterminateCheckBoxIcon from '../svg-icons/IndeterminateCheckBox';

export const styles = theme => ({
  default: {
    color: theme.palette.text.secondary
  },
  checked: {
    color: theme.palette.primary[500]
  },
  disabled: {
    color: theme.palette.action.disabled
  }
});

const SwitchBase = createSwitch();

function Checkbox(props) {
  const { checkedIcon, icon, indeterminate, indeterminateIcon } = props,
        other = _objectWithoutProperties(props, ['checkedIcon', 'icon', 'indeterminate', 'indeterminateIcon']);

  return React.createElement(SwitchBase, _extends({
    checkedIcon: indeterminate ? indeterminateIcon : checkedIcon,
    icon: indeterminate ? indeterminateIcon : icon
  }, other));
}

Checkbox.defaultProps = {
  indeterminate: false,
  indeterminateIcon: React.createElement(IndeterminateCheckBoxIcon, null)
};

export default withStyles(styles, { name: 'MuiCheckbox' })(Checkbox);