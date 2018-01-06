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
import RSSModalList from './addRSSModalList';

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

 class AddRSSModal extends React.Component {

  state = {
    open: false,
  };

  componentWillMount () {
    let RSSRequest = {
      messageType: "rssFeedRequest",
    }
    ws.send(JSON.stringify(RSSRequest)) //Immediatly request an update of the feed when you add a new URL
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }
  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.setState({ open: false });

  }

  handleAddRSSFeed = () => {
    this.setState({ textValue: "Clear"}) //clearing out the text submitted
    let RSSURLSubmit = {
      messageType: "addRSSFeed",
      Payload: [this.state.textValue]
    }
    ws.send(JSON.stringify(RSSURLSubmit));
    let RSSRequest = {
      messageType: "rssFeedRequest",
    }
    ws.send(JSON.stringify(RSSRequest)) //Immediatly request an update of the feed when you add a new URL
  }

  setTextValue = (event) => {
    this.setState({ textValue: event.target.value });
  }

  //{this.props.RSSList.map(function(RSSFeed, i){ return (
  //  <ListItem key={i}><ListItemText primary="FEED" /></ListItem>
  //  )})}

  render() {
    const { classes, onRequestClose, handleRequestClose, handleSubmit } = this.props;
    return (
      <div style={inlineStyle}>
        <IconButton onClick={this.handleClickOpen} color="primary" data-tip="Add RSS URL" style={button} aria-label="RSS Feeds">
          <ReactTooltip place="top" type="light" effect="float" />
          <RSSTorrentIcon />
        </IconButton>
        <Dialog fullWidth open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Manage RSS Feeds</DialogTitle>
          <DialogContent>
            <TextField
              style={rssInput}
              autoFocus
              margin="dense"
              id="name"
              label="Add New RSS URL"
              type="text"
              placeholder="Enter RSS URL Here.."
              //onChange={this.setTextValue}
            />
            <IconButton onClick={this.handleAddRSSFeed} color="primary" data-tip="Manage RSS Feeds" style={smallButton} aria-label="Add RSS Feeds">
              <ReactTooltip place="top" type="light" effect="float" />
              <AddRSSIcon />
            </IconButton>
            {this.state.open === true &&
              <RSSModalList />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
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
      newRSSFeedStore: (RSSList) => dispatch({type: actionTypes.NEW_RSS_FEED_STORE, RSSList}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRSSModal)