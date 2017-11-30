var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

function shallowRecursively(wrapper, selector, _ref) {
  let { context } = _ref,
      other = _objectWithoutProperties(_ref, ['context']);

  if (wrapper.isEmptyRender() || typeof wrapper.getElement().type === 'string') {
    return wrapper;
  }

  let newContext = context;

  const instance = wrapper.root().instance();
  // The instance can be null with a stateless functional component and react >= 16.
  if (instance && instance.getChildContext) {
    newContext = _extends({}, context, instance.getChildContext());
  }

  const nextWrapper = wrapper.shallow(_extends({ context: newContext }, other));

  if (selector && wrapper.is(selector)) {
    return nextWrapper;
  }

  return shallowRecursively(nextWrapper, selector, { context: newContext });
}

export default function until(selector, options = {}) {
  return this.single('until', () => shallowRecursively(this, selector, options));
}