module.exports = stifle;


function stifle (fn, wait) {
  if (typeof fn !== 'function' || typeof wait !== 'number') {
    throw new Error('stifle(fn, wait) -- expected a function and number of milliseconds, got (' + typeof fn + ', ' + typeof wait + ')');
  }

  var timer;    // Timer to fire after `wait` has elapsed
  var called;   // Keep track if it gets called during the `wait`

  var wrapper = function () {

    // Check if still "cooling down" from a previous call
    if (timer) {
      called = true;
    } else {
      // Start a timer to fire after the `wait` is over
      timer = setTimeout(afterWait, wait);
      // And call the wrapped function
      fn();
    }
  }

  // Add a cancel method, to kill and pending calls
  wrapper.cancel = function () {
    // Clear the called flag, or it would fire twice when called again later
    called = false;

    // Turn off the timer, so it won't fire after the wait expires
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  function afterWait() {
    // Empty out the timer
    timer = undefined;

    // If it was called during the `wait`, fire it again
    if (called) {
      called = false;
      wrapper();
    }
  }

  return wrapper;
}
