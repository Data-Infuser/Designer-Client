import React, { useState } from 'react';
import { Dialog, Container, Box } from '@material-ui/core';
import { FileUploadForm } from './FileUploadForm';
import { FileUrlForm } from './FileUrlForm';
import { DbmsForm } from './DbmsForm';
import { Alert } from '@material-ui/lab';

export function NewMetaDialog(props) {
  const open = props.open;
  const api = props.api;
  const dataType = props.dataType;

  const [alertMessage, setAlert] = useState();

  const handleClose = (e) => {
    props.setOpen(false);
    setAlert();
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
      <Container maxWidth="lg">
        { alertMessage && 
          <Box mt={2}>
            <Alert severity="error">{alertMessage}</Alert> 
          </Box>
        }
        { dataType === 'upload' &&
          <FileUploadForm api={api} handleClose={handleClose} setAlert={setAlert}/>
        }
        { dataType === 'url' &&
          <FileUrlForm api={api} handleClose={handleClose} setAlert={setAlert}/>
        }
        { dataType === 'dbms' &&
          <DbmsForm api={api} handleClose={handleClose} setAlert={setAlert}/>
        }
      </Container>
    </Dialog>
  );
}