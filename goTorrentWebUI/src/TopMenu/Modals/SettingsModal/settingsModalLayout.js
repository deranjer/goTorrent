import React from 'react';
import ReactDOM from 'react-dom';
//css for react grid
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';
//react-grid for layout
import RGL, { WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';
import _ from 'lodash';
//Redux
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';
//interior items

import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import ReactTooltip from 'react-tooltip'
import Icon from 'material-ui/Icon';


import SettingsMenuList from './settingsModalList.js';
import SettingsModalContent from './settingsModalContent';



import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';





const ReactGridLayout = WidthProvider(RGL);

const background = {
  backgroundColor: '#e5e5e5',
  boxShadow: '0 0 20px #000',
}    

const button = {
  fontSize: '60px',
  paddingRight: '20px',
  paddingLeft: '20px',
}

const smallButton = {
    width: '36px',
    height: '36px',
    padding: '5px',
}

const inlineStyle = {
  display: 'inline-block',
  backdrop: 'static',
}


 class SettingsModalLayout extends React.Component {

    static propTypes = {
        onLayoutChange: PropTypes.func.isRequired
      };
    
      static defaultProps = {
        className: "layout",
        items: 4,
        rowHeight: 100,
        onLayoutChange: function() {},
        cols: 8,
        draggableCancel: '.NoDrag',
        draggableHandle: '.DragHandle'
      };

    constructor(props) {
        super(props);

        var layout =  [
            {i: 'b', x: 0, y: 0, w: 1, h: 5, static: true},
            {i: 'c', x: 1, y: 0, w: 7, h: 5, minW: 4, minH: 3, static: true},
          ];
        this.state = { 
          layout ,
          textValue: "",
          selectedMenuItem: 0,
        };


    };
    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
    }

    handleSettingsModalClose = () => {
        this.props.settingsModalOpenState(false)
    }

    changeMenuSelection = (menuItem) => {
        this.setState({selectedMenuItem: menuItem})
        
        
    }
  
  render() {
    return (
            <div style={inlineStyle}>
                <DialogContent>
                <ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange}
                    {...this.props}>
                    <div key="b" style={background} className="DragHandle">
                    <SettingsMenuList changeMenuSelection={this.changeMenuSelection} />
                    </div>
                    <div key="c" style={background} className="DragHandle">
                    <SettingsModalContent selectedMenuItem={this.state.selectedMenuItem} />
                    </div>
                    </ReactGridLayout>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSettingsModalClose} color="primary">
                    Close
                    </Button>
                </DialogActions>
            </div>
    );
  }

};

const mapStateToProps = state => {
  return {
    settingsModalOpen: state.settingsModalOpen,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      settingsModalOpenState: (settingsModalOpen) => dispatch({type: actionTypes.SETTINGS_MODAL_OPEN_STATE, settingsModalOpen}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModalLayout)