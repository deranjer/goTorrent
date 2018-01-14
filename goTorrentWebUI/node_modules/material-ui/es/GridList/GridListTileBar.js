var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 48,
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily
  },
  rootBottom: {
    bottom: 0
  },
  rootTop: {
    top: 0
  },
  rootWithSubtitle: {
    height: 68
  },
  titleWrap: {
    flexGrow: 1,
    marginLeft: theme.mixins.gutters({}).paddingLeft,
    marginRight: theme.mixins.gutters({}).paddingRight,
    color: 'white',
    overflow: 'hidden'
  },
  titleWrapActionLeft: {
    marginLeft: 0
  },
  titleWrapActionRight: {
    marginRight: 0
  },
  title: {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  subtitle: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  actionIconPositionLeft: {
    order: -1
  },
  childImg: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%'
  }
});

function GridListTileBar(props) {
  const {
    actionIcon,
    actionPosition,
    classes,
    className: classNameProp,
    subtitle,
    title,
    titlePosition
  } = props,
        other = _objectWithoutProperties(props, ['actionIcon', 'actionPosition', 'classes', 'className', 'subtitle', 'title', 'titlePosition']);

  const actionPos = actionIcon && actionPosition;
  const className = classNames(classes.root, {
    [classes.rootBottom]: titlePosition === 'bottom',
    [classes.rootTop]: titlePosition === 'top',
    [classes.rootWithSubtitle]: subtitle
  }, classNameProp);

  // Remove the margin between the title / subtitle wrapper, and the Action Icon
  const titleWrapClassName = classNames(classes.titleWrap, {
    [classes.titleWrapActionLeft]: actionPos === 'left',
    [classes.titleWrapActionRight]: actionPos === 'right'
  });

  return React.createElement(
    'div',
    _extends({ className: className }, other),
    React.createElement(
      'div',
      { className: titleWrapClassName },
      React.createElement(
        'div',
        { className: classes.title },
        title
      ),
      subtitle ? React.createElement(
        'div',
        { className: classes.subtitle },
        subtitle
      ) : null
    ),
    actionIcon ? React.createElement(
      'div',
      { className: classNames({ [classes.actionIconPositionLeft]: actionPos === 'left' }) },
      actionIcon
    ) : null
  );
}

GridListTileBar.defaultProps = {
  actionPosition: 'right',
  titlePosition: 'bottom'
};

export default withStyles(styles, { name: 'MuiGridListTileBar' })(GridListTileBar);