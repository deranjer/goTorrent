var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';

export const styles = theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
    textAlign: 'left'
  },
  numeric: {
    textAlign: 'right',
    flexDirection: 'row-reverse' // can be dynamically inherited at runtime by contents
  },
  head: {
    fontWeight: theme.typography.fontWeightMedium,
    position: 'relative' // Workaround for Tooltip positioning issue.
  },
  paddingDefault: {
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 7}px ${theme.spacing.unit / 2}px ${theme.spacing.unit * 3}px`,
    '&:last-child': {
      paddingRight: theme.spacing.unit * 3
    }
  },
  paddingDense: {
    paddingRight: theme.spacing.unit * 3
  },
  paddingCheckbox: {
    padding: '0 12px'
  },
  footer: {
    borderBottom: 0
  }
});

function TableCell(props, context) {
  const {
    classes,
    className: classNameProp,
    children,
    numeric,
    padding,
    component
  } = props,
        other = _objectWithoutProperties(props, ['classes', 'className', 'children', 'numeric', 'padding', 'component']);

  const { table } = context;
  let Component;
  if (component) {
    Component = component;
  } else {
    Component = table && table.head ? 'th' : 'td';
  }

  const className = classNames(classes.root, {
    [classes.numeric]: numeric,
    [classes[`padding${capitalizeFirstLetter(padding)}`]]: padding !== 'none' && padding !== 'default',
    [classes.paddingDefault]: padding !== 'none',
    [classes.head]: table && table.head,
    [classes.footer]: table && table.footer
  }, classNameProp);

  return React.createElement(
    Component,
    _extends({ className: className }, other),
    children
  );
}

TableCell.defaultProps = {
  numeric: false,
  padding: 'default'
};

TableCell.contextTypes = {
  table: PropTypes.object.isRequired
};

export default withStyles(styles, { name: 'MuiTableCell' })(TableCell);