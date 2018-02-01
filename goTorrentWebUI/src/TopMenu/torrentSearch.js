import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

//Redux
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions'



const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      marginBottom: '20px',
      width: 200,
    },
  });

class TorrentSearch extends React.Component {
    constructor(props){
      super(props);

      this.state = {
          searchValue: "",
      }
      
    }
    componentWillReceiveProps = (nextprops) => {
        
        if (nextprops.filter[0].columnName == "Status"){ //If we are using the left menu filter clear the searchbox
            this.setState({searchValue: ""})
        }


    }

    onChange = (event) => {
        this.setState({searchValue: event.target.value})
        let filterState = [{columnName: 'TorrentName', value: event.target.value}]
        this.props.changeFilter(filterState)
    }

    render() {
        const { classes } = this.props;
        return(

            <TextField
                id="search"
                label="Search Torrents"
                type="search"
                className={classes.textField}
                onChange={this.onChange}
                value={this.state.searchValue}
                margin="normal"
                />
        );
    }
}



const mapStateToProps = state => {
    return {
      filter: state.filter,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        changeFilter: (filter) => dispatch({type: actionTypes.CHANGE_FILTER, filter: filter}),
    }
  }
  
  
  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TorrentSearch))