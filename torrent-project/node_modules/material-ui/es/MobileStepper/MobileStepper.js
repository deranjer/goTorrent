var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak
// @inheritedComponent Paper

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import { capitalizeFirstLetter } from '../utils/helpers';
import { LinearProgress } from '../Progress';

export const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.default,
    padding: theme.spacing.unit
  },
  positionBottom: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper
  },
  positionTop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper
  },
  positionStatic: {},
  dots: {
    display: 'flex',
    flexDirection: 'row'
  },
  dot: {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '50%',
    width: theme.spacing.unit,
    height: theme.spacing.unit,
    margin: '0 2px'
  },
  dotActive: {
    backgroundColor: theme.palette.primary[500]
  },
  progress: {
    width: '50%'
  }
});

function MobileStepper(props) {
  const {
    activeStep,
    backButton,
    classes,
    className: classNameProp,
    position,
    type,
    nextButton,
    steps
  } = props,
        other = _objectWithoutProperties(props, ['activeStep', 'backButton', 'classes', 'className', 'position', 'type', 'nextButton', 'steps']);

  const className = classNames(classes.root, classes[`position${capitalizeFirstLetter(position)}`], classNameProp);

  return React.createElement(
    Paper,
    _extends({ square: true, elevation: 0, className: className }, other),
    backButton,
    type === 'dots' && React.createElement(
      'div',
      { className: classes.dots },
      [...new Array(steps)].map((_, step) => {
        const dotClassName = classNames({
          [classes.dotActive]: step === activeStep
        }, classes.dot);
        // eslint-disable-next-line react/no-array-index-key
        return React.createElement('div', { key: step, className: dotClassName });
      })
    ),
    type === 'progress' && React.createElement(
      'div',
      { className: classes.progress },
      React.createElement(LinearProgress, { mode: 'determinate', value: Math.ceil(activeStep / (steps - 1) * 100) })
    ),
    nextButton
  );
}

MobileStepper.defaultProps = {
  activeStep: 0,
  position: 'bottom',
  type: 'dots'
};

export default withStyles(styles, { name: 'MuiMobileStepper' })(MobileStepper);