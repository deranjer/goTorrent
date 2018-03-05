import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import List, {
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
  } from 'material-ui/List';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import InsertLinkIcon from 'material-ui-icons/Link';
import ReactTooltip from 'react-tooltip'
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import RSSTorrentIcon from 'material-ui-icons/RssFeed';
import AddRSSIcon from 'material-ui-icons/AddCircle';
import DeleteIcon from 'material-ui-icons/Delete';

//Redux
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';

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



const inlineStyle = {
    display: 'inline-block',
    backdrop: 'static',
  }

  
 class SettingsMenuList extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            activeIndex: 0
        }
        
    }

    
    changeMenuSelection = (listItem) => {
        console.log("Menu Selection", listItem)
        this.setState({activeIndex: listItem})
        this.props.changeMenuSelection(listItem)
        console.log("ACTIVEINDEX", this.state.activeIndex)
    }

  render() {
    const { classes } = this.props;
    return (
      <div style={inlineStyle}>
        <List component="nav">
            <ListItem className={this.state.activeIndex==0 ? classes.active: null} button onClick={() => this.changeMenuSelection(0)}>
                <ListItemText primary="News/About" />
            </ListItem>
            <ListItem className={this.state.activeIndex==1 ? classes.active: null} button onClick={() => this.changeMenuSelection(1)}>
                <ListItemText primary="Client Connect" />
            </ListItem>
            <ListItem className={this.state.activeIndex==2 ? classes.active: null} button onClick={() => this.changeMenuSelection(2)}>
                <ListItemText primary="Logging" />
            </ListItem>
            <ListItem  className={this.state.activeIndex==3 ? classes.active: null} button onClick={() => this.changeMenuSelection(3)}>
                <ListItemText primary="Server Settings" />
            </ListItem>
            <ListItem  className={this.state.activeIndex==4 ? classes.active: null} button onClick={() => this.changeMenuSelection(4)}>
                <ListItemText primary="API Settings" />
            </ListItem>
        </List>
      </div>
    );
  }

};


export default  withStyles(styles)(SettingsMenuList)