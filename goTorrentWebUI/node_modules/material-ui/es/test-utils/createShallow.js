var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import { shallow as enzymeShallow } from 'enzyme';

import until from './until';

// Generate an enhanced shallow function.
export default function createShallow(options1 = {}) {
  const { shallow = enzymeShallow, dive = false, untilSelector = false } = options1,
        other1 = _objectWithoutProperties(options1, ['shallow', 'dive', 'untilSelector']);

  const shallowWithContext = function shallowWithContext(node, options2 = {}) {
    const options = _extends({}, other1, options2, {
      context: _extends({}, other1.context, options2.context)
    });

    const wrapper = shallow(node, options);

    if (dive) {
      return wrapper.dive();
    }

    if (untilSelector) {
      return until.call(wrapper, untilSelector, options);
    }

    return wrapper;
  };

  return shallowWithContext;
}