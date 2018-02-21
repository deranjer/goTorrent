import React from 'react';
import PropTypes from 'prop-types';
//import 'typeface-roboto';  // contains the font for material UI
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import GeneralTab from './Tabs/generalTab';
import PeerTab from './Tabs/peerTab';
import FileTab from './Tabs/fileTab';




//Redux
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions'

function TabContainer(props) {
    return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const styles = theme => ({
    root: {
     // flexGrow: 1,
    //   marginTop: theme.spacing.unit * 3,
      //backgroundColor: theme.palette.background.paper,
      backgroundColor: '#e5e5e5',
      height: '100%',
      boxShadow: '0 0 20px #000',
    },
  });
  
  class BasicTabs extends React.Component {

   
    handleChange = (event, value) => {
      //this.setState({ value });
      this.props.changeTab(value)
    };
  
    render() {
      const { classes } = this.props;
  
      return (
        
        <div className={classes.root}>
          <div className="DragHandle"> {/* making the appbar draggable */}
            <AppBar position="static">
              <Tabs value={this.props.selectedTab} onChange={this.handleChange}>
                <Tab label="General"/>
                <Tab label="Peers"/>
                <Tab label="Files"/>
                <Tab label="Speed"/>
                <Tab label="Logger" href="#basic-tabs"/>
              </Tabs>
            </AppBar>
          </div>
          {this.props.selectedTab === 0 && <TabContainer><GeneralTab /></TabContainer>}
          {this.props.selectedTab === 1 && <TabContainer><PeerTab /></TabContainer>}
          {this.props.selectedTab === 2 && <TabContainer><FileTab /></TabContainer>}
          {this.props.selectedTab === 3 && <TabContainer>Speed</TabContainer>}
          {this.props.selectedTab === 4 && <TabContainer>Logger</TabContainer>}
        </div>
      );
    }
  }
  
  BasicTabs.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => {
    return {
        selectedTab: state.selectedTab,
    };
  }

  const mapDispatchToProps = dispatch => {
    return {
        changeTab: (selectedTab) => dispatch({type: actionTypes.SELECTED_TAB, selectedTab }),      
    }
}


  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BasicTabs));