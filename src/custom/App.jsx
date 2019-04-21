import React from 'react'
import {
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import Components from '../views/Components/Components.jsx'; // reference page for development only TODO: remove
import LandingPage from '../views/LandingPage/LandingPage.jsx';
import ProfilePage from '../views/ProfilePage/ProfilePage.jsx';
import LoginPage from '../views/LoginPage/LoginPage.jsx';

import '../assets/scss/material-kit-react.scss?v=1.4.0';

// import io from 'socket.io-client'
// import OAuth from './OAuth'

// const { REACT_APP_API_BASE: API_BASE } = process.env;
// const socket = io(API_BASE)

// async function getAlbums() {
//   try {
//     const response = await fetch(`${API_BASE}/albums`, { credentials: 'include' });
//     const result = await response.json();
//     console.log('result???', result);
//   } catch (err) {
//     console.error(err.toString());
//   }
// }

// <div className='wrapper'>
//   <OAuth socket={socket} />
//   <button onClick={getAlbums}>Get Albums</button>
// </div>

function App(props) {
  const { auth, history, location } = props;

  const AuthButton = () => (
    auth.isAuthenticated() ? (
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
      auth.isAuthenticated() === true ?
        <Component {...props} /> :
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
    )} />
);

  return (
    <div className="App">
      <AuthButton/>
      <Switch>
        <Route
          path='/login'
          render={(props) => (
            <LoginPage {...props} auth={auth} history={history} />
          )}
        />
        <Route path='/components' component={Components} />
        <PrivateRoute path='/profile' component={ProfilePage} />
        <PrivateRoute path='/' component={LandingPage} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
