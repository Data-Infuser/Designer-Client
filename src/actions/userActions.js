import { userConstants } from "../constants";
import { history } from '../utils/history';
import { alertActions } from './alertActions';
import moment from 'moment';

export const userActions = {
  login,
  regist,
  logout,
  index,
  registByAdmin,
  unregistByAdmin
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

function index() {
  let interval;
  return dispatch => {
    dispatch(request());
    interval = setInterval(() => {
      dispatch(success())
    }, 1500)
  }

  function request() { return { type: userConstants.INDEX } }
  function success() {
    clearInterval(interval);
    return { type: userConstants.INDEX_SUCCESS }
  }
  function fail() { return { type: userConstants.INDEX_FAIL } }
}

function registByAdmin(userForm) {
  let interval;
  return dispatch => {
    dispatch(request());
    interval = setInterval(() => {
      const newUser = {
        ...userForm,
        createdAt: moment().format('YYYY-MM-DD'),
        id: Math.ceil(Math.random()*999999999),
        group: "ptech"
      }
      dispatch(success(newUser));
      history.push("/users");
    }, 300)
  }

  function request() { return { type: userConstants.REGIST_BY_ADMIN } }
  function success(newUser) {
    clearInterval(interval);
    return { type: userConstants.REGIST_BY_ADMIN_SUCCESS, newUser }
  }
  function fail() { return { type: userConstants.REGIST_BY_ADMIN_FAIL } }
}

function unregistByAdmin(userId) {
  let interval;
  return dispatch => {
    dispatch(request());
    interval = setInterval(() => {
      dispatch(success(userId));
    }, 300)
  }

  function request() { return { type: userConstants.UNREGIST_BY_ADMIN } }
  function success(userId) { 
    clearInterval(interval)
    return { type: userConstants.UNREGIST_BY_ADMIN_SUCCESS, userId } 
  }
  function fail() { return { type: userConstants.UNREGIST_BY_ADMIN_FAIL } }
}