"use strict";

var babelPluginFlowReactPropTypes_proptype_TransitionDuration = require("prop-types").oneOfType([require("prop-types").number, require("prop-types").shape({
  enter: require("prop-types").number.isRequired,
  exit: require("prop-types").number.isRequired
})]);

var babelPluginFlowReactPropTypes_proptype_TransitionCallback = require("prop-types").func;

var babelPluginFlowReactPropTypes_proptype_TransitionClasses = {
  appear: require("prop-types").string,
  appearActive: require("prop-types").string,
  enter: require("prop-types").string,
  enterActive: require("prop-types").string,
  exit: require("prop-types").string,
  exitActive: require("prop-types").string
};