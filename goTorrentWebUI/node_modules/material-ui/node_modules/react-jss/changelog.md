## 7.2.0 / 2017-09-23

- Add `generateClassName` prop to `JssProvider` in order to support multi-tree apps.

## 7.1.0 / 2017-08-16

- Added custom `theming` option

## 7.0.2 / 2017-07-19

- Fix theming with `JssProvider`

## 7.0.0 / 2017-07-13

- Added theming support, introduced `ThemeProvider` and  `withTheme`.
- Function `injectSheet` now accepts a styles creator function which receives a theme.
- Updated to JSS 8
- Class generator counter will reset on every request for dynamic SSR.
- Dynamic styles are now also added to the sheets registry for SSR.
- Fixed classnames generators for dynamic SSR (generating sheets on each request).

### Breaking changes

- Removed `createInjectSheet`. Use JssProvider to pass a `jss` instead.
- Renamed `SheetsRegistryProvider` to `JssProvider`.
- Function `injectSheet` doesn't accept a StyleSheet instance any more. Potential solutions:
  - Extract common sheet into separate component.
  - Mix reusable styles into component styles.
  - Reuse a sheet directly, by managing your own sheet and using a `composes` feature.

## 7.0.0-pre.1 / 2017-07-06

- Add sheets to the registry when it is a new instance

## 7.0.0-pre / 2017-06-28

- Theming - `ThemeProvider` and `withTheme`
- Update to JSS 8
- Class generator counter will reset on every request for dynamic SSR.

### Breaking changes

- Removed `createInjectSheet`. Use JssProvider to pass a `jss` instead.
- Renamed `SheetsRegistryProvider` to `JssProvider`.

## 6.1.1 / 2017-04-14

- Use prop-types package

## 6.1.0 / 2017-04-14

- Refactored the structure
- Exposed and documented `StyledComponent.InnerComponent`
- Fixed default props not being passed to the function values. (#87)

## 6.0.0 / 2017-04-10

- Use JSS 7.0

## 5.4.1 / 2017-04-03

- Don't ignore static rules when function values are used (#82)

## 5.4.0 / 2017-03-14

- Introduced function values.

## 5.3.0 / 2017-01-30

- Pass `classes` object over props additionally to `sheet` prop.

## 5.2.0 / 2017-01-13

- Function injectSheet(styleSheet) now accepts StyleSheet instance.
- You can override the sheet property now from the parent component. (#47)

## 5.1.1 / 2016-12-31

- Fix specificity for the most cases cssinjs/react-jss#61

## 5.1.0 / 2016-12-13

- Export SheetsRegistryProvider and SheetsRegistry

## 5.0.0 / 2016-12-09

- Support JSS 6.0

## 4.2.0 / 2016-11-21

- Upgrade to jss-present-default 0.9.0

## 4.1.3 / 2016-11-03

- Fixing tests (React regression https://github.com/facebook/react/issues/7803)

## 4.1.2 / 2016-10-07

-  Fix refs inconsistency on hot reloading #18

## 4.1.1 / 2016-09-27

- Update dependencies
- Tests integration for jss repo

## 4.1.0 / 2016-09-27

- Make default Jss instance available.

## 4.0.3 / 2016-09-25

- Default Container component should render children to allow wrapping.

## 4.0.2 / 2016-09-25

- Maked passing a component optional.

## 4.0.1 / 2016-09-25

- Fix test runner for jss main repo.

## 4.0.0 / 2016-09-24

- Added jss and jss-preset-default as a dependency, uses jss-preset-default by default #49.
- Added tests #28.
- Streamlined the api, default export is now a function without overloads, it is `injectSheet(styles, [options])(Component)`, same signature is used by ES7 decorators #37.
- Added component name as data-meta attribute to the sheet #22.
- Added a `create()` function to create a new `injectSheet` function which takes a `jss` instance.
- Updated readme.
- Added lint-staged.
