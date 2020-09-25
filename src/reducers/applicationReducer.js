import produce from 'immer';
import { applicationConstants } from '../constants/applicationConstants';

export function applications(state = {
  loading: false,
  postLoading: false,
  dict: {}
}, action) {
  switch (action.type) {
    case applicationConstants.GET:
      return produce(state, draft => {
        draft.loading = true;
      })
    case applicationConstants.GET_SUCCESS:
      return produce(state, draft => {
        const application = action.payload.data;
        draft.loading = false;
        draft.dict[application.id] = application;
      })
    case applicationConstants.GET_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      })
    case applicationConstants.POST_STAGE:
      return produce(state, draft => {
        draft.postLoading = true;
      })
    case applicationConstants.POST_STAGE_SUCCESS:
      return produce(state, draft => {
        draft.postLoading = false;
      })
    case applicationConstants.POST_STAGE_FAIL:
      return produce(state, draft => {
        draft.postLoading = false;
      })
    default:
      return state
  }
}