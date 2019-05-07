import React, { Component } from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
  }

  async componentDidMount() {
    console.log('you called componentDidMount in PrivateRoute');
    const { auth } = this.props;
    const authenticated = await auth.isAuthenticated();
    this.setState({ authenticated });
  }

  render() {
    const { component: Component, location, ...rest } = this.props
    return (
          <Route {...rest} render={(props) => (
            this.state.authenticated ?
              <Component {...props} /> :
              <Redirect to={{ pathname: '/login', state: { from: location } }} />
          )} />
    );
  }
}

export default withRouter(PrivateRoute);
