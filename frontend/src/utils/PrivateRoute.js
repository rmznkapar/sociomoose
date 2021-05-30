import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { APP_ROUTE } from '../constants/Routes';
import { getToken } from './Common';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: APP_ROUTE.LOGIN, state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute;