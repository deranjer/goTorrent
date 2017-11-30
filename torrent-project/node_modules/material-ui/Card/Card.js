'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @inheritedComponent Paper

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * If `true`, the card will use raised styling.
   */
  raised: require('prop-types').bool
};


function Card(props) {
  var raised = props.raised,
      other = (0, _objectWithoutProperties3.default)(props, ['raised']);


  return _react2.default.createElement(_Paper2.default, (0, _extends3.default)({ elevation: raised ? 8 : 2 }, other));
}

Card.propTypes = process.env.NODE_ENV !== "production" ? (0, _defineProperty3.default)({
  raised: require('prop-types').bool.isRequired,
  className: require('prop-types').string
}, 'raised', require('prop-types').bool) : {};
Card.defaultProps = {
  raised: false
};

exports.default = Card;