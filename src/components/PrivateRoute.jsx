import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

import Header from './Header/Header.jsx';

function PrivateRoute(topProps) {
  const {
    auth,
    authenticated,
    component: Component,
    location,
    logout,
    ...rest
  } = topProps;

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <div className="wrapper">
            <Header auth={auth} />
            <Component
              {...props}
              authenticated={authenticated}
              logout={logout}
            />
          </div>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}

export default withRouter(PrivateRoute);
