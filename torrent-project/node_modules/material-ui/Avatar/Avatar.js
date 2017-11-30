'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _colorManipulator = require('../styles/colorManipulator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Element = require('react').babelPluginFlowReactPropTypes_proptype_Element || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_ElementType = require('react').babelPluginFlowReactPropTypes_proptype_ElementType || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 40,
      height: 40,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(20),
      borderRadius: '50%',
      overflow: 'hidden',
      userSelect: 'none'
    },
    colorDefault: {
      color: theme.palette.background.default,
      backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.background.default, 0.26)
    },
    img: {
      maxWidth: '100%',
      width: '100%',
      height: 'auto'
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: require('prop-types').string,

  /**
   * Used to render icon or text elements inside the Avatar.
   * `src` and `alt` props will not be used and no `img` will
   * be rendered by default.
   *
   * This can be an element, or just a string.
   */
  children: require('prop-types').oneOfType([require('prop-types').string, typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element)]),

  /**
   * @ignore
   * The className of the child element.
   * Used by Chip and ListItemIcon to style the Avatar icon.
   */
  childrenClassName: require('prop-types').string,

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType),

  /**
   * Properties applied to the `img` element when the component
   * is used to display an image.
   */
  imgProps: require('prop-types').object,

  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: require('prop-types').string,

  /**
   * The `src` attribute for the `img` element.
   */
  src: require('prop-types').string,

  /**
   * The `srcSet` attribute for the `img` element.
   */
  srcSet: require('prop-types').string
};


function Avatar(props) {
  var alt = props.alt,
      classes = props.classes,
      classNameProp = props.className,
      childrenProp = props.children,
      childrenClassNameProp = props.childrenClassName,
      ComponentProp = props.component,
      imgProps = props.imgProps,
      sizes = props.sizes,
      src = props.src,
      srcSet = props.srcSet,
      other = (0, _objectWithoutProperties3.default)(props, ['alt', 'classes', 'className', 'children', 'childrenClassName', 'component', 'imgProps', 'sizes', 'src', 'srcSet']);


  var className = (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.colorDefault, childrenProp && !src && !srcSet), classNameProp);
  var children = null;

  if (childrenProp) {
    if (childrenClassNameProp && typeof childrenProp !== 'string' && _react2.default.isValidElement(childrenProp)) {
      var _childrenClassName = (0, _classnames2.default)(childrenClassNameProp, childrenProp.props.className);
      children = _react2.default.cloneElement(childrenProp, { className: _childrenClassName });
    } else {
      children = childrenProp;
    }
  } else if (src || srcSet) {
    children = _react2.default.createElement('img', (0, _extends3.default)({
      alt: alt,
      src: src,
      srcSet: srcSet,
      sizes: sizes,
      className: classes.img
    }, imgProps));
  }

  return _react2.default.createElement(
    ComponentProp,
    (0, _extends3.default)({ className: className }, other),
    children
  );
}

Avatar.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  component: typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType.isRequired ? babelPluginFlowReactPropTypes_proptype_ElementType.isRequired : babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType).isRequired,
  alt: require('prop-types').string,
  children: require('prop-types').oneOfType([require('prop-types').string, typeof babelPluginFlowReactPropTypes_proptype_Element === 'function' ? babelPluginFlowReactPropTypes_proptype_Element : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Element)]),
  childrenClassName: require('prop-types').string
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'component', typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType)), (0, _defineProperty3.default)(_ref, 'imgProps', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'sizes', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'src', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'srcSet', require('prop-types').string), _ref) : {};
Avatar.defaultProps = {
  component: 'div'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiAvatar' })(Avatar);