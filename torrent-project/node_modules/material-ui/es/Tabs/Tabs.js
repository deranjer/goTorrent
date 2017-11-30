var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

import warning from 'warning';
import classNames from 'classnames';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import ScrollbarSize from 'react-scrollbar-size';
import { getNormalizedScrollLeft, detectScrollType } from 'normalize-scroll-left';
import scroll from 'scroll';
import withStyles from '../styles/withStyles';
import TabIndicator from './TabIndicator';
import TabScrollButton from './TabScrollButton';


export const styles = theme => ({
  root: {
    overflow: 'hidden',
    minHeight: 48,
    WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.
  },
  flexContainer: {
    display: 'flex'
  },
  scrollingContainer: {
    position: 'relative',
    display: 'inline-block',
    flex: '1 1 auto',
    whiteSpace: 'nowrap'
  },
  fixed: {
    overflowX: 'hidden',
    width: '100%'
  },
  scrollable: {
    overflowX: 'scroll'
  },
  centered: {
    justifyContent: 'center'
  },
  buttonAuto: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
});

class Tabs extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      indicatorStyle: {
        left: 0,
        width: 0
      },
      scrollerStyle: {
        marginBottom: 0
      },
      showLeftScroll: false,
      showRightScroll: false,
      mounted: false
    }, this.getConditionalElements = () => {
      const {
        classes,
        buttonClassName,
        scrollable,
        scrollButtons,
        TabScrollButton: TabScrollButtonProp,
        theme
      } = this.props;
      const conditionalElements = {};
      conditionalElements.scrollbarSizeListener = scrollable ? React.createElement(ScrollbarSize, {
        onLoad: this.handleScrollbarSizeChange,
        onChange: this.handleScrollbarSizeChange
      }) : null;

      const showScrollButtons = scrollable && (scrollButtons === 'auto' || scrollButtons === 'on');

      conditionalElements.scrollButtonLeft = showScrollButtons ? React.createElement(TabScrollButtonProp, {
        direction: theme.direction === 'rtl' ? 'right' : 'left',
        onClick: this.handleLeftScrollClick,
        visible: this.state.showLeftScroll,
        className: classNames({
          [classes.buttonAuto]: scrollButtons === 'auto'
        }, buttonClassName)
      }) : null;

      conditionalElements.scrollButtonRight = showScrollButtons ? React.createElement(TabScrollButtonProp, {
        direction: theme.direction === 'rtl' ? 'left' : 'right',
        onClick: this.handleRightScrollClick,
        visible: this.state.showRightScroll,
        className: classNames({
          [classes.buttonAuto]: scrollButtons === 'auto'
        }, buttonClassName)
      }) : null;

      return conditionalElements;
    }, this.getTabsMeta = (value, direction) => {
      let tabsMeta;
      if (this.tabs) {
        const rect = this.tabs.getBoundingClientRect();
        // create a new object with ClientRect class props + scrollLeft
        tabsMeta = {
          clientWidth: this.tabs ? this.tabs.clientWidth : 0,
          scrollLeft: this.tabs ? this.tabs.scrollLeft : 0,
          scrollLeftNormalized: this.tabs ? getNormalizedScrollLeft(this.tabs, direction) : 0,
          scrollWidth: this.tabs ? this.tabs.scrollWidth : 0,
          left: rect.left,
          right: rect.right
        };
      }

      let tabMeta;
      if (this.tabs && value !== false) {
        const children = this.tabs.children[0].children;

        if (children.length > 0) {
          const tab = children[this.valueToIndex[value]];
          warning(Boolean(tab), `Material-UI: the value provided \`${value}\` is invalid`);
          tabMeta = tab ? tab.getBoundingClientRect() : null;
        }
      }
      return { tabsMeta, tabMeta };
    }, this.tabs = undefined, this.valueToIndex = {}, this.handleResize = debounce(() => {
      this.updateIndicatorState(this.props);
      this.updateScrollButtonState();
    }, 166), this.handleLeftScrollClick = () => {
      if (this.tabs) {
        this.moveTabsScroll(-this.tabs.clientWidth);
      }
    }, this.handleRightScrollClick = () => {
      if (this.tabs) {
        this.moveTabsScroll(this.tabs.clientWidth);
      }
    }, this.handleScrollbarSizeChange = ({ scrollbarHeight }) => {
      this.setState({
        scrollerStyle: {
          marginBottom: -scrollbarHeight
        }
      });
    }, this.handleTabsScroll = debounce(() => {
      this.updateScrollButtonState();
    }, 166), this.moveTabsScroll = delta => {
      const { theme } = this.props;

      if (this.tabs) {
        const multiplier = theme.direction === 'rtl' ? -1 : 1;
        const nextScrollLeft = this.tabs.scrollLeft + delta * multiplier;
        // Fix for Edge
        const invert = theme.direction === 'rtl' && detectScrollType() === 'reverse' ? -1 : 1;
        scroll.left(this.tabs, invert * nextScrollLeft);
      }
    }, this.scrollSelectedIntoView = () => {
      const { theme, value } = this.props;

      const { tabsMeta, tabMeta } = this.getTabsMeta(value, theme.direction);

      if (!tabMeta || !tabsMeta) {
        return;
      }

      if (tabMeta.left < tabsMeta.left) {
        // left side of button is out of view
        const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
        scroll.left(this.tabs, nextScrollLeft);
      } else if (tabMeta.right > tabsMeta.right) {
        // right side of button is out of view
        const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
        scroll.left(this.tabs, nextScrollLeft);
      }
    }, this.updateScrollButtonState = () => {
      const { scrollable, scrollButtons, theme } = this.props;

      if (this.tabs && scrollable && scrollButtons !== 'off') {
        const { scrollWidth, clientWidth } = this.tabs;
        const scrollLeft = getNormalizedScrollLeft(this.tabs, theme.direction);

        const showLeftScroll = theme.direction === 'rtl' ? scrollWidth > clientWidth + scrollLeft : scrollLeft > 0;

        const showRightScroll = theme.direction === 'rtl' ? scrollLeft > 0 : scrollWidth > clientWidth + scrollLeft;

        if (showLeftScroll !== this.state.showLeftScroll || showRightScroll !== this.state.showRightScroll) {
          this.setState({ showLeftScroll, showRightScroll });
        }
      }
    }, _temp;
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ mounted: true });
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateScrollButtonState();

    // The index might have changed at the same time.
    // We need to check again the right indicator position.
    this.updateIndicatorState(this.props);

    if (this.state.indicatorStyle !== prevState.indicatorStyle) {
      this.scrollSelectedIntoView();
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
    this.handleTabsScroll.cancel();
  }

  updateIndicatorState(props) {
    const { theme, value } = props;

    const { tabsMeta, tabMeta } = this.getTabsMeta(value, theme.direction);
    let left = 0;

    if (tabMeta && tabsMeta) {
      const correction = theme.direction === 'rtl' ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
      left = tabMeta.left - tabsMeta.left + correction;
    }

    const indicatorStyle = {
      left,
      // May be wrong until the font is loaded.
      width: tabMeta ? tabMeta.width : 0
    };

    if ((indicatorStyle.left !== this.state.indicatorStyle.left || indicatorStyle.width !== this.state.indicatorStyle.width) && !Number.isNaN(indicatorStyle.left) && !Number.isNaN(indicatorStyle.width)) {
      this.setState({ indicatorStyle });
    }
  }

  render() {
    const _props = this.props,
          {
      buttonClassName,
      centered,
      classes,
      children: childrenProp,
      className: classNameProp,
      fullWidth,
      indicatorClassName,
      indicatorColor,
      onChange,
      scrollable,
      scrollButtons,
      TabScrollButton: TabScrollButtonProp,
      textColor,
      theme,
      value
    } = _props,
          other = _objectWithoutProperties(_props, ['buttonClassName', 'centered', 'classes', 'children', 'className', 'fullWidth', 'indicatorClassName', 'indicatorColor', 'onChange', 'scrollable', 'scrollButtons', 'TabScrollButton', 'textColor', 'theme', 'value']);

    const className = classNames(classes.root, classNameProp);
    const scrollerClassName = classNames(classes.scrollingContainer, {
      [classes.fixed]: !scrollable,
      [classes.scrollable]: scrollable
    });
    const tabItemContainerClassName = classNames(classes.flexContainer, {
      [classes.centered]: centered && !scrollable
    });

    const indicator = React.createElement(TabIndicator, {
      style: this.state.indicatorStyle,
      className: indicatorClassName,
      color: indicatorColor
    });

    this.valueToIndex = {};
    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const childValue = child.props.value || childIndex;
      this.valueToIndex[childValue] = childIndex;
      const selected = childValue === value;

      childIndex += 1;
      return React.cloneElement(child, {
        fullWidth,
        indicator: selected && !this.state.mounted && indicator,
        selected,
        onChange,
        textColor,
        value: childValue
      });
    });

    const conditionalElements = this.getConditionalElements();

    return React.createElement(
      'div',
      _extends({ className: className }, other),
      React.createElement(EventListener, { target: 'window', onResize: this.handleResize }),
      conditionalElements.scrollbarSizeListener,
      React.createElement(
        'div',
        { className: classes.flexContainer },
        conditionalElements.scrollButtonLeft,
        React.createElement(
          'div',
          {
            className: scrollerClassName,
            style: this.state.scrollerStyle,
            ref: node => {
              this.tabs = node;
            },
            role: 'tablist',
            onScroll: this.handleTabsScroll
          },
          React.createElement(
            'div',
            { className: tabItemContainerClassName },
            children
          ),
          this.state.mounted && indicator
        ),
        conditionalElements.scrollButtonRight
      )
    );
  }
}

Tabs.defaultProps = {
  centered: false,
  fullWidth: false,
  indicatorColor: 'accent',
  scrollable: false,
  scrollButtons: 'auto',
  TabScrollButton,
  textColor: 'inherit'
};
export default withStyles(styles, { withTheme: true, name: 'MuiTabs' })(Tabs);