var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import EventListener from 'react-event-listener';
import withStyles from '../styles/withStyles';

const rowsHeight = 24;

export const styles = {
  root: {
    position: 'relative', // because the shadow has position: 'absolute',
    width: '100%'
  },
  textarea: {
    width: '100%',
    height: '100%',
    resize: 'none',
    font: 'inherit',
    padding: 0,
    cursor: 'inherit',
    boxSizing: 'border-box',
    lineHeight: 'inherit',
    border: 'none',
    outline: 'none',
    background: 'transparent'
  },
  shadow: {
    resize: 'none',
    // Overflow also needed to here to remove the extra row
    // added to textareas in Firefox.
    overflow: 'hidden',
    // Visibility needed to hide the extra text area on ipads
    visibility: 'hidden',
    position: 'absolute',
    height: 'auto',
    whiteSpace: 'pre-wrap'
  }
};

/**
 * @ignore - internal component.
 */
class Textarea extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      height: null
    }, this.handleResize = debounce(event => {
      this.syncHeightWithShadow(event);
    }, 166), this.handleRefInput = node => {
      this.input = node;
      if (this.props.textareaRef) {
        this.props.textareaRef(node);
      }
    }, this.handleRefSinglelineShadow = node => {
      this.singlelineShadow = node;
    }, this.handleRefShadow = node => {
      this.shadow = node;
    }, this.handleChange = event => {
      this.value = event.target.value;

      if (typeof this.props.value === 'undefined' && this.shadow) {
        // The component is not controlled, we need to update the shallow value.
        this.shadow.value = this.value;
        this.syncHeightWithShadow(event);
      }

      if (this.props.onChange) {
        this.props.onChange(event);
      }
    }, _temp;
  }

  componentWillMount() {
    // <Input> expects the components it renders to respond to 'value'
    // so that it can check whether they are dirty
    this.value = this.props.value || this.props.defaultValue || '';
    this.setState({
      height: Number(this.props.rows) * rowsHeight
    });
  }

  componentDidMount() {
    this.syncHeightWithShadow(null);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value || Number(nextProps.rowsMax) !== Number(this.props.rowsMax)) {
      this.syncHeightWithShadow(null, nextProps);
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  syncHeightWithShadow(event, props = this.props) {
    if (this.shadow && this.singlelineShadow) {
      // The component is controlled, we need to update the shallow value.
      if (typeof this.props.value !== 'undefined') {
        this.shadow.value = props.value == null ? '' : String(props.value);
      }

      const lineHeight = this.singlelineShadow.scrollHeight;
      let newHeight = this.shadow.scrollHeight;

      // Guarding for jsdom, where scrollHeight isn't present.
      // See https://github.com/tmpvar/jsdom/issues/1013
      if (newHeight === undefined) {
        return;
      }

      if (Number(props.rowsMax) >= Number(props.rows)) {
        newHeight = Math.min(Number(props.rowsMax) * lineHeight, newHeight);
      }

      newHeight = Math.max(newHeight, lineHeight);

      if (this.state.height !== newHeight) {
        this.setState({
          height: newHeight
        });
      }
    }
  }

  render() {
    const _props = this.props,
          {
      classes,
      className,
      defaultValue,
      onChange,
      rows,
      rowsMax,
      textareaRef,
      value
    } = _props,
          other = _objectWithoutProperties(_props, ['classes', 'className', 'defaultValue', 'onChange', 'rows', 'rowsMax', 'textareaRef', 'value']);

    return React.createElement(
      'div',
      { className: classes.root, style: { height: this.state.height } },
      React.createElement(EventListener, { target: 'window', onResize: this.handleResize }),
      React.createElement('textarea', {
        ref: this.handleRefSinglelineShadow,
        className: classnames(classes.shadow, classes.textarea),
        tabIndex: -1,
        rows: '1',
        readOnly: true,
        'aria-hidden': 'true',
        value: ''
      }),
      React.createElement('textarea', {
        ref: this.handleRefShadow,
        className: classnames(classes.shadow, classes.textarea),
        tabIndex: -1,
        rows: rows,
        'aria-hidden': 'true',
        readOnly: true,
        defaultValue: defaultValue,
        value: value
      }),
      React.createElement('textarea', _extends({
        rows: rows,
        className: classnames(classes.textarea, className),
        defaultValue: defaultValue,
        value: value,
        onChange: this.handleChange
      }, other, {
        ref: this.handleRefInput
      }))
    );
  }
}

Textarea.defaultProps = {
  rows: 1
};
export default withStyles(styles, { name: 'MuiTextarea' })(Textarea);