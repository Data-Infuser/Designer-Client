const dummyApis = [{
  id: 1,
  name: "공적 마스크 API",
  version: "v1",
  endPoint: "/public-mask/v1",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 1,
  name: "공적 마스크 API",
  version: "v1",
  endPoint: "/public-mask/v1",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 1,
  name: "공적 마스크 API",
  version: "v1",
  endPoint: "/public-mask/v1",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 1,
  name: "공적 마스크 API",
  version: "v1",
  endPoint: "/public-mask/v1",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 1,
  name: "공적 마스크 API",
  version: "v1",
  endPoint: "/public-mask/v1",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
},
{
  id: 1,
  name: "공적 마스크 API",
  version: "v1",
  endPoint: "/public-mask/v1",
  operations: ["stores-by-geo", "stores-by-address", "stores"],
  state: "deployed",
  lastCalledAt: "2020-07-21 19:00",
  deployedAt: "2020-03-14 03:23"
}]

export function apis(state = {
  loading: false,
  items: dummyApis
}, action) {
  switch (action.type) {
    default:
      return state
  }
}