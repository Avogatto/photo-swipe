import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const { REACT_APP_API_BASE: API_BASE } = process.env;

// Adapted from:
// https://codeburst.io/react-authentication-with-twitter-google-facebook-and-github-862d59583105

export default class OAuth extends Component {

  state = {
    user: {},
    disabled: false
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
    const { name, photo} = this.state.user;
    const { disabled } = this.state;

    console.log('this is state', this.state);

    return (
      <div>
        {name
          ? <div className='card'>
              <img src={photo} alt={name} />
              <FontAwesome
                name='times-circle'
                className='close'
                onClick={this.closeCard}
              />
              <h4>{name}</h4>
            </div>
          : <div className='button-wrapper fadein-fast'>
              <button
                onClick={this.startAuth}
                className={`google ${disabled ? 'disabled ' : ''}button`}
              >
              Click me to login
                <FontAwesome
                  name='google'
                />
              </button>
            </div>
        }
      </div>
    )
  }
}

OAuth.propTypes = { socket: PropTypes.object.isRequired };
