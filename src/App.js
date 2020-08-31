import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { history } from './utils/history';
import Login from './views/Login';
import { useDispatch } from 'react-redux';
import { ErrorDialog } from './views/common/ErrorDialog';

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
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
    })
  }, [])
  
  return (
    <div className="App">
      <ErrorDialog/>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/" component={Main}/>
        </Switch>
      </Router>
    </div>
  );
}

function Main() {
  return (
    <div>
      main
    </div>
  )
}

export default App;
