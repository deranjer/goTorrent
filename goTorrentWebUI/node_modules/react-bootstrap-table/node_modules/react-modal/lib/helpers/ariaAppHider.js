"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertNodeList = assertNodeList;
exports.setElement = setElement;
exports.tryForceFallback = tryForceFallback;
exports.validateElement = validateElement;
exports.hide = hide;
exports.show = show;
exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
exports.resetForTesting = resetForTesting;
var globalElement = null;

function assertNodeList(nodeList, selector) {
  if (!nodeList || !nodeList.length) {
    throw new Error("react-modal: No elements were found for selector " + selector + ".");
  }
}

function setElement(element) {
  var useElement = element;
  if (typeof useElement === "string") {
    var el = document.querySelectorAll(useElement);
    assertNodeList(el, useElement);
    useElement = "length" in el ? el[0] : el;
  }
  globalElement = useElement || globalElement;
  return globalElement;
}

function tryForceFallback() {
  if (document && document.body) {
    // force fallback to document.body
    setElement(document.body);
    return true;
  }
  return false;
}

function validateElement(appElement) {
  if (!appElement && !globalElement && !tryForceFallback()) {
    throw new Error(["react-modal: Cannot fallback to `document.body`, because it is not", "ready or available. If you are doing server-side rendering, use this", "function to defined an element. `Modal.setAppElement(el)` to make", "this accessible"].join(" "));
  }
}

function hide(appElement) {
  validateElement(appElement);
  (appElement || globalElement).setAttribute("aria-hidden", "true");
}

function show(appElement) {
  validateElement(appElement);
  (appElement || globalElement).removeAttribute("aria-hidden");
}

function documentNotReadyOrSSRTesting() {
  globalElement = null;
}

function resetForTesting() {
  globalElement = document.body;
}