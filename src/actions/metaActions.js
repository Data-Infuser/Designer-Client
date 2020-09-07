
import { metaConstants } from '../constants/metaConstants';
import { history } from '../utils/history';
import { useSelector } from 'react-redux';

export const metaActions = {
  postMetaUpload
}

function postMetaUpload(form) {
  let interval;
  return dispatch => {
    dispatch(request());
    interval = setInterval(() => {
      dispatch(success(form))
      history.push(`/metas/1`)
    }, 300)
  }

  function request() { return { type: metaConstants.POST } }
  function success(form) { 
    clearInterval(interval);
    return { type: metaConstants.POST_SUCCESS, form } 
  }
  function failure() { return { type: metaConstants.POST_FAIL}}
}