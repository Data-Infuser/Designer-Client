import React, { useState } from 'react';
import { Container, Card, CardHeader, CardContent,TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userActions } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: 100
  },
  root: {
    maxWidth: 600,
    minWidth: 250,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginTop: 30
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    minWidth: 300,
    marginTop: 20
  },
  loginButton: {
    marginTop: 20,
    width: 120
  }
}));

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const initialLoginForm = {
    username: "",
    password: ""
  }
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const loading = useSelector(state => state.users.loading);

  function handleChange(e) {
    const newForm = {
      ...loginForm,
      [e.target.name]: e.target.value
    }
    setLoginForm(newForm);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userActions.login(loginForm));
  }

  return (
    <Container className={classes.container} fixed>
      <Card className={classes.root}>
        <CardHeader
          title="로그인"
          subheader="API Designer"
        />
        <CardContent>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Container className={classes.loginContainer} maxWidth="lg">
            <TextField className={classes.input} id="usernameInput" label="Username" name="username" value={loginForm.username} onChange={handleChange}/>
            <TextField className={classes.input} id="passwordInput" label="Password" name="password" value={loginForm.password} onChange={handleChange} type="password"/>
          </Container>
          {!loading &&
            <Button type="submit" className={classes.loginButton} variant="contained">로그인</Button>
          }
          {loading &&
            <Button disabled className={classes.loginButton} variant="contained">로그인중...</Button>
          }
        </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;