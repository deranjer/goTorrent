'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = getClasses;

var _ns = require('react-jss/lib/ns');

var ns = _interopRequireWildcard(_ns);

var _jss = require('jss');

var _createShallow = require('./createShallow');

var _createShallow2 = _interopRequireDefault(_createShallow);

var _withStyles = require('../styles/withStyles');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shallow = (0, _createShallow2.default)();

// Helper function to extract the classes from a styleSheet.
function getClasses(element) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var sheetsRegistry = new _jss.SheetsRegistry();

  _withStyles.sheetsManager.clear();
  shallow(element, (0, _extends4.default)({}, options, {
    context: (0, _extends4.default)((0, _defineProperty3.default)({}, ns.sheetsRegistry, sheetsRegistry), options.context)
  }));

  return sheetsRegistry.registry[0].classes;
}