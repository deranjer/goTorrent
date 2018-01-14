
/* eslint-disable import/prefer-default-export */

import { cloneElement, Children, isValidElement } from 'react';


export function cloneChildrenWithClassName(children, className) {
  return Children.map(children, child => {
    return isValidElement(child) && cloneElement(child, {
      className: child.props.hasOwnProperty('className') ? `${child.props.className} ${className}` : className
    });
  });
}

export function isMuiElement(element, muiNames) {
  return isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}

export function isMuiComponent(element, muiNames) {
  return muiNames.indexOf(element.muiName) !== -1;
}