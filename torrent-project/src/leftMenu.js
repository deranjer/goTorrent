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

//react redux
import {connect} from 'react-redux';
import * as actionTypes from './store/actions';

//TODO, clean up the goddamn variable names you are all over the place
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
        allTorrentsClass: classes.active,
        downloadingClass: '',
        seedingClass: '',
        activeTorrentsClass: '',
        completedTorrentsClass: '',
        allID: "All",
        downloadingID: "Downloading",
        seedingID: "Seeding",
        activeID: "Active",
        completedID: "Completed", 


    }
  }

  setActiveElement = (listItem) => {

  }



  setFilter = (filterState, id) => {
    const { classes } = this.props;
    filterState = [{columnName: 'Status', value: filterState}]
    this.props.changeFilter(filterState)//dispatch to redux
    console.log("Switching filters classes", id)
    switch (id){ //TODO.. there has to be a better fucking way to do this
      case "All":
        this.state.allTorrentsClass = classes.active
        this.state.downloadingClass = ''
        this.state.seedingClass = ''
        this.state.activeTorrentsClass = ''
        this.state.completedTorrentsClass = ''
        break
      case "Downloading": 
        console.log("Downloading...")
        this.state.downloadingClass = classes.active
        this.state.allTorrentsClass = ''
        this.state.seedingClass = ''
        this.state.activeTorrentsClass = ''
        this.state.completedTorrentsClass = ''
        break
      case "Seeding":
        this.state.seedingClass = classes.active
        this.state.allTorrentsClass = ''
        this.state.downloadingClass = ''
        this.state.activeTorrentsClass = ''
        this.state.completedTorrentsClass = ''
        break
      case "Active":
        this.state.activeTorrentsClass = classes.active
        this.state.allTorrentsClass = ''
        this.state.downloadingClass = ''
        this.state.seedingClass = ''
        this.state.completedTorrentsClass = ''
        break
      case "Completed":
        this.state.completedTorrentsClass = classes.active
        this.state.allTorrentsClass = ''
        this.state.downloadingClass = ''
        this.state.seedingClass = ''
        this.state.activeTorrentsClass = ''
        break

    }

  
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List dense>
        <ListItem dense className={this.state.allTorrentsClass} button onClick={ () => this.setFilter('', this.state.allID)}>
            <ListItemIcon className={classes.icons} >
              <AllTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="All Torrents" />
          </ListItem>
          <ListItem className={this.state.downloadingClass} button={true} onClick={ () => this.setFilter('Downloading', this.state.downloadingID)}>
            <ListItemIcon className={classes.icons}>
              <DownloadingTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Downloading Torrents" />
          </ListItem>
          <ListItem className={this.state.seedingClass} button={true} onClick={ () => this.setFilter('Seeding', this.state.seedingID)}>
            <ListItemIcon className={classes.icons}>
              <UploadingTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Seeding Torrents" />
          </ListItem>
          <ListItem className={this.state.activeTorrentsClass} button={true} onClick={ () => this.setFilter('Active', this.state.activeID)}>
            <ListItemIcon className={classes.icons}>
              <ActiveTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Active Torrents" />
          </ListItem>
          <ListItem  className={this.state.completedTorrentsClass} button={true} onClick={ () => this.setFilter('Completed', this.state.completedID)}>
            <ListItemIcon className={classes.inactiveIcon}>
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