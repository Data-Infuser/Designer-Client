
import { resourceConstants } from '../constants/resourceConstants';

export const resourceActions = {
  getIndex
}

function getIndex(page = 1, perPage = 10) {
  return {
    type: resourceConstants.INDEX,
    payload: {
      request: {
        method: 'GET',
        url: `/metas?page=${page}&perPage=${perPage}`,
        data: {
          page: page,
          perPage: perPage
        }
      }
    }
  }
}