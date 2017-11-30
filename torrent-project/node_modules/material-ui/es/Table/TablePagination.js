var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @inheritedComponent TableCell

import React from 'react';

import withStyles from '../styles/withStyles';
import IconButton from '../IconButton';
import Input from '../Input';
import { MenuItem } from '../Menu';
import Select from '../Select';
import TableCell from './TableCell';
import Toolbar from '../Toolbar';
import Typography from '../Typography';
import KeyboardArrowLeft from '../svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../svg-icons/KeyboardArrowRight';

export const styles = theme => ({
  root: {
    // Increase the specificity to override TableCell.
    '&:last-child': {
      padding: 0
    }
  },
  toolbar: {
    height: 56,
    minHeight: 56,
    paddingRight: 2
  },
  spacer: {
    flex: '1 1 100%'
  },
  caption: {
    flexShrink: 0
  },
  input: {
    fontSize: 'inherit'
  },
  selectRoot: {
    marginRight: theme.spacing.unit * 4
  },
  select: {
    marginLeft: theme.spacing.unit,
    width: 34,
    textAlign: 'right',
    paddingRight: 22,
    color: theme.palette.text.secondary,
    height: 32,
    lineHeight: '32px'
  },
  actions: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

/**
 * A `TableRow` based component for placing inside `TableFooter` for pagination.
 */
class TablePagination extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleBackButtonClick = event => {
      this.props.onChangePage(event, this.props.page - 1);
    }, this.handleNextButtonClick = event => {
      this.props.onChangePage(event, this.props.page + 1);
    }, _temp;
  }

  componentWillReceiveProps({ count, onChangePage, rowsPerPage }) {
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (this.props.page > newLastPage) {
      onChangePage(null, newLastPage);
    }
  }

  render() {
    const _props = this.props,
          {
      classes,
      component: Component,
      colSpan: colSpanProp,
      count,
      labelDisplayedRows,
      labelRowsPerPage,
      onChangePage,
      onChangeRowsPerPage,
      page,
      rowsPerPage,
      rowsPerPageOptions,
      theme
    } = _props,
          other = _objectWithoutProperties(_props, ['classes', 'component', 'colSpan', 'count', 'labelDisplayedRows', 'labelRowsPerPage', 'onChangePage', 'onChangeRowsPerPage', 'page', 'rowsPerPage', 'rowsPerPageOptions', 'theme']);

    let colSpan;

    if (Component === TableCell || Component === 'td') {
      colSpan = colSpanProp || 9001; // col-span over everything
    }

    return React.createElement(
      Component,
      _extends({ className: classes.root, colSpan: colSpan }, other),
      React.createElement(
        Toolbar,
        { className: classes.toolbar },
        React.createElement('div', { className: classes.spacer }),
        React.createElement(
          Typography,
          { type: 'caption', className: classes.caption },
          labelRowsPerPage
        ),
        React.createElement(
          Select,
          {
            classes: { root: classes.selectRoot, select: classes.select },
            InputClasses: {
              root: classes.input
            },
            input: React.createElement(Input, { disableUnderline: true }),
            value: rowsPerPage,
            onChange: onChangeRowsPerPage
          },
          rowsPerPageOptions.map(rowsPerPageOption => React.createElement(
            MenuItem,
            { key: rowsPerPageOption, value: rowsPerPageOption },
            rowsPerPageOption
          ))
        ),
        React.createElement(
          Typography,
          { type: 'caption', className: classes.caption },
          labelDisplayedRows({
            from: count === 0 ? 0 : page * rowsPerPage + 1,
            to: Math.min(count, (page + 1) * rowsPerPage),
            count,
            page
          })
        ),
        React.createElement(
          'div',
          { className: classes.actions },
          React.createElement(
            IconButton,
            { onClick: this.handleBackButtonClick, disabled: page === 0 },
            theme.direction === 'rtl' ? React.createElement(KeyboardArrowRight, null) : React.createElement(KeyboardArrowLeft, null)
          ),
          React.createElement(
            IconButton,
            {
              onClick: this.handleNextButtonClick,
              disabled: page >= Math.ceil(count / rowsPerPage) - 1
            },
            theme.direction === 'rtl' ? React.createElement(KeyboardArrowLeft, null) : React.createElement(KeyboardArrowRight, null)
          )
        )
      )
    );
  }
}

TablePagination.defaultProps = {
  component: TableCell,
  labelRowsPerPage: 'Rows per page:',
  labelDisplayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
  rowsPerPageOptions: [5, 10, 25]
};
export default withStyles(styles, { withTheme: true, name: 'MuiTablePagination' })(TablePagination);