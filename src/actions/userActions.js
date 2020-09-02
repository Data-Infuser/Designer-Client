import { userConstants } from "../constants";
import { userService } from "../services";
import { history } from '../utils/history';
import { alertActions } from './alertActions';

export const userActions = {
  login
}

/**
 *  Axios middleware 를 이용한 login
 * @param {
 *  username: string,
 *  password: string
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
        },
        onError: ({ dispatch, error }) => {
          dispatch({ type: userConstants.LOGIN_FAIL, error: error });
          alertActions.handleError(dispatch, error);
        }
      }
    }
  }
}