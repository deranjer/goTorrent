material-ui-upload
----------------------

[![Build Status](https://travis-ci.org/corpix/material-ui-upload.svg?branch=master)](https://travis-ci.org/corpix/material-ui-upload)

Upload controls made in material-ui using [FileAPI][file-api]

# Components

## Upload

Upload button, based on [FlatButton][flat-button].

![Upload button](screenshot-upload.png)

## Upload Preview

Upload with preview for images, based on [Card][card].

> Empty

![Upload preview](screenshot-upload-preview-empty.png)

> With pictures

![Upload preview](screenshot-upload-preview-with-pictures.png)

# Requirements

- Your project should be configured to use CSS modules

# Installation

``` shell
yarn add material-ui-upload
```

Or with npm

```shell
npm i --save material-ui-upload
```

# Usage example

> You could see live examples providen with storybook, just `make storybook-server` in the root of the repository.

## Upload

``` jsx
import React, {Component} from 'react';
import Upload from 'material-ui-upload/Upload';

class MyComponent extends Component {
    onFileLoad = (e, file) => console.log(e.target.result, file.name);

    render() {
        return (
            <Upload label="Add" onFileLoad={this.onFileLoad}/>
        );
    }
}

```

## UploadPreview

``` jsx
import React, {Component} from 'react';
import UploadPreview from 'material-ui-upload/UploadPreview';

class MyComponent extends Component {
    constructor() {
        super();
        this.state = {
            pictures: {}
        };
    }

    onChange = (pictures) => this.setState({pictures});

    render() {
        return (
            <UploadPreview
              title="Picture"
              label="Add"
              initialItems={this.state.pictures}
              onChange={this.onChange}
              />
        );
    }
}
```

# Properties

## Upload

[FlatButton][flat-button] props can be used on this component.

> For FlatButton props please see [material-ui docs][flat-button].

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| fileTypeRegex | `RegExp` | `/.*/` | Regexp that matches allowed file names. |
| onFileLoad | `function` | `(e, file) => undefined` | [FileReader#onload][onload] event handler which receives a `FileReader` event and original file object. |
| buttonControl | `function` | `material-ui/FlatButton` | Control constructor to use as upload button. |

## UploadPreview

Upload component props can be used on this component.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | `string` | `''` | Title of the [Card][card]. |
| onFileLoad | `function` | `(e, file) => undefined` | [FileReader#onload][onload] event handler which receives a `FileReader` event and original file object. |
| label | `string` | `Upload` | Upload button label. |
| onChange | `function` | `(items) => undefined` | When state of the component changes(file added, removed, removed all) this function will be fired with a hash of items as argument(each item key is a sha1 of the base64 dataURI __this may change to 'hash of a file content' in the future__). |
| initialItems | `object` | `{}` | Predefined items. |

# License

[MIT](/LICENSE)


[card]: http://www.material-ui.com/#/components/card
[flat-button]: http://www.material-ui.com/#/components/flat-button
[file-api]: https://developer.mozilla.org/en-US/docs/Web/API/File
[onload]: https://developer.mozilla.org/ru/docs/Web/API/FileReader/onload
