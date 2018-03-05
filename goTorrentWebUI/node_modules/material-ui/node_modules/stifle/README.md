stifle
======

Wrap a function, so it is only called (at most) once every X milliseconds.

```javascript
    var stifle = require('stifle')

    // A silly little clock
    function tellTime () {
      console.log('The time is now ' + new Date())
    }

    // Only show the time once per second
    var secondHand = stifle(tellTime, 1000)

    // Call it like crazy, but it will only fire once per second
    var interval = setInterval(secondHand, 10)
```

## Cancellation

The wrapped function comes with a `cancel` method to kill any pending future invocations -- useful for shutting it down when a page or component is being unloaded.


```javascript
    // Stop calling the secondHand
    clearInterval(interval)

    // Cancel pending calls, or else it will fire one more time
    secondHand.cancel()
```

## No Extras

To keep it fast and simple, `stifle` does not support:
* passing parameters
* returning values
* recursive invocation
* "flushing" pending invocations
* leading/trailing options

If you want those fancy features, check out [lodash.throttle](https://lodash.com/docs/4.17.4#throttle)

