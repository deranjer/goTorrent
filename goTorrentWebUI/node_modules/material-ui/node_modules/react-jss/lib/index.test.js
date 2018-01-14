'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable global-require, react/prop-types */

var _templateObject = _taggedTemplateLiteral(['\n        .button-0 {\n          color: red;\n        }\n        .button-1 {\n          border: green;\n        }\n      '], ['\n        .button-0 {\n          color: red;\n        }\n        .button-1 {\n          border: green;\n        }\n      ']),
    _templateObject2 = _taggedTemplateLiteral(['\n        .button-0 {\n          color: red;\n        }\n        .button-1 {\n          border: blue;\n        }\n      '], ['\n        .button-0 {\n          color: red;\n        }\n        .button-1 {\n          border: blue;\n        }\n      ']),
    _templateObject3 = _taggedTemplateLiteral(['\n        .a-0 {\n          color: red;\n        }\n        .b-1 {\n          color: green;\n        }\n      '], ['\n        .a-0 {\n          color: red;\n        }\n        .b-1 {\n          color: green;\n        }\n      ']),
    _templateObject4 = _taggedTemplateLiteral(['\n        .a-0 {\n          color: red;\n        }\n        .a-1 {\n          color: red;\n        }\n      '], ['\n        .a-0 {\n          color: red;\n        }\n        .a-1 {\n          color: red;\n        }\n      ']);

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _server = require('react-dom/server');

var _commonTags = require('common-tags');

var _jssPresetDefault = require('jss-preset-default');

var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);

var _theming = require('theming');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var node = void 0;
var jss = void 0;
var sheets = void 0;
var createJss = void 0;
var injectSheet = void 0;
var reactJss = void 0;
var SheetsRegistry = void 0;
var ThemeProvider = void 0;
var JssProvider = void 0;
var createGenerateClassName = void 0;

loadModules();

function reloadModules() {
  Object.keys(require.cache).forEach(function (key) {
    return delete require.cache[key];
  });
  loadModules();
}

function loadModules() {
  var jssModule = require('jss');
  jss = jssModule['default'];
  sheets = jssModule.sheets;
  createJss = jssModule.create;

  var reactJssModule = require('./');
  injectSheet = reactJssModule['default'];
  reactJss = reactJssModule.jss;
  SheetsRegistry = reactJssModule.SheetsRegistry;
  ThemeProvider = reactJssModule.ThemeProvider;
  JssProvider = reactJssModule.JssProvider;
  createGenerateClassName = reactJssModule.createGenerateClassName;
}

function reset() {
  (0, _reactDom.unmountComponentAtNode)(node);
  reloadModules();
  node.parentNode.removeChild(node);
}

describe('react-jss', function () {
  beforeEach(function () {
    node = document.body.appendChild(document.createElement('div'));
  });
  afterEach(reset);

  describe('exports', function () {
    it('should export injectSheet', function () {
      (0, _expect2['default'])(injectSheet).to.be.a(Function);
    });

    it('should export jss', function () {
      (0, _expect2['default'])(reactJss).to.be.an(jss.constructor);
    });

    it('should export createGenerateClassName', function () {
      (0, _expect2['default'])(createGenerateClassName).to.be.a(Function);
    });
  });

  describe('.injectSheet()', function () {
    var Component = void 0;

    beforeEach(function () {
      Component = injectSheet({
        button: { color: 'red' }
      })();
    });

    it('should attach and detach a sheet', function () {
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should reuse one sheet for 2 elements and detach sheet', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(Component, null),
        _react2['default'].createElement(Component, null)
      ), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should have correct meta attribute', function () {
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      var meta = document.querySelector('style').getAttribute('data-meta');
      (0, _expect2['default'])(meta).to.be('Jss(NoRenderer), Unthemed, Static');
    });
  });

  describe('.injectSheet() classes prop', function () {
    var passedClasses = void 0;
    var Component = void 0;

    beforeEach(function () {
      var InnerComponent = function InnerComponent(_ref) {
        var classes = _ref.classes;

        passedClasses = classes;
        return null;
      };
      Component = injectSheet({
        button: { color: 'red' }
      })(InnerComponent);
    });

    it('should inject classes map as a prop', function () {
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      (0, _expect2['default'])(passedClasses).to.only.have.keys(['button']);
    });

    it('should not overwrite existing classes property', function () {
      var classes = 'classes prop';
      (0, _reactDom.render)(_react2['default'].createElement(Component, { classes: classes }), node);
      (0, _expect2['default'])(passedClasses).to.equal(classes);
    });
  });

  describe('.injectSheet() preserving source order', function () {
    var ComponentA = void 0;
    var ComponentB = void 0;
    var ComponentC = void 0;

    beforeEach(function () {
      ComponentA = injectSheet({
        button: { color: 'red' }
      })();
      ComponentB = injectSheet({
        button: { color: 'blue' }
      })();
      ComponentC = injectSheet({
        button: { color: 'green' }
      }, { index: 1234 })();
    });

    it('should provide a default index in ascending order', function () {
      (0, _reactDom.render)(_react2['default'].createElement(ComponentA, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexA = sheets.registry[0].options.index;
      sheets.reset();
      (0, _reactDom.render)(_react2['default'].createElement(ComponentB, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexB = sheets.registry[0].options.index;

      (0, _expect2['default'])(indexA).to.be.lessThan(0);
      (0, _expect2['default'])(indexB).to.be.lessThan(0);
      (0, _expect2['default'])(indexA).to.be.lessThan(indexB);
    });

    it('should not be affected by rendering order', function () {
      (0, _reactDom.render)(_react2['default'].createElement(ComponentB, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexB = sheets.registry[0].options.index;
      sheets.reset();
      (0, _reactDom.render)(_react2['default'].createElement(ComponentA, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexA = sheets.registry[0].options.index;

      (0, _expect2['default'])(indexA).to.be.lessThan(0);
      (0, _expect2['default'])(indexB).to.be.lessThan(0);
      (0, _expect2['default'])(indexA).to.be.lessThan(indexB);
    });

    it('should keep custom index', function () {
      (0, _reactDom.render)(_react2['default'].createElement(ComponentC, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexC = sheets.registry[0].options.index;
      (0, _expect2['default'])(indexC).to.equal(1234);
    });
  });

  describe('.injectSheet() without a component for global styles', function () {
    var Component = void 0;

    beforeEach(function () {
      Component = injectSheet({
        button: { color: 'red' }
      })();
    });

    it('should attach and detach a sheet', function () {
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should render children', function () {
      var isRendered = true;
      var ChildComponent = function ChildComponent() {
        isRendered = true;
        return null;
      };
      (0, _reactDom.render)(_react2['default'].createElement(
        Component,
        null,
        _react2['default'].createElement(ChildComponent, null)
      ), node);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(isRendered).to.be(true);
    });
  });

  describe('override sheet prop', function () {
    var Component = void 0;
    var receivedSheet = void 0;
    var mock = {};

    beforeEach(function () {
      var InnerComponent = function InnerComponent(props) {
        receivedSheet = props.sheet;
        return null;
      };
      Component = injectSheet()(InnerComponent);
    });

    it('should be able to override the sheet prop', function () {
      var Parent = function Parent() {
        return _react2['default'].createElement(Component, { sheet: mock });
      };
      (0, _reactDom.render)(_react2['default'].createElement(Parent, null), node);
      (0, _expect2['default'])(receivedSheet).to.be(mock);
    });
  });

  describe('with JssProvider for SSR', function () {
    var localJss = void 0;

    beforeEach(function () {
      localJss = createJss(_extends({}, (0, _jssPresetDefault2['default'])(), {
        virtual: true,
        createGenerateClassName: function createGenerateClassName() {
          var counter = 0;
          return function (rule) {
            return rule.key + '-' + counter++;
          };
        }
      }));
    });

    it('should add style sheets to the registry from context', function () {
      var customSheets = new SheetsRegistry();
      var ComponentA = injectSheet({
        button: { color: 'red' }
      })();
      var ComponentB = injectSheet({
        button: { color: 'blue' }
      })();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { registry: customSheets, jss: localJss },
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(ComponentA, null),
          _react2['default'].createElement(ComponentB, null)
        )
      ));

      (0, _expect2['default'])(customSheets.registry.length).to.equal(2);
    });

    it('should use Jss istance from the context', function () {
      var receivedSheet = void 0;

      var Component = injectSheet()(function (_ref2) {
        var sheet = _ref2.sheet;

        receivedSheet = sheet;
        return null;
      });

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { jss: localJss },
        _react2['default'].createElement(Component, null)
      ));

      (0, _expect2['default'])(receivedSheet.options.jss).to.be(localJss);
    });

    it('should add dynamic sheets', function () {
      var customSheets = new SheetsRegistry();
      var Component = injectSheet({
        button: {
          width: function width() {
            return 10;
          }
        }
      })();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { registry: customSheets, jss: localJss },
        _react2['default'].createElement(Component, null)
      ));

      (0, _expect2['default'])(customSheets.registry.length).to.be(2);
    });

    it('should reset the class generator counter', function () {
      var styles = {
        button: {
          color: 'red',
          border: function border(_ref3) {
            var _border = _ref3.border;
            return _border;
          }
        }
      };
      var Component = injectSheet(styles)();

      var registry = new SheetsRegistry();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { registry: registry, jss: localJss },
        _react2['default'].createElement(Component, { border: 'green' })
      ));

      (0, _expect2['default'])(registry.toString()).to.equal((0, _commonTags.stripIndent)(_templateObject));

      registry = new SheetsRegistry();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { registry: registry, jss: localJss },
        _react2['default'].createElement(Component, { border: 'blue' })
      ));

      (0, _expect2['default'])(registry.toString()).to.equal((0, _commonTags.stripIndent)(_templateObject2));
    });

    it('should be idempotent', function () {
      var Component = injectSheet({
        button: {
          color: function color(props) {
            return props.color;
          }
        }
      })();

      var customSheets1 = new SheetsRegistry();
      var customSheets2 = new SheetsRegistry();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { jss: localJss, registry: customSheets1 },
        _react2['default'].createElement(Component, { color: '#000' })
      ));

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { jss: localJss, registry: customSheets2 },
        _react2['default'].createElement(Component, { color: '#000' })
      ));

      var result1 = customSheets1.toString();
      var result2 = customSheets2.toString();

      (0, _expect2['default'])(result1).to.equal(result2);
    });

    it('should render deterministically on server and client', function () {
      var ComponentA = injectSheet({
        button: {
          color: function color(props) {
            return props.color;
          }
        }
      })();

      var ComponentB = injectSheet({
        button: {
          color: function color(props) {
            return props.color;
          }
        }
      })();

      var customSheets1 = new SheetsRegistry();
      var customSheets2 = new SheetsRegistry();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { jss: localJss, registry: customSheets1 },
        _react2['default'].createElement(ComponentA, { color: '#000' })
      ));

      (0, _reactDom.render)(_react2['default'].createElement(
        JssProvider,
        { jss: localJss, registry: customSheets2 },
        _react2['default'].createElement(ComponentB, { color: '#000' })
      ), node);

      (0, _expect2['default'])(customSheets1.toString()).to.equal(customSheets2.toString());
    });

    it('should render two different sheets with theming', function () {
      var ComponentA = injectSheet(function () {
        return { a: { color: 'red' } };
      })();
      var ComponentB = injectSheet(function () {
        return { b: { color: 'green' } };
      })();
      var registry = new SheetsRegistry();

      (0, _server.renderToString)(_react2['default'].createElement(
        JssProvider,
        { registry: registry, jss: localJss },
        _react2['default'].createElement(
          ThemeProvider,
          { theme: {} },
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(ComponentA, null),
            _react2['default'].createElement(ComponentB, null)
          )
        )
      ));

      (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3));
    });

    it('should use generateClassName', function () {
      var Component1 = injectSheet({ a: { color: 'red' } })();
      var Component2 = injectSheet({ a: { color: 'red' } })();
      var registry = new SheetsRegistry();
      var generateClassName = localJss.options.createGenerateClassName();

      (0, _server.renderToString)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          JssProvider,
          { registry: registry, generateClassName: generateClassName, jss: localJss },
          _react2['default'].createElement(Component1, null)
        ),
        _react2['default'].createElement(
          JssProvider,
          { registry: registry, generateClassName: generateClassName, jss: localJss },
          _react2['default'].createElement(Component2, null)
        )
      ));

      (0, _expect2['default'])(registry.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4));
    });
  });

  describe('access inner component', function () {
    it('should be exposed using "InnerComponent" property', function () {
      var ComponentOuter = injectSheet({
        button: { color: 'red' }
      })();
      (0, _expect2['default'])(ComponentOuter.InnerComponent).to.be.a(Function);
    });
  });

  describe('function values', function () {
    var color = 'rgb(0, 0, 0)';
    var Component = void 0;

    beforeEach(function () {
      var InnerComponent = function InnerComponent(_ref4) {
        var classes = _ref4.classes;
        return _react2['default'].createElement('div', { className: classes.button + ' ' + classes.left });
      };

      Component = injectSheet({
        left: {
          float: 'left'
        },
        button: {
          color: color,
          height: function height(_ref5) {
            var _ref5$height = _ref5.height,
                _height = _ref5$height === undefined ? 1 : _ref5$height;

            return _height;
          }
        }
      })(InnerComponent);
    });

    it('should attach and detach a sheet', function () {
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(2);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should have correct meta attribute', function () {
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      var styles = document.querySelectorAll('style');
      var meta0 = styles[0].getAttribute('data-meta');
      var meta1 = styles[1].getAttribute('data-meta');
      (0, _expect2['default'])(meta0).to.be('Jss(InnerComponent), Unthemed, Static');
      (0, _expect2['default'])(meta1).to.be('Jss(InnerComponent), Unthemed, Dynamic');
    });

    it('should reuse static sheet, but generate separate dynamic once', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(Component, { height: 2 }),
        _react2['default'].createElement(Component, { height: 3 })
      ), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(3);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should use the default value', function () {
      var node0 = (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      var style0 = getComputedStyle((0, _reactDom.findDOMNode)(node0));
      (0, _expect2['default'])(style0.color).to.be(color);
      (0, _expect2['default'])(style0.height).to.be('1px');
    });

    it('should have dynamic and static styles', function () {
      var node0 = (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      var style0 = getComputedStyle((0, _reactDom.findDOMNode)(node0));
      (0, _expect2['default'])(style0.color).to.be(color);
      (0, _expect2['default'])(style0.float).to.be('left');
      (0, _expect2['default'])(style0.height).to.be('1px');
    });

    it('should generate different dynamic values', function () {
      var componentNode = (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(Component, { height: 10 }),
        _react2['default'].createElement(Component, { height: 20 })
      ), node);

      var _componentNode$childr = _slicedToArray(componentNode.children, 2),
          node0 = _componentNode$childr[0],
          node1 = _componentNode$childr[1];

      var style0 = getComputedStyle(node0);
      var style1 = getComputedStyle(node1);

      (0, _expect2['default'])(style0.color).to.be(color);
      (0, _expect2['default'])(style0.height).to.be('10px');
      (0, _expect2['default'])(style1.color).to.be(color);
      (0, _expect2['default'])(style1.height).to.be('20px');
    });

    it('should update dynamic values', function () {
      /* eslint-disable react/no-multi-comp, react/prefer-stateless-function */
      var Container = function (_PureComponent) {
        _inherits(Container, _PureComponent);

        function Container() {
          _classCallCheck(this, Container);

          return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
        }

        _createClass(Container, [{
          key: 'render',
          value: function render() {
            var height = this.props.height;

            return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(Component, { height: height }),
              _react2['default'].createElement(Component, { height: height * 2 })
            );
          }
        }]);

        return Container;
      }(_react.PureComponent);
      /* eslint-enable */

      var component = (0, _reactDom.render)(_react2['default'].createElement(Container, { height: 10 }), node);
      var componentNode = (0, _reactDom.findDOMNode)(component);

      var _componentNode$childr2 = _slicedToArray(componentNode.children, 2),
          node0 = _componentNode$childr2[0],
          node1 = _componentNode$childr2[1];

      var style0 = getComputedStyle(node0);
      var style1 = getComputedStyle(node1);

      (0, _expect2['default'])(style0.color).to.be(color);
      (0, _expect2['default'])(style0.height).to.be('10px');
      (0, _expect2['default'])(style1.color).to.be(color);
      (0, _expect2['default'])(style1.height).to.be('20px');

      (0, _reactDom.render)(_react2['default'].createElement(Container, { height: 20 }), node);

      (0, _expect2['default'])(style0.color).to.be(color);
      (0, _expect2['default'])(style0.height).to.be('20px');
      (0, _expect2['default'])(style1.color).to.be(color);
      (0, _expect2['default'])(style1.height).to.be('40px');

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(3);
    });

    it('should use the default props', function () {
      var styles = {
        a: {
          color: function color(props) {
            return props.color;
          }
        }
      };
      var InnerComponent = function InnerComponent(_ref6) {
        var classes = _ref6.classes;
        return _react2['default'].createElement('span', { className: classes.a });
      };
      InnerComponent.defaultProps = {
        color: 'rgb(255, 0, 0)'
      };
      var StyledComponent = injectSheet(styles)(InnerComponent);

      var node0 = (0, _reactDom.render)(_react2['default'].createElement(StyledComponent, null), node);
      var style0 = getComputedStyle((0, _reactDom.findDOMNode)(node0));
      (0, _expect2['default'])(style0.color).to.be('rgb(255, 0, 0)');
    });
  });

  describe('theming', function () {
    var themedStaticStyles = function themedStaticStyles(theme) {
      return {
        rule: {
          color: theme.color
        }
      };
    };
    var themedDynamicStyles = function themedDynamicStyles(theme) {
      return {
        rule: {
          color: theme.color,
          backgroundColor: function backgroundColor(props) {
            return props.backgroundColor;
          }
        }
      };
    };
    var ThemeA = { color: '#aaa' };
    var ThemeB = { color: '#bbb' };

    var ThemedStaticComponent = injectSheet(themedStaticStyles)();
    var ThemedDynamicComponent = injectSheet(themedDynamicStyles)();

    it('should have correct meta attribute for static styles', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        ThemeProvider,
        { theme: ThemeA },
        _react2['default'].createElement(ThemedDynamicComponent, null)
      ), node);
      var styles = document.querySelectorAll('style');
      var meta0 = styles[0].getAttribute('data-meta');
      (0, _expect2['default'])(meta0).to.be('Jss(NoRenderer), Themed, Static');
      var meta1 = styles[1].getAttribute('data-meta');
      (0, _expect2['default'])(meta1).to.be('Jss(NoRenderer), Themed, Dynamic');
    });

    it('one themed instance wo/ dynamic props = 1 style', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedStaticComponent, null)
        )
      ), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(1);
    });

    it('one themed instance w/ dynamic props = 2 styles', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        )
      ), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(2);
    });

    it('one themed instance wo/ = 1 style, theme update = 1 style', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedStaticComponent, null)
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(1);

      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeB },
          _react2['default'].createElement(ThemedStaticComponent, null)
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(1);
    });

    it('one themed instance w/ dynamic props = 2 styles, theme update = 2 styles', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(2);

      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeB },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(2);
    });

    it('two themed instances wo/ dynamic props w/ same theme = 1 style', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(ThemedStaticComponent, null),
            _react2['default'].createElement(ThemedStaticComponent, null)
          )
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(1);
    });

    it('two themed instances w/ dynamic props w/ same theme = 3 styles', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' }),
            _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
          )
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(3);
    });

    it('two themed instances wo/ dynamic props w/ same theme = 1 style, theme update = 1 style', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(ThemedStaticComponent, null),
            _react2['default'].createElement(ThemedStaticComponent, null)
          )
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(1);

      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeB },
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(ThemedStaticComponent, null),
            _react2['default'].createElement(ThemedStaticComponent, null)
          )
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(1);
    });

    it('two themed instances w/ dynamic props w/ same theme = 3 styles, theme update = 3 styles', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' }),
            _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
          )
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(3);

      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeB },
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' }),
            _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
          )
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(3);
    });

    it('two themed instances wo/ dynamic props w/ same theme = 1 styles, different theme update = 2 styles', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedStaticComponent, null)
        ),
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedStaticComponent, null)
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(1);

      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedStaticComponent, null)
        ),
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeB },
          _react2['default'].createElement(ThemedStaticComponent, null)
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(2);
    });

    it('two themed instances w/ dynamic props w/ same theme = 3 styles, different theme update = 4 styles', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        ),
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(3);

      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        ),
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeB },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(4);
    });

    it('two themed instances wo/ dynamic props w/ different themes = 2 styles, same theme update = 1 style', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedStaticComponent, null)
        ),
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeB },
          _react2['default'].createElement(ThemedStaticComponent, null)
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(2);

      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedStaticComponent, null)
        ),
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedStaticComponent, null)
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(1);
    });

    it('two themed instances w/ dynamic props w/ different themes = 4 styles, same theme update = 3 styles', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        ),
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeB },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(4);

      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        ),
        _react2['default'].createElement(
          ThemeProvider,
          { theme: ThemeA },
          _react2['default'].createElement(ThemedDynamicComponent, { backgroundColor: '#fff' })
        )
      ), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.equal(3);
    });

    it('with JssProvider should render two different sheets', function () {
      var ComponentA = injectSheet(function () {
        return { a: { color: 'red' } };
      })();
      var ComponentB = injectSheet(function () {
        return { b: { color: 'green' } };
      })();
      var localJss = createJss(_extends({}, (0, _jssPresetDefault2['default'])(), {
        createGenerateClassName: function createGenerateClassName() {
          var counter = 0;
          return function (rule) {
            return rule.key + '-' + counter++;
          };
        }
      }));
      (0, _reactDom.render)(_react2['default'].createElement(
        JssProvider,
        { jss: localJss },
        _react2['default'].createElement(
          ThemeProvider,
          { theme: {} },
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(ComponentA, null),
            _react2['default'].createElement(ComponentB, null)
          )
        )
      ), node);

      var styleTags = Array.from(document.querySelectorAll('style'));
      var innerText = function innerText(x) {
        return x.innerText;
      };
      var trim = function trim(x) {
        return x.trim();
      };
      var actual = styleTags.map(innerText).map(trim).join('\n');

      (0, _expect2['default'])(actual).to.be((0, _commonTags.stripIndent)(_templateObject3));
    });

    describe('when theming object returned from createTheming is provided to injectSheet options', function () {
      it('allows nested ThemeProviders with custom namespace', function () {
        var themingA = (0, _theming.createTheming)('__THEME_A__');
        var themingB = (0, _theming.createTheming)('__THEME_B__');
        var ThemeProviderA = themingA.ThemeProvider;
        var ThemeProviderB = themingB.ThemeProvider;


        var colorReceivedInStyleA = void 0;
        var colorReceivedInStyleB = void 0;
        var themeReceivedInComponentA = void 0;
        var themeReceivedInComponentB = void 0;

        var styleA = function styleA(theme) {
          return colorReceivedInStyleA = theme.color;
        };
        var styleB = function styleB(theme) {
          return colorReceivedInStyleB = theme.color;
        };

        var InnerComponentA = function InnerComponentA(_ref7) {
          var theme = _ref7.theme;

          themeReceivedInComponentA = theme;
          return null;
        };

        var InnerComponentB = function InnerComponentB(_ref8) {
          var theme = _ref8.theme;

          themeReceivedInComponentB = theme;
          return null;
        };

        var ComponentA = injectSheet(styleA, { theming: themingA })(InnerComponentA);
        var ComponentB = injectSheet(styleB, { theming: themingB })(InnerComponentB);

        (0, _reactDom.render)(_react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            ThemeProviderA,
            { theme: ThemeA },
            _react2['default'].createElement(
              ThemeProviderB,
              { theme: ThemeB },
              _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(ComponentA, null),
                _react2['default'].createElement(ComponentB, null)
              )
            )
          )
        ), node);

        (0, _expect2['default'])(themeReceivedInComponentA).to.be(ThemeA);
        (0, _expect2['default'])(themeReceivedInComponentB).to.be(ThemeB);
        (0, _expect2['default'])(colorReceivedInStyleA).to.be(ThemeA.color);
        (0, _expect2['default'])(colorReceivedInStyleB).to.be(ThemeB.color);
      });
    });
  });
});