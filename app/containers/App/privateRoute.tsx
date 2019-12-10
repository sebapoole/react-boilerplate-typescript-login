import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { makeSelectAuth } from 'containers/App/selectors';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';


const stateSelector = createStructuredSelector({
  auth: makeSelectAuth(),
});

function PrivateRoute({ component: Component, ...rest }) {
  const { auth } = useSelector(stateSelector);

  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/signin', state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
