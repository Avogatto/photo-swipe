import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';
import io from 'socket.io-client'
import Components from '../views/Components/Components.jsx'; // reference page for development only TODO: remove
import LandingPage from '../views/LandingPage/LandingPage.jsx';
import ProfilePage from '../views/ProfilePage/ProfilePage.jsx';
import LoginPage from '../views/LoginPage/LoginPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import AuthButton from './AuthButton.jsx';
import '../assets/scss/material-kit-react.scss?v=1.4.0';

const { REACT_APP_API_BASE: API_BASE } = process.env;
const socket = io(API_BASE)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false, mounted: false };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    console.log('you called componentDidMount in PrivateRoute');
    const { auth } = this.props;
    const authenticated = await auth.isAuthenticated();
    this.setState({ authenticated, mounted: true });
  }

  login(profile) {
    const { auth, history, location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    auth.saveProfile(profile);
    this.setState({ authenticated: true });
    history.push(from);
  }

  logout() {
    const { auth, history } = this.props
    auth.logout();
    this.setState({ authenticated: true });
    history.push('/login');
  }

  render() {
    const { authenticated, mounted } = this.state;
    return (
      <div className="App">
        {
          mounted &&
          <div>
            <AuthButton authenticated={authenticated} logout={this.logout} />
            <Switch>
              <Route
                path='/login'
                render={(props) => (
                  <LoginPage
                    {...props}
                    authenticated={authenticated} login={this.login} socket={socket}
                    />
                )}
                />
              <Route path='/components' component={Components} />
              <PrivateRoute authenticated={authenticated} path='/profile' component={ProfilePage} />
              <PrivateRoute authenticated={authenticated} path='/' component={LandingPage} />
            </Switch>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(App);
