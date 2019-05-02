import React, { Component } from 'react'
import {
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import io from 'socket.io-client'
import Components from '../views/Components/Components.jsx'; // reference page for development only TODO: remove
import LandingPage from '../views/LandingPage/LandingPage.jsx';
import ProfilePage from '../views/ProfilePage/ProfilePage.jsx';
import LoginPage from '../views/LoginPage/LoginPage.jsx';
import '../assets/scss/material-kit-react.scss?v=1.4.0';

const { REACT_APP_API_BASE: API_BASE } = process.env;
const socket = io(API_BASE)

class App extends Component {
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
    const { auth, history, location } = this.props;
    const { authenticated } = this.state;

    const AuthButton = () => (
      authenticated ? (
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

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        authenticated ?
          <Component {...props} /> :
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )} />
  );

  console.log('you re rendered me');

    return (
      <div className="App">
        <AuthButton/>
        <Switch>
          <Route
            path='/login'
            render={(props) => (
              <LoginPage {...props} auth={auth} socket={socket} />
            )}
            />
          <Route path='/components' component={Components} />
          <PrivateRoute path='/profile' component={ProfilePage} />
          <PrivateRoute path='/' component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
