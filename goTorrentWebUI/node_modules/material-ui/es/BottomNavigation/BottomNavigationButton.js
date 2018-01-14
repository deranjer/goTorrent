var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent ButtonBase

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';

export const styles = theme => ({
  root: {
    transition: theme.transitions.create(['color', 'padding-top'], {
      duration: theme.transitions.duration.short
    }),
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    minWidth: 80,
    maxWidth: 168,
    color: theme.palette.text.secondary,
    flex: '1'
  },
  selected: {
    paddingTop: 6,
    color: theme.palette.primary[500]
  },
  selectedIconOnly: {
    paddingTop: theme.spacing.unit * 2
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column'
  },
  label: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(theme.typography.fontSize - 2),
    opacity: 1,
    transition: 'font-size 0.2s, opacity 0.2s',
    transitionDelay: '0.1s'
  },
  selectedLabel: {
    fontSize: theme.typography.pxToRem(theme.typography.fontSize)
  },
  hiddenLabel: {
    opacity: 0,
    transitionDelay: '0s'
  },
  icon: {
    display: 'block',
    margin: 'auto'
  }
});

class BottomNavigationButton extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleChange = event => {
      const { onChange, value, onClick } = this.props;

      if (onChange) {
        onChange(event, value);
      }

      if (onClick) {
        onClick(event);
      }
    }, _temp;
  }

  render() {
    const _props = this.props,
          {
      label,
      icon: iconProp,
      selected,
      classes,
      className: classNameProp,
      showLabel: showLabelProp,
      onChange,
      value
    } = _props,
          other = _objectWithoutProperties(_props, ['label', 'icon', 'selected', 'classes', 'className', 'showLabel', 'onChange', 'value']);

    const className = classNames(classes.root, {
      [classes.selected]: selected,
      [classes.selectedIconOnly]: !showLabelProp && !selected
    }, classNameProp);

    let icon = null;

    if (iconProp) {
      if (React.isValidElement(iconProp) && typeof iconProp !== 'string') {
        icon = React.cloneElement(iconProp, {
          className: classNames(classes.icon, iconProp.props.className)
        });
      } else {
        icon = React.createElement(
          Icon,
          null,
          iconProp
        );
      }
    }

    const labelClassName = classNames(classes.label, {
      [classes.selectedLabel]: selected,
      [classes.hiddenLabel]: !showLabelProp && !selected
    });

    return React.createElement(
      ButtonBase,
      _extends({ className: className, focusRipple: true }, other, { onClick: this.handleChange }),
      React.createElement(
        'span',
        { className: classes.wrapper },
        icon,
        React.createElement(
          'span',
          { className: labelClassName },
          label
        )
      )
    );
  }
}

export default withStyles(styles, { name: 'MuiBottomNavigationButton' })(BottomNavigationButton);