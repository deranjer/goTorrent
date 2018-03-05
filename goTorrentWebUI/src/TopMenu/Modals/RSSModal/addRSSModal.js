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
import ReactTooltip from 'react-tooltip'
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import RSSTorrentIcon from 'material-ui-icons/RssFeed';

import RSSModalLayout from './RSSModalLayout'

//Redux
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';

const button = {
  fontSize: '60px',
  marginLeft: '20px',
}

const inlineStyle = {
  display: 'inline-block',
  backdrop: 'static',
}

 class AddRSSModal extends React.Component {


  rssModalOpenState = () => {
    let RSSRequest = {
      MessageType: "rssFeedRequest",
    }
    ws.send(JSON.stringify(RSSRequest)) 

    console.log("Opening RSS Modal")
    this.props.rssModalOpenState(true)
  }

  render() {
    const { classes, onRequestClose, handleRequestClose, handleSubmit } = this.props;
    return (

      <div style={inlineStyle}>
        <IconButton onClick={this.rssModalOpenState} color="primary" data-tip="Add RSS URL" style={button} aria-label="RSS Feeds">
          <ReactTooltip place="top" type="light" effect="float" />
          <RSSTorrentIcon />
        </IconButton>
        <Dialog fullScreen open={this.props.RSSModalOpen} onClose={this.handleRequestClose} onEscapeKeyDown={this.handleRequestClose}>
        <DialogTitle>Manage RSS Feeds</DialogTitle>
          <RSSModalLayout />
        </Dialog>   
      </div>

    );
  }
};


const mapStateToProps = state => {
  return {
    RSSModalOpen: state.RSSModalOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      rssModalOpenState: (RSSModalOpen) => dispatch({type: actionTypes.RSS_MODAL_OPEN_STATE, RSSModalOpen}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRSSModal)