var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent Paper

import React from 'react';
import Paper from '../Paper';

function Card(props) {
  const { raised } = props,
        other = _objectWithoutProperties(props, ['raised']);

  return React.createElement(Paper, _extends({ elevation: raised ? 8 : 2 }, other));
}

Card.defaultProps = {
  raised: false
};

export default Card;