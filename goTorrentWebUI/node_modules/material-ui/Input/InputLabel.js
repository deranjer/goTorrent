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

var _ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Form = require('../Form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var styles = exports.styles = function styles(theme) {
  return {
    root: {
      transformOrigin: 'top ' + (theme.direction === 'ltr' ? 'left' : 'right')
    },
    formControl: {
      position: 'absolute',
      left: 0,
      top: 0,
      // slight alteration to spec spacing to match visual spec result
      transform: 'translate(0, ' + (theme.spacing.unit * 3 - 1) + 'px) scale(1)'
    },
    labelDense: {
      // Compensation for the `Input.inputDense` style.
      transform: 'translate(0, ' + (theme.spacing.unit * 2.5 + 1) + 'px) scale(1)'
    },
    shrink: {
      transform: 'translate(0, 1.5px) scale(0.75)',
      transformOrigin: 'top ' + (theme.direction === 'ltr' ? 'left' : 'right')
    },
    animated: {
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      })
    },
    disabled: {
      color: theme.palette.input.disabled
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * The contents of the `InputLabel`.
   */
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * @ignore
   */
  className: require('prop-types').string,

  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation: require('prop-types').bool,

  /**
   * If `true`, apply disabled class.
   */
  disabled: require('prop-types').bool,

  /**
   * If `true`, the label will be displayed in an error state.
   */
  error: require('prop-types').bool,

  /**
   * `classes` property applied to the `FormControl` element.
   */
  FormControlClasses: require('prop-types').object,

  /**
   * If `true`, the input of this label is focused.
   */
  focused: require('prop-types').bool,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: require('prop-types').oneOf(['dense']),

  /**
   * if `true`, the label will indicate that the input is required.
   */
  required: require('prop-types').bool,

  /**
   * If `true`, the label is shrunk.
   */
  shrink: require('prop-types').bool
};


function InputLabel(props, context) {
  var _classNames;

  var disabled = props.disabled,
      disableAnimation = props.disableAnimation,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      FormControlClasses = props.FormControlClasses,
      shrinkProp = props.shrink,
      marginProp = props.margin,
      other = (0, _objectWithoutProperties3.default)(props, ['disabled', 'disableAnimation', 'children', 'classes', 'className', 'FormControlClasses', 'shrink', 'margin']);
  var muiFormControl = context.muiFormControl;

  var shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.dirty || muiFormControl.focused || muiFormControl.adornedStart;
  }

  var margin = marginProp;
  if (typeof margin === 'undefined' && muiFormControl) {
    margin = muiFormControl.margin;
  }

  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.formControl, muiFormControl), (0, _defineProperty3.default)(_classNames, classes.animated, !disableAnimation), (0, _defineProperty3.default)(_classNames, classes.shrink, shrink), (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, classes.labelDense, margin === 'dense'), _classNames), classNameProp);

  return _react2.default.createElement(
    _Form.FormLabel,
    (0, _extends3.default)({ 'data-shrink': shrink, className: className, classes: FormControlClasses }, other),
    children
  );
}

InputLabel.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  disabled: require('prop-types').bool.isRequired,
  disableAnimation: require('prop-types').bool.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'disableAnimation', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'disabled', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'error', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'FormControlClasses', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'focused', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'margin', require('prop-types').oneOf(['dense'])), (0, _defineProperty3.default)(_ref, 'required', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'shrink', require('prop-types').bool), _ref) : {};
InputLabel.defaultProps = {
  disabled: false,
  disableAnimation: false
};

InputLabel.contextTypes = {
  muiFormControl: _propTypes2.default.object
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiInputLabel' })(InputLabel);