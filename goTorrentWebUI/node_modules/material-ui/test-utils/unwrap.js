"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unwrap;
//  weak

function unwrap(component) {
  return component.Naked ? unwrap(component.Naked) : component;
}