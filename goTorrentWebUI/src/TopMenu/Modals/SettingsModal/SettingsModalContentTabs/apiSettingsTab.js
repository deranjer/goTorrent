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


class APISettingsTab extends React.PureComponent {


    requestNewKey = (keyName) => {

    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>    
            Not yet implemented!
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
      settingsFile: state.settingsFile,
    };
  }

export default withStyles(styles)(connect(mapStateToProps)(APISettingsTab))

