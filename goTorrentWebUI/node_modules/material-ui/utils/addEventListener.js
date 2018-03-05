"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (node, event, handler, capture) {
  node.addEventListener(event, handler, capture);
  return {
    remove: function remove() {
      node.removeEventListener(event, handler, capture);
    }
  };
};