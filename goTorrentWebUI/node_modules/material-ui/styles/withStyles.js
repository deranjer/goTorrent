'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sheetsManager = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _minSafeInteger = require('babel-runtime/core-js/number/min-safe-integer');

var _minSafeInteger2 = _interopRequireDefault(_minSafeInteger);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _getDisplayName = require('recompose/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _wrapDisplayName = require('recompose/wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _contextTypes = require('react-jss/lib/contextTypes');

var _contextTypes2 = _interopRequireDefault(_contextTypes);

var _jss = require('jss');

var _ns = require('react-jss/lib/ns');

var ns = _interopRequireWildcard(_ns);

var _jssPreset = require('./jssPreset');

var _jssPreset2 = _interopRequireDefault(_jssPreset);

var _createMuiTheme = require('./createMuiTheme');

var _createMuiTheme2 = _interopRequireDefault(_createMuiTheme);

var _themeListener = require('./themeListener');

var _themeListener2 = _interopRequireDefault(_themeListener);

var _createGenerateClassName = require('./createGenerateClassName');

var _createGenerateClassName2 = _interopRequireDefault(_createGenerateClassName);

var _getStylesCreator = require('./getStylesCreator');

var _getStylesCreator2 = _interopRequireDefault(_getStylesCreator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// New JSS instance.
var jss = (0, _jss.create)((0, _jssPreset2.default)());

// Use a singleton or the provided one by the context.
var generateClassName = (0, _createGenerateClassName2.default)();

// Global index counter to preserve source order.
// As we create the style sheet during componentWillMount lifecycle,
// children are handled after the parents, so the order of style elements would
// be parent->child. It is a problem though when a parent passes a className
// which needs to override any childs styles. StyleSheet of the child has a higher
// specificity, because of the source order.
// So our solution is to render sheets them in the reverse order child->sheet, so
// that parent has a higher specificity.
var indexCounter = _minSafeInteger2.default;

var sheetsManager = exports.sheetsManager = new _map2.default();

// We use the same empty object to ref count the styles that don't need a theme object.
var noopTheme = {};

// In order to have self-supporting components, we rely on default theme when not provided.
var defaultTheme = void 0;

function getDefaultTheme() {
  if (defaultTheme) {
    return defaultTheme;
  }

  defaultTheme = (0, _createMuiTheme2.default)();
  return defaultTheme;
}

// Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new component, with a `classes` property.
var withStyles = function withStyles(stylesOrCreator) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (Component) {
    var _options$withTheme = options.withTheme,
        withTheme = _options$withTheme === undefined ? false : _options$withTheme,
        _options$flip = options.flip,
        flip = _options$flip === undefined ? null : _options$flip,
        name = options.name,
        styleSheetOptions = (0, _objectWithoutProperties3.default)(options, ['withTheme', 'flip', 'name']);

    var stylesCreator = (0, _getStylesCreator2.default)(stylesOrCreator);
    var listenToTheme = stylesCreator.themingEnabled || withTheme || typeof name === 'string';

    indexCounter += 1;
    stylesCreator.options.index = indexCounter;

    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(indexCounter < 0, ['Material-UI: you might have a memory leak.', 'The indexCounter is not supposed to grow that much.'].join(' ')) : void 0;

    var WithStyles = function (_React$Component) {
      (0, _inherits3.default)(WithStyles, _React$Component);

      function WithStyles(props, context) {
        (0, _classCallCheck3.default)(this, WithStyles);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WithStyles.__proto__ || (0, _getPrototypeOf2.default)(WithStyles)).call(this, props, context));

        _this.state = {};
        _this.disableStylesGeneration = false;
        _this.jss = null;
        _this.sheetOptions = null;
        _this.sheetsManager = sheetsManager;
        _this.stylesCreatorSaved = null;
        _this.theme = null;
        _this.unsubscribeId = null;


        _this.jss = _this.context[ns.jss] || jss;

        var muiThemeProviderOptions = _this.context.muiThemeProviderOptions;

        if (muiThemeProviderOptions) {
          if (muiThemeProviderOptions.sheetsManager) {
            _this.sheetsManager = muiThemeProviderOptions.sheetsManager;
          }

          _this.disableStylesGeneration = muiThemeProviderOptions.disableStylesGeneration;
        }

        // Attach the stylesCreator to the instance of the component as in the context
        // of react-hot-loader the hooks can be executed in a different closure context:
        // https://github.com/gaearon/react-hot-loader/blob/master/src/patch.dev.js#L107
        _this.stylesCreatorSaved = stylesCreator;
        _this.sheetOptions = (0, _extends3.default)({
          generateClassName: generateClassName
        }, _this.context[ns.sheetOptions]);
        // We use || as the function call is lazy evaluated.
        _this.theme = listenToTheme ? _themeListener2.default.initial(context) || getDefaultTheme() : noopTheme;
        return _this;
      }

      (0, _createClass3.default)(WithStyles, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.attach(this.theme);
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          if (!listenToTheme) {
            return;
          }

          this.unsubscribeId = _themeListener2.default.subscribe(this.context, function (theme) {
            var oldTheme = _this2.theme;
            _this2.theme = theme;
            _this2.attach(_this2.theme);

            // Rerender the component so the underlying component gets the theme update.
            // By theme update we mean receiving and applying the new class names.
            _this2.setState({}, function () {
              _this2.detach(oldTheme);
            });
          });
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
          // react-hot-loader specific logic
          if (this.stylesCreatorSaved === stylesCreator || process.env.NODE_ENV === 'production') {
            return;
          }

          this.detach(this.theme);
          this.stylesCreatorSaved = stylesCreator;
          this.attach(this.theme);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.detach(this.theme);

          if (this.unsubscribeId !== null) {
            _themeListener2.default.unsubscribe(this.context, this.unsubscribeId);
          }
        }
      }, {
        key: 'attach',
        value: function attach(theme) {
          if (this.disableStylesGeneration) {
            return;
          }

          var stylesCreatorSaved = this.stylesCreatorSaved;
          var sheetManager = this.sheetsManager.get(stylesCreatorSaved);

          if (!sheetManager) {
            sheetManager = new _map2.default();
            this.sheetsManager.set(stylesCreatorSaved, sheetManager);
          }

          var sheetManagerTheme = sheetManager.get(theme);

          if (!sheetManagerTheme) {
            sheetManagerTheme = {
              refs: 0,
              sheet: null
            };
            sheetManager.set(theme, sheetManagerTheme);
          }

          if (sheetManagerTheme.refs === 0) {
            var styles = stylesCreatorSaved.create(theme, name);
            var meta = name;

            if (process.env.NODE_ENV !== 'production' && !meta) {
              meta = (0, _getDisplayName2.default)(Component);
            }

            var sheet = this.jss.createStyleSheet(styles, (0, _extends3.default)({
              meta: meta,
              classNamePrefix: meta,
              flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl',
              link: false
            }, this.sheetOptions, stylesCreatorSaved.options, {
              name: name
            }, styleSheetOptions));

            sheetManagerTheme.sheet = sheet;
            sheet.attach();

            var sheetsRegistry = this.context[ns.sheetsRegistry];
            if (sheetsRegistry) {
              sheetsRegistry.add(sheet);
            }
          }

          sheetManagerTheme.refs += 1;
        }
      }, {
        key: 'detach',
        value: function detach(theme) {
          if (this.disableStylesGeneration) {
            return;
          }

          var stylesCreatorSaved = this.stylesCreatorSaved;
          var sheetManager = this.sheetsManager.get(stylesCreatorSaved);
          var sheetManagerTheme = sheetManager.get(theme);

          sheetManagerTheme.refs -= 1;

          if (sheetManagerTheme.refs === 0) {
            sheetManager.delete(theme);
            this.jss.removeStyleSheet(sheetManagerTheme.sheet);
            var sheetsRegistry = this.context[ns.sheetsRegistry];
            if (sheetsRegistry) {
              sheetsRegistry.remove(sheetManagerTheme.sheet);
            }
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _this3 = this;

          var _props = this.props,
              classesProp = _props.classes,
              innerRef = _props.innerRef,
              other = (0, _objectWithoutProperties3.default)(_props, ['classes', 'innerRef']);


          var classes = void 0;
          var renderedClasses = {};

          if (!this.disableStylesGeneration) {
            var sheetManager = this.sheetsManager.get(this.stylesCreatorSaved);
            var sheetsManagerTheme = sheetManager.get(this.theme);
            renderedClasses = sheetsManagerTheme.sheet.classes;
          }

          if (classesProp) {
            classes = (0, _extends3.default)({}, renderedClasses, (0, _keys2.default)(classesProp).reduce(function (accumulator, key) {
              process.env.NODE_ENV !== "production" ? (0, _warning2.default)(renderedClasses[key] || _this3.disableStylesGeneration, ['Material-UI: the key `' + key + '` ' + ('provided to the classes property is not implemented in ' + (0, _getDisplayName2.default)(Component) + '.'), 'You can only override one of the following: ' + (0, _keys2.default)(renderedClasses).join(',')].join('\n')) : void 0;

              process.env.NODE_ENV !== "production" ? (0, _warning2.default)(!classesProp[key] || typeof classesProp[key] === 'string', ['Material-UI: the key `' + key + '` ' + ('provided to the classes property is not valid for ' + (0, _getDisplayName2.default)(Component) + '.'), 'You need to provide a non empty string instead of: ' + classesProp[key] + '.'].join('\n')) : void 0;

              if (classesProp[key]) {
                accumulator[key] = renderedClasses[key] + ' ' + classesProp[key];
              }

              return accumulator;
            }, {}));
          } else {
            classes = renderedClasses;
          }

          var more = {};

          // Provide the theme to the wrapped component.
          // So we don't have to use the `withTheme()` Higher-order Component.
          if (withTheme) {
            more.theme = this.theme;
          }

          return _react2.default.createElement(Component, (0, _extends3.default)({ classes: classes }, more, other, { ref: innerRef }));
        }
      }]);
      return WithStyles;
    }(_react2.default.Component);

    WithStyles.propTypes = process.env.NODE_ENV !== "production" ? {
      /**
       * Useful to extend the style applied to components.
       */
      classes: _propTypes2.default.object,
      /**
       * Use that property to pass a ref callback to the decorated component.
       */
      innerRef: _propTypes2.default.func
    } : {};

    WithStyles.contextTypes = (0, _extends3.default)({
      muiThemeProviderOptions: _propTypes2.default.object
    }, _contextTypes2.default, listenToTheme ? _themeListener2.default.contextTypes : {});

    if (process.env.NODE_ENV !== 'production') {
      WithStyles.displayName = (0, _wrapDisplayName2.default)(Component, 'WithStyles');
    }

    (0, _hoistNonReactStatics2.default)(WithStyles, Component);

    if (process.env.NODE_ENV !== 'production') {
      // Exposed for test purposes.
      WithStyles.Naked = Component;
      WithStyles.options = options;
    }

    return WithStyles;
  };
};

exports.default = withStyles;