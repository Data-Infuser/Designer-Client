import { metaConstants } from '../constants';
import produce from 'immer';

export function metas(state = {
  loading: false
}, action) {
  switch (action.type) {
    case metaConstants.POST:
      return produce(state, draft => {
        draft.loading = true;
      })
    case metaConstants.POST_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
      })
    case metaConstants.POST_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      })
    default:
      return state
  }
}