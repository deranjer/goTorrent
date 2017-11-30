import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';  // contains the font for material UI
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import DownloadingTorrentsIcon from 'material-ui-icons/FileDownload'
import UploadingTorrentsIcon from 'material-ui-icons/FileUpload'
import ActiveTorrentsIcon from 'material-ui-icons/SwapVert'


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
  
  function SimpleList(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <List>
          <ListItem button>
            <ListItemIcon className={classes.icons}>
              <DownloadingTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Downloading Torrents" />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.icons}>
              <UploadingTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Uploading Torrents" />
          </ListItem>
          <ListItem button>
            <ListItemIcon className={classes.icons}>
              <ActiveTorrentsIcon />
            </ListItemIcon>
            <ListItemText primary="Active Torrents" />
          </ListItem>
          <ListItem button>
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
  
  SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleList);