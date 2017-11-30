'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specialProperty = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = exactProp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module is based on https://github.com/airbnb/prop-types-exact repository.
// However, in order to reduce the number of dependencies and to remove some extra safe checks
// the module was forked.

var specialProperty = exports.specialProperty = 'exact-prop: \u200B';

function exactProp(propTypes, componentNameInError) {
  return (0, _extends4.default)({}, propTypes, (0, _defineProperty3.default)({}, specialProperty, function (props) {
    var unknownProps = (0, _keys2.default)(props).filter(function (prop) {
      return !propTypes.hasOwnProperty(prop);
    });
    if (unknownProps.length > 0) {
      return new TypeError(componentNameInError + ': unknown props found: ' + unknownProps.join(', ') + '. Please remove the unknown properties.');
    }
    return null;
  }));
}