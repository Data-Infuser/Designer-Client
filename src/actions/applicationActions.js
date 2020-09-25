
import { applicationConstants } from '../constants/applicationConstants';

export const apiActions = {
  getApp
}

function getApp(id) {
  return {
    type: applicationConstants.GET,
    payload: {
      request: {
        method: 'GET',
        url: `/applications/${id}`
      }
    }
  }
}