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

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_ElementType = require('react').babelPluginFlowReactPropTypes_proptype_ElementType || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      flex: '1 1 auto',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      position: 'relative'
    },
    padding: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    dense: {
      paddingTop: theme.spacing.unit / 2,
      paddingBottom: theme.spacing.unit / 2
    },
    subheader: {
      paddingTop: 0
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * The content of the component.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

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
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used for
   * the list and list items. The property is available to descendant components as the
   * `dense` context.
   */
  dense: require('prop-types').bool,

  /**
   * If `true`, vertical padding will be removed from the list.
   */
  disablePadding: require('prop-types').bool,

  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef: require('prop-types').func,

  /**
   * The content of the component, normally `ListItem`.
   */
  subheader: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
};

var List = function (_React$Component) {
  (0, _inherits3.default)(List, _React$Component);

  function List() {
    (0, _classCallCheck3.default)(this, List);
    return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));
  }

  (0, _createClass3.default)(List, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        dense: this.props.dense
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          classes = _props.classes,
          classNameProp = _props.className,
          ComponentProp = _props.component,
          disablePadding = _props.disablePadding,
          children = _props.children,
          dense = _props.dense,
          subheader = _props.subheader,
          rootRef = _props.rootRef,
          other = (0, _objectWithoutProperties3.default)(_props, ['classes', 'className', 'component', 'disablePadding', 'children', 'dense', 'subheader', 'rootRef']);

      var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.dense, dense && !disablePadding), (0, _defineProperty3.default)(_classNames, classes.padding, !disablePadding), (0, _defineProperty3.default)(_classNames, classes.subheader, subheader), _classNames), classNameProp);

      return _react2.default.createElement(
        ComponentProp,
        (0, _extends3.default)({ className: className }, other, { ref: rootRef }),
        subheader,
        children
      );
    }
  }]);
  return List;
}(_react2.default.Component);

List.defaultProps = {
  component: 'ul',
  dense: false,
  disablePadding: false
};


List.childContextTypes = {
  dense: _propTypes2.default.bool
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiList' })(List);