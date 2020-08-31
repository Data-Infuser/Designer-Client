import { alertConstants } from '../constants';
import produce from 'immer';

export function alerts(state = {
  title: '',
  message: '',
  open: false
}, action) {
  switch (action.type) {
    case alertConstants.ERROR:
      return produce(state, draft => {
        draft.open = true;
        draft.message = action.message;
      })
    case alertConstants.CLEAR:
      return produce(state, draft => {
        draft.open = false;
      })
    default:
      return state
  }
}