import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import {connect} from 'react-redux';

let logLevel = "None"

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





class LoggingSettingsTab extends React.Component {

    componentWillMount = () => { 
        switch (String(this.props.settingsFile["LoggingLevel"])) { //Options = Debug 5, Info 4, Warn 3, Error 2, Fatal 1, Panic 0
            case "0":
                logLevel = "Panic"
            case "1":
                logLevel = "Fatal"
            case "2":
                logLevel = "Error"
            case "3":
                logLevel = "Warn"
            case "4":
                logLevel = "Info"
            case "5":
                logLevel = "Debug"
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>    
            <Grid container spacing={8}>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>Logging Output: <span className={classes.floatRight}>{this.props.settingsFile["LoggingOutput"]} </span></Paper>
                    <Paper className={classes.paper}>Logging Level: <span className={classes.floatRight}>{this.props.settingsFile["LoggingLevel"]} </span> </Paper>
                           
                    
                </Grid>
                <Grid item xs={12} sm={4}>
                    
                    
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

export default withStyles(styles)(connect(mapStateToProps)(LoggingSettingsTab))


