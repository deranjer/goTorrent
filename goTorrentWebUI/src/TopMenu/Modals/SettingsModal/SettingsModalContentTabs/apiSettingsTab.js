import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';
import * as actionTypes from '../../../../store/actions';


const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: 0,
      padding: 10,
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


class APISettingsTab extends React.Component {

    state = {
        clientName: "",
      };

    generateKey = (event) => {
      let newAuthTokenRequest = { 
        MessageType: "newAuthToken",
        Payload: {"ClientName": this.state.clientName}
      }
      console.log("Sending New Auth Request: ", newAuthTokenRequest);
      ws.send(JSON.stringify(newAuthTokenRequest));
      this.setState({clientName: ""})
    } 

    setClientName = (event) => {
        this.setState({clientName: event.target.value})
    }

    componentWillUnmount = () => {
        this.props.newTokenReturn("")
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}> 
                <TextField style ={{width: '50%', paddingRight: '10px'}} id="clientName" type="text" label="Client Name" placeholder="Client Name associated with the key" onChange={this.setClientName} />
                <Button variant="raised" color="primary" onClick={this.generateKey}>
                    Generate Key
                </Button>
                <Paper style = {{padding: '10px'}}> <span className={classes.floatLeft}>{this.props.tokenReturn} </span></Paper>
                <Grid container spacing={16}>
                    
                    <Grid item xs={12} sm={4}>
                    
                    
                        
                    
                    </Grid>
                </Grid>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
      tokenReturn: state.tokenReturn,
    };
  }

  const mapDispatchToProps = dispatch => {
    return {
        newTokenReturn: (tokenReturn) => dispatch({type: actionTypes.TOKEN_RETURN, tokenReturn}),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(APISettingsTab))

