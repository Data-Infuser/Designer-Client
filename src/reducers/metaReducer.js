import { metaConstants } from '../constants';
import produce from 'immer';

export function metas(state = {
  loading: false,
  items: [],
  lastIndex: 1
}, action) {
  switch (action.type) {
    case metaConstants.POST:
      return produce(state, draft => {
        draft.loading = true;
      })
    case metaConstants.POST_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.items.push({
          ...action.form,
          id: draft.lastIndex++
        })
      })
    case metaConstants.POST_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      })
    default:
      return state
  }
}