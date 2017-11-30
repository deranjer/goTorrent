'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _jss = require('./jss');

var _jss2 = _interopRequireDefault(_jss);

var _ns = require('./ns');

var ns = _interopRequireWildcard(_ns);

var _contextTypes = require('./contextTypes');

var _contextTypes2 = _interopRequireDefault(_contextTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JssProvider = function (_Component) {
  _inherits(JssProvider, _Component);

  function JssProvider() {
    _classCallCheck(this, JssProvider);

    return _possibleConstructorReturn(this, (JssProvider.__proto__ || Object.getPrototypeOf(JssProvider)).apply(this, arguments));
  }

  _createClass(JssProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _ref;

      var generateClassName = this.props.generateClassName;


      if (!generateClassName) {
        var createGenerateClassName = _jss.createGenerateClassNameDefault;
        var localJss = this.props.jss;

        if (localJss && localJss.options.createGenerateClassName) {
          createGenerateClassName = localJss.options.createGenerateClassName;
        }
        generateClassName = createGenerateClassName();
      }

      return _ref = {}, _defineProperty(_ref, ns.sheetOptions, {
        generateClassName: generateClassName
      }), _defineProperty(_ref, ns.providerId, Math.random()), _defineProperty(_ref, ns.jss, this.props.jss), _defineProperty(_ref, ns.sheetsRegistry, this.props.registry), _ref;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return JssProvider;
}(_react.Component);

JssProvider.propTypes = {
  jss: (0, _propTypes.instanceOf)(_jss2['default'].constructor),
  registry: (0, _propTypes.instanceOf)(_jss.SheetsRegistry),
  generateClassName: _propTypes.func,
  children: _propTypes.node.isRequired
};
JssProvider.childContextTypes = _contextTypes2['default'];
exports['default'] = JssProvider;