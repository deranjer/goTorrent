var sha256 = require('js-sha256').sha256;
import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
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


  componentWillMount() {
    if ((LoginRequired) && (this.props.loggedin == false)) {
      this.setState({open: true})
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeySubmit); // if the user presses enter, submit the form
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeySubmit);
  }

  handleKeySubmit = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
      let hashedPass = sha256(this.state.password) //hash the password to match it with the hashed one in the kickwebsocket
      if ((this.state.username == ClientUsername) && (hashedPass == ClientPassword)) {
        this.setState({ open: false, username: "", password: "" });
        this.props.changeLoggedin(true)
      } else {
        this.setState({wrongPasswordMessage: "Wrong Username/Password!"})
      }
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
    const { classes, onClose, handleRequestClose, handleSubmit } = this.props;
    return (
        <Dialog open={this.state.open} onClose={this.handleRequestClose} disableBackdropClick disableEscapeKeyDown>
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
              required
              onChange={this.setUserNameValue}
            />
            <TextField id="password" type="password" label="Password" placeholder="Password" required fullWidth onChange={this.setPasswordValue} />
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
