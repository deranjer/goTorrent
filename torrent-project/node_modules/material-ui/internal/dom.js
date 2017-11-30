"use strict";

var babelPluginFlowReactPropTypes_proptype_SyntheticUIEventHandler = require("prop-types").func;

var babelPluginFlowReactPropTypes_proptype_DOMNode = require("prop-types").oneOfType([require("prop-types").any, require("prop-types").any]);

/**
 * return type of ReactDOM.findDOMNode()
 *
 * NOTE: `Element` is NOT the same as `type { Element } from 'react'` a.k.a React$Element
 *
 * To use it as a typical node, check with `if (node instanceof HTMLElement) { ... }`
 */
// Actual flow type:
// export type DOMNode = Element | Text | null;

// Workaround type (results in `any`) due to https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/115