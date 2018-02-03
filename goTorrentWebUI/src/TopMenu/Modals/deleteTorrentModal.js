import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogActions,
} from 'material-ui/Dialog';
//import InsertLinkIcon from 'material-ui-icons/Link';
import ReactTooltip from 'react-tooltip'
//import Icon from 'material-ui/Icon';
import AddIcon from 'material-ui-icons/AddBox';
import IconButton from 'material-ui/IconButton';
import DeleteTorrentIcon from 'material-ui-icons/Delete';

//Redux
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const button = {
  fontSize: '60px',
  marginRight: '20px',
}

const inlineStyle = {
  display: 'inline-block',
}



class DeleteTorrentModal extends React.Component {

  state = {
    open: false,
  };

  handleDeleteTorrent = () => {
    let selection = []
    let deleteTorrentHashes = {
      MessageType: "deleteTorrents",
      MessageDetail: "false", //delete with data
      Payload: this.props.selectionHashes
    }
    console.log("Deleting Torrents", deleteTorrentHashes)
    ws.send(JSON.stringify(deleteTorrentHashes))
    this.props.setButtonState(this.props.selection) //TODO this currently just forces a button refresh, should be a better way to do this
    this.props.changeSelection(selection) //purging out our selection after deleting a torent
    this.setState({ open: false });
  }

  handleDeleteData = () => {
    let selection = []

    let deleteTorrentHashes = {
      MessageType: "deleteTorrents",
      MessageDetail: "true", //delete with data
      Payload: this.props.selectionHashes,
    }
    console.log("Deleting Torrents and Data", deleteTorrentHashes)
    ws.send(JSON.stringify(deleteTorrentHashes))
    this.props.setButtonState(this.props.selection) //TODO this currently just forces a button refresh, should be a better way to do this
    this.props.changeSelection(selection) //purging out our selection after deleting a torent
    this.setState({ open: false });
  }


  handleClickOpen = () => {
      if (this.props.selection.length > 0){
        this.setState({ open: true });
      } else {
          console.log("Select a torrent to delete..")
      }
    
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  setTextValue = (event) => {
    this.setState({textValue: event.target.value});
  }

  render() {
    const { onRequestClose, handleRequestClose, handleSubmit } = this.props;
    return (
      <div style={inlineStyle}>

        <IconButton color={this.props.buttonState[0].deleteButton} data-tip="Delete Torrent" style={button} onClick={this.handleClickOpen} aria-label="Delete Torrent">
          <ReactTooltip place="top" type="error" effect="float" />
          <DeleteTorrentIcon />
        </IconButton>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose} onEscapeKeyUp={this.handleRequestClose} maxWidth="md">
          <DialogTitle>Delete Torrent</DialogTitle>
          <DialogContent>
          Are you sure you want to delete Torrent?
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDeleteData} color="primary">
              Delete with Data
            </Button>
            <Button onClick={this.handleDeleteTorrent} color="primary">
              Delete just Torrent
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
};

const mapStateToProps = state => {
    return {
      buttonState: state.buttonState,
      selection: state.selection,
      selectionHashes: state.selectionHashes,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        setButtonState: (buttonState) => dispatch({type: actionTypes.SET_BUTTON_STATE, buttonState}),
        changeSelection: (selection) => dispatch({type: actionTypes.CHANGE_SELECTION, selection}), //used to force a selection empty after deleting torrent
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(DeleteTorrentModal)