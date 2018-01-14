'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _inDOM = require('dom-helpers/util/inDOM');

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * The content to portal in order to escape the parent DOM node.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * If `true` the children will be mounted into the DOM.
   */
  open: require('prop-types').bool
};

/**
 * @ignore - internal component.
 */
var Portal = function (_React$Component) {
  (0, _inherits3.default)(Portal, _React$Component);

  function Portal() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Portal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Portal.__proto__ || (0, _getPrototypeOf2.default)(Portal)).call.apply(_ref, [this].concat(args))), _this), _this.layer = null, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Support react@15.x, will be removed at some point
      if (!_reactDom2.default.createPortal) {
        this.renderLayer();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // Support react@15.x, will be removed at some point
      if (!_reactDom2.default.createPortal) {
        this.renderLayer();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unrenderLayer();
    }
  }, {
    key: 'getLayer',
    value: function getLayer() {
      if (!this.layer) {
        this.layer = document.createElement('div');
        this.layer.setAttribute('data-mui-portal', 'true');
        if (document.body && this.layer) {
          document.body.appendChild(this.layer);
        }
      }

      return this.layer;
    }
  }, {
    key: 'unrenderLayer',
    value: function unrenderLayer() {
      if (!this.layer) {
        return;
      }

      // Support react@15.x, will be removed at some point
      if (!_reactDom2.default.createPortal) {
        _reactDom2.default.unmountComponentAtNode(this.layer);
      }

      if (document.body) {
        document.body.removeChild(this.layer);
      }
      this.layer = null;
    }
  }, {
    key: 'renderLayer',
    value: function renderLayer() {
      var _props = this.props,
          children = _props.children,
          open = _props.open;


      if (open) {
        // By calling this method in componentDidMount() and
        // componentDidUpdate(), you're effectively creating a "wormhole" that
        // funnels React's hierarchical updates through to a DOM node on an
        // entirely different part of the page.
        var layerElement = _react2.default.Children.only(children);
        _reactDom2.default.unstable_renderSubtreeIntoContainer(this, layerElement, this.getLayer());
      } else {
        this.unrenderLayer();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          open = _props2.open;

      // Support react@15.x, will be removed at some point

      if (!_reactDom2.default.createPortal) {
        return null;
      }

      // Can't be rendered server-side.
      if (_inDOM2.default) {
        if (open) {
          return _reactDom2.default.createPortal(children, this.getLayer());
        }

        this.unrenderLayer();
      }

      return null;
    }
  }]);
  return Portal;
}(_react2.default.Component);

Portal.defaultProps = {
  open: false
};
Portal.propTypes = process.env.NODE_ENV !== "production" ? {
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),
  open: require('prop-types').bool
} : {};
exports.default = Portal;