var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    flex: '1 1 auto',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative'
  },
  padding: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  dense: {
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2
  },
  subheader: {
    paddingTop: 0
  }
});

class List extends React.Component {

  getChildContext() {
    return {
      dense: this.props.dense
    };
  }

  render() {
    const _props = this.props,
          {
      classes,
      className: classNameProp,
      component: ComponentProp,
      disablePadding,
      children,
      dense,
      subheader,
      rootRef
    } = _props,
          other = _objectWithoutProperties(_props, ['classes', 'className', 'component', 'disablePadding', 'children', 'dense', 'subheader', 'rootRef']);
    const className = classNames(classes.root, {
      [classes.dense]: dense && !disablePadding,
      [classes.padding]: !disablePadding,
      [classes.subheader]: subheader
    }, classNameProp);

    return React.createElement(
      ComponentProp,
      _extends({ className: className }, other, { ref: rootRef }),
      subheader,
      children
    );
  }
}

List.defaultProps = {
  component: 'ul',
  dense: false,
  disablePadding: false
};
List.childContextTypes = {
  dense: PropTypes.bool
};

export default withStyles(styles, { name: 'MuiList' })(List);