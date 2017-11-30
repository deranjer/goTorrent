function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import HiddenJs from './HiddenJs';
import HiddenCss from './HiddenCss';


/**
 * Responsively hides children based on the selected implementation.
 */
function Hidden(props) {
  const { implementation } = props,
        other = _objectWithoutProperties(props, ['implementation']);

  if (implementation === 'js') {
    return React.createElement(HiddenJs, other);
  }

  return React.createElement(HiddenCss, other);
}

Hidden.defaultProps = {
  implementation: 'js',
  xsUp: false,
  smUp: false,
  mdUp: false,
  lgUp: false,
  xlUp: false,
  xsDown: false,
  smDown: false,
  mdDown: false,
  lgDown: false,
  xlDown: false
};

export default Hidden;