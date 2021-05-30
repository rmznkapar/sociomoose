import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { APP_ROUTE } from './constants/Routes';

import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';
//Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Profile from './pages/Profile';

import { getUser } from './utils/Common';
import CreateModal from './components/CreateModal';
import { useSelector } from 'react-redux';
import { selectShow, selectShowComments } from './features/modalSlice';
import Settings from './pages/Settings';
import CommentModal from './components/CommentModal';
import SpecFeed from './pages/SpecFeed';

const App = () => {

  const isAuth = getUser();

  const showModal = useSelector(selectShow);
  const showComments = useSelector(selectShowComments);

  return (
    <div className="bg-background min-h-screen">
      <CreateModal />
      <CommentModal />
      <div className={(showModal || showComments) ? "filter blur" : ''}>
        <Router>
          <Switch>
            <Route exact path="/">
              {isAuth ?
                <Redirect to="/feed" /> : 
                <Redirect to="/login" />
              }
            </Route>
            <PublicRoute component={Login} path={APP_ROUTE.LOGIN} />
            <PublicRoute component={Register} path={APP_ROUTE.REGISTER} />

            <PrivateRoute component={Feed} path={APP_ROUTE.FEED} />
            <PrivateRoute component={SpecFeed} path={APP_ROUTE.SPEC_FEED} />
            <PrivateRoute component={Settings} path={APP_ROUTE.SETTINGS} />
            <PrivateRoute component={Profile} path={APP_ROUTE.PROFILE} />
            <PrivateRoute exact component={Profile} path={APP_ROUTE.MY_PROFILE} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
