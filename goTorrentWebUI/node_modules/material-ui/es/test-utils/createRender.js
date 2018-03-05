import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
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