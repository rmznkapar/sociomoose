import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { APP_ROUTE } from '../constants/Routes';
import { getToken } from './Common';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: APP_ROUTE.CAMPAIGNS }} />}
    />
  )
}

export default PublicRoute;