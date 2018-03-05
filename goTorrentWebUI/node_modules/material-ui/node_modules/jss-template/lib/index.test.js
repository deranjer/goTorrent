'use strict';

var _templateObject = _taggedTemplateLiteral(['\n        .a-id {\n          color: red;\n        }\n      '], ['\n        .a-id {\n          color: red;\n        }\n      ']),
    _templateObject2 = _taggedTemplateLiteral(['\n        .a-id {\n          color: red;\n          float: left;\n        }\n      '], ['\n        .a-id {\n          color: red;\n          float: left;\n        }\n      ']),
    _templateObject3 = _taggedTemplateLiteral(['\n        @media print {\n          .button-id {\n            color: black;\n          }\n        }\n      '], ['\n        @media print {\n          .button-id {\n            color: black;\n          }\n        }\n      ']),
    _templateObject4 = _taggedTemplateLiteral(['\n        @keyframes id {\n          from {\n            opacity: 0;\n          }\n          to {\n            opacity: 1;\n          }\n        }\n      '], ['\n        @keyframes id {\n          from {\n            opacity: 0;\n          }\n          to {\n            opacity: 1;\n          }\n        }\n      ']);

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

var _commonTags = require('common-tags');

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _jss = require('jss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } /* eslint-disable no-underscore-dangle */

var settings = {
  createGenerateClassName: function createGenerateClassName() {
    return function (rule) {
      return rule.key + '-id';
    };
  }
};

describe('jss-template', function () {
  var jss = void 0;
  var warning = void 0;

  beforeEach(function () {
    _parse2['default'].__Rewire__('warning', function (condition, message) {
      warning = message;
    });

    jss = (0, _jss.create)(settings).use((0, _2['default'])());
  });

  afterEach(function () {
    _parse2['default'].__ResetDependency__('warning');
    warning = undefined;
  });

  describe('template literals', function () {
    it('should convert a single single property/value', function () {
      var sheet = jss.createStyleSheet({
        a: '\n          color: red;\n        '
      });
      (0, _expect2['default'])(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject));
    });

    it('should parse multiple props/values', function () {
      var sheet = jss.createStyleSheet({
        a: '\n          color: red;\n          float: left;\n        '
      });
      (0, _expect2['default'])(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2));
      (0, _expect2['default'])(warning).to.be(undefined);
    });

    it('should warn when there is no colon found', function () {
      jss.createStyleSheet({
        a: 'color red;'
      });
      jss.createStyleSheet({
        a: '\n          color: red;\n          float: left;\n        '
      });
      (0, _expect2['default'])(warning).to.not.be(undefined);
    });

    it('should strip spaces', function () {
      var sheet = jss.createStyleSheet({
        a: '\n            color:     red   ;\n            float:   left   ;\n        '
      });
      (0, _expect2['default'])(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2));
    });

    it('should allow skiping last semicolon', function () {
      var sheet = jss.createStyleSheet({
        a: '\n          color: red;\n          float: left\n        '
      });
      (0, _expect2['default'])(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject2));
    });

    it('should support @media', function () {
      var sheet = jss.createStyleSheet({
        '@media print': {
          button: 'color: black'
        }
      });
      (0, _expect2['default'])(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject3));
    });

    it('should support @keyframes', function () {
      var sheet = jss.createStyleSheet({
        '@keyframes id': {
          from: 'opacity: 0',
          to: 'opacity: 1'
        }
      });
      (0, _expect2['default'])(sheet.toString()).to.be((0, _commonTags.stripIndent)(_templateObject4));
    });
  });
});