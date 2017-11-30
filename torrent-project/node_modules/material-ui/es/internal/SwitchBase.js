var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import IconButton from '../IconButton';
import CheckBoxOutlineBlankIcon from '../svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../svg-icons/CheckBox';
import Icon from '../Icon';

export const styles = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'none'
  },
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0
  },
  default: {},
  checked: {},
  disabled: {}
};

// NB: If changed, please update Checkbox, Switch and Radio
// so that the API documentation is updated.


export default function createSwitch({
  defaultIcon = React.createElement(CheckBoxOutlineBlankIcon, null),
  defaultCheckedIcon = React.createElement(CheckBoxIcon, null),
  inputType = 'checkbox'
} = {}) {
  /**
   * @ignore - internal component.
   */
  class SwitchBase extends React.Component {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), this.state = {}, this.input = null, this.button = null, this.isControlled = null, this.handleInputChange = event => {
        const checked = event.target.checked;

        if (!this.isControlled) {
          this.setState({ checked });
        }

        if (this.props.onChange) {
          this.props.onChange(event, checked);
        }
      }, _temp;
    }

    componentWillMount() {
      const { props } = this;

      this.isControlled = props.checked !== undefined;

      if (!this.isControlled) {
        // not controlled, use internal state
        this.setState({
          checked: props.defaultChecked !== undefined ? props.defaultChecked : false
        });
      }
    }

    render() {
      const _props = this.props,
            {
        checked: checkedProp,
        classes,
        className: classNameProp,
        checkedClassName,
        checkedIcon,
        disabled: disabledProp,
        disabledClassName,
        icon: iconProp,
        inputProps,
        inputRef,
        name,
        onChange,
        tabIndex,
        value
      } = _props,
            other = _objectWithoutProperties(_props, ['checked', 'classes', 'className', 'checkedClassName', 'checkedIcon', 'disabled', 'disabledClassName', 'icon', 'inputProps', 'inputRef', 'name', 'onChange', 'tabIndex', 'value']);

      const { muiFormControl } = this.context;
      let disabled = disabledProp;

      if (muiFormControl) {
        if (typeof disabled === 'undefined') {
          disabled = muiFormControl.disabled;
        }
      }

      const checked = this.isControlled ? checkedProp : this.state.checked;
      const className = classNames(classes.root, classes.default, classNameProp, {
        [classNames(classes.checked, checkedClassName)]: checked,
        [classNames(classes.disabled, disabledClassName)]: disabled
      });

      let icon = checked ? checkedIcon : iconProp;

      if (typeof icon === 'string') {
        icon = React.createElement(
          Icon,
          null,
          icon
        );
      }

      return React.createElement(
        IconButton,
        _extends({
          'data-mui-test': 'SwitchBase',
          component: 'span',
          className: className,
          disabled: disabled,
          tabIndex: null,
          role: undefined,
          rootRef: node => {
            this.button = node;
          }
        }, other),
        icon,
        React.createElement('input', _extends({
          type: inputType,
          name: name,
          checked: this.isControlled ? checkedProp : undefined,
          onChange: this.handleInputChange,
          className: classes.input,
          disabled: disabled,
          tabIndex: tabIndex,
          value: value
        }, inputProps, {
          ref: node => {
            this.input = node;
            if (inputRef) {
              inputRef(node);
            }
          }
        }))
      );
    }
  }

  SwitchBase.defaultProps = {
    checkedIcon: defaultCheckedIcon,
    disableRipple: false,
    icon: defaultIcon
  };
  SwitchBase.contextTypes = {
    muiFormControl: PropTypes.object
  };
  return withStyles(styles, { name: 'MuiSwitchBase' })(SwitchBase);
}