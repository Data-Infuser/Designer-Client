import { apiConstants } from '../constants/apiConstants';
import { produce } from 'immer';

const dummyApis = [{
  id: 1,
  name: "공적 마스크 API",
  version: "v1",
  endPoint: "/public-mask/v1",
  operations: ["stores-by-geo", "stores-by-address"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 2,
  name: "공적 마스크 API",
  version: "v2",
  endPoint: "/public-mask/v2",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 3,
  name: "원전 방사선 폐기물 처리 현황",
  version: "v1",
  endPoint: "/radioactive-wastes/v1",
  operations: ["wastes"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 4,
  name: "공적 마스크 API",
  version: "v3",
  endPoint: "/public-mask/v3",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "staged",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 5,
  name: "원전 방사선 폐기물 처리 현황",
  version: "v2",
  endPoint: "/radioactive-wastes/v2",
  operations: ["wastes"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 6,
  name: "공적 마스크 API",
  version: "v4",
  endPoint: "/public-mask/v4",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "default",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
}]

export function apis(state = {
  loading: false,
  items: []
}, action) {
  switch (action.type) {
    case apiConstants.INDEX:
      return produce(state, draft => {
        draft.loading = true;
      })
    case apiConstants.INDEX_SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.items = dummyApis;  
      })
    default:
      return state
  }
}