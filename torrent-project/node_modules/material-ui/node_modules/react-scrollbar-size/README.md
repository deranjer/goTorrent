# React-Scrollbar-Size

React-Scrollbar-Size is a React component designed to calculate the size of the user agent's horizontal and vertical scrollbars.
It will also detect when the size of the scrollbars changes, such as when the user agent's zoom factor changes.

## Installation
React-Scrollbar-Size is available as an [npm package](https://www.npmjs.com/package/react-scrollbar-size):

```sh
$ npm install --save react-scrollbar-size
```

## Usage

### Props
| Name | Description |
| ---- | ---- |
| `onLoad` | Callback which will fire when the component mounts. |
| `onChange` | Callback which will fire when the scrollbar sizes change. |

Each of the callbacks accepts an object which will be updated with the following properties:

| Name | Description |
| ---- | ---- |
| `scrollbarWidth` | The current width of the vertical scrollbar. |
| `scrollbarHeight` | The current height of the horizontal scrollbar. |

### Example
```js
import React, { Component } from 'react';
import ScrollbarSize from 'react-scrollbar-size';

class MyComponent extends Component {
  scrollbarSizeLoad = (measurements) => {
    console.log('Scrollbars loaded', measurements);
  }

  scrollbarSizeChange = (measurements) => {
    console.log('Scrollbars changed', measurements);
  }

  render() {
    return (
      <div>
        <ScrollbarSize
          onLoad={this.scrollbarSizeLoad}
          onChange={this.scrollbarSizeChange}
        />
      </div>
    );
  }
}
```
To see a live example, follow these [instructions](https://github.com/STORIS/react-scrollbar-size/blob/master/examples/README.md).

## License
This project is licensed under the terms of the
[MIT license](https://github.com/STORIS/react-scrollbar-size/blob/master/LICENSE).
