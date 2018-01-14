var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import * as ns from 'react-jss/lib/ns';
import { SheetsRegistry } from 'jss';
import createShallow from './createShallow';
import { sheetsManager } from '../styles/withStyles';

const shallow = createShallow();

// Helper function to extract the classes from a styleSheet.
export default function getClasses(element, options = {}) {
  const sheetsRegistry = new SheetsRegistry();

  sheetsManager.clear();
  shallow(element, _extends({}, options, {
    context: _extends({
      [ns.sheetsRegistry]: sheetsRegistry
    }, options.context)
  }));

  return sheetsRegistry.registry[0].classes;
}