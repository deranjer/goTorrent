import React from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';  // contains the font for material UI
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

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
    state = {
      value: 0,
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    render() {
      const { classes } = this.props;
      const { value } = this.state;
  
      return (
        <div className={classes.root}>
          <div className="DragHandle"> {/* making the appbar draggable */}
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="General"/>
                <Tab label="Peers"/>
                <Tab label="Files"/>
                <Tab label="Speed"/>
                <Tab label="Logger" href="#basic-tabs"/>
              </Tabs>
            </AppBar>
          </div>
          {value === 0 && <TabContainer>General</TabContainer>}
          {value === 1 && <TabContainer>Peers</TabContainer>}
          {value === 2 && <TabContainer>Files</TabContainer>}
          {value === 3 && <TabContainer>Speed</TabContainer>}
          {value === 4 && <TabContainer>Logger</TabContainer>}
        </div>
      );
    }
  }
  
  BasicTabs.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(BasicTabs);