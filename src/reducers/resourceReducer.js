import { apiConstants } from '../constants/apiConstants';
import { produce } from 'immer';
import { resourceConstants } from '../constants/resourceConstants';

export function resources(state = {
  loading: false,
  dict: {},
  index: [],
  page: 1,
  perPage: 10,
  totalCount: 0
}, action) {
  switch (action.type) {
    case resourceConstants.INDEX:
      return produce(state, draft => {
        draft.loading = true;
        draft.dict = {}
        draft.index = []
      })
    case resourceConstants.INDEX_SUCCESS:
      return produce(state, draft => {
        const pagination = action.payload.data;
        draft.index = [];
        pagination.items.map((item) => {
          draft.index.push(item.id);
          draft.dict[item.id] = item
        })
        draft.page = pagination.page;
        draft.perPage = pagination.perPage;
        draft.totalCount = pagination.totalCount;
        draft.loading = false;
      })
    case resourceConstants.INDEX_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      })
    default:
      return state
  }
}