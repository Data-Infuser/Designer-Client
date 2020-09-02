import { userConstants } from '../constants';
import produce from 'immer';
import { history } from '../utils/history';


export function users(state = {
  loading: false,
  user: {}
}, action) {
  switch (action.type) {
    case userConstants.LOGIN:
      return produce(state, draft => {
        draft.loading = true;
      })
    case userConstants.LOGIN_SUCCESS:
      return produce(state, draft => {
        const user = action.payload.data;
        localStorage.setItem('token', user.token);
        localStorage.setItem('refreshToken', user.refreshToken);
        localStorage.setItem('users', JSON.stringify(user));
        history.push("/");
        draft.loading = false;
        draft.user = action.user;
      })
    case userConstants.LOGIN_FAIL:
      return produce(state, draft => {
        draft.loading = false;
        draft.error = action.error;
      })
    default:
      return state
  }
}