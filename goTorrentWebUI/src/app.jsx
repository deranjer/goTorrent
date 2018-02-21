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
import TopMenu from './TopMenu/topMenu';
import BottomMenu from './BottomMenu/bottomMenu';
import LeftMenu from './leftMenu/leftMenu';
import TorrentList from './torrentlist';
//Notification Element
import Notifications from './notifications';
//Login Box
import Login from './login';


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
      {i: 'b', x: 0, y: 1, w: 1, h: 9, static: true},
      {i: 'c', x: 1, y: 1, w: 5, h: 5, minW: 5, minH: 3, static: true},
      {i: 'd', x: 1, y: 6, w: 5, h: 4, minW: 5, minH: 1, static: true}
    ];
    this.state = { 
      layout, 
      loggedin: false };
  }

  changeLoggedin = (value) => {
    this.setState({ loggedin: value})
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  componentWillMount() { //if login not required log in automatically
    if (LoginRequired == false){
      this.setState({loggedin: true})
    }
  }

  render() {
    return [
      <Login loggedin={this.state.loggedin} changeLoggedin={this.changeLoggedin}/>,
      <Notifications />,
      <ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange} {...this.props}>
        <div key="a" style={background} className="DragHandle"><TopMenu /></div>
        <div key="b" style={background} className="DragHandle"><LeftMenu /></div>
        { this.state.loggedin //if we are not logged into the app don't show the list of torrents
          ? <div key="c" style={background} className="DragHandle"><TorrentList /></div>
          : <div key="c" style={background} className="DragHandle"></div>
        }
        <div key="d"><BottomMenu /></div>
      </ReactGridLayout>//returning our 4 grids 
    ];
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