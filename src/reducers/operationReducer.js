import { userConstants, operationConstants } from '../constants';
import produce from 'immer';


export function operations(state = {
  loading: false
}, action) {
  switch (action.type) {
    case operationConstants.POST:
      return produce(state, draft => {
        draft.loading = true;
      })
    case operationConstants.POST_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
      })
    default:
      return state
  }
}