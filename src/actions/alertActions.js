
import { alertConstants, errorConstants } from '../constants';
export const alertActions = {
  alert,
  clear,
  handleError
}

function handleError(dispatch, error) {
  let errCode;
  if(error.response) {
    errCode = error.response.data.code;
  } else {
    errCode = error.message;
  } 
  const errorMessage = errorConstants[errCode] ? errorConstants[errCode] : errorConstants.GLOBAL_0001
  dispatch(alertActions.alert(errorMessage));
}

function alert(errorMessage, title = undefined) {
  return dispatch => {
    dispatch(showAlert(title, errorMessage));
  }
  function showAlert(title, message) { return { type: alertConstants.ERROR, title, message } }
}

function clear() {
  return dispatch => {
    dispatch(clearAlert());
  }
  function clearAlert() { return { type: alertConstants.CLEAR } }
}