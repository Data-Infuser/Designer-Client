
import { alertConstants, errorConstants } from '../constants';
import { apiConstants } from '../constants/apiConstants';

export const apiActions = {
  getIndex
}

function getIndex(dispatch, error) {
  return dispatch => {
    dispatch(request());
    setInterval(() => {
      dispatch(success());
    }, 1500)
  }

  function request() { return { type: apiConstants.INDEX } }
  function success() { return { type: apiConstants.INDEX_SUCCESS } }
}