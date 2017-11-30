'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGenerateClassName;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_StyleSheet = require('jss/lib/StyleSheet').babelPluginFlowReactPropTypes_proptype_StyleSheet || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_generateClassName = require('jss/lib/types').babelPluginFlowReactPropTypes_proptype_generateClassName || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Rule = require('jss/lib/types').babelPluginFlowReactPropTypes_proptype_Rule || require('prop-types').any;

var generatorCounter = 0;

// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// It's an improved version of
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js
function createGenerateClassName() {
  var ruleCounter = 0;

  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    generatorCounter += 1;

    if (generatorCounter > 2) {
      // eslint-disable-next-line no-console
      console.error(['Material-UI: we have detected more than needed creation of the class name generator.', 'You should only use one class name generator on the client side.', 'If you do otherwise, you take the risk to have conflicting class names in production.'].join('\n'));
    }
  }

  return function (rule, sheet) {
    ruleCounter += 1;
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(ruleCounter < 1e10, ['Material-UI: you might have a memory leak.', 'The ruleCounter is not supposed to grow that much.'].join('')) : void 0;

    if (process.env.NODE_ENV === 'production') {
      return 'c' + ruleCounter;
    }

    if (sheet && sheet.options.meta) {
      var meta = sheet.options.meta;
      // Sanitize the string as will be used in development to prefix the generated
      // class name.
      meta = meta.replace(new RegExp(/[!"#$%&'()*+,./:; <=>?@[\\\]^`{|}~]/g), '-');

      return meta + '-' + rule.key + '-' + ruleCounter;
    }

    return rule.key + '-' + ruleCounter;
  };
}