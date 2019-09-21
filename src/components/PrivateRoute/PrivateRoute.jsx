import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

import Header from '../Header/Header.jsx';

function PrivateRoute(props) {
  const { auth, component: Component, location, ...rest } = props;

  const authenticated = auth.isAuthenticated();

  return (
    <Route
      {...rest}
      render={routeProps =>
        authenticated ? (
          <div className="view__authenticated">
            <Header auth={auth} />
            <Component {...routeProps} />
          </div>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}

export default withRouter(PrivateRoute);
