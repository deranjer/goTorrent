'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('../node_modules/react-grid-layout/css/styles.css');

require('../node_modules/react-resizable/css/styles.css');

var _reactGridLayout = require('react-grid-layout');

var _reactGridLayout2 = _interopRequireDefault(_reactGridLayout);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducer = require('./store/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _topMenu = require('./TopMenu/topMenu');

var _topMenu2 = _interopRequireDefault(_topMenu);

var _bottomMenu = require('./BottomMenu/bottomMenu');

var _bottomMenu2 = _interopRequireDefault(_bottomMenu);

var _leftMenu = require('./leftMenu/leftMenu');

var _leftMenu2 = _interopRequireDefault(_leftMenu);

var _torrentlist = require('./torrentlist');

var _torrentlist2 = _interopRequireDefault(_torrentlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//css for react grid

//react-grid for layout

//Redux

//Menu and torrentlist imports


var reduxStore = (0, _redux.createStore)(_reducer2.default);

var ReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout2.default);

var background = {
  backgroundColor: '#e5e5e5',
  boxShadow: '0 0 20px #000'
};

var BasicLayout = function (_React$PureComponent) {
  _inherits(BasicLayout, _React$PureComponent);

  function BasicLayout(props) {
    _classCallCheck(this, BasicLayout);

    var _this = _possibleConstructorReturn(this, (BasicLayout.__proto__ || Object.getPrototypeOf(BasicLayout)).call(this, props));

    var layout = [{ i: 'a', x: 0, y: 0, w: 6, h: 1, static: true }, { i: 'b', x: 0, y: 1, w: 1, h: 9, static: true }, { i: 'c', x: 1, y: 1, w: 5, h: 5, minW: 5, minH: 3, static: true }, { i: 'd', x: 1, y: 6, w: 5, h: 4, minW: 5, minH: 1, static: true }];
    _this.state = { layout: layout };
    return _this;
  }

  _createClass(BasicLayout, [{
    key: 'onLayoutChange',
    value: function onLayoutChange(layout) {
      this.props.onLayoutChange(layout);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        ReactGridLayout,
        _extends({ layout: this.state.layout, onLayoutChange: this.onLayoutChange
        }, this.props),
        _react2.default.createElement(
          'div',
          { key: 'a', style: background, className: 'DragHandle' },
          _react2.default.createElement(_topMenu2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { key: 'b', style: background, className: 'DragHandle' },
          _react2.default.createElement(_leftMenu2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { key: 'c', style: background, className: 'DragHandle' },
          _react2.default.createElement(_torrentlist2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { key: 'd' },
          _react2.default.createElement(_bottomMenu2.default, null)
        )
      ) //returning our 4 grids

      ;
    }
  }]);

  return BasicLayout;
}(_react2.default.PureComponent);

BasicLayout.propTypes = {
  onLayoutChange: _propTypes2.default.func.isRequired
};
BasicLayout.defaultProps = {
  className: "layout",
  items: 4,
  rowHeight: 100,
  onLayoutChange: function onLayoutChange() {},
  cols: 6,
  draggableCancel: '.NoDrag',
  draggableHandle: '.DragHandle'
};
;

module.exports = BasicLayout;

//if (require.main === module) {
//  require('../test-hook.jsx')(module.exports);
//}

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: reduxStore },
  _react2.default.createElement(BasicLayout, null)
), //wrapping redux around our app
document.getElementById('app'));