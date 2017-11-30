'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = findClassNames;
var dotsRegExp = /[.]/g;
var classesRegExp = /[.][^ ,]+/g;

/**
 * Get class names from a selector.
 */
function findClassNames(selector) {
  var classes = selector.match(classesRegExp);

  if (!classes) return '';

  return classes.join(' ').replace(dotsRegExp, '');
}