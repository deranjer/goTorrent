import React from 'react';
//Redux
import {connect} from 'react-redux';
import * as actionTypes from './store/actions';
//Notifications
import { ToastContainer, toast } from 'react-toastify';




class Notifications extends React.Component {
    constructor(props){
        super(props);
    
        this.state = { serverMessage: ["info", "A props message"]}
        
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.serverMessage != this.state.serverMessage) {
          toast(this.state.serverMessage[1])
        }
    }

    componentDidMount(){
        toast("Testing toast custom settings")
    }

    render() {
        return (
          <div>
            <ToastContainer type={this.state.serverMessage[0]} position={toast.POSITION.TOP_RIGHT} autoClose={8000} />
          </div>
        );
    }
    
}


const mapStateToProps = state => {
    return {
      //serverMessage: state.serverMessage,
    };
  }


  export default connect(mapStateToProps)(Notifications)