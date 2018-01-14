'use strict';

// IMPORTANT: this must be identical to Hidden.js Props.
// This is here because docgen can't yet import type definitions across files.
var babelPluginFlowReactPropTypes_proptype_Breakpoint = require('../styles/createBreakpoints').babelPluginFlowReactPropTypes_proptype_Breakpoint || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_HiddenProps = {
  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * Hide the given breakpoint(s).
   */
  only: require('prop-types').oneOfType([typeof babelPluginFlowReactPropTypes_proptype_Breakpoint === 'function' ? babelPluginFlowReactPropTypes_proptype_Breakpoint : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Breakpoint), require('prop-types').arrayOf(typeof babelPluginFlowReactPropTypes_proptype_Breakpoint === 'function' ? babelPluginFlowReactPropTypes_proptype_Breakpoint : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Breakpoint))]),

  /**
   * If true, screens this size and up will be hidden.
   */
  xsUp: require('prop-types').bool,

  /**
   * If true, screens this size and up will be hidden.
   */
  smUp: require('prop-types').bool,

  /**
   * If true, screens this size and up will be hidden.
   */
  mdUp: require('prop-types').bool,

  /**
   * If true, screens this size and up will be hidden.
   */
  lgUp: require('prop-types').bool,

  /**
   * If true, screens this size and up will be hidden.
   */
  xlUp: require('prop-types').bool,

  /**
   * If true, screens this size and down will be hidden.
   */
  xsDown: require('prop-types').bool,

  /**
   * If true, screens this size and down will be hidden.
   */
  smDown: require('prop-types').bool,

  /**
   * If true, screens this size and down will be hidden.
   */
  mdDown: require('prop-types').bool,

  /**
   * If true, screens this size and down will be hidden.
   */
  lgDown: require('prop-types').bool,

  /**
   * If true, screens this size and down will be hidden.
   */
  xlDown: require('prop-types').bool
};