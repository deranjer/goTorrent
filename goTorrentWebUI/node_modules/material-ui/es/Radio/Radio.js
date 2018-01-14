//  weak

import React from 'react';

import withStyles from '../styles/withStyles';
import createSwitch from '../internal/SwitchBase';
import RadioButtonCheckedIcon from '../svg-icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '../svg-icons/RadioButtonUnchecked';

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

const Radio = withStyles(styles, { name: 'MuiRadio' })(createSwitch({
  inputType: 'radio',
  defaultIcon: React.createElement(RadioButtonUncheckedIcon, null),
  defaultCheckedIcon: React.createElement(RadioButtonCheckedIcon, null)
}));

Radio.displayName = 'Radio';

export default Radio;

// This is here solely to trigger api doc generation
// eslint-disable-next-line no-unused-vars
export const RadioDocs = props => React.createElement('span', null);