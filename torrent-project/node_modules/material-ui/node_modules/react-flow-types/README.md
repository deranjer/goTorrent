# react-flow-types

[![npm downloads](https://img.shields.io/npm/dt/react-flow-types.svg)](https://www.npmjs.com/package/react-flow-types)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/nordsoftware/react-flow-types/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/norsoftware/open-source.svg?maxAge=2592000)](https://gitter.im/nordsoftware/open-source)

## Note

Most of the types that used to be in this package now have equivalents in [flow@0.53](https://github.com/facebook/flow/releases/tag/v0.53.0), so I'm deprecating them. The most important type that still remains is `HigherOrderComponent`. If you come up with more useful types for react, feel free to submit a PR :)

## Usage

```
$ npm install --save-dev react-flow-types
```

### `HigherOrderComponent<RequiredProps, ProvidedProps>`

The generic type of a higher-order component. A `HigherOrderComponent` always *provides* a set of props to the inner component, and *requires* another set of props to be passed to it.

Example:

```javascript
import type {HigherOrderComponent} from 'react-flow-types'

type RequiredProps = {
  name: string,
}

type ProvidedProps = {
  input: {
    value: mixed,
    onChange: Function,
  },
}

// The hoc:
const asField = (): HigherOrderComponent<{name: string}, ProvidedProps> => (component): any => {
  const FinalComponent = ({name, ...rest}) =>
    <ReduxFormField name={name} component={component} props={rest} />;

  hoistNonReactStatics(FinalComponent, component)

  FinalComponent.displayName =
    `asField(${component.displayName || component.name || 'Component'})`

  return FinalComponent
}

const Input = ({input}) => <input type="text" {...input} />
const WrapperInput = asField(Input)

const element = <WrappedInput name="email" />
```