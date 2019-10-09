import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import io from 'socket.io-client';

import LandingPage from '../views/LandingPage.jsx';
import LoginPage from '../views/LoginPage.jsx';
import CreateAlbum from '../views/CreateAlbum.jsx';
import ListAlbums from '../views/ListAlbums.jsx';
import ListPhotos from '../views/ListPhotos.jsx';
import ManageUsers from '../views/ManageUsers.jsx';
import PendingApprovals from '../views/PendingApprovals.jsx';
import PhotosToApprove from '../views/PhotosToApprove.jsx';
import ApprovalMenu from '../views/ApprovalMenu.jsx';

import TestView from '../views/TestView.jsx';

import PrivateRoute from '../components/PrivateRoute.jsx';
import Header from '../components/Header.jsx';

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
      <Container>
        {mounted && (
          <Container>
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
                path="/albums/:albumId"
                component={ListPhotos}
                admin
              />
              <PrivateRoute
                auth={auth}
                path="/users"
                component={ManageUsers}
                admin
              />
              <PrivateRoute
                auth={auth}
                path="/albums"
                component={ListAlbums}
                admin
              />
              <PrivateRoute
                auth={auth}
                path="/create-album"
                component={CreateAlbum}
                admin
              />
              <PrivateRoute
                auth={auth}
                path="/pending/:albumId/:style"
                component={PhotosToApprove}
              />
              <PrivateRoute
                auth={auth}
                path="/pending/:albumId"
                component={ApprovalMenu}
              />
              <PrivateRoute
                auth={auth}
                path="/pending"
                component={PendingApprovals}
              />
              <PrivateRoute auth={auth} path="/" component={LandingPage} />
            </Switch>
          </Container>
        )}
      </Container>
    );
  }
}

export default withRouter(App);
