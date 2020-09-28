import { apiConstants } from '../constants/apiConstants';
import { produce } from 'immer';
import { history } from '../utils/history';

const dummyApis = []

export function apis(state = {
  loading: false,
  items: [],
  lastIndex: 1,
  dict: {},
  index: [],
  page: 1,
  perPage: 10,
  totalCount: 0
}, action) {
  switch (action.type) {
    case apiConstants.INDEX:
      return produce(state, draft => {
        draft.loading = true;
        draft.dict = {}
        draft.index = []
      })
    case apiConstants.INDEX_SUCCESS:
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
    case apiConstants.INDEX_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      })
    case apiConstants.POST:
      return produce(state, draft => {
        draft.loading = true;
      })
    case apiConstants.POST_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
      })
    case apiConstants.POST_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      })
    case apiConstants.GET:
      return produce(state, draft => {
        draft.loading = true;
      })
    case apiConstants.GET_SUCCESS:
      return produce(state, draft => {
        const api = action.payload.data;
        draft.dict[api.id] = api;
        draft.loading = false;
      })
    case apiConstants.GET_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      })
    default:
      return state
  }
}