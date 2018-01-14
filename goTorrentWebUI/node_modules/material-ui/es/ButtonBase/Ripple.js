var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import React from 'react';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

/**
 * @ignore - internal component.
 */
class Ripple extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      rippleVisible: false,
      rippleLeaving: false
    }, this.getRippleStyles = props => {
      const { rippleSize, rippleX, rippleY } = props;

      return {
        width: rippleSize,
        height: rippleSize,
        top: -(rippleSize / 2) + rippleY,
        left: -(rippleSize / 2) + rippleX
      };
    }, this.handleEnter = () => {
      this.setState({
        rippleVisible: true
      });
    }, this.handleExit = () => {
      this.setState({
        rippleLeaving: true
      });
    }, _temp;
  }

  render() {
    const _props = this.props,
          {
      classes,
      className: classNameProp,
      pulsate,
      rippleX,
      rippleY,
      rippleSize
    } = _props,
          other = _objectWithoutProperties(_props, ['classes', 'className', 'pulsate', 'rippleX', 'rippleY', 'rippleSize']);
    const { rippleVisible, rippleLeaving } = this.state;

    const className = classNames(classes.wrapper, {
      [classes.wrapperLeaving]: rippleLeaving,
      [classes.wrapperPulsating]: pulsate
    }, classNameProp);

    const rippleClassName = classNames(classes.ripple, {
      [classes.rippleVisible]: rippleVisible,
      [classes.rippleFast]: pulsate
    });

    return React.createElement(
      Transition,
      _extends({ onEnter: this.handleEnter, onExit: this.handleExit }, other),
      React.createElement(
        'span',
        { className: className },
        React.createElement('span', { className: rippleClassName, style: this.getRippleStyles(this.props) })
      )
    );
  }
}

Ripple.defaultProps = {
  pulsate: false
};
export default Ripple;