
import { alertConstants } from '../constants/alertConstants';
export const alertActions = {
  alert,
  clear
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