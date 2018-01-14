var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent ButtonBase

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalizeFirstLetter } from '../utils/helpers';
import Icon from '../Icon';

export const styles = theme => ({
  root: _extends({}, theme.typography.button, {
    maxWidth: 264,
    position: 'relative',
    minWidth: 72,
    padding: 0,
    height: 48,
    flex: 'none',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      minWidth: 160
    }
  }),
  rootLabelIcon: {
    height: 72
  },
  rootAccent: {
    color: theme.palette.text.secondary
  },
  rootAccentSelected: {
    color: theme.palette.secondary.A200
  },
  rootAccentDisabled: {
    color: theme.palette.text.disabled
  },
  rootPrimary: {
    color: theme.palette.text.secondary
  },
  rootPrimarySelected: {
    color: theme.palette.primary[500]
  },
  rootPrimaryDisabled: {
    color: theme.palette.text.disabled
  },
  rootInherit: {
    color: 'inherit',
    opacity: 0.7
  },
  rootInheritSelected: {
    opacity: 1
  },
  rootInheritDisabled: {
    opacity: 0.4
  },
  fullWidth: {
    flexGrow: 1
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column'
  },
  labelContainer: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }
  },
  label: {
    fontSize: theme.typography.pxToRem(theme.typography.fontSize),
    whiteSpace: 'normal',
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(theme.typography.fontSize - 1)
    }
  },
  labelWrapped: {
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(theme.typography.fontSize - 2)
    }
  }
});

class Tab extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      wrappedText: false
    }, this.handleChange = event => {
      const { onChange, value, onClick } = this.props;

      if (onChange) {
        onChange(event, value);
      }

      if (onClick) {
        onClick(event);
      }
    }, this.label = undefined, this.checkTextWrap = () => {
      if (this.label) {
        const wrappedText = this.label.getClientRects().length > 1;
        if (this.state.wrappedText !== wrappedText) {
          this.setState({ wrappedText });
        }
      }
    }, _temp;
  }

  componentDidMount() {
    this.checkTextWrap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.wrappedText === prevState.wrappedText) {
      /**
       * At certain text and tab lengths, a larger font size may wrap to two lines while the smaller
       * font size still only requires one line.  This check will prevent an infinite render loop
       * fron occurring in that scenario.
       */
      this.checkTextWrap();
    }
  }

  render() {
    const _props = this.props,
          {
      classes,
      className: classNameProp,
      disabled,
      fullWidth,
      icon: iconProp,
      indicator,
      label: labelProp,
      onChange,
      selected,
      style: styleProp,
      textColor,
      value
    } = _props,
          other = _objectWithoutProperties(_props, ['classes', 'className', 'disabled', 'fullWidth', 'icon', 'indicator', 'label', 'onChange', 'selected', 'style', 'textColor', 'value']);

    let icon;

    if (iconProp !== undefined) {
      icon = React.isValidElement(iconProp) ? iconProp : React.createElement(
        Icon,
        null,
        iconProp
      );
    }

    let label;

    if (labelProp !== undefined) {
      label = React.createElement(
        'div',
        { className: classes.labelContainer },
        React.createElement(
          'span',
          {
            className: classNames(classes.label, {
              [classes.labelWrapped]: this.state.wrappedText
            }),
            ref: node => {
              this.label = node;
            }
          },
          labelProp
        )
      );
    }

    const className = classNames(classes.root, {
      [classes[`root${capitalizeFirstLetter(textColor)}`]]: true,
      [classes[`root${capitalizeFirstLetter(textColor)}Disabled`]]: disabled,
      [classes[`root${capitalizeFirstLetter(textColor)}Selected`]]: selected,
      [classes.rootLabelIcon]: icon && label,
      [classes.fullWidth]: fullWidth
    }, classNameProp);

    let style = {};

    if (textColor !== 'accent' && textColor !== 'inherit') {
      style.color = textColor;
    }

    style = Object.keys(style).length > 0 ? _extends({}, style, styleProp) : styleProp;

    return React.createElement(
      ButtonBase,
      _extends({
        focusRipple: true,
        className: className,
        style: style,
        role: 'tab',
        'aria-selected': selected,
        disabled: disabled
      }, other, {
        onClick: this.handleChange
      }),
      React.createElement(
        'span',
        { className: classes.wrapper },
        icon,
        label
      ),
      indicator
    );
  }
}

Tab.defaultProps = {
  disabled: false
};
export default withStyles(styles, { name: 'MuiTab' })(Tab);