import { userConstants } from '../constants';
import produce from 'immer';

export function users(state = {
  loading: false,
  user: {}
}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return produce(state, draft => {
        draft.loading = true;
      })
    case userConstants.LOGIN_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.user = action.user;
      })
    case userConstants.LOGIN_FAILURE:
      return produce(state, draft => {
        draft.loading = false;
        draft.error = action.error;
      })
    default:
      return state
  }
}