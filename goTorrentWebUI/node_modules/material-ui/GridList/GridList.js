'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function GridList(props) {
  var cellHeight = props.cellHeight,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      cols = props.cols,
      Component = props.component,
      spacing = props.spacing,
      style = props.style,
      other = (0, _objectWithoutProperties3.default)(props, ['cellHeight', 'children', 'classes', 'className', 'cols', 'component', 'spacing', 'style']);


  return _react2.default.createElement(
    Component,
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

GridList.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Number of px for one cell height.
   * You can set `'auto'` if you want to let the children determine the height.
   */
  cellHeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.oneOf(['auto'])]),
  /**
   * Grid Tiles that will be in Grid List.
   */
  children: _propTypes2.default.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * Number of columns.
   */
  cols: _propTypes2.default.number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  /**
   * Number of px for the spacing between tiles.
   */
  spacing: _propTypes2.default.number,
  /**
   * @ignore
   */
  style: _propTypes2.default.object
} : {};

GridList.defaultProps = {
  cellHeight: 180,
  cols: 2,
  component: 'ul',
  spacing: 4
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiGridList' })(GridList);