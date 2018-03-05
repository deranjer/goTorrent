'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = {
  root: {
    boxSizing: 'border-box',
    flexShrink: 0
  },
  tile: {
    position: 'relative',
    display: 'block', // In case it's not renderd with a div.
    height: '100%',
    overflow: 'hidden'
  },
  imgFullHeight: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%'
  },
  imgFullWidth: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(-50%)',
    top: '50%'
  }
};

var GridListTile = function (_React$Component) {
  (0, _inherits3.default)(GridListTile, _React$Component);

  function GridListTile() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, GridListTile);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = GridListTile.__proto__ || (0, _getPrototypeOf2.default)(GridListTile)).call.apply(_ref, [this].concat(args))), _this), _this.imgElement = null, _this.handleResize = (0, _debounce2.default)(function () {
      _this.fit();
    }, 166), _this.fit = function () {
      var imgElement = _this.imgElement;

      if (!imgElement) {
        return;
      }

      if (!imgElement.complete) {
        return;
      }

      if (imgElement.width / imgElement.height > imgElement.parentNode.offsetWidth / imgElement.parentNode.offsetHeight) {
        var _imgElement$classList, _imgElement$classList2;

        (_imgElement$classList = imgElement.classList).remove.apply(_imgElement$classList, (0, _toConsumableArray3.default)(_this.props.classes.imgFullWidth.split(' ')));
        (_imgElement$classList2 = imgElement.classList).add.apply(_imgElement$classList2, (0, _toConsumableArray3.default)(_this.props.classes.imgFullHeight.split(' ')));
      } else {
        var _imgElement$classList3, _imgElement$classList4;

        (_imgElement$classList3 = imgElement.classList).remove.apply(_imgElement$classList3, (0, _toConsumableArray3.default)(_this.props.classes.imgFullHeight.split(' ')));
        (_imgElement$classList4 = imgElement.classList).add.apply(_imgElement$classList4, (0, _toConsumableArray3.default)(_this.props.classes.imgFullWidth.split(' ')));
      }

      imgElement.removeEventListener('load', _this.fit);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(GridListTile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.ensureImageCover();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.ensureImageCover();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.handleResize.cancel();
    }
  }, {
    key: 'ensureImageCover',
    value: function ensureImageCover() {
      if (!this.imgElement) {
        return;
      }

      if (this.imgElement.complete) {
        this.fit();
      } else {
        this.imgElement.addEventListener('load', this.fit);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          className = _props.className,
          cols = _props.cols,
          Component = _props.component,
          rows = _props.rows,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'classes', 'className', 'cols', 'component', 'rows']);


      return _react2.default.createElement(
        Component,
        (0, _extends3.default)({ className: (0, _classnames2.default)(classes.root, className) }, other),
        _react2.default.createElement(_reactEventListener2.default, { target: 'window', onResize: this.handleResize }),
        _react2.default.createElement(
          'div',
          { className: classes.tile },
          _react2.default.Children.map(children, function (child) {
            if (child && child.type === 'img') {
              return _react2.default.cloneElement(child, {
                key: 'img',
                ref: function ref(node) {
                  _this2.imgElement = node;
                }
              });
            }

            return child;
          })
        )
      );
    }
  }]);
  return GridListTile;
}(_react2.default.Component);

GridListTile.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in which case GridListTile takes care of making the image "cover" available space
   * (similar to `background-size: cover` or to `object-fit: cover`).
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
   * Width of the tile in number of grid cells.
   */
  cols: _propTypes2.default.number,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  /**
   * Height of the tile in number of grid cells.
   */
  rows: _propTypes2.default.number
} : {};

GridListTile.defaultProps = {
  cols: 1,
  component: 'li',
  rows: 1
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiGridListTile' })(GridListTile);