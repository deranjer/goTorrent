'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = jssExtend;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var isObject = function isObject(obj) {
  return obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !Array.isArray(obj);
};

/**
 * Recursively extend styles.
 */
function extend(style, rule, sheet) {
  var newStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (typeof style.extend === 'string') {
    if (sheet) {
      var refRule = sheet.getRule(style.extend);
      if (refRule) {
        if (refRule === rule) (0, _warning2['default'])(false, '[JSS] A rule tries to extend itself \r\n%s', rule);else if (refRule.options.parent) {
          var originalStyle = refRule.options.parent.rules.raw[style.extend];
          extend(originalStyle, rule, sheet, newStyle);
        }
      }
    }
  } else if (Array.isArray(style.extend)) {
    for (var index = 0; index < style.extend.length; index++) {
      extend(style.extend[index], rule, sheet, newStyle);
    }
  } else {
    for (var prop in style.extend) {
      if (prop === 'extend') {
        extend(style.extend.extend, rule, sheet, newStyle);
      } else if (isObject(style.extend[prop])) {
        if (!newStyle[prop]) newStyle[prop] = {};
        extend(style.extend[prop], rule, sheet, newStyle[prop]);
      } else {
        newStyle[prop] = style.extend[prop];
      }
    }
  }
  // Copy base style.
  for (var _prop in style) {
    if (_prop === 'extend') continue;
    if (isObject(newStyle[_prop]) && isObject(style[_prop])) {
      extend(style[_prop], rule, sheet, newStyle[_prop]);
    } else if (isObject(style[_prop])) {
      newStyle[_prop] = extend(style[_prop], rule, sheet);
    } else {
      newStyle[_prop] = style[_prop];
    }
  }

  return newStyle;
}

/**
 * Handle `extend` property.
 *
 * @param {Rule} rule
 * @api public
 */
function jssExtend() {
  function onProcessStyle(style, rule, sheet) {
    return style.extend ? extend(style, rule, sheet) : style;
  }

  return { onProcessStyle: onProcessStyle };
}