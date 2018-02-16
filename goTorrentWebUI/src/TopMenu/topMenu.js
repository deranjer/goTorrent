import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';  // contains the font for material UI
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

import AddTorrentLinkPopup from './Modals/addTorrentLinkModal';
import AddTorrentFilePopup from './Modals/addTorrentFileModal';
import AddRSSModal from './Modals/RSSModal/addRSSModal';
import DeleteTorrentModal from './Modals/deleteTorrentModal';
import ChangeStorageModal from './Modals/changeStorageModal';
import TorrentSearch from './torrentSearch';

import StartTorrentIcon from 'material-ui-icons/PlayArrow';
//import PauseTorrentIcon from 'material-ui-icons/Pause';
import StopTorrentIcon from 'material-ui-icons/Stop';
import RSSTorrentIcon from 'material-ui-icons/RssFeed';
import SettingsIcon from 'material-ui-icons/Settings';
import ForceUploadIcon from 'material-ui-icons/KeyboardArrowUp';


import ReactTooltip from 'react-tooltip'

import DeleteIcon from 'material-ui-icons/Delete';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

import BackendSocket from '../BackendComm/backendWebsocket';


//Redux
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions'


const styles = theme => ({
  button: {
     margin: theme.spacing.unit,
     fontSize: '60px',
  },
  input: {
    display: 'none',
  },
  padding: {
    paddingTop: '10px',
    paddingLeft: '10px',
  },
  verticalDivider: {
    borderLeft: '2px solid grey',
    padding: '20px',
    height: '40px',
    position: 'absolute',
    display: 'inline-block',
    paddingRight: '30px',
    paddingLeft: '30px',
  },
  background: {
    backgroundColor: theme.palette.background.paper,

  }
});


class IconButtons extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      forceStartButton: "default"
    }
    
  }

  componentWillReceiveProps = (nextprops) => {
    if (nextprops.selectionHashes.length > 0){
      this.setState({forceStartButton: "primary"})
    } else {
      this.setState({forceStartButton: "default"})
    }
  }

  forceStartTorrent = () => {
    console.log("Force starting Torrents", this.props.selectionHashes)
    let forceUploadTorrents = {
      MessageType: "forceUploadTorrents",
      Payload: {"TorrentHashes": this.props.selectionHashes}
    }
    ws.send(JSON.stringify(forceUploadTorrents))
  }

  startTorrent = () => {
    console.log("Starting Torrents", this.props.selectionHashes)
    let startTorrentHashes = {
      MessageType: "startTorrents",
      Payload: {"TorrentHashes": this.props.selectionHashes}    
    }
    //console.log("Peers tab information requested", peerListHashes)
    ws.send(JSON.stringify(startTorrentHashes))
    this.props.setButtonState(this.props.selection) //TODO this currently just forces a button refresh, should be a better way to do this
  }
 
  stopTorrent = () => {
    let stopTorrentHashes = {
      MessageType: "stopTorrents",
      Payload: {"TorrentHashes": this.props.selectionHashes}    
    }
    console.log("Stopping Torrents", stopTorrentHashes)
    ws.send(JSON.stringify(stopTorrentHashes))
    this.props.setButtonState(this.props.selection) //TODO this currently just forces a button refresh, should be a better way to do this
  }


  render() {
    const { classes } = this.props;
    return (
    <div className={classes.padding}>
        <AddTorrentFilePopup />
        <AddTorrentLinkPopup />
        <div className={classes.verticalDivider}></div>
        <IconButton color={this.state.forceStartButton} data-tip="Force Upload Torrent (override upload limit)" className={classes.button} aria-label="Force Start Torrent" onClick={this.forceStartTorrent}>
          <ReactTooltip place="top" type="light" effect="float" />
          <ForceUploadIcon />
        </IconButton>
        <IconButton color={this.props.buttonState[0].startButton} data-tip="Start Torrent" className={classes.button} aria-label="Start Torrent" onClick={this.startTorrent}>
          <ReactTooltip place="top" type="light" effect="float" />
          <StartTorrentIcon />
        </IconButton>
       {/*  <IconButton color={this.props.buttonState[0].pauseButton} data-tip="Pause Torrent" className={classes.button} aria-label="Pause Torrent">
          <ReactTooltip place="top" type="light" effect="float" />
          <PauseTorrentIcon />
        </IconButton> */}
        <IconButton color={this.props.buttonState[0].stopButton} data-tip="Stop Torrent" className={classes.button} onClick={this.stopTorrent} aria-label="Stop Torrent">
          <ReactTooltip place="top" type="light" effect="float" />
          <StopTorrentIcon />
        </IconButton>
        <DeleteTorrentModal />
        <div className={classes.verticalDivider}></div>
        <ChangeStorageModal />
        <AddRSSModal />
        <IconButton color="primary" data-tip="Settings" className={classes.button} aria-label="Settings">
          <ReactTooltip place="top" type="light" effect="float" />
          <SettingsIcon />
        </IconButton>
        <div className={classes.verticalDivider}></div>
        <TorrentSearch />
        <div className={classes.verticalDivider}></div>
        <BackendSocket />
        
      </div>
    );
  }
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
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
  }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IconButtons))
