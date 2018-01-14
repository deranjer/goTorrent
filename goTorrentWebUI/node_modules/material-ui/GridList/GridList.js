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

var _ref; //  weak

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_ElementType = require('react').babelPluginFlowReactPropTypes_proptype_ElementType || require('prop-types').any;

var styles = exports.styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.
  }
};

var babelPluginFlowReactPropTypes_proptype_CellHeight = require('prop-types').oneOfType([require('prop-types').number, require('prop-types').oneOf(['auto'])]);

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * Number of px for one cell height.
   * You can set `'auto'` if you want to let the children determine the height.
   */
  cellHeight: require('prop-types').oneOfType([require('prop-types').number, require('prop-types').oneOf(['auto'])]),

  /**
   * Grid Tiles that will be in Grid List.
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
   * Number of columns.
   */
  cols: require('prop-types').number,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * By default we map the type to a good default headline component.
   */
  component: typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType),

  /**
   * Number of px for the spacing between tiles.
   */
  spacing: require('prop-types').number,

  /**
   * @ignore
   */
  style: require('prop-types').object
};


function GridList(props) {
  var cols = props.cols,
      spacing = props.spacing,
      cellHeight = props.cellHeight,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      ComponentProp = props.component,
      style = props.style,
      other = (0, _objectWithoutProperties3.default)(props, ['cols', 'spacing', 'cellHeight', 'children', 'classes', 'className', 'component', 'style']);


  return _react2.default.createElement(
    ComponentProp,
    (0, _extends3.default)({
      className: (0, _classnames2.default)(classes.root, classNameProp),
      style: (0, _extends3.default)({ margin: -spacing / 2 }, style)
    }, other),
    _react2.default.Children.map(children, function (currentChild) {
      var childCols = currentChild.props.cols || 1;
      var childRows = currentChild.props.rows || 1;

      return _react2.default.cloneElement(currentChild, {
        style: (0, _extends3.default)({
          width: 100 / cols * childCols + '%',
          height: cellHeight === 'auto' ? 'auto' : cellHeight * childRows + spacing,
          padding: spacing / 2
        }, currentChild.props.style)
      });
    })
  );
}

GridList.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  cols: require('prop-types').number.isRequired,
  spacing: require('prop-types').number.isRequired,
  cellHeight: require('prop-types').oneOfType([require('prop-types').number, require('prop-types').oneOf(['auto'])]).isRequired,
  component: typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType.isRequired ? babelPluginFlowReactPropTypes_proptype_ElementType.isRequired : babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType).isRequired
}, (0, _defineProperty3.default)(_ref, 'cellHeight', require('prop-types').oneOfType([require('prop-types').number, require('prop-types').oneOf(['auto'])])), (0, _defineProperty3.default)(_ref, 'children', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired), (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'cols', require('prop-types').number), (0, _defineProperty3.default)(_ref, 'component', typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType)), (0, _defineProperty3.default)(_ref, 'spacing', require('prop-types').number), (0, _defineProperty3.default)(_ref, 'style', require('prop-types').object), _ref) : {};
GridList.defaultProps = {
  cols: 2,
  spacing: 4,
  cellHeight: 180,
  component: 'ul'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiGridList' })(GridList);