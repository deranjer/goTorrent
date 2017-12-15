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
    }
});
  

class SimpleList extends React.Component {
  constructor(props){
    super(props);
  }
  setFilter = (filterState) => {
    filterState = [{columnName: 'Status', value: filterState}]
    this.props.changeFilter(filterState)//dispatch to redux
  
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
        <ListItem button onClick={ () => this.setFilter('')}>
            <ListItemIcon className={classes.icons} >
              <AllTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="All Torrents" />
          </ListItem>
          <ListItem button={true} onClick={ () => this.setFilter('Downloading')}>
            <ListItemIcon className={classes.icons}>
              <DownloadingTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Downloading Torrents" />
          </ListItem>
          <ListItem button={true} onClick={ () => this.setFilter('Seeding')}>
            <ListItemIcon className={classes.icons}>
              <UploadingTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Uploading Torrents" />
          </ListItem>
          <ListItem button={true} onClick={ () => this.setFilter('Active')}>
            <ListItemIcon className={classes.icons}>
              <ActiveTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Active Torrents" />
          </ListItem>
          <ListItem button={true} onClick={ () => this.setFilter('Completed')}>
            <ListItemIcon className={classes.inactiveIcon}>
              <ActiveTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Inactive Torrents" />
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