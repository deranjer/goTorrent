'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'inline-block',
      fill: 'currentColor',
      height: 24,
      width: 24,
      userSelect: 'none',
      flexShrink: 0,
      transition: theme.transitions.create('fill', {
        duration: theme.transitions.duration.shorter
      })
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Elements passed into the SVG Icon.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired,

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: require('prop-types').string,

  /**
   * Allows you to redefine what the coordinates without units mean inside an svg element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the svg will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   */
  viewBox: require('prop-types').string
};


function SvgIcon(props) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      titleAccess = props.titleAccess,
      viewBox = props.viewBox,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'classes', 'className', 'titleAccess', 'viewBox']);


  return _react2.default.createElement(
    'svg',
    (0, _extends3.default)({
      className: (0, _classnames2.default)(classes.root, className),
      focusable: 'false',
      viewBox: viewBox,
      'aria-hidden': titleAccess ? 'false' : 'true'
    }, other),
    titleAccess ? _react2.default.createElement(
      'title',
      null,
      titleAccess
    ) : null,
    children
  );
}

SvgIcon.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'titleAccess', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'viewBox', require('prop-types').string), _ref) : {};
SvgIcon.defaultProps = {
  viewBox: '0 0 24 24'
};

SvgIcon.muiName = 'SvgIcon';

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiSvgIcon' })(SvgIcon);