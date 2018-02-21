import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import {connect} from 'react-redux';
import ClientSettingsTab from './SettingsModalContentTabs/clientSettingsTab';
import LoggingSettingsTab from './SettingsModalContentTabs/loggingSettingsTab';
import NotesTab from './SettingsModalContentTabs/notesTab';
import ServerSettingsTab from './SettingsModalContentTabs/serverSettingsTab';




class SettingsModalContent extends React.Component {
    

    handleChange = (event, value) => {
        console.log("HandleChange", event, value)
    };

    componentDidMount = () => {
        console.log("settingsFile", this.props.settingsFile)
        
    }
    
    render() {
        switch(this.props.selectedMenuItem){
            case 0:
                return <NotesTab />
            case 1:
                return <ClientSettingsTab />
            case 2:
                return <LoggingSettingsTab />
            case 3:
                return <ServerSettingsTab />
            default:
                return <NotesTab />
        }
        
       
            
    }
}

const mapStateToProps = state => {
    return {
      settingsFile: state.settingsFile,
    };
  }
  



export default connect(mapStateToProps)(SettingsModalContent)