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
    display: "flex",
    flexDirection: "column",
    marginTop: 100
  },
  loginCard: {
    maxWidth: 600,
    minWidth: 400,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginTop: 30
  },
  registForm: {
    marginTop: 30
  },
  registContainer: {
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

function Regist() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const initialRegistForm = {
    username: "",
    password: "",
    passwordConfirm: "",
    name: "",
    email: ""
  }
  const [registForm, setRegistForm] = useState(initialRegistForm);
  const loading = useSelector(state => state.users.loading);

  function handleChange(e) {
    const newForm = {
      ...registForm,
      [e.target.name]: e.target.value
    }
    setRegistForm(newForm);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userActions.regist(registForm));
  }

  return (
    <Box className={classes.root}>
      <Card className={classes.loginCard}>
        <CardHeader
          title="회원가입"
          subheader="API Designer"
        />
        <CardContent>
        <form className={classes.registForm} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Container className={classes.registContainer} maxWidth="lg">
            <TextField className={classes.input} autoComplete='false' id="usernameInput" label="Username" name="username" value={registForm.username} onChange={handleChange}/>
            <TextField className={classes.input} autoComplete='false' id="passwordInput" label="Password" name="password" value={registForm.password} onChange={handleChange} type="password"/>
            <TextField className={classes.input} autoComplete='false' id="passwordConfirmInput" label="Password Confirm" name="passwordConfirm" value={registForm.passwordConfirm} onChange={handleChange} type="password"/>
            <TextField className={classes.input} autoComplete='false' id="nameInput" label="Name" name="name" value={registForm.name} onChange={handleChange}/>
            <TextField className={classes.input} autoComplete='false' id="emailInput" label="Email" name="email" value={registForm.email} onChange={handleChange}/>
          </Container>
          <Grid className={classes.buttonArea} container direction="column" justify="center" alignitem="center">
            <Grid item>
              {!loading &&
                <Button type="submit" className={classes.loginButton} variant="contained">가입</Button>
              }
              {loading &&
                <Button disabled className={classes.loginButton} variant="contained">처리중...</Button>
              }
            </Grid>
          </Grid>
        </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Regist;