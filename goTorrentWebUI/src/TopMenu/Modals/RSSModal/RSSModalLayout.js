import React from 'react';
import ReactDOM from 'react-dom';
//css for react grid
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';
//react-grid for layout
import RGL, { WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';
import _ from 'lodash';
//Redux
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';
//interior items

import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import ReactTooltip from 'react-tooltip'
import Icon from 'material-ui/Icon';

import RSSTorrentIcon from 'material-ui-icons/RssFeed';
import AddRSSIcon from 'material-ui-icons/AddCircle';
import RSSFeedList from './RSSFeedList';
import RSSTorrentList from './RSSTorrentList';


import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';



const ReactGridLayout = WidthProvider(RGL);

const background = {
  backgroundColor: '#e5e5e5',
  boxShadow: '0 0 20px #000',
}    


const button = {
  fontSize: '60px',
  paddingRight: '20px',
  paddingLeft: '20px',
}

const smallButton = {
    width: '36px',
    height: '36px',
    padding: '5px',
}

const rssInput = {
    width: '90%',
    paddingRight: '10px',
}

const inlineStyle = {
  display: 'inline-block',
  backdrop: 'static',
}


 class RSSModalLayout extends React.Component {

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
            {i: 'b', x: 0, y: 1, w: 1, h: 5, static: true},
            {i: 'c', x: 1, y: 1, w: 5, h: 5, minW: 5, minH: 3, static: true},
          ];
        this.state = { 
          layout ,
          textValue: "",
        };


    };
    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
    }

    handleRSSModalClose = () => {
        let closeState = false
        this.props.rssModalOpenState(closeState)
    }

  handleAddRSSFeed = () => {
    let RSSURLSubmit = {
      MessageType: "addRSSFeed",
      Payload: [this.state.textValue]
    }
    ws.send(JSON.stringify(RSSURLSubmit));
    let RSSRequest = {
      MessageType: "rssFeedRequest",
    }
    ws.send(JSON.stringify(RSSRequest)) //Immediatly request an update of the feed when you add a new URL
    this.setState({textValue: ""})
  }

  setTextValue = (event) => {
    this.setState({ textValue: event.target.value });
  }
  
  render() {
    return (
            <div style={inlineStyle}>
                <DialogContent>
                <ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange}
                    {...this.props}>
                    <div key="a" sytle={background} className="DragHandle">
                        <TextField
                        style={rssInput}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Add New RSS URL"
                        type="text"
                        placeholder="Enter RSS URL Here.."
                        onChange={this.setTextValue}
                        />
                    
                        <IconButton onClick={this.handleAddRSSFeed} color="primary" data-tip="Add RSS Feed" style={smallButton} aria-label="Add RSS Feeds">
                        <ReactTooltip place="top" type="light" effect="float" />
                        <AddRSSIcon />
                        </IconButton>
                    </div>
                    <div key="b" style={background} className="DragHandle">
                        <RSSFeedList />
                    </div>
                    <div key="c" style={background} className="DragHandle">
                        <RSSTorrentList />
                    </div>
                    </ReactGridLayout>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleRSSModalClose} color="primary">
                    Close
                    </Button>
                </DialogActions>
            </div>
    );
  }

};

//module.exports = RSSModalLayout;

const mapStateToProps = state => {
  return {
    RSSList: state.RSSList,
    RSSModalOpen: state.RSSModalOpen,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      rssModalOpenState: (RSSModalOpen) => dispatch({type: actionTypes.RSS_MODAL_OPEN_STATE, RSSModalOpen}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RSSModalLayout)