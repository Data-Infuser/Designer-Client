import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * 
 * @param { open: boolean, setOpen: function, action: function, titleText: string, actionText: string, cancelText: string} props 
 */
export default function ActionDialog({ open, setOpen, action, titleText="action modal", actionText="action", cancelText="cancel", children }) {

  const handleClose = () => {
    setOpen(false);
  }

  const onActionClick = () => {
    action();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
      {children &&
        <DialogContent>
          {children}
        </DialogContent>
      }
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {cancelText}
        </Button>
        <Button onClick={onActionClick} color="primary" autoFocus>
          {actionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}