import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
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


let Loggedin = false

const button = {
  fontSize: '60px',
  marginRight: '20px',
}

const inlineStyle = {
  display: 'inline-block',
  backdrop: 'static',
}

const errorStyle = {
  color: 'red',
}

export default class Login extends React.Component {

  state = {
    open: false,
    username: "",
    password: "",
    wrongPasswordMessage: "",

  };


  componentWillMount = () => {
    if ((LoginRequired) && (Loggedin == false)) {
      this.setState({open: true})
      Loggedin = true
    }
  }

  handleSubmit = () => {
      //this.setState({ open: false });
      //let magnetLinkSubmit = this.state.textValue;
      console.log("Attempting authentication")
      if ((this.state.username == ClientUsername) && (this.state.password == ClientPassword)) {
        this.setState({ open: false, username: "", password: "" });
      } else {
        this.setState({wrongPasswordMessage: "Wrong Username/Password!", username: "", password: "" })
      }
      //this.setState({magnetLinkValue: ""}, {torrentLabel: ""}, {storageValue: ``})
  }

  handleRequestClose = () => {
      ws.close()
  }

  setUserNameValue = (event) => {
    this.setState({username: event.target.value});
  }

  setPasswordValue = (event) => {
    this.setState({password: event.target.value})
  }

  render() {
    const { classes, onRequestClose, handleRequestClose, handleSubmit } = this.props;
    return (
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose} disableBackdropClick={true} disableEscapeKeyDown={true} hideBackdrop={true} fullScreen>
          <DialogTitle>Login Here</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a username and password to connect
            </DialogContentText>
            <br />
            <DialogContentText style={errorStyle}>
                {this.state.wrongPasswordMessage}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User Name"
              type="text"
              placeholder="Username"
              fullWidth
              onChange={this.setUserNameValue}
            />
            <TextField id="password" type="password" label="Password" placeholder="Password" fullWidth onChange={this.setPasswordValue} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
};
