
import { metaConstants } from '../constants/metaConstants';
import { history } from '../utils/history';

export const metaActions = {
  postMetaUpload
}

function postMetaUpload(form) {
  let interval;
  return dispatch => {
    dispatch(request());
    interval = setInterval(() => {
      dispatch(success(form));
      history.push("/metas/1")
    }, 1500)
  }

  function request() { return { type: metaConstants.POST } }
  function success() { 
    clearInterval(interval);
    return { type: metaConstants.POST_SUCCESS } 
  }
  function failure() { return { type: metaConstants.POST_FAIL}}
}