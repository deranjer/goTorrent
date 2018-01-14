//  weak

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    position: 'absolute',
    right: 4,
    top: '50%',
    marginTop: -theme.spacing.unit * 3
  }
});

function ListItemSecondaryAction(props) {
  const { children, classes, className } = props;

  return React.createElement(
    'div',
    { className: classNames(classes.root, className) },
    children
  );
}

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

export default withStyles(styles, { name: 'MuiListItemSecondaryAction' })(ListItemSecondaryAction);