
import { metaConstants } from '../constants/metaConstants';
import { history } from '../utils/history';
import store from '../utils/store';
import axiosClient from '../utils/axiosHelper';

export const metaActions = {
  getMeta,
  postMetaUpload,
  addOperation,
  uploadFile
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  return {
    type: metaConstants.UPLOAD_FILE,
    payload: {
      request: {
        method: 'POST',
        url: '/files',
        headers: {
          'content-type': 'multipart/form-data'
        },
        data: formData
      }
    }
  }
}

function postMetaUpload(form) {
  const endPoint = form.dataType === 'dbms' ? 'dbms' : 'file';
  return {
    type: metaConstants.POST,
    payload: {
      request: {
        method: 'POST',
        url: `/metas/${endPoint}`,
        data: form
      }
    }
  }
}

function getMeta(id) {
  return {
    type: metaConstants.GET,
    payload: {
      request: {
        method: 'GET',
        url: `/metas/${id}`,
      }
    }
  }
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