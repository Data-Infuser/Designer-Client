import React from 'react';
import { Dialog, DialogActions, Button, DialogContent } from '@material-ui/core';
import { FileUploadForm } from './_fileUploadForm';

export function NewMetaDialog(props) {
  const open = props.open;
  const api = props.api;
  const handleClose = (e) => {
    props.setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='paper'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth={'sm'}
      disableBackdropClick={true}
      fullWidth={true}
    >
      <FileUploadForm api={api} handleClose={handleClose}/>
    </Dialog>
  );
}