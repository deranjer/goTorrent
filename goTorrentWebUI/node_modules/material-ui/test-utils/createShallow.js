'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = createShallow;

var _enzyme = require('enzyme');

var _until = require('./until');

var _until2 = _interopRequireDefault(_until);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generate an enhanced shallow function.
//  weak

function createShallow() {
  var options1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options1$shallow = options1.shallow,
      shallow = _options1$shallow === undefined ? _enzyme.shallow : _options1$shallow,
      _options1$dive = options1.dive,
      dive = _options1$dive === undefined ? false : _options1$dive,
      _options1$untilSelect = options1.untilSelector,
      untilSelector = _options1$untilSelect === undefined ? false : _options1$untilSelect,
      other1 = (0, _objectWithoutProperties3.default)(options1, ['shallow', 'dive', 'untilSelector']);


  var shallowWithContext = function shallowWithContext(node) {
    var options2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var options = (0, _extends3.default)({}, other1, options2, {
      context: (0, _extends3.default)({}, other1.context, options2.context)
    });

    var wrapper = shallow(node, options);

    if (dive) {
      return wrapper.dive();
    }

    if (untilSelector) {
      return _until2.default.call(wrapper, untilSelector, options);
    }

    return wrapper;
  };

  return shallowWithContext;
}