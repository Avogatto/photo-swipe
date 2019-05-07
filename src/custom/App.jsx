import React from 'react'
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

function App(props) {
  const { auth } = props;

  return (
    <div className="App">
      <AuthButton auth={auth} />
      <Switch>
        <Route
          path='/login'
          render={(props) => (
            <LoginPage {...props} auth={auth} socket={socket} />
          )}
          />
        <Route path='/components' component={Components} />
        <PrivateRoute auth={auth} path='/profile' component={ProfilePage} />
        <PrivateRoute auth={auth} path='/' component={LandingPage} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
