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
import StorageIcon from 'material-ui-icons/Storage';
import ReactTooltip from 'react-tooltip'
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
//Importing Redux
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';



const button = {
  fontSize: '60px',
  marginLeft: '20px',

}

const inlineStyle = {
  display: 'inline-block',
  backdrop: 'static',
}

class ChangeStorageModal extends React.Component {

  state = {
    open: false,
    storageValue: ``,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
      this.setState({ open: false });
      let changeStorageMessage = {
        MessageType: "changeStorageValue",
        Payload: {"ChangeStorageHashes": this.props.selectionHashes, "StorageValue": this.state.storageValue} //the selection hashes and new store value
      }

      console.log("Sending new Storage Location: ", changeStorageMessage);
      ws.send(JSON.stringify(changeStorageMessage));
      this.setState({storageValue: ``})
  }

  setStorageValue = (event) => {
    this.setState({storageValue: event.target.value})
  }

  render() {
    const { classes, onRequestClose, handleRequestClose, handleSubmit } = this.props;
    return (
      <div style={inlineStyle}>
        <IconButton onClick={this.handleClickOpen} color="primary" data-tip="Change Storage Location" style={button}  centerRipple aria-label="Change Storage Location" >
        <ReactTooltip place="top" type="light" effect="float" />
        <StorageIcon />
      </IconButton>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>Change Storage Value</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a new Storage Location for selected Torrents and hit Submit
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Storage Value"
              type="text"
              placeholder="Enter Storage Value Here"
              fullWidth
              onChange={this.setStorageValue}
            />
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


const mapStateToProps = state => {
    return {
        selectionHashes: state.selectionHashes,
        selection: state.selection,
    };
  }




export default connect(mapStateToProps)(ChangeStorageModal);