var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    color: 'inherit',
    display: 'table-row',
    height: 48,
    '&:focus': {
      outline: 'none'
    },
    verticalAlign: 'middle'
  },
  head: {
    height: 56
  },
  footer: {
    height: 56
  },
  hover: {
    '&:hover': {
      background: theme.palette.background.contentFrame
    }
  },
  selected: {
    background: theme.palette.background.appBar
  }
});

/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */
function TableRow(props, context) {
  const {
    classes,
    className: classNameProp,
    children,
    component: Component,
    hover,
    selected
  } = props,
        other = _objectWithoutProperties(props, ['classes', 'className', 'children', 'component', 'hover', 'selected']);
  const { table } = context;

  const className = classNames(classes.root, {
    [classes.head]: table && table.head,
    [classes.footer]: table && table.footer,
    [classes.hover]: table && hover,
    [classes.selected]: table && selected
  }, classNameProp);

  return React.createElement(
    Component,
    _extends({ className: className }, other),
    children
  );
}

TableRow.defaultProps = {
  hover: false,
  selected: false,
  component: 'tr'
};

TableRow.contextTypes = {
  table: PropTypes.object
};

export default withStyles(styles, { name: 'MuiTableRow' })(TableRow);