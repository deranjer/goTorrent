import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';  // contains the font for material UI
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

import AddTorrentLinkPopup from './addTorrentLinkModal';
import AddTorrentFilePopup from './addTorrentFileModal';


import StartTorrentIcon from 'material-ui-icons/PlayArrow';
import PauseTorrentIcon from 'material-ui-icons/Pause';
import StopTorrentIcon from 'material-ui-icons/Stop';
import DeleteTorrentIcon from 'material-ui-icons/Delete';
import RSSTorrentIcon from 'material-ui-icons/RssFeed';
import SettingsIcon from 'material-ui-icons/Settings';


import ReactTooltip from 'react-tooltip'

import DeleteIcon from 'material-ui-icons/Delete';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
//import PhotoCamera from 'material-ui-icons/PhotoCamera';

//Redux
import {connect} from 'react-redux';


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
    let buttonState = "default"
    console.log("buttonState", buttonState)
    switch(buttonState){
      case "paused":
        startTorrentState: "primary"
        pauseTorrentState: "disabled"
        stopTorrentState: "primary"
        deleteTorrentState: "accent"

      case "stopped":
        startTorrentState: "primary"
        pauseTorrentState: "disabled"
        stopTorrentState: "primary"
        deleteTorrentState: "accent"

      case "downloading":
        startTorrentState: "disabled"
        pauseTorrentState: "primary"
        stopTorrentState: "primary"
        deleteTorrentState: "accent"

      default:
        startTorrentState: "disabled"
        pauseTorrentState: "disabled"
        stopTorrentState: "disabled"
        deleteTorrentState: "disabled" 
    }
  }
  
/*   onGlobalSelectRow = (selectedRowProps) => {
    console.log("Here...", selectedRowProps)
  }
 */
 

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.padding}>
        <AddTorrentFilePopup />
        <AddTorrentLinkPopup />
        <div className={classes.verticalDivider}></div>
        <IconButton color={this.props.startTorrentState} data-tip="Start Torrent" className={classes.button} aria-label="Start Torrent">
          <ReactTooltip place="top" type="light" effect="float" />
          <StartTorrentIcon />
        </IconButton>
        <IconButton color={this.props.pauseTorrentState} data-tip="Pause Torrent" className={classes.button} aria-label="Pause Torrent">
          <ReactTooltip place="top" type="light" effect="float" />
          <PauseTorrentIcon />
        </IconButton>
        <IconButton color={this.props.stopTorrentState} data-tip="Stop Torrent" className={classes.button} aria-label="Stop Torrent">
          <ReactTooltip place="top" type="light" effect="float" />
          <StopTorrentIcon />
        </IconButton>
        <IconButton color={this.props.deleteTorrentState} data-tip="Delete Torrent" className={classes.button} aria-label="Delete Torrent">
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
      </div>
    );
  }
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  return {
      buttonState: state.selection
  };
}


export default withStyles(styles)(connect(mapStateToProps)(IconButtons))
