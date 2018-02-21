import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';  // contains the font for material UI
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import DownloadingTorrentsIcon from 'material-ui-icons/FileDownload'
import UploadingTorrentsIcon from 'material-ui-icons/FileUpload'
import ActiveTorrentsIcon from 'material-ui-icons/SwapVert'
import AllTorrentsIcon from 'material-ui-icons/AllInclusive'
import StopTorrentIcon from 'material-ui-icons/Stop';

//react redux
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions';

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: '#e5e5e5',
    },
    icons: {
      width: '40px',
      height: '40px',
    },
    inactiveIcon: {
      width: '40px',
      height: '40px',
      color: 'red',
    },
    active: {
      backgroundColor: '#80b3ff',
    }
});
  

class SimpleList extends React.Component {
  constructor(props){
    super(props);
    const { classes } = this.props;
    this.state = {
        activeIndex: 0,
    }
  }

  componentWillReceiveProps = (nextprops) => {
    const { classes } = this.props;
    if (nextprops.filter[0].columnName == "TorrentName"){ //If we are using the top searchbox move back to all torrents
      this.setState({activeIndex: 0})
    }
  }


  setFilter = (filterState, id) => {
    const { classes } = this.props;
    filterState = [{columnName: 'Status', value: filterState}]
    this.props.changeFilter(filterState)//dispatch to redux
    console.log("Switching filters classes", id)
    this.setState({activeIndex: id})

    }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List dense>
        <ListItem dense className={this.state.activeIndex==0 ? classes.active: null} button onClick={ () => this.setFilter('', 0)}>
            <ListItemIcon className={classes.icons} >
              <AllTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="All Torrents" />
          </ListItem>
          <ListItem className={this.state.activeIndex==1 ? classes.active: null} button onClick={ () => this.setFilter('Downloading', 1)}>
            <ListItemIcon className={classes.icons}>
              <DownloadingTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Downloading Torrents" />
          </ListItem>
          <ListItem className={this.state.activeIndex==2 ? classes.active: null} button onClick={ () => this.setFilter('Seeding', 2)}>
            <ListItemIcon className={classes.icons}>
              <UploadingTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Seeding Torrents" />
          </ListItem>
          <ListItem className={this.state.activeIndex==3 ? classes.active: null} button onClick={ () => this.setFilter('Stopped', 3)}>
            <ListItemIcon className={classes.inactiveIcon}>
              <StopTorrentIcon />
            </ListItemIcon>
            <ListItemText primary="Stopped Torrents" />
          </ListItem>
          <ListItem  className={this.state.activeIndex==4 ? classes.active: null} button onClick={ () => this.setFilter('Completed', 4)}>
            <ListItemIcon className={classes.icons}>
              <ActiveTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Completed Torrents" />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  }
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => {
  return {
    filter: state.filter
  };
}

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: (filter) => dispatch({type: actionTypes.CHANGE_FILTER, filter: filter})
  }
}




export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SimpleList));