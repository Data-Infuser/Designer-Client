import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { history } from './utils/history';
import Login from './views/Login';
import { ErrorDialog } from './views/common/ErrorDialog';
import { Typography } from '@material-ui/core';
import Regist from './views/Regist';
import { Main } from './views/Main';

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

function App() {
  return (
    <div className="App">
      <ErrorDialog/>
      <Router history={history}>
        <Switch>
          <Route path="/regist" component={Regist}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/" component={Main}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
