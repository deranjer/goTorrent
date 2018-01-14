'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrapDisplayName = require('recompose/wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _createMuiTheme = require('./createMuiTheme');

var _createMuiTheme2 = _interopRequireDefault(_createMuiTheme);

var _themeListener = require('./themeListener');

var _themeListener2 = _interopRequireDefault(_themeListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  weak

// flow sanity check (DO NOT DELETE) https://flow.org/try/#0JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4AoUSWOGATzCTgG84BhXSAOyS5gBUGTAL5xsuAkXQwy5OQHp5cALSq16jZuVwdccorgB3YDAAW-U0hBMAEgHk25JAA9qWAK5cMwCFyMnzS2sAHgAFHDAAZwAuFmEAPgAKcl12Tl9eGFiOcAy+QUZg1jMrJFi7ACMAKyQMOFEAMjhwiCj4gBpyAEps9J58oTCIyPiWOR00ABsUSMi4AHUAi1K4FxheABM55GkAOhzuTKHWyPaWWiCyuEqauoSx1KIuDaQoRK6H1LgiGHcoP2CBzy8GYuzBZmAkV2YGGohK1gAvMwIVDIjAUOtdvCkKJ5PEKKlhAT6ilvkhfv8FktLuRhAolFpGUy1PolMYzMtrHAAKqRFAAcyQ5CmMzmAEFVs51s9tsQYPs+kdipdytVavBGiwULEuO4QBVXmcKjq9QaoPdmHS0L40XBOUgNkD+vAEf4OZdEmKuhQDPMmBtfPh4DwHbQIHAwKK4MA-AADbGx1YAN14Fwg7n5pjgsYAsnQnZlE0QAI7uYBEOYmXbkYL2x2KvhwFBIgCMogqSIATLj4vSVMyB6lWW7TIsNmY4PZHC43LQhHAAEJSADWkBjLoIzki+DgAB8CJEQDv9-gQBtjwRJvyL-hnJNZOR6IwqePTC0onBXcxSTGTMAUJMY5mAA-LES6oKuEDrp0OjGK+oGLiua58J0dJOK40AeF4MA+H47KjsAr7vJ8mCeN4virFwpgoF4SDHFEsRAW+wxJKSqQFnwvS5M6BR0cwcFmGBSFQShcBgrs76RAkMFwD0aTcZkvH0SMYxsXAIqzFSZhMZK0pbIgcoKgpfDKaM35fGSzyvMR5kWepNogr+OEAUxZwCaYoiuii0LDGpjzkn8AIcSC4neTCJyiO5SL4Ie+A9sShIJSSak-IFWkEa+xJEuMZIUn4vDUbRFBoQYA5leow7uHygrCtMmkLrpmyynswVFO5QkQchMBnNqcC6vqhrGn1pqvBapJPC8bwfLZEwOSw7meRckI+ScKUBZSwQbMASZwHipJ0lac1MQ6wWfiOTHvIkC7esOfpwAGXBBn1SChjA4aRppMbZu5iZICmfhmOmmbZnmwVFkgpblkglbyjWx31sZ8DNswbZwB2zDdrt+JAA
var babelPluginFlowReactPropTypes_proptype_HigherOrderComponent = require('react-flow-types').babelPluginFlowReactPropTypes_proptype_HigherOrderComponent || require('prop-types').any;

var defaultTheme = void 0;

function getDefaultTheme() {
  if (defaultTheme) {
    return defaultTheme;
  }

  defaultTheme = (0, _createMuiTheme2.default)();
  return defaultTheme;
}

var babelPluginFlowReactPropTypes_proptype_InjectedProps = {
  theme: require('prop-types').object.isRequired
};


// Provide the theme object as a property to the input component.
var withTheme = function withTheme() {
  return function (Component) {
    var WithTheme = function (_React$Component) {
      (0, _inherits3.default)(WithTheme, _React$Component);

      function WithTheme(props, context) {
        (0, _classCallCheck3.default)(this, WithTheme);

        var _this = (0, _possibleConstructorReturn3.default)(this, (WithTheme.__proto__ || (0, _getPrototypeOf2.default)(WithTheme)).call(this, props, context));

        _this.state = {};
        _this.unsubscribeId = null;

        _this.state = {
          // We use || as it's lazy evaluated.
          theme: _themeListener2.default.initial(context) || getDefaultTheme()
        };
        return _this;
      }

      // Exposed for test purposes.


      (0, _createClass3.default)(WithTheme, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          this.unsubscribeId = _themeListener2.default.subscribe(this.context, function (theme) {
            _this2.setState({ theme: theme });
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (this.unsubscribeId !== null) {
            _themeListener2.default.unsubscribe(this.context, this.unsubscribeId);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(Component, (0, _extends3.default)({ theme: this.state.theme }, this.props));
        }
      }]);
      return WithTheme;
    }(_react2.default.Component);

    WithTheme.contextTypes = _themeListener2.default.contextTypes;
    WithTheme.displayName = (0, _wrapDisplayName2.default)(Component, 'withTheme');
    WithTheme.Naked = Component;


    return WithTheme;
  };
};

exports.default = withTheme;