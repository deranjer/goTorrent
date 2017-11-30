var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  row: {
    flexDirection: 'row'
  }
};

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */
function FormGroup(props) {
  const { classes, className, children, row } = props,
        other = _objectWithoutProperties(props, ['classes', 'className', 'children', 'row']);
  const rootClassName = classNames(classes.root, {
    [classes.row]: row
  }, className);

  return React.createElement(
    'div',
    _extends({ className: rootClassName }, other),
    children
  );
}

FormGroup.defaultProps = {
  row: false
};

export default withStyles(styles, { name: 'MuiFormGroup' })(FormGroup);