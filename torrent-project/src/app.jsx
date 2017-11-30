import React from 'react';
import ReactDOM from 'react-dom';
//css for react grid
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
//react-grid for layout
import RGL, { WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';
import _ from 'lodash';
//Redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer';
//Menu and torrentlist imports
import TopMenu from './topMenu';
import BottomMenu from './bottomMenu';
import LeftMenu from './leftMenu';
import TorrentList from './torrentlist';

const reduxStore = createStore(reducer);


const ReactGridLayout = WidthProvider(RGL);

var background = {
  backgroundColor: '#e5e5e5',
  boxShadow: '0 0 20px #000',
}    

class BasicLayout extends React.PureComponent {

  static propTypes = {
    onLayoutChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: "layout",
    items: 4,
    rowHeight: 100,
    onLayoutChange: function() {},
    cols: 6,
    draggableCancel: '.NoDrag',
    draggableHandle: '.DragHandle'
  };

  constructor(props) {
    super(props);

    var layout =  [
      {i: 'a', x: 0, y: 0, w: 6, h: 1, static: true},
      {i: 'b', x: 0, y: 1, w: 1, h: 5},
      {i: 'c', x: 1, y: 1, w: 5, h: 5, minW: 5, minH: 5, static: true},
      {i: 'd', x: 1, y: 2, w: 5, h: 2, minW: 5, minH: 1}
    ];
    this.state = { layout };
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange}
          {...this.props}>
        <div key="a" style={background} className="DragHandle"><TopMenu /></div>
        <div key="b" style={background} className="DragHandle"><LeftMenu /></div>
        <div key="c" style={background} className="DragHandle"><TorrentList /></div>
        <div key="d"><BottomMenu /></div>
      </ReactGridLayout> //returning our 4 grids

    );
  }
};

module.exports = BasicLayout;

//if (require.main === module) {
//  require('../test-hook.jsx')(module.exports);
//}

ReactDOM.render(
    <Provider store={reduxStore}><BasicLayout /></Provider>, //wrapping redux around our app
    document.getElementById('app')
);