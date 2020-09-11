import { userConstants } from "../constants";
import { history } from '../utils/history';
import { alertActions } from './alertActions';

export const userActions = {
  login,
  regist,
  logout,
  index
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("users");
  history.push("/login");
}

const dummyUsers = [
  {
    id: 2,
    group: "ptech",
    loginId: "chunghyup",
    email: "ch.oh@gmail.com",
    role: "admin",
    createdAt: "2020-03-21"
  },
  {
    id: 3,
    group: "ptech",
    loginId: "wooyoung",
    email: "wooyoung@gmail.com",
    role: "admin",
    createdAt: "2020-04-01"
  },
  {
    id: 4,
    group: "ptech",
    loginId: "gildong",
    email: "gildong@gmail.com",
    role: "admin",
    createdAt: "2020-07-14"
  },
  {
    id: 5,
    group: "ptech",
    loginId: "minsu123",
    email: "minsu123@gmail.com",
    role: "admin",
    createdAt: "2020-05-06"
  }
]

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
      const users = dummyUsers;
      dispatch(success(users))
    }, 1500)
  }

  function request() { return { type: userConstants.INDEX } }
  function success(users) {
    clearInterval(interval);
    return { type: userConstants.INDEX_SUCCESS, users }
  }
  function fail() { return { type: userConstants.INDEX_FAIL } }
}