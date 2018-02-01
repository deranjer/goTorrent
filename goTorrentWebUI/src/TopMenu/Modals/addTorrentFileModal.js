import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from 'material-ui/Dialog';
//import InsertLinkIcon from 'material-ui-icons/Link';
import ReactTooltip from 'react-tooltip'
//import Icon from 'material-ui/Icon';
import AddIcon from 'material-ui-icons/AddBox';
import IconButton from 'material-ui/IconButton';

import Dropzone from 'react-dropzone';

const button = {
  fontSize: '60px',
  marginLeft: '20px',
  marginRight: '20px',
}

const uploadButton = {
  fontSize: '35px',
  paddingLeft: '0px',
}

const inlineStyle = {
  display: 'inline-block',
}

const input = {
  display: 'none',
}


export default class addTorrentFilePopup extends React.Component {

  state = {
    open: false,
    torrentFileName: "",
    torrentFileValue: [],
    storageValue: ``, //raw string for possible windows filepath
    showDrop: true,
    torrentLabel: "",
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.setState({open: false})
    const reader = new FileReader()
    let torrentFileBlob = new Blob(this.state.torrentFileValue)
    console.log("Blob", torrentFileBlob)
    reader.readAsDataURL(torrentFileBlob)
    reader.onloadend = () => {
      let base64data = reader.result;                
      console.log("Base64", base64data)
    
      let torrentFileMessage = {
        MessageType: "torrentFileSubmit",
        MessageDetail: this.state.torrentFileName,  //filename
        MessageDetailTwo: this.state.storageValue, //storage path
        MessageDetailThree: this.state.torrentLabel, //torrent label
        Payload: [base64data],
      }
      console.log("Sending Torrent File: ", torrentFileMessage);
      ws.send(JSON.stringify(torrentFileMessage));
      this.setState({torrentFileName: "", storageValue: ``, torrentFileValue: [], showDrop: true})
    }   
  }

  onFileLoad = (file) => {
    this.setState({torrentFileName: file[0].name})
    this.setState({showDrop: false})
    this.setState({torrentFileValue: file})
    console.log("File Name", file[0].name)
  }
  
  setLabelValue = (event) => {
    this.setState({torrentLabel: event.target.value})
  }

  setStorageValue = (event) => {
    this.setState({storageValue: event.target.value})
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
            <DialogContentText>
                
            </DialogContentText>
            {this.state.showDrop &&
            <Dropzone disablePreview multiple={false} onDrop={this.onFileLoad}>
                Upload Torrent Here and Add Storage Path
            </Dropzone>
            }
            {this.state.torrentFileName != "" &&
              this.state.torrentFileName
            }
            <TextField id="storagePath" type="text" label="Storage Path" placeholder="Empty will be default torrent storage path" fullWidth onChange={this.setStorageValue} />
            <TextField id="labelValue" type="text" label="Label Value" placeholder="Empty will be no label" fullWidth onChange={this.setLabelValue} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
};
