import { userConstants } from "../constants";
import { history } from '../utils/history';
import { alertActions } from './alertActions';

export const userActions = {
  login,
  regist,
  logout
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("users");
  history.push("/login");
}

/**
 *  Axios middleware 를 이용한 login
 * @param {
 * username: string,
 * password: string
 * } loginForm 
 */
function login(loginForm) {
  return {
    type: 'LOGIN',
    payload: {
      request: {
        method: 'POST',
        url: '/oauth/login',
        data: {
          username: loginForm.username,
          password: loginForm.password
        }
      },
      options: {
        onSuccess: ({ dispatch, response }) => {
          dispatch({ type: userConstants.LOGIN_SUCCESS, payload: response });
          history.push("/");
        },
        onError: ({ dispatch, error }) => {
          dispatch({ type: userConstants.LOGIN_FAIL, error: error });
          alertActions.handleError(dispatch, error);
        }
      }
    }
  }
}

/**
 * 
 * @param { 
 * username: string,
 * password: string,
 * passwordConfirm: string,
 * name: string,
 * email: string
 * } registForm 
 */
function regist(registForm) {
  return {
    type: userConstants.REGIST,
    payload: {
      request: {
        method: 'POST',
        url: '/oauth/regist',
        data: registForm
      },
      options: {
        onSuccess: ({ dispatch, response }) => {
          dispatch({ type: userConstants.REGIST_SUCCESS, payload: response });
          history.push('/login');
        },
        onError: ({ dispatch, error }) => {
          dispatch({ type: userConstants.REGIST_FAIL, error: error });
          alertActions.handleError(dispatch, error);
        }
      }
    }
  }
}