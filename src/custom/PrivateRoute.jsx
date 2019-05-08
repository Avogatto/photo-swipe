import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom';

function PrivateRoute(props) {
  const { authenticated, component: Component, location, ...rest } = props;
  return (
        <Route {...rest} render={(props) => (
          authenticated ?
            <Component {...props} /> :
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )} />
  );
}

export default withRouter(PrivateRoute);
