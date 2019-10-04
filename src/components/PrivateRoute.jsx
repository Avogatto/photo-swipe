import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from './Header.jsx';

function PrivateRoute(props) {
  const { admin, auth, path, component: Component, location } = props;

  const authenticated = auth.isAuthenticated();
  const isAdmin = auth.isAdmin();

  return (
    <Route
      path={path}
      render={routeProps => {
        if (authenticated) {
          if (!admin || isAdmin) {
            return (
              <Container>
                <Header auth={auth} />
                <Component {...routeProps} auth={auth} />
              </Container>
            );
          }
          return <Redirect to={{ pathname: '/', state: { from: location } }} />;
        }
        return (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
}

export default withRouter(PrivateRoute);
