
import { operationConstants } from '../constants/operationConstants';
import { bindActionCreators } from 'redux';
import storeObj from '../utils/store';
import { history } from '../utils/history';
import { metaActions } from './metaActions';

export const operationActions = {
  postOperation
}

function postOperation(form) {
  let interval;
  return dispatch => {
    dispatch(request());
    interval = setInterval(() => {
      const metaId = form.metaId;
      const api = form.api;
      delete form.metaId;
      delete form.api;
      const operation = form;
      dispatch(success(operation));
      dispatch(metaActions.addOperation(metaId, operation))
      history.push({pathname: `/apis/${api.id}`, state: { api: api } }) 
    }, 300)
  }

  function request() { return { type: operationConstants.POST } }
  function success(operation) { 
    clearInterval(interval);
    return { type: operationConstants.POST_SUCCESS, operation } 
  }
  function failure(err) { return { type: operationConstants.POST_FAIL, err } }
}