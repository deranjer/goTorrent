import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
//import PropTypes from 'prop-types';
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
import SettingsIcon from 'material-ui-icons/Settings';

import SettingsModalLayout from './settingsModalLayout'

//Redux
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';

const button = {
  fontSize: '60px',
  marginLeft: '20px',
  marginRight: '20px',
}

const inlineStyle = {
  display: 'inline-block',
  backdrop: 'static',
}

 class AddSettingsModal extends React.Component {


  settingsModalOpenState = () => {
    let settingsFileRequest = {
      MessageType: "settingsFileRequest",
    }
    ws.send(JSON.stringify(settingsFileRequest)) 

    console.log("Opening Settings Modal")
    this.props.settingsModalOpenState(true)
    
  }

  render() {
    const { classes, onRequestClose, handleRequestClose, handleSubmit } = this.props;
    return (

      <div style={inlineStyle}>
        <IconButton onClick={this.settingsModalOpenState} color="primary" data-tip="Settings Modal" style={button} aria-label="Settings Modal">
          <ReactTooltip place="top" type="light" effect="float" />
          <SettingsIcon />
        </IconButton>
        <Dialog fullScreen open={this.props.settingsModalOpen} onClose={this.handleRequestClose} onEscapeKeyDown={this.handleRequestClose}>
        <DialogTitle>Manage Settings</DialogTitle>
        <SettingsModalLayout />
        </Dialog>   
      </div>

    );
  }
};


const mapStateToProps = state => {
  return {
    settingsModalOpen: state.settingsModalOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      settingsModalOpenState: (settingsModalOpen) => dispatch({type: actionTypes.SETTINGS_MODAL_OPEN_STATE, settingsModalOpen}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSettingsModal)