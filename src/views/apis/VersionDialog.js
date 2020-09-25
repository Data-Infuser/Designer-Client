import React, { useState, useEffect } from 'react';
import { Dialog, Container, Box, DialogActions, Button } from '@material-ui/core';

export function VersionDialog(props) {
  const open = props.open;

  useEffect(() => {
    if(open === true) {
      console.log("hello");
    }
  }, [open]);

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
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          닫기
        </Button>
        <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}