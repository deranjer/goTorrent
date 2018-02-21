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


class ClientSettingsTab extends React.PureComponent {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>    
            <Grid container spacing={8}>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>HTTP Address: <span className={classes.floatRight}>{this.props.settingsFile["HTTPAddrIP"]} </span></Paper>
                    <Paper className={classes.paper}>HTTP Port: <span className={classes.floatRight}>{this.props.settingsFile["HTTPAddr"]} </span> </Paper>
                    <Paper className={classes.paper}>Use Proxy: <span className={classes.floatRight}>{String(this.props.settingsFile["UseProxy"])} </span> </Paper>
                    <Paper className={classes.paper}>Base URL: <span className={classes.floatRight}>{this.props.settingsFile["BaseURL"]} </span> </Paper>
                           
                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>Client Username: <span className={classes.floatRight}>{this.props.settingsFile["ClientUsername"]} </span> </Paper>
                    <Paper className={classes.paper}>Client Password: <span className={classes.floatRight}>{this.props.settingsFile["ClientPassword"]} </span> </Paper>
                    
                    
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

export default withStyles(styles)(connect(mapStateToProps)(ClientSettingsTab))

