import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Button from '../components/CustomButtons/Button.jsx';

const { REACT_APP_API_BASE: API_BASE } = process.env;

// Adapted from:
// https://codeburst.io/react-authentication-with-twitter-google-facebook-and-github-862d59583105

class OAuth extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false }
  }

  componentDidMount() {
    const { auth, socket } = this.props;
    socket.on('authenticated', user => {
      this.popup.close();
      auth.setUser(user);
    });
    // TODO: add on('error')
  }

  async checkAuthenticated() {
    const { auth, history, location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const authenticated = await auth.isAuthenticated();
    console.log('are we authenticated?', authenticated);
    if (authenticated) history.push(from);
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: false });
      }
    }, 1000);
  }

  openPopup() {
    const { socket } = this.props;
    const width = 600, height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const url = `${API_BASE}/auth/login?socketId=${socket.id}`;

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: true });
    }
  }

  render() {
    this.checkAuthenticated();

    return (
        <Button
          onClick={this.startAuth}
          simple color='primary'
          size='lg'
        >
          Login with Google
        </Button>
    )
  }
}

export default withRouter(OAuth);
