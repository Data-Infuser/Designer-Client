import React, { useState } from 'react';
import { Container, Card, CardHeader, CardContent,TextField, Button, Grid, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { userActions } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../serviceWorker';
import { history } from '../utils/history';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  loginCard: {
    maxWidth: 600,
    minWidth: 400,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginTop: 150
  },
  loginForm: {
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
  buttonArea: {
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

  function onClickRegist(e) {
    history.push('/regist');
  }
  
  return (
    <Box className={classes.root}>
      <Card className={classes.loginCard}>
        <CardHeader
          title="로그인"
          subheader="API Designer"
        />
        <CardContent>
        <form className={classes.loginForm} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Container className={classes.loginContainer} maxWidth="lg">
            <TextField className={classes.input} autoComplete='false' id="usernameInput" label="Username" name="username" value={loginForm.username} onChange={handleChange}/>
            <TextField className={classes.input} autoComplete='false' id="passwordInput" label="Password" name="password" value={loginForm.password} onChange={handleChange} type="password"/>
          </Container>
          <Grid className={classes.buttonArea} container direction="column" justify="center" alignitem="center">
            <Grid item>
              {!loading &&
                <Button type="submit" className={classes.loginButton} variant="contained">로그인</Button>
              }
              {loading &&
                <Button disabled className={classes.loginButton} variant="contained">로그인중...</Button>
              }
            </Grid>
            <Grid item>
              <Button variant="text" type="button" onClick={onClickRegist}>회원가입</Button>  
            </Grid>
          </Grid>
        </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;