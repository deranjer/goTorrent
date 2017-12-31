import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';  // contains the font for material UI
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

import AddTorrentLinkPopup from './addTorrentLinkModal';
import AddTorrentFilePopup from './addTorrentFileModal';


import StartTorrentIcon from 'material-ui-icons/PlayArrow';
//import PauseTorrentIcon from 'material-ui-icons/Pause';
import StopTorrentIcon from 'material-ui-icons/Stop';
import DeleteTorrentIcon from 'material-ui-icons/Delete';
import RSSTorrentIcon from 'material-ui-icons/RssFeed';
import SettingsIcon from 'material-ui-icons/Settings';


import ReactTooltip from 'react-tooltip'

import DeleteIcon from 'material-ui-icons/Delete';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

import BackendSocket from './BackendComm/backendWebsocket';


//Redux
import {connect} from 'react-redux';
import * as actionTypes from './store/actions'


const styles = theme => ({
  button: {
     margin: theme.spacing.unit,
     fontSize: '60px',
  },
  input: {
    display: 'none',
  },
  paddingTest: {
    display: 'inline-block'
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
    
  }


  startTorrent = () => {
    console.log("Starting Torrents", this.props.selectionHashes)
    let startTorrentHashes = {
      MessageType: "startTorrents",
      Payload: this.props.selectionHashes,    
    }
    //console.log("Peers tab information requested", peerListHashes)
    ws.send(JSON.stringify(startTorrentHashes))
  }
 
  stopTorrent = () => {
    let stopTorrentHashes = {
      MessageType: "stopTorrents",
      Payload: this.props.selectionHashes,    
    }
    console.log("Stopping Torrents", stopTorrentHashes)
    ws.send(JSON.stringify(stopTorrentHashes))
  }

  deleteTorrent = () => {
    
    let deleteTorrentHashes = {
      MessageType: "deleteTorrents",
      Payload: this.props.selectionHashes,    
    }
    console.log("Deleting Torrents", deleteTorrentHashes)
    ws.send(JSON.stringify(deleteTorrentHashes))
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.padding}>
        <AddTorrentFilePopup />
        <AddTorrentLinkPopup />
        <div className={classes.verticalDivider}></div>
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
        <IconButton color={this.props.buttonState[0].deleteButton} data-tip="Delete Torrent" className={classes.button} onClick={this.deleteTorrent} aria-label="Delete Torrent">
          <ReactTooltip place="top" type="error" effect="float" />
          <DeleteTorrentIcon />
        </IconButton>
        <div className={classes.verticalDivider}></div>
        <IconButton color="primary" data-tip="Manage RSS Feeds" className={classes.button} aria-label="RSS Feeds">
          <ReactTooltip place="top" type="light" effect="float" />
          <RSSTorrentIcon />
        </IconButton>
        <IconButton color="primary" data-tip="Settings" className={classes.button} aria-label="Settings">
          <ReactTooltip place="top" type="light" effect="float" />
          <SettingsIcon />
        </IconButton>
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
    //changeSelection: (selection) => dispatch({type: actionTypes.CHANGE_SELECTION, selection: selection})
  }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IconButtons))
