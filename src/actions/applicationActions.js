
import { applicationConstants } from '../constants/applicationConstants';

export const applicationActions = {
  getApp,
  postStage,
  deleteStage
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

function deleteStage(stageId) {
  return {
    type: applicationConstants.DELETE_STAGE,
    payload: {
      request: {
        method: 'DELETE',
        url: `/stages/${stageId}`
      }
    }
  }
}