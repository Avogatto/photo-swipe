import React, { Component } from 'react';
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
    const { login, socket } = this.props;
    socket.on('authenticated', user => {
      this.popup.close();
      login(user);
    });
    // TODO: add on('error')
  }

  checkPopup() {
    this.interval = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(this.interval);
        this.setState({ disabled: false });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    return (
        <Button
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '10rem'
          }}
          onClick={this.startAuth}
          color='primary'
          size='lg'
        >
          Login With Google
        </Button>
    )
  }
}

export default OAuth;