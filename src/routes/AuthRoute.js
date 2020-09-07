import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { history } from '../utils/history';
import Login from '../views/Login';
import Regist from '../views/Regist';
import { DashboardRoute } from './DashboardRoute';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('users')
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

export function AuthRoute() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/regist" component={Regist}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/" component={DashboardRoute}/>
      </Switch>
    </Router>
  )
}