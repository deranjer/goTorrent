var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import keycode from 'keycode';
import warning from 'warning';
import Menu from '../Menu/Menu';
import { isDirty } from '../Input/Input';
import ArrowDropDownIcon from '../svg-icons/ArrowDropDown';

/**
 * @ignore - internal component.
 */
class SelectInput extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      anchorEl: null,
      open: false
    }, this.ignoreNextBlur = false, this.handleClick = event => {
      // Opening the menu is going to blur the. It will be focused back when closed.
      this.ignoreNextBlur = true;
      this.setState({
        open: true,
        anchorEl: event.currentTarget
      });
    }, this.handleRequestClose = () => {
      this.setState({
        open: false
      });
    }, this.handleItemClick = child => event => {
      if (!this.props.multiple) {
        this.setState({
          open: false
        });
      }

      if (this.props.onChange) {
        const { onChange } = this.props;
        let value;
        let target;

        if (event.target) {
          target = event.target;
        }

        if (this.props.multiple) {
          value = Array.isArray(this.props.value) ? [...this.props.value] : [];
          const itemIndex = value.indexOf(child.props.value);
          if (itemIndex === -1) {
            value.push(child.props.value);
          } else {
            value.splice(itemIndex, 1);
          }
        } else {
          value = child.props.value;
        }

        event.persist();
        event.target = _extends({}, target, { value });

        onChange(event, child);
      }
    }, this.handleBlur = event => {
      if (this.ignoreNextBlur === true) {
        // The parent components are relying on the bubbling of the event.
        event.stopPropagation();
        this.ignoreNextBlur = false;
        return;
      }

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    }, this.handleKeyDown = event => {
      if (this.props.readOnly) {
        return;
      }

      if (['space', 'up', 'down'].includes(keycode(event))) {
        event.preventDefault();
        // Opening the menu is going to blur the. It will be focused back when closed.
        this.ignoreNextBlur = true;
        this.setState({
          open: true,
          anchorEl: event.currentTarget
        });
      }
    }, this.handleSelectRef = node => {
      if (!this.props.selectRef) {
        return;
      }

      this.props.selectRef({
        node,
        // By pass the native input as we expose a rich object (array).
        value: this.props.value
      });
    }, _temp;
  }

  render() {
    const _props = this.props,
          {
      autoWidth,
      children,
      className: classNameProp,
      classes,
      disabled,
      displayEmpty,
      name,
      native,
      multiple,
      MenuProps = {},
      onBlur,
      onChange,
      onFocus,
      readOnly,
      renderValue,
      selectRef,
      value
    } = _props,
          other = _objectWithoutProperties(_props, ['autoWidth', 'children', 'className', 'classes', 'disabled', 'displayEmpty', 'name', 'native', 'multiple', 'MenuProps', 'onBlur', 'onChange', 'onFocus', 'readOnly', 'renderValue', 'selectRef', 'value']);

    if (native) {
      warning(multiple === false, 'Material-UI: you can not use the `native` and `multiple` properties ' + 'at the same time on a `Select` component.');
      warning(!renderValue, 'Material-UI: the `renderValue` property is not used by the native implementation.');
      warning(!displayEmpty, 'Material-UI: the `displayEmpty` property is not used by the native implementation.');

      return React.createElement(
        'div',
        { className: classes.root },
        React.createElement(
          'select',
          _extends({
            className: classNames(classes.select, {
              [classes.disabled]: disabled
            }, classNameProp),
            name: name,
            disabled: disabled,
            onBlur: onBlur,
            onChange: onChange,
            onFocus: onFocus,
            value: value,
            readOnly: readOnly
          }, other, {
            ref: selectRef
          }),
          children
        ),
        React.createElement(ArrowDropDownIcon, { className: classes.icon })
      );
    }

    if (value === undefined) {
      throw new Error('Material-UI: the `value` property is required ' + 'when using the `Select` component with `native=false`.');
    }

    let display;
    let displaySingle = '';
    const displayMultiple = [];
    let computeDisplay = false;

    // No need to display any value if the field is empty.
    if (isDirty(this.props) || displayEmpty) {
      if (renderValue) {
        display = renderValue(value);
      } else {
        computeDisplay = true;
      }
    }

    const items = React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return null;
      }
      let selected;

      if (multiple) {
        if (!Array.isArray(value)) {
          throw new Error('Material-UI: the `value` property must be an array ' + 'when using the `Select` component with `multiple`.');
        }

        selected = value.indexOf(child.props.value) !== -1;
        if (selected && computeDisplay) {
          displayMultiple.push(child.props.children);
        }
      } else {
        selected = value === child.props.value;
        if (selected && computeDisplay) {
          displaySingle = child.props.children;
        }
      }

      return React.cloneElement(child, {
        role: 'option',
        selected,
        onClick: this.handleItemClick(child)
      });
    });

    if (computeDisplay) {
      display = multiple ? displayMultiple.join(', ') : displaySingle;
    }

    const minimumMenuWidth = this.state.anchorEl != null && !autoWidth ? this.state.anchorEl.clientWidth : undefined;

    return React.createElement(
      'div',
      { className: classes.root },
      React.createElement(
        'div',
        {
          className: classNames(classes.select, classes.selectMenu, {
            [classes.disabled]: disabled
          }, classNameProp),
          'data-mui-test': 'SelectDisplay',
          'aria-pressed': this.state.open ? 'true' : 'false',
          tabIndex: disabled ? null : 0,
          role: 'button',
          'aria-owns': this.state.open ? `menu-${name || ''}` : null,
          'aria-haspopup': 'true',
          onKeyDown: this.handleKeyDown,
          onBlur: this.handleBlur,
          onClick: disabled || readOnly ? null : this.handleClick,
          onFocus: onFocus
        },
        display
      ),
      React.createElement('input', _extends({
        value: Array.isArray(value) ? value.join(',') : value,
        name: name,
        readOnly: readOnly
      }, other, {
        ref: this.handleSelectRef,
        type: 'hidden'
      })),
      React.createElement(ArrowDropDownIcon, { className: classes.icon }),
      React.createElement(
        Menu,
        _extends({
          id: `menu-${name || ''}`,
          anchorEl: this.state.anchorEl,
          open: this.state.open,
          onRequestClose: this.handleRequestClose
        }, MenuProps, {
          MenuListProps: _extends({}, MenuProps.MenuListProps, {
            role: 'listbox'
          }),
          PaperProps: _extends({}, MenuProps.PaperProps, {
            style: _extends({
              minWidth: minimumMenuWidth
            }, MenuProps.PaperProps != null ? MenuProps.PaperProps.style : null)
          })
        }),
        items
      )
    );
  }
}

SelectInput.muiName = 'SelectInput';
export default SelectInput;