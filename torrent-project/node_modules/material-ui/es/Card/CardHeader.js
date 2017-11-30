var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent CardContent

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import CardContent from './CardContent';

export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    flex: '0 0 auto',
    marginRight: theme.spacing.unit * 2
  },
  content: {
    flex: '1 1 auto'
  },
  title: {},
  subheader: {}
});

function CardHeader(props) {
  const { avatar, classes, className: classNameProp, subheader, title } = props,
        other = _objectWithoutProperties(props, ['avatar', 'classes', 'className', 'subheader', 'title']);

  const className = classNames(classes.root, classNameProp);

  // Adjustments that depend on the presence of an avatar
  const titleType = avatar ? 'body2' : 'headline';
  const subheaderType = avatar ? 'body2' : 'body1';

  return React.createElement(
    CardContent,
    _extends({ className: className }, other),
    avatar && React.createElement(
      'div',
      { className: classes.avatar },
      avatar
    ),
    React.createElement(
      'div',
      { className: classes.content },
      React.createElement(
        Typography,
        { type: titleType, component: 'span', className: classes.title },
        title
      ),
      React.createElement(
        Typography,
        {
          type: subheaderType,
          component: 'span',
          color: 'secondary',
          className: classes.subheader
        },
        subheader
      )
    )
  );
}

export default withStyles(styles, { name: 'MuiCardHeader' })(CardHeader);