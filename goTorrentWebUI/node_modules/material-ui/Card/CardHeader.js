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

var _Typography = require('../Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing.unit * 2
    },
    avatar: {
      flex: '0 0 auto',
      marginRight: theme.spacing.unit * 2
    },
    action: {
      flex: '0 0 auto',
      alignSelf: 'flex-start',
      marginTop: theme.spacing.unit * -1,
      marginRight: theme.spacing.unit * -2
    },
    content: {
      flex: '1 1 auto'
    },
    title: {},
    subheader: {}
  };
};

function CardHeader(props) {
  var action = props.action,
      avatar = props.avatar,
      classes = props.classes,
      classNameProp = props.className,
      Component = props.component,
      subheader = props.subheader,
      title = props.title,
      other = (0, _objectWithoutProperties3.default)(props, ['action', 'avatar', 'classes', 'className', 'component', 'subheader', 'title']);


  return _react2.default.createElement(
    Component,
    (0, _extends3.default)({ className: (0, _classnames2.default)(classes.root, classNameProp) }, other),
    avatar && _react2.default.createElement(
      'div',
      { className: classes.avatar },
      avatar
    ),
    _react2.default.createElement(
      'div',
      { className: classes.content },
      _react2.default.createElement(
        _Typography2.default,
        {
          variant: avatar ? 'body2' : 'headline',
          component: 'span',
          className: classes.title
        },
        title
      ),
      subheader && _react2.default.createElement(
        _Typography2.default,
        {
          variant: avatar ? 'body2' : 'body1',
          component: 'span',
          color: 'textSecondary',
          className: classes.subheader
        },
        subheader
      )
    ),
    action && _react2.default.createElement(
      'div',
      { className: classes.action },
      action
    )
  );
}

CardHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * The action to display in the card header.
   */
  action: _propTypes2.default.node,
  /**
   * The Avatar for the Card Header.
   */
  avatar: _propTypes2.default.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  /**
   * The content of the component.
   */
  subheader: _propTypes2.default.node,
  /**
   * The content of the Card Title.
   */
  title: _propTypes2.default.node
} : {};

CardHeader.defaultProps = {
  component: 'div'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiCardHeader' })(CardHeader);