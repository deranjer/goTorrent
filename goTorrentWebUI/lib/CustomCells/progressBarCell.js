'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBarCell = exports.ProgressBarCellBase = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _materialUi = require('material-ui');

var _styles = require('material-ui/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(theme) {
  var _progressText;

  return {
    progressBarCell: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      borderBottom: '1px solid ' + theme.palette.text.lightDivider
    },
    progressBar: {
      backgroundColor: theme.palette.primary[300],
      float: 'left',
      height: theme.spacing.unit,
      whiteSpace: 'nowrap'
    },
    progressText: (_progressText = {
      display: 'inline-block',
      fontSize: '1em',
      textAlign: 'right',
      verticalAlign: 'text-top'
    }, _defineProperty(_progressText, 'fontSize', '12px'), _defineProperty(_progressText, 'fontWeight', 'bold'), _defineProperty(_progressText, 'margin', '5px'), _defineProperty(_progressText, 'whiteSpace', 'nowrap'), _progressText)
  };
};

var ProgressBarCellBase = exports.ProgressBarCellBase = function ProgressBarCellBase(_ref) {
  var value = _ref.value,
      classes = _ref.classes,
      style = _ref.style;
  return _react2.default.createElement(
    _materialUi.TableCell,
    {
      className: classes.progressBarCell,
      style: style

    },
    _react2.default.createElement('div', {
      className: classes.progressBar,
      style: { width: value + '%' },
      title: value.toFixed(1) + '%'
    }),
    _react2.default.createElement(
      'div',
      { className: classes.progressText },
      value
    )
  );
};
ProgressBarCellBase.propTypes = {
  value: _propTypes2.default.number.isRequired,
  classes: _propTypes2.default.object.isRequired,
  style: _propTypes2.default.object
};
ProgressBarCellBase.defaultProps = {
  style: {}
};

var ProgressBarCell = exports.ProgressBarCell = (0, _styles.withStyles)(styles, { name: 'ProgressBarCell' })(ProgressBarCellBase);