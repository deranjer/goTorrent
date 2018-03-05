import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = theme => ({
  root: {
    margin: 0,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px \
      20px ${theme.spacing.unit * 3}px`,
    flex: '0 0 auto'
  }
});

function DialogTitle(props) {
  const { children, classes, className, disableTypography } = props,
        other = _objectWithoutProperties(props, ['children', 'classes', 'className', 'disableTypography']);

  return React.createElement(
    'div',
    _extends({ className: classNames(classes.root, className) }, other),
    disableTypography ? children : React.createElement(
      Typography,
      { variant: 'title' },
      children
    )
  );
}

DialogTitle.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the children won't be wrapped by a typography component.
   * For instance, this can be useful to render an h4 instead of the default h2.
   */
  disableTypography: PropTypes.bool
} : {};

DialogTitle.defaultProps = {
  disableTypography: false
};

export default withStyles(styles, { name: 'MuiDialogTitle' })(DialogTitle);