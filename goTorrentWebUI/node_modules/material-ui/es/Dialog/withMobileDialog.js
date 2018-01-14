var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';

import wrapDisplayName from 'recompose/wrapDisplayName';
import withWidth, { isWidthDown } from '../utils/withWidth';


/**
 * Dialog will responsively be full screen *at or below* the given breakpoint
 * (defaults to 'sm' for mobile devices).
 * Notice that this Higher-order Component is incompatible with server side rendering.
 */
const withMobileDialog = (options = { breakpoint: 'sm' }) => Component => {
  const { breakpoint } = options;

  function WithMobileDialog(props) {
    return React.createElement(Component, _extends({ fullScreen: isWidthDown(breakpoint, props.width) }, props));
  }

  if (process.env.NODE_ENV !== 'production') {
    WithMobileDialog.displayName = wrapDisplayName(Component, 'withMobileDialog');
  }

  return withWidth()(WithMobileDialog);
};

export default withMobileDialog;