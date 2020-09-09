
import { metaConstants } from '../constants/metaConstants';
import { history } from '../utils/history';
import store from '../utils/store';

export const metaActions = {
  postMetaUpload,
  addOperation
}

function postMetaUpload(form) {
  let interval;
  return dispatch => {
    dispatch(request());
    interval = setInterval(() => {
      const newMeta = metaFactory(form);
      dispatch(success(newMeta))
      history.push(`/metas/${newMeta.id}`)
    }, 300)
  }

  function request() { return { type: metaConstants.POST } }
  function success(meta) { 
    clearInterval(interval);
    return { type: metaConstants.POST_SUCCESS, meta } 
  }
  function failure() { return { type: metaConstants.POST_FAIL}}
}

function addOperation(metaId, operation) {
  return dispatch => {
    dispatch({
      type: metaConstants.ADD_OPERATION,
      metaId,
      operation
    })
  }
}

function metaFactory(form) {
  const index = store.store.getState().metas.lastIndex;
  const newMeta = {
    ...form,
    id: index
  }
  return newMeta;
}