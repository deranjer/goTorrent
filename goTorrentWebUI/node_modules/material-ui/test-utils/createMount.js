'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = createMount;

var _reactDom = require('react-dom');

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = require('react').babelPluginFlowReactPropTypes_proptype_Element || require('prop-types').any; //  weak

// Generate an enhanced mount function.
function createMount() {
  var options1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options1$mount = options1.mount,
      mount = _options1$mount === undefined ? _enzyme.mount : _options1$mount,
      other1 = (0, _objectWithoutProperties3.default)(options1, ['mount']);


  var attachTo = window.document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);

  var mountWithContext = function mountWithContext(node) {
    var options2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return mount(node, (0, _extends3.default)({
      attachTo: attachTo
    }, other1, options2));
  };

  mountWithContext.attachTo = attachTo;
  mountWithContext.cleanUp = function () {
    (0, _reactDom.unmountComponentAtNode)(attachTo);
    attachTo.parentNode.removeChild(attachTo);
  };

  return mountWithContext;
}