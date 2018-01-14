import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
//import InsertLinkIcon from 'material-ui-icons/Link';
import ReactTooltip from 'react-tooltip'
//import Icon from 'material-ui/Icon';
import AddIcon from 'material-ui-icons/AddBox';
import IconButton from 'material-ui/IconButton';
//import Dropzone from 'react-dropzone'; //the File drop acceptor
//const request = require('superagent');

const button = {
  fontSize: '60px',
  paddingRight: '20px',
  paddingLeft: '20px',
}

const inlineStyle = {
  display: 'inline-block',
}



export default class addTorrentFilePopup extends React.Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  setTextValue = (event) => {
    this.setState({textValue: event.target.value});
  }

  render() {
    const { classes, onRequestClose, handleRequestClose, handleSubmit } = this.props;
    return (
      <div style={inlineStyle}>
        <IconButton onClick={this.handleClickOpen} color="primary" data-tip="Add Torrent File" style={button}  centerRipple aria-label="Add Torrent File" >
        <ReactTooltip place="top" type="light" effect="float" />
        <AddIcon />
      </IconButton>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose} onEscapeKeyUp={this.handleRequestClose} maxWidth="md">
          <DialogTitle>Add Torrent File</DialogTitle>
          <DialogContent>
            <form  encType="multipart/form-data" method="post" action="/uploadTorrent">
               <input  name="fileTest" type="file" /><p />
               <input type="submit" value="submit" />
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
};
