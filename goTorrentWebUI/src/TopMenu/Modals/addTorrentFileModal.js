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

import Upload from 'material-ui-upload/Upload';

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
    torrentFileValue: new File([""], "tempName"),
    storageValue: "",
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
    this.setState({torrentFileValue: event.target.value});
    const reader = new FileReader()
    let torrentFileBlob = Blob(this.state.torrentFileValue)
    let base64file = reader.readAsDataURL(torrentFileBlob)
    
    let torrentFileMessage = {
      messageType: "torrentFileSubmit",
      messageDetail: this.state.torrentFileName,
      messageDetailTwo: this.state.storageValue,
      Payload: [base64file],
    }
    console.log("Sending magnet link: ", torrentFileMessage);
    ws.send(JSON.stringify(torrentFileMessage));
  }

  onFileLoad = (event, file) => {
    this.setState({torrentFileName: file.name})
    this.setState({torrentFileValue: File(file, file.name)})

    console.log(event.target.result, file.name);
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
                Upload Torrent Here and Add Storage Path
            </DialogContentText>
            <Upload label="Upload Torrent" fileTypeRegex={/.torrent/} onFileLoad={this.onFileLoad}/>
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
