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
  };

  componentWillMount () {
    console.log("SECONDARY MOUNT", this.props.RSSFeed)
  }



  showRSSFiles = (RSSFeed) => {
    console.log("RSSFEED", RSSFeed)
  }

  //{this.props.RSSList.map(function(RSSFeed, i){ return (
  //  <ListItem key={i}><ListItemText primary="FEED" /></ListItem>
  //  )})}

  render() {
    const { classes, onRequestClose, handleRequestClose, handleSubmit } = this.props;
    return (
      <div style={inlineStyle}>
            <List dense>
            <ListItem  button={true} onClick={ () => this.showRSSFiles('RSSFEEDTEST')}>
            <ListItemIcon >
              <AddRSSIcon />
            </ListItemIcon>
            <ListItemText primary={this.props.RSSList[0].RSSURL} />
          </ListItem>
            </List>        
      </div>
    );
  }

};

const mapStateToProps = state => {
  return {
    RSSList: state.RSSList,
  };
}


export default connect(mapStateToProps)(RSSModalList)