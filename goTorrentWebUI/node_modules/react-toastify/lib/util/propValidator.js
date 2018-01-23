'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.falseOrElement = exports.falseOrDelay = undefined;
exports.isValidDelay = isValidDelay;
exports.objectValues = objectValues;

var _react = require('react');

function isValidDelay(val) {
  return typeof val === 'number' && !isNaN(val) && val > 0;
}

function objectValues(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
}

function withRequired(fn) {
  fn.isRequired = function (props, propName, componentName) {
    var prop = props[propName];

    if (typeof prop === 'undefined') {
      return new Error('The prop ' + propName + ' is marked as required in \n      ' + componentName + ', but its value is undefined.');
    }

    fn(props, propName, componentName);
  };
  return fn;
}

var falseOrDelay = exports.falseOrDelay = withRequired(function (props, propName, componentName) {
  var prop = props[propName];

  if (prop !== false && !isValidDelay(prop)) {
    return new Error(componentName + ' expect ' + propName + ' \n      to be a valid Number > 0 or equal to false. ' + prop + ' given.');
  }

  return null;
});

var falseOrElement = exports.falseOrElement = withRequired(function (props, propName, componentName) {
  var prop = props[propName];

  if (prop !== false && !(0, _react.isValidElement)(prop)) {
    return new Error(componentName + ' expect ' + propName + ' \n      to be a valid react element or equal to false. ' + prop + ' given.');
  }

  return null;
});