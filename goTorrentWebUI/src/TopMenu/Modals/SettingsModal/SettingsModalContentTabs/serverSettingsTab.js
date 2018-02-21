import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import {connect} from 'react-redux';


const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: 0,
    },
    paper: {
      padding: 16,
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    floatRight: {
        float: 'right',
    }
});


class ServerSettingsTab extends React.PureComponent {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>    
            <Grid container spacing={8}>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>Scan Folder for Torrent Files: <span className={classes.floatRight}>{this.props.settingsFile["TorrentWatchFolder"]} </span></Paper>
                    <Paper className={classes.paper}>Folder that stores Uploaded Torrents: <span className={classes.floatRight}>{this.props.settingsFile["TFileUploadFolder"]} </span> </Paper>
                    <Paper className={classes.paper}>Default Move Folder: <span className={classes.floatRight}>{String(this.props.settingsFile["DefaultMoveFolder"])} </span> </Paper>
                           
                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>Automatic stop seeding Ratio: <span className={classes.floatRight}>{this.props.settingsFile["SeedRatioStop"]} </span> </Paper>
                   
                    
                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    
                
                </Grid>
            </Grid>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
      settingsFile: state.settingsFile,
    };
  }

export default withStyles(styles)(connect(mapStateToProps)(ServerSettingsTab))

