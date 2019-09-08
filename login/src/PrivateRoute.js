// React Components
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
  // Destructures Components from props and creates a rest spread
  const { component: Component, ...rest } = props;

  return (
    // Routes and spreads in rest, uses token as a conditional to either return Components
    // or redirects user back to login
    <Route
      {...rest}
      render={() => {
        const cookie = localStorage.getItem('cookie');

        return cookie ? <Component /> : <Redirect to='/login' />;
      }}
    />
  );
}

export default PrivateRoute;
