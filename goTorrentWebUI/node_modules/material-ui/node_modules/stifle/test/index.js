var stifle = require('../index')
var assert = require('chai').assert


describe('stifle', function () {

  it('should stifle a function', function (done) {
    var callCount = 0,
      wrapper = stifle(function () { callCount++; }, 32);

    wrapper();
    wrapper();
    wrapper();

    var lastCount = callCount;
    assert.ok(callCount);

    setTimeout(function () {
      assert.ok(callCount > lastCount);
      done();
    }, 64);
  });


  it('should not trigger a trailing call when invoked once', function (done) {
    var callCount = 0,
      wrapper = stifle(function () { callCount++; }, 32);

    wrapper();
    assert.strictEqual(callCount, 1);

    setTimeout(function () {
      assert.strictEqual(callCount, 1);
      done();
    }, 64);
  });


  it('should not trigger an extra call after a `cancel`', function (done) {
    var callCount = 0,
      wrapper = stifle(function () { callCount++; }, 10);

    wrapper();
    wrapper(); // This call should get cancelled
    wrapper.cancel();
    assert.strictEqual(callCount, 1);
    wrapper();

    setTimeout(function () {
      assert.strictEqual(callCount, 2);
      done();
    }, 50);
  });


  it('should trigger a second wrapper call as soon as possible', function (done) {
    var callCount = 0;

    var time = +new Date
    var wrapper = stifle(function (a) {
      callCount++;
    }, 128);

    wrapper(1); // Will fire immediately
    wrapper(2); // Will fire at 128ms
    wrapper(3); // Ignored
    wrapper(4); // Ignored

    assert.strictEqual(callCount, 1);

    setTimeout(function () {
      // Check that it fired around 128ms
      assert.strictEqual(callCount, 2);

      // NOTE: The function is still cooling down from firing at 128ms

      wrapper(5); // Will fire around 256ms
      wrapper(6); // Ignored
      assert.strictEqual(callCount, 2);
    }, 192);

    setTimeout(function () {
      // Make sure it hasn't fired again, yet
      assert.strictEqual(callCount, 2);
    }, 250);

    setTimeout(function () {
      assert.strictEqual(callCount, 3);
    }, 280);

    setTimeout(function () {
      // Now past 320ms, so it should have fired
      assert.strictEqual(callCount, 3);
      done();
    }, 384);
  });


  it('should apply default options', function (done) {
    var callCount = 0,
      wrapper = stifle(function () { callCount++; }, 32, {});

    wrapper();
    wrapper();
    assert.strictEqual(callCount, 1);

    setTimeout(function () {
      assert.strictEqual(callCount, 2);
      done();
    }, 128);
  });


  it('should work with a system time of `0`', function (done) {
    var callCount = 0,
      dateCount = 0;

    var opts = {
      'now': function () {
        return ++dateCount < 4 ? 0 : +new Date;
      }
    };

    var wrapper = stifle(function (value) {
      callCount++;
      return value;
    }, 32, opts);

    wrapper();
    wrapper();
    wrapper();

    assert.strictEqual(callCount, 1);

    setTimeout(function () {
      assert.strictEqual(callCount, 2);
      done();
    }, 64);
  });


  it('should support cancelling delayed calls', function (done) {
    var callCount = 0;

    var wrapped = stifle(function () {
      callCount++;
    }, 32);

    wrapped();
    wrapped();
    wrapped.cancel();

    setTimeout(function () {
      assert.strictEqual(callCount, 1);
      done();
    }, 64);
  });


  it('should reset `lastCalled` after cancelling', function (done) {
    var callCount = 0;

    var wrapped = stifle(function () {
      return ++callCount;
    }, 32);

    wrapped();
    wrapped();
    wrapped.cancel();

    wrapped();
    wrapped();

    setTimeout(function () {
      assert.strictEqual(callCount, 3);
      done();
    }, 64);
  });

});

