'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ref; //  weak

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      position: 'absolute',
      height: 2,
      bottom: 0,
      width: '100%',
      transition: theme.transitions.create(),
      willChange: 'left, width'
    },
    colorAccent: {
      backgroundColor: theme.palette.secondary.A200
    },
    colorPrimary: {
      backgroundColor: theme.palette.primary[500]
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_IndicatorStyle = {
  left: require('prop-types').number.isRequired,
  width: require('prop-types').number.isRequired
};
var babelPluginFlowReactPropTypes_proptype_ProvidedProps = {
  classes: require('prop-types').object.isRequired
};
var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * @ignore
   * The color of the tab indicator.
   */
  color: require('prop-types').oneOfType([require('prop-types').oneOf(['accent']), require('prop-types').oneOf(['primary']), require('prop-types').string]).isRequired,

  /**
   * @ignore
   * The style of the root element.
   */
  style: require('prop-types').shape({
    left: require('prop-types').number.isRequired,
    width: require('prop-types').number.isRequired
  }).isRequired
};


/**
 * @ignore - internal component.
 */
function TabIndicator(props) {
  var classes = props.classes,
      classNameProp = props.className,
      color = props.color,
      styleProp = props.style;

  var colorPredefined = ['primary', 'accent'].indexOf(color) !== -1;
  var className = (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes['color' + (0, _helpers.capitalizeFirstLetter)(color)], colorPredefined), classNameProp);

  var style = colorPredefined ? styleProp : (0, _extends3.default)({}, styleProp, {
    backgroundColor: color
  });

  return _react2.default.createElement('div', { className: className, style: style });
}

TabIndicator.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'color', require('prop-types').oneOfType([require('prop-types').oneOf(['accent']), require('prop-types').oneOf(['primary']), require('prop-types').string]).isRequired), (0, _defineProperty3.default)(_ref, 'style', require('prop-types').shape({
  left: require('prop-types').number.isRequired,
  width: require('prop-types').number.isRequired
}).isRequired), _ref) : {};
exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTabIndicator' })(TabIndicator);