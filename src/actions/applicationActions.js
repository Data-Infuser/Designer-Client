
import { applicationConstants } from '../constants/applicationConstants';

export const applicationActions = {
  getApp,
  postStage
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

function postStage(applicationId) {
  return {
    type: applicationConstants.POST_STAGE,
    payload: {
      request: {
        method: 'POST',
        url: `/applications/${applicationId}/stages`
      }
    }
  }
}