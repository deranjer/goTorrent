var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { render as enzymeRender } from 'enzyme';


// Generate a render to string function.
export default function createRender(options1 = {}) {
  const { render = enzymeRender } = options1,
        other1 = _objectWithoutProperties(options1, ['render']);

  const renderWithContext = function renderWithContext(node, options2 = {}) {
    return render(node, _extends({}, other1, options2));
  };

  return renderWithContext;
}