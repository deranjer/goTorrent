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

var _ref; //  weak

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

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
      color: 'white',
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

var babelPluginFlowReactPropTypes_proptype_TitlePosition = require('prop-types').oneOf(['top', 'bottom']);

var babelPluginFlowReactPropTypes_proptype_ActionPosition = require('prop-types').oneOf(['left', 'right']);

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * Position of secondary action IconButton.
   */
  actionPosition: require('prop-types').oneOf(['left', 'right']),

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * Title to be displayed on tile.
   */
  title: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired,

  /**
   * Position of the title bar.
   */
  titlePosition: require('prop-types').oneOf(['top', 'bottom'])
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

GridListTileBar.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  actionPosition: require('prop-types').oneOf(['left', 'right']).isRequired,
  classes: require('prop-types').object.isRequired,
  titlePosition: require('prop-types').oneOf(['top', 'bottom']).isRequired,
  actionIcon: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'actionPosition', require('prop-types').oneOf(['left', 'right'])), (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'subtitle', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)), (0, _defineProperty3.default)(_ref, 'title', typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node.isRequired ? babelPluginFlowReactPropTypes_proptype_Node.isRequired : babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node).isRequired), (0, _defineProperty3.default)(_ref, 'titlePosition', require('prop-types').oneOf(['top', 'bottom'])), _ref) : {};
GridListTileBar.defaultProps = {
  actionPosition: 'right',
  titlePosition: 'bottom'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiGridListTileBar' })(GridListTileBar);