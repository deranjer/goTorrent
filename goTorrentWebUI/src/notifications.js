import React from 'react';
//Redux
import {connect} from 'react-redux';
import * as actionTypes from './store/actions';
//Notifications
import { ToastContainer, toast } from 'react-toastify';




class Notifications extends React.Component {
    constructor(props){
        super(props);
        
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.serverPushMessage != this.props.serverPushMessage) {
          toast(nextprops.serverPushMessage[1], {
              type: nextprops.serverPushMessage[0]
          })
          console.log("Server Push Message", nextprops.serverPushMessage)
        }
        if (nextprops.webSocketState != this.props.webSocketState){
            if (nextprops.webSocketState == true){
                toast.success("Websocket Connection Open!")
            } else {
                toast("Websocket Connection Closed!", {
                    type: "error",
                    autoClose: false,
                })
            }
        }
    }
    render() {
        return (
          <div>
            <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={8000} />
          </div>
        );
    }
    
}


const mapStateToProps = state => {
    return {
      serverPushMessage: state.serverPushMessage,
      webSocketState: state.webSocketState,
    };
  }


  export default connect(mapStateToProps)(Notifications)