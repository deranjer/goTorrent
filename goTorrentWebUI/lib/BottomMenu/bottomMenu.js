'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('typeface-roboto');

var _styles = require('material-ui/styles');

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Tabs = require('material-ui/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _generalTab = require('./Tabs/generalTab');

var _generalTab2 = _interopRequireDefault(_generalTab);

var _peerTab = require('./Tabs/peerTab');

var _peerTab2 = _interopRequireDefault(_peerTab);

var _fileTab = require('./Tabs/fileTab');

var _fileTab2 = _interopRequireDefault(_fileTab);

var _reactRedux = require('react-redux');

var _actions = require('../store/actions');

var actionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // contains the font for material UI


//Redux


function TabContainer(props) {
  return _react2.default.createElement(
    'div',
    { style: { padding: 8 * 3 } },
    props.children
  );
}

TabContainer.propTypes = {
  children: _propTypes2.default.node.isRequired
};

var styles = function styles(theme) {
  return {
    root: {
      // flexGrow: 1,
      //   marginTop: theme.spacing.unit * 3,
      //backgroundColor: theme.palette.background.paper,
      backgroundColor: '#e5e5e5',
      height: '100%',
      boxShadow: '0 0 20px #000'
    }
  };
};

var BasicTabs = function (_React$Component) {
  _inherits(BasicTabs, _React$Component);

  function BasicTabs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BasicTabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BasicTabs.__proto__ || Object.getPrototypeOf(BasicTabs)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event, value) {
      //this.setState({ value });
      _this.props.changeTab(value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BasicTabs, [{
    key: 'render',
    value: function render() {
      var classes = this.props.classes;


      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          'div',
          { className: 'DragHandle' },
          ' ',
          _react2.default.createElement(
            _AppBar2.default,
            { position: 'static' },
            _react2.default.createElement(
              _Tabs2.default,
              { value: this.props.selectedTab, onChange: this.handleChange },
              _react2.default.createElement(_Tabs.Tab, { label: 'General' }),
              _react2.default.createElement(_Tabs.Tab, { label: 'Peers' }),
              _react2.default.createElement(_Tabs.Tab, { label: 'Files' }),
              _react2.default.createElement(_Tabs.Tab, { label: 'Speed' }),
              _react2.default.createElement(_Tabs.Tab, { label: 'Logger', href: '#basic-tabs' })
            )
          )
        ),
        this.props.selectedTab === 0 && _react2.default.createElement(
          TabContainer,
          null,
          _react2.default.createElement(_generalTab2.default, null)
        ),
        this.props.selectedTab === 1 && _react2.default.createElement(
          TabContainer,
          null,
          _react2.default.createElement(_peerTab2.default, null)
        ),
        this.props.selectedTab === 2 && _react2.default.createElement(
          TabContainer,
          null,
          _react2.default.createElement(_fileTab2.default, null)
        ),
        this.props.selectedTab === 3 && _react2.default.createElement(
          TabContainer,
          null,
          'Speed'
        ),
        this.props.selectedTab === 4 && _react2.default.createElement(
          TabContainer,
          null,
          'Logger'
        )
      );
    }
  }]);

  return BasicTabs;
}(_react2.default.Component);

BasicTabs.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedTab: state.selectedTab
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    changeTab: function changeTab(selectedTab) {
      return dispatch({ type: actionTypes.SELECTED_TAB, selectedTab: selectedTab });
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BasicTabs));