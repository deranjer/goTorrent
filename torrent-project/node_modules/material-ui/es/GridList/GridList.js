var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//  weak

import React from 'react';

import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.
  }
};

function GridList(props) {
  const {
    cols,
    spacing,
    cellHeight,
    children,
    classes,
    className: classNameProp,
    component: ComponentProp,
    style
  } = props,
        other = _objectWithoutProperties(props, ['cols', 'spacing', 'cellHeight', 'children', 'classes', 'className', 'component', 'style']);

  return React.createElement(
    ComponentProp,
    _extends({
      className: classNames(classes.root, classNameProp),
      style: _extends({ margin: -spacing / 2 }, style)
    }, other),
    React.Children.map(children, currentChild => {
      const childCols = currentChild.props.cols || 1;
      const childRows = currentChild.props.rows || 1;

      return React.cloneElement(currentChild, {
        style: _extends({
          width: `${100 / cols * childCols}%`,
          height: cellHeight === 'auto' ? 'auto' : cellHeight * childRows + spacing,
          padding: spacing / 2
        }, currentChild.props.style)
      });
    })
  );
}

GridList.defaultProps = {
  cols: 2,
  spacing: 4,
  cellHeight: 180,
  component: 'ul'
};

export default withStyles(styles, { name: 'MuiGridList' })(GridList);