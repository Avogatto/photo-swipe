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

    this.state = {
      user: {},
      disabled: false
    }
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('authenticated', user => {
      console.log('do we get user?', user);
      this.popup.close();
      this.setState({ user });
    });
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

  closeCard = () => {
    this.setState({ user: {} });
  }

  render() {
    const { auth, from, history } = this.props;

    return (
        <Button
          onClick={() => {
            auth.login();
            history.push(from);
          }}
          simple color='primary'
          size='lg'
        >
          TRIGGER LOGIN!!!!!!
        </Button>
    )
  }
}

export default withRouter(OAuth);
