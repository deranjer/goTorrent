import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
  } from 'material-ui/List';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import InsertLinkIcon from 'material-ui-icons/Link';
import ReactTooltip from 'react-tooltip'
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import RSSTorrentIcon from 'material-ui-icons/RssFeed';
import AddRSSIcon from 'material-ui-icons/AddCircle';
import DeleteIcon from 'material-ui-icons/Delete';
import RSSTorrentList from './addRSSTorrentList';

//Redux
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

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

 class RSSModalList extends React.Component {

  state = {
    testRSSFeeds: [],
    showList: false,
    selectedIndex: 0,
  };

  componentDidMount () {
    console.log("SECONDARY MOUNT", this.props.RSSList)
    this.props.RSSModalOpen(true)
  }

  componentWillUnmount () {
    this.props.RSSModalOpen(false)
  }


  showRSSFiles = (key) => {
    let RSSTorrentsRequest = {
      messageType: "rssTorrentsRequest",
      Payload: [this.props.RSSList[key].RSSURL]
    }
    ws.send(JSON.stringify(RSSTorrentsRequest))

    this.setState({selectedIndex: key}) //setting our selected index for styling
    console.log("RSSFEED", key, "sending message", JSON.stringify(RSSTorrentsRequest))

  }

  getStyle = (index) => {
    console.log("SettingStye", selectedIndex, index)
    if (selectedIndex == index){
      console.log("Returning activestyle")
      style = "{{backgroundColor: '#80b3ff'}}"
      return style
    }
    style = "{{backgroundColor: '#f44295'}}"
    return style
  }

  deleteRSSFeed = (key) => {
    let RSSURLDelete = {
      messageType: "deleteRSSFeed",
      Payload: [this.props.RSSList[key]]
    }
    console.log("Deleting THIS", this.props.RSSList[key])
    //ws.send(JSON.stringify(RSSURLDelete));
  }

  render() {
    //const { classes, onRequestClose, handleRequestClose, handleSubmit } = this.props;
    if (this.props.RSSList.length > 0 && this.state.showList == false){
      console.log("Setting list to show....")
      this.setState({showList: true})
    }

    return (
      <div style={inlineStyle}>
        {this.state.showList == true && //if we have any rss torrent feeds then display them in list    }
          <List dense>
            {this.props.RSSList.map((RSSFeed, index) => { 
              return (
                <ListItem button={true} onClick={() => this.showRSSFiles(index)} key={index}>
                  <ListItemText primary={RSSFeed.RSSName} />
                  <ListItemSecondaryAction>
                    <IconButton key={index} onClick={() => this.deleteRSSFeed(index)} aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )})}
          </List> 
        }
      <RSSTorrentList />
      </div>
    );
  }

};

const mapStateToProps = state => {
  return {
    RSSList: state.RSSList,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    RSSModalOpen: (RSSModalOpen) => dispatch({type: actionTypes.RSS_MODAL_OPEN, RSSModalOpen}), //sending modal state to backendwebsocket so we can update RSS lists
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RSSModalList)