var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent FormGroup

import React from 'react';

import FormGroup from '../Form/FormGroup';
import { find } from '../utils/helpers';

class RadioGroup extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.radios = [], this.focus = () => {
      if (!this.radios || !this.radios.length) {
        return;
      }

      const focusRadios = this.radios.filter(n => !n.disabled);

      if (!focusRadios.length) {
        return;
      }

      const selectedRadio = find(focusRadios, n => n.checked);

      if (selectedRadio) {
        selectedRadio.focus();
        return;
      }

      focusRadios[0].focus();
    }, this.handleRadioChange = (event, checked) => {
      if (checked && this.props.onChange) {
        this.props.onChange(event, event.target.value);
      }
    }, _temp;
  }

  render() {
    const _props = this.props,
          { children, name, value, onChange } = _props,
          other = _objectWithoutProperties(_props, ['children', 'name', 'value', 'onChange']);

    this.radios = [];

    return React.createElement(
      FormGroup,
      _extends({ 'data-mui-test': 'RadioGroup', role: 'radiogroup' }, other),
      React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          key: index,
          name,
          inputRef: node => {
            if (node) {
              this.radios.push(node);
            }
          },
          checked: value === child.props.value,
          onChange: this.handleRadioChange
        });
      })
    );
  }
}

export default RadioGroup;