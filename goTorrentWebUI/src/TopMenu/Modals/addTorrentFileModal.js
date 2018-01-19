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
  paddingRight: '20px',
  paddingLeft: '20px',
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
    storageValue: "",
    showDrop: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.setState({ open: false });
    //let magnetLinkSubmit = this.state.textValue;
    console.log("File", this.state.torrentFileValue)
    const reader = new FileReader()
    let torrentFileBlob = new Blob(this.state.torrentFileValue)
    console.log("Blob", torrentFileBlob)
    reader.readAsDataURL(torrentFileBlob)
    reader.onloadend = () => {
      let base64data = reader.result;                
      console.log("Base64", base64data)
    
      let torrentFileMessage = {
        messageType: "torrentFileSubmit",
        messageDetail: this.state.torrentFileName,
        messageDetailTwo: this.state.storageValue,
        Payload: [base64data],
      }
      console.log("Sending magnet link: ", torrentFileMessage);
      ws.send(JSON.stringify(torrentFileMessage));
    }   
  }

  onFileLoad = (file) => {
    this.setState({torrentFileName: file[0].name})
    this.setState({showDrop: false})
    this.setState({torrentFileValue: file})
    console.log("File Name", file[0].name)
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
