'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _createBreakpoints = require('../styles/createBreakpoints');

var _requirePropFactory = require('../utils/requirePropFactory');

var _requirePropFactory2 = _interopRequireDefault(_requirePropFactory);

var _Hidden = require('../Hidden');

var _Hidden2 = _interopRequireDefault(_Hidden);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GUTTERS = [0, 8, 16, 24, 40]; // A grid component using the following libs as inspiration.
//
// For the implementation:
// - http://v4-alpha.getbootstrap.com/layout/flexbox-grid/
// - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
// - https://github.com/roylee0704/react-flexbox-grid
// - https://material.angularjs.org/latest/layout/introduction
//
// Follow this flexbox Guide to better understand the underlying model:
// - https://css-tricks.com/snippets/css/a-guide-to-flexbox/

var GRID_SIZES = [true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateGrid(globalStyles, theme, breakpoint) {
  // For the auto layouting
  var styles = (0, _defineProperty3.default)({}, 'grid-' + breakpoint, {
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: '100%'
  });

  GRID_SIZES.forEach(function (size) {
    if (typeof size === 'boolean') {
      // Skip the first one as handle above.
      return;
    }

    // Only keep 6 significant numbers.
    var width = Math.round(size / 12 * 10e6) / 10e4 + '%';

    /* eslint-disable max-len */
    // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41
    /* eslint-enable max-len */
    styles['grid-' + breakpoint + '-' + size] = {
      flexBasis: width,
      maxWidth: width
    };
  });

  // No need for a media query for the first size.
  if (breakpoint === 'xs') {
    (0, _extends3.default)(globalStyles, styles);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}

function generateGutter(theme, breakpoint) {
  var styles = {};

  GUTTERS.forEach(function (spacing, index) {
    if (index === 0) {
      // Skip the default style.
      return;
    }

    styles['spacing-' + breakpoint + '-' + spacing] = {
      margin: -spacing / 2,
      width: 'calc(100% + ' + spacing + 'px)',
      '& > $typeItem': {
        padding: spacing / 2
      }
    };
  });

  return styles;
}

// Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',
var styles = exports.styles = function styles(theme) {
  return (0, _extends3.default)({
    typeContainer: {
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%'
    },
    typeItem: {
      boxSizing: 'border-box',
      flex: '0 0 auto',
      margin: '0' // For instance, it's useful when used with a `figure` element.
    },
    zeroMinWidth: {
      minWidth: 0
    },
    'direction-xs-column': {
      flexDirection: 'column'
    },
    'direction-xs-column-reverse': {
      flexDirection: 'column-reverse'
    },
    'direction-xs-row-reverse': {
      flexDirection: 'row-reverse'
    },
    'wrap-xs-nowrap': {
      flexWrap: 'nowrap'
    },
    'wrap-xs-wrap-reverse': {
      flexWrap: 'wrap-reverse'
    },
    'align-items-xs-center': {
      alignItems: 'center'
    },
    'align-items-xs-flex-start': {
      alignItems: 'flex-start'
    },
    'align-items-xs-flex-end': {
      alignItems: 'flex-end'
    },
    'align-items-xs-baseline': {
      alignItems: 'baseline'
    },
    'align-content-xs-center': {
      alignContent: 'center'
    },
    'align-content-xs-flex-start': {
      alignContent: 'flex-start'
    },
    'align-content-xs-flex-end': {
      alignContent: 'flex-end'
    },
    'align-content-xs-space-between': {
      alignContent: 'space-between'
    },
    'align-content-xs-space-around': {
      alignContent: 'space-around'
    },
    'justify-xs-center': {
      justifyContent: 'center'
    },
    'justify-xs-flex-end': {
      justifyContent: 'flex-end'
    },
    'justify-xs-space-between': {
      justifyContent: 'space-between'
    },
    'justify-xs-space-around': {
      justifyContent: 'space-around'
    }
  }, generateGutter(theme, 'xs'), _createBreakpoints.keys.reduce(function (accumulator, key) {
    // Use side effect over immutability for better performance.
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {}));
};

function Grid(props) {
  var _classNames;

  var alignContent = props.alignContent,
      alignItems = props.alignItems,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      container = props.container,
      direction = props.direction,
      hidden = props.hidden,
      item = props.item,
      justify = props.justify,
      lg = props.lg,
      md = props.md,
      zeroMinWidth = props.zeroMinWidth,
      sm = props.sm,
      spacing = props.spacing,
      wrap = props.wrap,
      xl = props.xl,
      xs = props.xs,
      other = (0, _objectWithoutProperties3.default)(props, ['alignContent', 'alignItems', 'classes', 'className', 'component', 'container', 'direction', 'hidden', 'item', 'justify', 'lg', 'md', 'zeroMinWidth', 'sm', 'spacing', 'wrap', 'xl', 'xs']);


  var className = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.typeContainer, container), (0, _defineProperty3.default)(_classNames, classes.typeItem, item), (0, _defineProperty3.default)(_classNames, classes.zeroMinWidth, zeroMinWidth), (0, _defineProperty3.default)(_classNames, classes['spacing-xs-' + String(spacing)], container && spacing !== 0), (0, _defineProperty3.default)(_classNames, classes['direction-xs-' + String(direction)], direction !== Grid.defaultProps.direction), (0, _defineProperty3.default)(_classNames, classes['wrap-xs-' + String(wrap)], wrap !== Grid.defaultProps.wrap), (0, _defineProperty3.default)(_classNames, classes['align-items-xs-' + String(alignItems)], alignItems !== Grid.defaultProps.alignItems), (0, _defineProperty3.default)(_classNames, classes['align-content-xs-' + String(alignContent)], alignContent !== Grid.defaultProps.alignContent), (0, _defineProperty3.default)(_classNames, classes['justify-xs-' + String(justify)], justify !== Grid.defaultProps.justify), (0, _defineProperty3.default)(_classNames, classes['grid-xs'], xs === true), (0, _defineProperty3.default)(_classNames, classes['grid-xs-' + String(xs)], xs && xs !== true), (0, _defineProperty3.default)(_classNames, classes['grid-sm'], sm === true), (0, _defineProperty3.default)(_classNames, classes['grid-sm-' + String(sm)], sm && sm !== true), (0, _defineProperty3.default)(_classNames, classes['grid-md'], md === true), (0, _defineProperty3.default)(_classNames, classes['grid-md-' + String(md)], md && md !== true), (0, _defineProperty3.default)(_classNames, classes['grid-lg'], lg === true), (0, _defineProperty3.default)(_classNames, classes['grid-lg-' + String(lg)], lg && lg !== true), (0, _defineProperty3.default)(_classNames, classes['grid-xl'], xl === true), (0, _defineProperty3.default)(_classNames, classes['grid-xl-' + String(xl)], xl && xl !== true), _classNames), classNameProp);
  var gridProps = (0, _extends3.default)({ className: className }, other);

  if (hidden) {
    return _react2.default.createElement(
      _Hidden2.default,
      hidden,
      _react2.default.createElement(Component, gridProps)
    );
  }

  return _react2.default.createElement(Component, gridProps);
}

Grid.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Defines the `align-content` style property.
   * It's applied for all screen sizes.
   */
  alignContent: _propTypes2.default.oneOf(['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around']),
  /**
   * Defines the `align-items` style property.
   * It's applied for all screen sizes.
   */
  alignItems: _propTypes2.default.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  /**
   * The content of the component.
   */
  children: _propTypes2.default.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   */
  container: _propTypes2.default.bool,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   */
  direction: _propTypes2.default.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  /**
   * If provided, will wrap with [Hidden](/api/hidden) component and given properties.
   */
  hidden: _propTypes2.default.object,
  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   */
  item: _propTypes2.default.bool,
  /**
   * Defines the `justify-content` style property.
   * It is applied for all screen sizes.
   */
  justify: _propTypes2.default.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lg: _propTypes2.default.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   */
  md: _propTypes2.default.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   */
  sm: _propTypes2.default.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the space between the type `item` component.
   * It can only be used on a type `container` component.
   */
  spacing: _propTypes2.default.oneOf(GUTTERS),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   */
  wrap: _propTypes2.default.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   */
  xl: _propTypes2.default.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   */
  xs: _propTypes2.default.oneOf([true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth: _propTypes2.default.bool
} : {};

Grid.defaultProps = {
  alignContent: 'stretch',
  alignItems: 'stretch',
  component: 'div',
  container: false,
  direction: 'row',
  item: false,
  justify: 'flex-start',
  zeroMinWidth: false,
  spacing: 16,
  wrap: 'wrap'
};

// Add a wrapper component to generate some helper messages in the development
// environment.
/* eslint-disable react/no-multi-comp */
// eslint-disable-next-line import/no-mutable-exports
var GridWrapper = Grid;

if (process.env.NODE_ENV !== 'production') {
  GridWrapper = function GridWrapper(props) {
    return _react2.default.createElement(Grid, props);
  };

  var requireProp = (0, _requirePropFactory2.default)('Grid');
  GridWrapper.propTypes = {
    alignContent: requireProp('container'),
    alignItems: requireProp('container'),
    direction: requireProp('container'),
    justify: requireProp('container'),
    lg: requireProp('item'),
    md: requireProp('item'),
    sm: requireProp('item'),
    spacing: requireProp('container'),
    wrap: requireProp('container'),
    xs: requireProp('item'),
    zeroMinWidth: requireProp('zeroMinWidth')
  };
}

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiGrid' })(GridWrapper);