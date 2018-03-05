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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _stifle = require('stifle');

var _stifle2 = _interopRequireDefault(_stifle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
	width: '100px',
	height: '100px',
	position: 'absolute',
	top: '-100000px',
	overflow: 'scroll',
	msOverflowStyle: 'scrollbar'
};

var ScrollbarSize = function (_Component) {
	(0, _inherits3.default)(ScrollbarSize, _Component);

	function ScrollbarSize() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, ScrollbarSize);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ScrollbarSize.__proto__ || (0, _getPrototypeOf2.default)(ScrollbarSize)).call.apply(_ref, [this].concat(args))), _this), _this.setMeasurements = function () {
			_this.scrollbarHeight = _this.node.offsetHeight - _this.node.clientHeight;
			_this.scrollbarWidth = _this.node.offsetWidth - _this.node.clientWidth;
		}, _this.handleResize = (0, _stifle2.default)(function () {
			var onChange = _this.props.onChange;


			var prevHeight = _this.scrollbarHeight;
			var prevWidth = _this.scrollbarWidth;
			_this.setMeasurements();
			if (prevHeight !== _this.scrollbarHeight || prevWidth !== _this.scrollbarWidth) {
				onChange({ scrollbarHeight: _this.scrollbarHeight, scrollbarWidth: _this.scrollbarWidth });
			}
		}, 166), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(ScrollbarSize, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var onLoad = this.props.onLoad;


			if (onLoad) {
				this.setMeasurements();
				onLoad({ scrollbarHeight: this.scrollbarHeight, scrollbarWidth: this.scrollbarWidth });
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.handleResize.cancel();
		}
	}, {
		key: 'render',
		// Corresponds to 10 frames at 60 Hz.

		value: function render() {
			var _this2 = this;

			var onChange = this.props.onChange;


			return _react2.default.createElement(
				'div',
				null,
				onChange ? _react2.default.createElement(_reactEventListener2.default, { target: 'window', onResize: this.handleResize }) : null,
				_react2.default.createElement('div', {
					style: styles,
					ref: function ref(node) {
						_this2.node = node;
					}
				})
			);
		}
	}]);
	return ScrollbarSize;
}(_react.Component);

ScrollbarSize.defaultProps = {
	onLoad: null,
	onChange: null
};
exports.default = ScrollbarSize;