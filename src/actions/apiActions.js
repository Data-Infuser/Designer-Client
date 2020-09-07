
import { alertConstants, errorConstants } from '../constants';
import { apiConstants } from '../constants/apiConstants';
import { history } from '../utils/history';

export const apiActions = {
  getIndex,
  postNewApi
}

function getIndex() {
  let interval;
  return dispatch => {
    dispatch(request());
    interval = setInterval(() => {
      dispatch(success());
    }, 1500)
  }

  function request() { return { type: apiConstants.INDEX } }
  function success() { 
    clearInterval(interval);
    return { type: apiConstants.INDEX_SUCCESS } 
  }
}

function postNewApi(form) {
  let interval;
  return dispatch => {
    dispatch(request());
    interval = setInterval(() => {
      dispatch(success(form));
    }, 1500)
  }

  function request() { return { type: apiConstants.POST } }
  function success(form) { 
    clearInterval(interval);
    return { type: apiConstants.POST_SUCCESS, form } 
  }
  function failure() { return { type: apiConstants.POST_FAIL}}
}