
import { metaConstants } from '../constants/metaConstants';
import { history } from '../utils/history';
import store from '../utils/store';
import axiosClient from '../utils/axiosHelper';

export const metaActions = {
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
  
  // let interval;
  // return dispatch => {
  //   dispatch(request());
  //   interval = setInterval(() => {
  //     const newMeta = metaFactory(form);
  //     dispatch(success(newMeta))
  //     history.push(`/metas/${newMeta.id}`)
  //   }, 300)
  // }

  // function request() { return { type: metaConstants.POST } }
  // function success(meta) { 
  //   clearInterval(interval);
  //   return { type: metaConstants.POST_SUCCESS, meta } 
  // }
  // function failure() { return { type: metaConstants.POST_FAIL}}
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

async function postFile(file) {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosClient.post( `/files`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
        }
      })
      const fileData = response.data;
      resolve(fileData);
    } catch (err) {
      reject(err);
    }
  })
}