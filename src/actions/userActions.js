import { userConstants, errorConstants } from "../constants";
import { userService } from "../services";
import { history } from '../utils/history';
import { alertActions } from './alertActions';

export const userActions = {
  login
}

function login(loginForm) {
  return dispatch => {
    dispatch(request());
    const username = loginForm.username;
    const password = loginForm.password;
    userService.login(username, password)
    .then(
      response => {
        dispatch(success(response));
        history.push("/");
        console.log("push");
      }
    )
    .catch(
      err => {
        console.error(err);
        dispatch(failure(err));
        const errorMessage = errorConstants[err] ? errorConstants[err] : errorConstants.GLOBAL_0001
        dispatch(alertActions.alert(errorMessage));
      }
    )
  }

  function request() { return { type: userConstants.LOGIN_REQUEST } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(err) { return { type: userConstants.LOGIN_FAILURE, err } }
}