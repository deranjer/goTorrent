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

var _List = require('material-ui/List');

var _List2 = _interopRequireDefault(_List);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _FileDownload = require('material-ui-icons/FileDownload');

var _FileDownload2 = _interopRequireDefault(_FileDownload);

var _FileUpload = require('material-ui-icons/FileUpload');

var _FileUpload2 = _interopRequireDefault(_FileUpload);

var _SwapVert = require('material-ui-icons/SwapVert');

var _SwapVert2 = _interopRequireDefault(_SwapVert);

var _AllInclusive = require('material-ui-icons/AllInclusive');

var _AllInclusive2 = _interopRequireDefault(_AllInclusive);

var _reactRedux = require('react-redux');

var _actions = require('../store/actions');

var actionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // contains the font for material UI


//react redux


//TODO, clean up the goddamn variable names you are all over the place
var styles = function styles(theme) {
  return {
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: '#e5e5e5'
    },
    icons: {
      width: '40px',
      height: '40px'
    },
    inactiveIcon: {
      width: '40px',
      height: '40px',
      color: 'red'
    },
    active: {
      backgroundColor: '#80b3ff'
    }
  };
};

var SimpleList = function (_React$Component) {
  _inherits(SimpleList, _React$Component);

  function SimpleList(props) {
    _classCallCheck(this, SimpleList);

    var _this = _possibleConstructorReturn(this, (SimpleList.__proto__ || Object.getPrototypeOf(SimpleList)).call(this, props));

    _initialiseProps.call(_this);

    var classes = _this.props.classes;

    _this.state = {
      allTorrentsClass: classes.active,
      downloadingClass: '',
      seedingClass: '',
      activeTorrentsClass: '',
      completedTorrentsClass: '',
      allID: "All",
      downloadingID: "Downloading",
      seedingID: "Seeding",
      activeID: "Active",
      completedID: "Completed"

    };
    return _this;
  }

  _createClass(SimpleList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;

      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          _List2.default,
          { dense: true },
          _react2.default.createElement(
            _List.ListItem,
            { dense: true, className: this.state.allTorrentsClass, button: true, onClick: function onClick() {
                return _this2.setFilter('', _this2.state.allID);
              } },
            _react2.default.createElement(
              _List.ListItemIcon,
              { className: classes.icons },
              _react2.default.createElement(_AllInclusive2.default, null)
            ),
            _react2.default.createElement(_List.ListItemText, { primary: 'All Torrents' })
          ),
          _react2.default.createElement(
            _List.ListItem,
            { className: this.state.downloadingClass, button: true, onClick: function onClick() {
                return _this2.setFilter('Downloading', _this2.state.downloadingID);
              } },
            _react2.default.createElement(
              _List.ListItemIcon,
              { className: classes.icons },
              _react2.default.createElement(_FileDownload2.default, null)
            ),
            _react2.default.createElement(_List.ListItemText, { primary: 'Downloading Torrents' })
          ),
          _react2.default.createElement(
            _List.ListItem,
            { className: this.state.seedingClass, button: true, onClick: function onClick() {
                return _this2.setFilter('Seeding', _this2.state.seedingID);
              } },
            _react2.default.createElement(
              _List.ListItemIcon,
              { className: classes.icons },
              _react2.default.createElement(_FileUpload2.default, null)
            ),
            _react2.default.createElement(_List.ListItemText, { primary: 'Seeding Torrents' })
          ),
          _react2.default.createElement(
            _List.ListItem,
            { className: this.state.completedTorrentsClass, button: true, onClick: function onClick() {
                return _this2.setFilter('Completed', _this2.state.completedID);
              } },
            _react2.default.createElement(
              _List.ListItemIcon,
              { className: classes.inactiveIcon },
              _react2.default.createElement(_SwapVert2.default, null)
            ),
            _react2.default.createElement(_List.ListItemText, { primary: 'Completed Torrents' })
          )
        ),
        _react2.default.createElement(_Divider2.default, null)
      );
    }
  }]);

  return SimpleList;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.setActiveElement = function (listItem) {};

  this.setFilter = function (filterState, id) {
    var classes = _this3.props.classes;

    filterState = [{ columnName: 'Status', value: filterState }];
    _this3.props.changeFilter(filterState); //dispatch to redux
    console.log("Switching filters classes", id);
    switch (id) {//TODO.. there has to be a better fucking way to do this
      case "All":
        _this3.state.allTorrentsClass = classes.active;
        _this3.state.downloadingClass = '';
        _this3.state.seedingClass = '';
        _this3.state.activeTorrentsClass = '';
        _this3.state.completedTorrentsClass = '';
        break;
      case "Downloading":
        console.log("Downloading...");
        _this3.state.downloadingClass = classes.active;
        _this3.state.allTorrentsClass = '';
        _this3.state.seedingClass = '';
        _this3.state.activeTorrentsClass = '';
        _this3.state.completedTorrentsClass = '';
        break;
      case "Seeding":
        _this3.state.seedingClass = classes.active;
        _this3.state.allTorrentsClass = '';
        _this3.state.downloadingClass = '';
        _this3.state.activeTorrentsClass = '';
        _this3.state.completedTorrentsClass = '';
        break;
      case "Active":
        _this3.state.activeTorrentsClass = classes.active;
        _this3.state.allTorrentsClass = '';
        _this3.state.downloadingClass = '';
        _this3.state.seedingClass = '';
        _this3.state.completedTorrentsClass = '';
        break;
      case "Completed":
        _this3.state.completedTorrentsClass = classes.active;
        _this3.state.allTorrentsClass = '';
        _this3.state.downloadingClass = '';
        _this3.state.seedingClass = '';
        _this3.state.activeTorrentsClass = '';
        break;

    }
  };
};

SimpleList.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    filter: state.filter
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    changeFilter: function changeFilter(filter) {
      return dispatch({ type: actionTypes.CHANGE_FILTER, filter: filter });
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SimpleList));