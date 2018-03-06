import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
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




const button = {
  fontSize: '60px',
  marginRight: '20px',
}

const inlineStyle = {
  display: 'inline-block',
  backdrop: 'static',
}

export default class addTorrentPopup extends React.Component {



  state = {
    open: false,
    magnetLinkValue: "",
    storageValue: ``,
    torrentLabel: "",

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
      console.log("MagnetLink", this.state.magnetLinkValue)
      let magnetLinkMessage = {
        MessageType: "magnetLinkSubmit",
        Payload: {"MagnetLinks": [this.state.magnetLinkValue], "StorageValue": this.state.storageValue, "Label": this.state.torrentLabel}
      }
      console.log("Sending magnet link: ", magnetLinkMessage);
      ws.send(JSON.stringify(magnetLinkMessage));
      //this.setState({magnetLinkValue: ""}, {torrentLabel: ""}, {storageValue: ``})
  }

  setMagnetLinkValue = (event) => {
    this.setState({magnetLinkValue: event.target.value});
  }

  setStorageValue = (event) => {
    this.setState({storageValue: event.target.value})
  }

  setLabelValue = (event) => {
    this.setState({torrentLabel: event.target.value})
  }

  render() {
    const { classes, onClose, handleRequestClose, handleSubmit } = this.props;
    return (
      <div style={inlineStyle}>
        <IconButton onClick={this.handleClickOpen} color="primary" data-tip="Add Magnet Link" style={button}  centerRipple aria-label="Add Magnet Link" >
        <ReactTooltip place="top" type="light" effect="float" />
        <InsertLinkIcon />
      </IconButton>
        <Dialog open={this.state.open} onClose={this.handleRequestClose} onEscapeKeyDown={this.handleRequestClose}>
          <DialogTitle>Add Magnet Link</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a Magnet Link here and hit submit to add torrent...
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Magnet Link"
              type="text"
              placeholder="Enter Magnet Link Here"
              fullWidth
              onChange={this.setMagnetLinkValue}
            />
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
