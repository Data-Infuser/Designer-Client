import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from '../../actions/alertActions';

export function ErrorDialog(props) {
  const alert = useSelector(state => state.alerts)
  const dispatch = useDispatch();
  
  const handleClose = () => {
    dispatch(alertActions.clear());
  }

  const titleText = alert.title || '문제가 발생하였습니다.'
  const bodyMessage = alert.message || '관리자에게 문의하여 주세요.'

  return (
    <Dialog
      open={alert.open}
      onClose={handleClose}
      aria-labelledby="error-alert-dialog-title"
      aria-describedby="error-alert-dialog-description"
    >
      { alert.title && 
        <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
      }
      <DialogContent>
        {bodyMessage}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}