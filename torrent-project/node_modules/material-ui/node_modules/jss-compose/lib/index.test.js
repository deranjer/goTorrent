'use strict';

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

var _jss = require('jss');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('jss-compose', function () {
  var jss = void 0;
  var warning = void 0;

  beforeEach(function () {
    _2.default.__Rewire__('warning', function (condition, message) {
      warning = message;
    });
    jss = (0, _jss.create)({
      createGenerateClassName: function createGenerateClassName() {
        return function (rule) {
          return rule.key + '-id';
        };
      }
    }).use((0, _2.default)());
  });

  afterEach(function () {
    _2.default.__ResetDependency__('warning');
    warning = undefined;
  });

  describe('Ref composition', function () {
    var sheet = void 0;

    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          float: 'left'
        },
        b: {
          composes: '$a',
          color: 'red'
        }
      });
    });

    afterEach(function () {
      (0, _expect2.default)(warning).to.be(undefined);
    });

    it('should add rules', function () {
      (0, _expect2.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2.default)(sheet.getRule('b')).to.not.be(undefined);
    });

    it('should compose classes', function () {
      (0, _expect2.default)(sheet.classes.b).to.be('b-id a-id');
    });

    it('should generate correct CSS', function () {
      (0, _expect2.default)(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  color: red;\n' + '}');
    });
  });

  describe('Global class composition', function () {
    var sheet = void 0;

    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          composes: 'b',
          color: 'red'
        }
      });
    });

    afterEach(function () {
      (0, _expect2.default)(warning).to.be(undefined);
    });

    it('should compose classes', function () {
      (0, _expect2.default)(sheet.classes.a).to.be('a-id b');
    });

    it('should generate correct CSS', function () {
      (0, _expect2.default)(sheet.toString()).to.be('.a-id {\n' + '  color: red;\n' + '}');
    });
  });

  describe('Array of refs composition', function () {
    var sheet = void 0;

    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          float: 'left'
        },
        b: {
          color: 'red'
        },
        c: {
          background: 'blue'
        },
        d: {
          composes: ['$a', '$b', '$c'],
          border: 'none'
        },
        e: {
          composes: '$a $b $c',
          border: 'none'
        },
        f: {
          composes: ['$a', ['$b', '$c']],
          border: 'none'
        }
      });
    });

    afterEach(function () {
      (0, _expect2.default)(warning).to.be(undefined);
    });

    it('should add rules', function () {
      (0, _expect2.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2.default)(sheet.getRule('b')).to.not.be(undefined);
      (0, _expect2.default)(sheet.getRule('c')).to.not.be(undefined);
      (0, _expect2.default)(sheet.getRule('d')).to.not.be(undefined);
      (0, _expect2.default)(sheet.getRule('e')).to.not.be(undefined);
      (0, _expect2.default)(sheet.getRule('f')).to.not.be(undefined);
    });

    it('should compose classes', function () {
      (0, _expect2.default)(sheet.classes.d).to.be('d-id a-id b-id c-id');
      (0, _expect2.default)(sheet.classes.e).to.be('e-id a-id b-id c-id');
      (0, _expect2.default)(sheet.classes.f).to.be('f-id a-id b-id c-id');
    });

    it('should generate correct CSS', function () {
      (0, _expect2.default)(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  color: red;\n' + '}\n' + '.c-id {\n' + '  background: blue;\n' + '}\n' + '.d-id {\n' + '  border: none;\n' + '}\n' + '.e-id {\n' + '  border: none;\n' + '}\n' + '.f-id {\n' + '  border: none;\n' + '}');
    });
  });

  describe('Mixed composition', function () {
    var sheet = void 0;

    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          float: 'left'
        },
        b: {
          composes: ['$a', 'c', 'd'],
          color: 'red'
        },
        e: {
          composes: '$a c d',
          color: 'red'
        }
      });
    });

    afterEach(function () {
      (0, _expect2.default)(warning).to.be(undefined);
    });

    it('should add rules', function () {
      (0, _expect2.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2.default)(sheet.getRule('b')).to.not.be(undefined);
      (0, _expect2.default)(sheet.getRule('e')).to.not.be(undefined);
    });

    it('should compose classes', function () {
      (0, _expect2.default)(sheet.classes.b).to.be('b-id a-id c d');
      (0, _expect2.default)(sheet.classes.e).to.be('e-id a-id c d');
    });

    it('should generate correct CSS', function () {
      (0, _expect2.default)(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  color: red;\n' + '}\n' + '.e-id {\n' + '  color: red;\n' + '}');
    });
  });

  describe('Nested compositions (compose composed)', function () {
    var sheet = void 0;

    beforeEach(function () {
      sheet = jss.createStyleSheet({
        a: {
          float: 'left'
        },
        b: {
          composes: ['$a', 'd'],
          color: 'red'
        },
        c: {
          composes: ['$b'],
          background: 'blue'
        }
      });
    });

    afterEach(function () {
      (0, _expect2.default)(warning).to.be(undefined);
    });

    it('should add rules', function () {
      (0, _expect2.default)(sheet.getRule('a')).to.not.be(undefined);
      (0, _expect2.default)(sheet.getRule('b')).to.not.be(undefined);
      (0, _expect2.default)(sheet.getRule('c')).to.not.be(undefined);
    });

    it('should compose classes', function () {
      (0, _expect2.default)(sheet.classes.b).to.be('b-id a-id d');
      (0, _expect2.default)(sheet.classes.c).to.be('c-id b-id a-id d');
    });

    it('should generate correct CSS', function () {
      (0, _expect2.default)(sheet.toString()).to.be('.a-id {\n' + '  float: left;\n' + '}\n' + '.b-id {\n' + '  color: red;\n' + '}\n' + '.c-id {\n' + '  background: blue;\n' + '}');
    });
  });

  describe('Warnings', function () {
    it('should warn when rule try to compose itself', function () {
      jss.createStyleSheet({
        a: {
          composes: ['$a'],
          color: 'red'
        }
      });
      (0, _expect2.default)(warning).to.be('[JSS] Cyclic composition detected. \r\n%s');
    });

    it('should warn when try to compose ref which can\'t be resolved', function () {
      jss.createStyleSheet({
        a: {
          composes: ['$b'],
          color: 'red'
        }
      });
      (0, _expect2.default)(warning).to.be('[JSS] Referenced rule is not defined. \r\n%s');
    });
  });
}); /* eslint-disable no-underscore-dangle */