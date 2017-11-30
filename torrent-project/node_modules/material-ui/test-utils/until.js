'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = until;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  weak

function shallowRecursively(wrapper, selector, _ref) {
  var context = _ref.context,
      other = (0, _objectWithoutProperties3.default)(_ref, ['context']);

  if (wrapper.isEmptyRender() || typeof wrapper.getElement().type === 'string') {
    return wrapper;
  }

  var newContext = context;

  var instance = wrapper.root().instance();
  // The instance can be null with a stateless functional component and react >= 16.
  if (instance && instance.getChildContext) {
    newContext = (0, _extends3.default)({}, context, instance.getChildContext());
  }

  var nextWrapper = wrapper.shallow((0, _extends3.default)({ context: newContext }, other));

  if (selector && wrapper.is(selector)) {
    return nextWrapper;
  }

  return shallowRecursively(nextWrapper, selector, { context: newContext });
}

function until(selector) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return this.single('until', function () {
    return shallowRecursively(_this, selector, options);
  });
}