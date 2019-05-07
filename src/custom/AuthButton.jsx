import React, { Component } from 'react'

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
  }

  async componentDidMount() {
    const { auth } = this.props;
    const authenticated = await auth.isAuthenticated();
    this.setState({ authenticated });
  }

  render() {
    const { auth, history } = this.props;
    return (
      this.state.authenticated ? (
        <p>
          Welcome! <button onClick={() => {
            auth.logout();
            history.push('/login');
          }}>Sign out</button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
    );

  }
}

export default PrivateRoute;
