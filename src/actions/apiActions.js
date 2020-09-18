
import { alertConstants, errorConstants } from '../constants';
import { apiConstants } from '../constants/apiConstants';
import { history } from '../utils/history';

export const apiActions = {
  getIndex,
  postNewApi,
  getApi
}

function getIndex(page = 1, perPage = 10) {
  return {
    type: apiConstants.INDEX,
    payload: {
      request: {
        method: 'GET',
        url: '/stages',
        data: {
          page: page,
          perPage: perPage
        }
      }
    }
  }
}

function postNewApi(form) {
  return {
    type: apiConstants.POST,
    payload: {
      request: {
        method: 'POST',
        url: '/applications',
        data: form
      }
    }
  }
}

function getApi(id) {
  return {
    type: apiConstants.GET,
    payload: {
      request: {
        method: 'GET',
        url: `/stages/${id}`,
      }
    }
  }
}