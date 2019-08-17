import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import io from 'socket.io-client';

import LandingPage from '../views/LandingPage/LandingPage.jsx';
import LoginPage from '../views/LoginPage/LoginPage.jsx';
import ListAlbums from '../views/ListAlbums/ListAlbums.jsx';
import ListPhotos from '../views/ListPhotos/ListPhotos.jsx';
import ManageUsers from '../views/ManageUsers/ManageUsers.jsx';

import TestView from '../views/TestView/TestView.jsx';

import PrivateRoute from '../components/PrivateRoute.jsx';
import Header from '../components/Header/Header.jsx';

import './App.css';

const { REACT_APP_API_BASE: API_BASE } = process.env;
const socket = io(API_BASE);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false, mounted: false };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
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

  async logout() {
    const { auth, history } = this.props;
    await auth.logout();
    this.setState({ authenticated: false });
    history.push('/login');
  }

  render() {
    const { authenticated, mounted } = this.state;
    const { auth } = this.props;

    return (
      <div className="app">
        {mounted && (
          <div className="view">
            <Switch>
              <Route
                path="/login"
                render={props => (
                  <LoginPage
                    {...props}
                    authenticated={authenticated}
                    login={this.login}
                    socket={socket}
                  />
                )}
              />

              <Route
                path="/test-route"
                render={props => (
                  <div className="wrapper">
                    <Header auth={auth} />
                    <TestView
                      {...props}
                      authenticated={authenticated}
                      login={this.login}
                      socket={socket}
                    />
                  </div>
                )}
              />

              <PrivateRoute
                auth={auth}
                authenticated={authenticated}
                path="/albums/:albumId/photos"
                component={ListPhotos}
                logout={this.logout}
              />

              <PrivateRoute
                auth={auth}
                authenticated={authenticated}
                path="/users"
                component={ManageUsers}
                logout={this.logout}
              />

              <PrivateRoute
                auth={auth}
                authenticated={authenticated}
                path="/albums"
                component={ListAlbums}
                logout={this.logout}
              />

              <PrivateRoute
                auth={auth}
                authenticated={authenticated}
                path="/"
                component={LandingPage}
                logout={this.logout}
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
