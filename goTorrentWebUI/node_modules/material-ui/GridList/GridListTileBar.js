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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 48,
      background: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily
    },
    rootBottom: {
      bottom: 0
    },
    rootTop: {
      top: 0
    },
    rootWithSubtitle: {
      height: 68
    },
    titleWrap: {
      flexGrow: 1,
      marginLeft: theme.mixins.gutters({}).paddingLeft,
      marginRight: theme.mixins.gutters({}).paddingRight,
      color: theme.palette.common.white,
      overflow: 'hidden'
    },
    titleWrapActionLeft: {
      marginLeft: 0
    },
    titleWrapActionRight: {
      marginRight: 0
    },
    title: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '24px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    subtitle: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 1,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    actionIconPositionLeft: {
      order: -1
    },
    childImg: {
      height: '100%',
      transform: 'translateX(-50%)',
      position: 'relative',
      left: '50%'
    }
  };
};

function GridListTileBar(props) {
  var _classNames, _classNames2;

  var actionIcon = props.actionIcon,
      actionPosition = props.actionPosition,
      classes = props.classes,
      classNameProp = props.className,
      subtitle = props.subtitle,
      title = props.title,
      titlePosition = props.titlePosition,
      other = (0, _objectWithoutProperties3.default)(props, ['actionIcon', 'actionPosition', 'classes', 'className', 'subtitle', 'title', 'titlePosition']);


  var actionPos = actionIcon && actionPosition;
  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.rootBottom, titlePosition === 'bottom'), (0, _defineProperty3.default)(_classNames, classes.rootTop, titlePosition === 'top'), (0, _defineProperty3.default)(_classNames, classes.rootWithSubtitle, subtitle), _classNames), classNameProp);

  // Remove the margin between the title / subtitle wrapper, and the Action Icon
  var titleWrapClassName = (0, _classnames2.default)(classes.titleWrap, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.titleWrapActionLeft, actionPos === 'left'), (0, _defineProperty3.default)(_classNames2, classes.titleWrapActionRight, actionPos === 'right'), _classNames2));

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ className: className }, other),
    _react2.default.createElement(
      'div',
      { className: titleWrapClassName },
      _react2.default.createElement(
        'div',
        { className: classes.title },
        title
      ),
      subtitle ? _react2.default.createElement(
        'div',
        { className: classes.subtitle },
        subtitle
      ) : null
    ),
    actionIcon ? _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)((0, _defineProperty3.default)({}, classes.actionIconPositionLeft, actionPos === 'left')) },
      actionIcon
    ) : null
  );
}

GridListTileBar.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon: _propTypes2.default.node,
  /**
   * Position of secondary action IconButton.
   */
  actionPosition: _propTypes2.default.oneOf(['left', 'right']),
  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: _propTypes2.default.node,
  /**
   * Title to be displayed on tile.
   */
  title: _propTypes2.default.node,
  /**
   * Position of the title bar.
   */
  titlePosition: _propTypes2.default.oneOf(['top', 'bottom'])
} : {};

GridListTileBar.defaultProps = {
  actionPosition: 'right',
  titlePosition: 'bottom'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiGridListTileBar' })(GridListTileBar);