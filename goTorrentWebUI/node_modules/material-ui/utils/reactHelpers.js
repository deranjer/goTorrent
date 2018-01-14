'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneChildrenWithClassName = cloneChildrenWithClassName;
exports.isMuiElement = isMuiElement;
exports.isMuiComponent = isMuiComponent;

var _react = require('react');

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;
/* eslint-disable import/prefer-default-export */

function cloneChildrenWithClassName(children, className) {
  return _react.Children.map(children, function (child) {
    return (0, _react.isValidElement)(child) && (0, _react.cloneElement)(child, {
      className: child.props.hasOwnProperty('className') ? child.props.className + ' ' + className : className
    });
  });
}

function isMuiElement(element, muiNames) {
  return (0, _react.isValidElement)(element) && muiNames.indexOf(element.type.muiName) !== -1;
}

function isMuiComponent(element, muiNames) {
  return muiNames.indexOf(element.muiName) !== -1;
}