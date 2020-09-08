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
        const meta = generateSampleMeta(action.meta);
        draft.items.push(meta);
        draft.lastIndex = meta.id + 1;
      })
    case metaConstants.POST_FAIL:
      return produce(state, draft => {
        draft.loading = false;
      })
    default:
      return state
  }
}

const generateSampleMeta = (meta) => {
  return {
    ...meta,
    ...sampleMetaObj
  }
}

const sampleMetaObj = {
  samples: `{"items":[["5028304693","대구상동우체국","이영숙","대구광역시 수성구 수성로 82 (상동)","053-766-0031","02"],["5148302626","대구상인1동우체국","황재동","대구광역시 달서구 상인서로10길 6-4 (상인동)","053-635-0014","02"],["5148302645","대구상인동우체국","최윤희","대구광역시 달서구 송현로 47 (상인동)","053-633-0013","02"],["5038303299","대구서문우체국","서경숙","대구광역시 서구 큰장로 101 (내당동)","053-571-0418","02"],["5048303797","대구서변동우체국","김태룡","대구광역시 북구 호국로43길 17 (서변동)","053-951-9930","02"]]}`,
  columns: [
    {
      id: 1,
      originalColumnName: "BIZRNO",
      columnName: "BIZRNO",
      type: "int",
      length: undefined,
      format: undefined,
      nullable: false,
      searchParams: []
    },
    {
      id: 2,
      originalColumnName: "CORP_NM",
      columnName: "CORP_NM",
      type: "varchar",
      length: undefined,
      format: undefined,
      nullable: false,
      searchParams: []
    },
    {
      id: 3,
      originalColumnName: "RPPR_NM",
      columnName: "RPPR_NM",
      type: "varchar",
      length: undefined,
      format: undefined,
      nullable: false,
      searchParams: []
    },
    {
      id: 4,
      originalColumnName: "ADDR",
      columnName: "ADDR",
      type: "text",
      length: undefined,
      format: undefined,
      nullable: false,
      searchParams: []
    },
    {
      id: 5,
      originalColumnName: "TELNO",
      columnName: "TELNO",
      type: "varchar",
      length: undefined,
      format: undefined,
      nullable: false,
      searchParams: []
    },
    {
      id: 6,
      originalColumnName: "RMK_TXT",
      columnName: "RMK_TXT",
      type: "int",
      length: undefined,
      format: undefined,
      nullable: false,
      searchParams: []
    }
  ]
}