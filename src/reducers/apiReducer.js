import { apiConstants } from '../constants/apiConstants';
import { produce } from 'immer';
import { history } from '../utils/history';

const dummyApis = [{
  id: 1,
  title: "공적 마스크 API",
  version: "v1",
  endPoint: "/public-mask/v1",
  operations: ["stores-by-geo", "stores-by-address"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 2,
  title: "공적 마스크 API",
  version: "v2",
  endPoint: "/public-mask/v2",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 3,
  title: "원전 방사선 폐기물 처리 현황",
  version: "v1",
  endPoint: "/radioactive-wastes/v1",
  operations: ["wastes"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 4,
  title: "공적 마스크 API",
  version: "v3",
  endPoint: "/public-mask/v3",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "staged",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 5,
  title: "원전 방사선 폐기물 처리 현황",
  version: "v2",
  endPoint: "/radioactive-wastes/v2",
  operations: ["wastes"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 6,
  title: "공적 마스크 API",
  version: "v4",
  endPoint: "/public-mask/v4",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "default",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
}]
let index = 7;

export function apis(state = {
  loading: false,
  items: [],
  lastIndex: 7
}, action) {
  switch (action.type) {
    case apiConstants.INDEX:
      return produce(state, draft => {
        draft.loading = true;
      })
    case apiConstants.INDEX_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        if(!draft.items || draft.items.length === 0) {
          draft.items = dummyApis;  
        }
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
        if(!draft.items || draft.items.length == 0) {
          draft.items = dummyApis;
        }
        draft.loading = false;
        const newId = draft.lastIndex++;
        const form = action.form
        const newObj = {
          id: newId,
          ...form,
          operations: [],
          state: "deployed",
          lastCalledAt: "2020-07-21 19:00",
          deployedAt: "2020-03-14 03:23",
          endPoint: `/${form.nameSpace}/v1`,
          version: 'v1'
        }
        draft.items.push(newObj);
      })
    default:
      return state
  }
}