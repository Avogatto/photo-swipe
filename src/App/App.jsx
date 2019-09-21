import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import io from 'socket.io-client';

import LandingPage from '../views/LandingPage/LandingPage.jsx';
import LoginPage from '../views/LoginPage/LoginPage.jsx';
import CreateAlbum from '../views/CreateAlbum/CreateAlbum.jsx';
import ListAlbums from '../views/ListAlbums/ListAlbums.jsx';
import ListPhotos from '../views/ListPhotos/ListPhotos.jsx';
import ManageUsers from '../views/ManageUsers/ManageUsers.jsx';

import TestView from '../views/TestView/TestView.jsx';

import PrivateRoute from '../components/PrivateRoute/PrivateRoute.jsx';
import Header from '../components/Header/Header.jsx';

import './App.css';

const { REACT_APP_API_BASE: API_BASE } = process.env;
const socket = io(API_BASE);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };

    this.getRouteProps = this.getRouteProps.bind(this);
  }

  async componentDidMount() {
    const { auth } = this.props;
    await auth.initialize(this.getRouteProps);
    this.setState({ mounted: true });
  }

  getRouteProps() {
    const { history, location } = this.props;
    return { history, location };
  }

  render() {
    const { mounted } = this.state;
    const { auth } = this.props;

    return (
      <div className="app">
        {mounted && (
          <div className="view">
            <Switch>
              <Route
                path="/login"
                render={routeProps => (
                  <LoginPage {...routeProps} auth={auth} socket={socket} />
                )}
              />
              <Route
                path="/test-route"
                render={routeProps => (
                  <div className="wrapper">
                    <Header auth={auth} />
                    <TestView {...routeProps} />
                  </div>
                )}
              />
              <PrivateRoute
                auth={auth}
                path="/albums/:albumId/photos"
                component={ListPhotos}
              />
              <PrivateRoute auth={auth} path="/users" component={ManageUsers} />
              <PrivateRoute auth={auth} path="/albums" component={ListAlbums} />
              <PrivateRoute
                auth={auth}
                path="/new-album"
                component={CreateAlbum}
              />
              <PrivateRoute auth={auth} path="/" component={LandingPage} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
