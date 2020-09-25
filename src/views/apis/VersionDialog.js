import React, { useState, useEffect } from 'react';
import { Dialog, Container, Box, DialogActions, Button, DialogContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { applicationActions } from '../../actions/applicationActions';
import { alertActions } from '../../actions/alertActions';
import { SubTitle } from '../../components/typos/Title';
import { Alert } from '@material-ui/lab';
import { apiActions } from '../../actions/apiActions';

export function VersionDialog(props) {
  const dispatch = useDispatch();

  const open = props.open;
  const handleModal = props.handleModal;
  const applicationId = props.applicationId;

  const [errorMessage, setErrorMessage] = useState();

  const applications = useSelector(state => state.applications);
  const loading = applications.loading;
  const application = applications.dict[applicationId]
  
  useEffect(() => {
    if(open === true) {
      dispatch(applicationActions.getApp(applicationId)).then(
        (response) => {
          if(response.error) {
            alertActions.handleError(dispatch, response.error);
            return;
          }
        }
      );
    }
  }, [open]);

  const handleClose = (e) => {
    handleModal(applicationId, false, false);
  }

  const handlePost = (e) => {
    dispatch(applicationActions.postStage(applicationId)).then(
      (response) => {
        if(response.error) {
          setErrorMessage(response.error);
          return;
        }
        handleModal(applicationId, false, true);
      }
    )
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
      <DialogContent>
        { errorMessage &&
          <Box mt={2}>
            <Alert severity="error">{errorMessage}</Alert> 
          </Box>
        }
        { loading &&
          <Box>
            <Typography>로딩중...</Typography>
          </Box>
        }
        { !loading && application &&
          <Box>
            <SubTitle text='버전 현황'/>
            { application.stages && Array.isArray(application.stages) && application.stages.map((stage) => {
              return (
                <Typography>{stage.id}</Typography>
              );
            })}
          </Box>
        }
      </DialogContent>
      { application &&
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            닫기
          </Button>
          <Button onClick={handlePost} variant="contained" color="primary" autoFocus>
            버전 {application.lastStageVersion + 1} 생성
          </Button>
        </DialogActions>
      }
      
    </Dialog>
  );
}