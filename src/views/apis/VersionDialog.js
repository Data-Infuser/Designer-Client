import React, { useState, useEffect } from 'react';
import { Dialog, Container, Box, DialogActions, Button, DialogContent, Typography, Paper, TableRow, TableCell, TableBody, TableContainer, TableHead, Table } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { applicationActions } from '../../actions/applicationActions';
import { alertActions } from '../../actions/alertActions';
import { SubTitle } from '../../components/typos/Title';
import { Alert } from '@material-ui/lab';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export function VersionDialog(props) {
  const dispatch = useDispatch();

  const open = props.open;
  const handleModal = props.handleModal;
  const applicationId = props.applicationId;

  const [errorMessage, setErrorMessage] = useState();
  const [changed, setChanged] = useState(false);

  const applications = useSelector(state => state.applications);
  const loading = applications.loading;
  const application = applications.dict[applicationId]
  
  useEffect(() => {
    if(open === true) {
      setChanged(false);
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
    handleModal(applicationId, false, changed);
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

  const deleteStage = (stageId) => {
    dispatch(applicationActions.deleteStage(stageId)).then(
      (response) => {
        if(response.error) {
          setErrorMessage(response.error);
          return;
        }
        setChanged(true);
        dispatch(applicationActions.getApp(applicationId)).then(
          (response) => {
            if(response.error) {
              alertActions.handleError(dispatch, response.error);
              return;
            }
          }
        );
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
      maxWidth={'md'}
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
            <Box maxHeight={400}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">id</TableCell>
                      <TableCell align="center">버전</TableCell>
                      <TableCell align="center">상태</TableCell>
                      <TableCell align="center">수정일</TableCell>
                      <TableCell align="center">생성일</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { application.stages && Array.isArray(application.stages) && application.stages.map((stage) => {
                      let button;
                      return (
                        <TableRow>
                          <TableCell align="center">{stage.id}</TableCell>
                          <TableCell align="center">v{stage.name}</TableCell>
                          <TableCell align="center">{stage.status}</TableCell>
                          <TableCell align="center">{moment(stage.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                          <TableCell align="center">{moment(stage.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                          <TableCell align="center"><Button onClick={() => deleteStage(stage.id)}><FontAwesomeIcon icon={faTrash}/></Button></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            
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