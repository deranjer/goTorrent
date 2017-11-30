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

exports.hasValue = hasValue;
exports.isDirty = isDirty;
exports.isAdornedStart = isAdornedStart;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _reactHelpers = require('../utils/reactHelpers');

var _Textarea = require('./Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_ComponentType = require('prop-types').func; //  weak

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

// Supports determination of isControlled().
// Controlled input accepts its current value as a prop.
//
// @see https://facebook.github.io/react/docs/forms.html#controlled-components
// @param value
// @returns {boolean} true if string (including '') or number (including zero)
function hasValue(value) {
  return value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0);
}

// Determine if field is dirty (a.k.a. filled).
//
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.
function isDirty(obj) {
  var SSR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return obj && (hasValue(obj.value) && obj.value !== '' || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== '');
}

// Determine if an Input is adorned on start.
// It's corresponding to the left with LTR.
//
// @param obj
// @returns {boolean} False when no adornments.
//                    True when adorned at the start.
function isAdornedStart(obj) {
  return obj.startAdornment;
}

var styles = exports.styles = function styles(theme) {
  var placeholder = {
    color: 'currentColor',
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.ease
    })
  };
  var placeholderHidden = {
    opacity: 0
  };
  var placeholderVisible = {
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5
  };

  return {
    root: {
      // Mimics the default input display property used by browsers for an input.
      display: 'inline-flex',
      alignItems: 'baseline',
      position: 'relative',
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.input.inputText,
      fontSize: theme.typography.pxToRem(16)
    },
    formControl: {
      'label + &': {
        marginTop: theme.spacing.unit * 2
      }
    },
    inkbar: {
      '&:after': {
        backgroundColor: theme.palette.primary[theme.palette.type === 'light' ? 'A700' : 'A200'],
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 2,
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        }),
        pointerEvents: 'none' // Transparent to the hover style.
      },
      '&$focused:after': {
        transform: 'scaleX(1)'
      }
    },
    error: {
      '&:after': {
        backgroundColor: theme.palette.error.A400,
        transform: 'scaleX(1)' // error is always underlined in red
      }
    },
    input: {
      font: 'inherit',
      color: 'currentColor',
      // slight alteration to spec spacing to match visual spec result
      padding: theme.spacing.unit - 1 + 'px 0 ' + (theme.spacing.unit + 1) + 'px',
      border: 0,
      boxSizing: 'content-box',
      verticalAlign: 'middle',
      background: 'none',
      margin: 0, // Reset for Safari
      display: 'block',
      width: '100%',
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder, // Firefox 19+
      '&:-ms-input-placeholder': placeholder, // IE 11
      '&::-ms-input-placeholder': placeholder, // Edge
      '&:focus': {
        outline: 0
      },
      // Reset Firefox invalid required input style
      '&:invalid': {
        boxShadow: 'none'
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        appearance: 'none'
      },
      // Show and hide the placeholder logic
      'label[data-shrink=false] + $formControl &': {
        '&::-webkit-input-placeholder': placeholderHidden,
        '&::-moz-placeholder': placeholderHidden, // Firefox 19+
        '&:-ms-input-placeholder': placeholderHidden, // IE 11
        '&::-ms-input-placeholder': placeholderHidden, // Edge
        '&:focus::-webkit-input-placeholder': placeholderVisible,
        '&:focus::-moz-placeholder': placeholderVisible, // Firefox 19+
        '&:focus:-ms-input-placeholder': placeholderVisible, // IE 11
        '&:focus::-ms-input-placeholder': placeholderVisible // Edge
      }
    },
    inputDense: {
      paddingTop: theme.spacing.unit / 2
    },
    disabled: {
      color: theme.palette.text.disabled
    },
    focused: {},
    underline: {
      '&:before': {
        backgroundColor: theme.palette.input.bottomLine,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 1,
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.ease
        }),
        pointerEvents: 'none' // Transparent to the hover style.
      },
      '&:hover:not($disabled):before': {
        backgroundColor: theme.palette.text.primary,
        height: 2
      },
      '&$disabled:before': {
        background: 'transparent',
        backgroundImage: 'linear-gradient(to right, ' + theme.palette.input.bottomLine + ' 33%, transparent 0%)',
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '5px 1px'
      }
    },
    multiline: {
      padding: theme.spacing.unit - 2 + 'px 0 ' + (theme.spacing.unit - 1) + 'px'
    },
    inputDisabled: {
      opacity: 1 // Reset iOS opacity
    },
    inputSingleline: {
      height: '1em'
    },
    inputSearch: {
      appearance: 'textfield' // Improve type search style.
    },
    inputMultiline: {
      resize: 'none',
      padding: 0
    },
    fullWidth: {
      width: '100%'
    }
  };
};

var babelPluginFlowReactPropTypes_proptype_Props = {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, it's more like an autofill.
   * You can learn more about it in this article
   * https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
   */
  autoComplete: require('prop-types').string,

  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus: require('prop-types').bool,

  /**
   * Useful to extend the style applied to components.
   */
  classes: require('prop-types').object,

  /**
   * The CSS class name of the wrapper element.
   */
  className: require('prop-types').string,

  /**
   * The default input value, useful when not controlling the component.
   */
  defaultValue: require('prop-types').oneOfType([require('prop-types').string, require('prop-types').number]),

  /**
   * If `true`, the input will be disabled.
   */
  disabled: require('prop-types').bool,

  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline: require('prop-types').bool,

  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error: require('prop-types').bool,

  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: require('prop-types').bool,

  /**
   * The id of the `input` element.
   */
  id: require('prop-types').string,

  /**
   * The component used for the input node.
   * Either a string to use a DOM element or a component.
   * It's an `input` by default.
   */
  inputComponent: require('prop-types').oneOfType([require('prop-types').string, typeof babelPluginFlowReactPropTypes_proptype_ComponentType === 'function' ? babelPluginFlowReactPropTypes_proptype_ComponentType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ComponentType)]),

  /**
   * Properties applied to the `input` element.
   */
  inputProps: require('prop-types').object,

  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: require('prop-types').func,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: require('prop-types').oneOf(['dense', 'none']),

  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline: require('prop-types').bool,

  /**
   * Name attribute of the `input` element.
   */
  name: require('prop-types').string,

  /**
   * @ignore
   */
  readOnly: require('prop-types').bool,

  /**
   * @ignore
   */
  onBlur: require('prop-types').func,

  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback
   */
  onChange: require('prop-types').func,

  /**
   * TODO
   */
  onClean: require('prop-types').func,

  /**
   * TODO
   */
  onDirty: require('prop-types').func,

  /**
   * @ignore
   */
  onFocus: require('prop-types').func,

  /**
   * @ignore
   */
  onKeyDown: require('prop-types').func,

  /**
   * @ignore
   */
  onKeyUp: require('prop-types').func,

  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: require('prop-types').string,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: require('prop-types').oneOfType([require('prop-types').string, require('prop-types').number]),

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: require('prop-types').oneOfType([require('prop-types').string, require('prop-types').number]),

  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),

  /**
   * Type of the input element. It should be a valid HTML5 input type.
   */
  type: require('prop-types').string,

  /**
   * The input value, required for a controlled component.
   */
  value: require('prop-types').oneOfType([require('prop-types').string, require('prop-types').number, require('prop-types').arrayOf(require('prop-types').oneOfType([require('prop-types').string, require('prop-types').number]))])
};

var Input = function (_React$Component) {
  (0, _inherits3.default)(Input, _React$Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focused: false
    }, _this.input = null, _this.handleFocus = function (event) {
      _this.setState({ focused: true });
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.handleBlur = function (event) {
      _this.setState({ focused: false });
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleChange = function (event) {
      if (!_this.isControlled()) {
        _this.checkDirty(_this.input);
      }

      // Perform in the willUpdate
      if (_this.props.onChange) {
        _this.props.onChange(event);
      }
    }, _this.handleRefInput = function (node) {
      _this.input = node;
      if (_this.props.inputRef) {
        _this.props.inputRef(node);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Input, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.isControlled()) {
        this.checkDirty(this.props);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.isControlled()) {
        this.checkDirty(this.input);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // The blur won't fire when the disabled state is set on a focused input.
      // We need to book keep the focused state manually.
      if (!this.props.disabled && nextProps.disabled) {
        this.setState({
          focused: false
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (this.isControlled(nextProps)) {
        this.checkDirty(nextProps);
      } // else performed in the onChange

      // Book keep the focused state.
      if (!this.props.disabled && nextProps.disabled) {
        var muiFormControl = this.context.muiFormControl;

        if (muiFormControl && muiFormControl.onBlur) {
          muiFormControl.onBlur();
        }
      }
    }

    // Holds the input reference

  }, {
    key: 'isControlled',


    // A controlled input accepts its current value as a prop.
    //
    // @see https://facebook.github.io/react/docs/forms.html#controlled-components
    // @returns {boolean} true if string (including '') or number (including zero)
    value: function isControlled() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return hasValue(props.value);
    }
  }, {
    key: 'checkDirty',
    value: function checkDirty(obj) {
      var muiFormControl = this.context.muiFormControl;


      if (isDirty(obj)) {
        if (muiFormControl && muiFormControl.onDirty) {
          muiFormControl.onDirty();
        }
        if (this.props.onDirty) {
          this.props.onDirty();
        }
        return;
      }

      if (muiFormControl && muiFormControl.onClean) {
        muiFormControl.onClean();
      }
      if (this.props.onClean) {
        this.props.onClean();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames, _classNames2;

      var _props = this.props,
          autoComplete = _props.autoComplete,
          autoFocus = _props.autoFocus,
          classes = _props.classes,
          classNameProp = _props.className,
          defaultValue = _props.defaultValue,
          disabledProp = _props.disabled,
          disableUnderline = _props.disableUnderline,
          endAdornment = _props.endAdornment,
          errorProp = _props.error,
          fullWidth = _props.fullWidth,
          id = _props.id,
          inputComponent = _props.inputComponent,
          _props$inputProps = _props.inputProps;
      _props$inputProps = _props$inputProps === undefined ? {} : _props$inputProps;
      var inputPropsClassName = _props$inputProps.className,
          inputPropsProp = (0, _objectWithoutProperties3.default)(_props$inputProps, ['className']),
          inputRef = _props.inputRef,
          marginProp = _props.margin,
          multiline = _props.multiline,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          onChange = _props.onChange,
          onClean = _props.onClean,
          onDirty = _props.onDirty,
          onKeyDown = _props.onKeyDown,
          onKeyUp = _props.onKeyUp,
          placeholder = _props.placeholder,
          name = _props.name,
          readOnly = _props.readOnly,
          rows = _props.rows,
          rowsMax = _props.rowsMax,
          startAdornment = _props.startAdornment,
          type = _props.type,
          value = _props.value,
          other = (0, _objectWithoutProperties3.default)(_props, ['autoComplete', 'autoFocus', 'classes', 'className', 'defaultValue', 'disabled', 'disableUnderline', 'endAdornment', 'error', 'fullWidth', 'id', 'inputComponent', 'inputProps', 'inputRef', 'margin', 'multiline', 'onBlur', 'onFocus', 'onChange', 'onClean', 'onDirty', 'onKeyDown', 'onKeyUp', 'placeholder', 'name', 'readOnly', 'rows', 'rowsMax', 'startAdornment', 'type', 'value']);
      var muiFormControl = this.context.muiFormControl;

      var disabled = disabledProp;
      var error = errorProp;
      var margin = marginProp;

      if (muiFormControl) {
        if (typeof disabled === 'undefined') {
          disabled = muiFormControl.disabled;
        }

        if (typeof error === 'undefined') {
          error = muiFormControl.error;
        }

        if (typeof margin === 'undefined') {
          margin = muiFormControl.margin;
        }
      }

      var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.disabled, disabled), (0, _defineProperty3.default)(_classNames, classes.error, error), (0, _defineProperty3.default)(_classNames, classes.fullWidth, fullWidth), (0, _defineProperty3.default)(_classNames, classes.focused, this.state.focused), (0, _defineProperty3.default)(_classNames, classes.formControl, muiFormControl), (0, _defineProperty3.default)(_classNames, classes.inkbar, !disableUnderline), (0, _defineProperty3.default)(_classNames, classes.multiline, multiline), (0, _defineProperty3.default)(_classNames, classes.underline, !disableUnderline), _classNames), classNameProp);

      var inputClassName = (0, _classnames2.default)(classes.input, (_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, classes.inputDisabled, disabled), (0, _defineProperty3.default)(_classNames2, classes.inputSingleline, !multiline), (0, _defineProperty3.default)(_classNames2, classes.inputSearch, type === 'search'), (0, _defineProperty3.default)(_classNames2, classes.inputMultiline, multiline), (0, _defineProperty3.default)(_classNames2, classes.inputDense, margin === 'dense'), _classNames2), inputPropsClassName);

      var required = muiFormControl && muiFormControl.required === true;

      var InputComponent = 'input';
      var inputProps = (0, _extends3.default)({
        ref: this.handleRefInput
      }, inputPropsProp);

      if (inputComponent) {
        InputComponent = inputComponent;

        if ((0, _reactHelpers.isMuiComponent)(InputComponent, ['SelectInput'])) {
          inputProps = (0, _extends3.default)({
            selectRef: this.handleRefInput
          }, inputProps, {
            ref: null
          });
        }
      } else if (multiline) {
        if (rows && !rowsMax) {
          InputComponent = 'textarea';
        } else {
          inputProps = (0, _extends3.default)({
            rowsMax: rowsMax,
            textareaRef: this.handleRefInput
          }, inputProps, {
            ref: null
          });
          InputComponent = _Textarea2.default;
        }
      }

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ onBlur: this.handleBlur, onFocus: this.handleFocus, className: className }, other),
        startAdornment,
        _react2.default.createElement(InputComponent, (0, _extends3.default)({
          autoComplete: autoComplete,
          autoFocus: autoFocus,
          className: inputClassName,
          onChange: this.handleChange,
          onKeyUp: onKeyUp,
          onKeyDown: onKeyDown,
          disabled: disabled,
          required: required ? true : undefined,
          value: value,
          id: id,
          name: name,
          defaultValue: defaultValue,
          placeholder: placeholder,
          type: type,
          readOnly: readOnly,
          rows: rows
        }, inputProps)),
        endAdornment
      );
    }
  }]);
  return Input;
}(_react2.default.Component);

Input.muiName = 'Input';
Input.defaultProps = {
  disableUnderline: false,
  fullWidth: false,
  multiline: false,
  type: 'text'
};


Input.contextTypes = {
  muiFormControl: _propTypes2.default.object
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiInput' })(Input);