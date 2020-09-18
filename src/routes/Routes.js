import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './ProtectedRoutes';
import LoginContainer from '../modules/Login/LoginContainer';
import SignupContainer from '../modules/Signup/SignupContainer';
import HomeContaciner from '../modules/Home/HomeContaciner';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Auth(HomeContaciner)} />
    <Route path="/login" component={LoginContainer} />
    <Route path="/signup" component={SignupContainer} />
  </Switch>
);

export default Routes;
