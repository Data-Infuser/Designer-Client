
import { alertConstants } from '../constants/alertConstants';
export const alertActions = {
  alert,
  clear
}

function alert(errorMessage) {
  return dispatch => {
    dispatch(showAlert(errorMessage));
  }

  function showAlert(message) { return { type: alertConstants.ERROR, message } }
}

function clear() {
  return dispatch => {
    dispatch(clearAlert());
  }

  function clearAlert() { return { type: alertConstants.CLEAR } }
}