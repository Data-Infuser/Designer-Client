import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, FormControl, Input, InputLabel, Button, FormHelperText, DialogActions, DialogContent, Snackbar, Select, MenuItem } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { metaActions } from '../../../actions';
import { Alert } from '@material-ui/lab';
import { history } from '../../../utils/history';
import { useHistory } from 'react-router-dom';
import { alertActions } from '../../../actions/alertActions';

export function FileUrlForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(state => state.metas.loading);
  const api = props.api;
  const initialFileForm = {
    stageId: api.id,
    dataType: "file-url",
    title: "",
    skip: 0,
    sheet: 0,
    url: undefined,
    ext: ""
  }

  const [fileForm, setFileForm] = useState(initialFileForm);
  const [message, setMessage] = useState();

  useEffect(() => {
    setFileForm(initialFileForm);
  }, [])

  const handleFileFormChange = (e) => {
    setFileForm({
      ...fileForm,
      [e.target.name]: e.target.value
    })
  }

  const onCloseButtonClick = () => {
    props.handleClose();
  }

  const onSaveButtonClick = () => {
    if(fileForm.title.length < 6) {
      setMessage("제목은 6자 이상이어야 합니다.");
      return;
    }
    dispatch(metaActions.postMetaUpload(fileForm))
    .then((response) => {
      if(response.error) {
        alertActions.handleError(dispatch, response.error);
        return;
      }

      history.push(`/metas/${response.payload.data.id}`)
    });
  }

  return (
    <Box>
        <DialogContent>
          { message && <Alert severity="error">{message}</Alert> }
          <Grid item xs={12}>
            <Box width="auto">
              <FormControl fullWidth={true}>
                <InputLabel width="100%" htmlFor="database-type-input">파일 확장자를 입력해주세요.</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="ext"
                  value={fileForm.ext}
                  onChange={handleFileFormChange}
                >
                  <MenuItem value={"csv"}>csv</MenuItem>
                  <MenuItem value={"xlsx"}>xlsx</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box width="auto">
              <FormControl fullWidth={true}>
                <InputLabel width="100%" htmlFor="title-input">Title</InputLabel>
                <Input id="title-input" aria-describedby="title-helper-text" name="title" value={fileForm.title} onChange={handleFileFormChange}/>
                <FormHelperText id="title-helper-text">데이터명을 입력해주세요. 목록표시를 위해 사용됩니다.</FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Box width="auto">
              <FormControl fullWidth={true}>
                <InputLabel width="100%" htmlFor="skip-input">Skip</InputLabel>
                <Input id="skip-input" aria-describedby="skip-helper-text" name="skip" value={fileForm.skip} onChange={handleFileFormChange}/>
                <FormHelperText id="skip-helper-text">상단 skip할 Row count를 입력해주세요.</FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Box width="auto">
              <FormControl fullWidth={true}>
                <InputLabel width="100%" htmlFor="sheet-input">Sheet</InputLabel>
                <Input id="sheet-input" aria-describedby="sheet-helper-text" name="sheet" value={fileForm.sheet} onChange={handleFileFormChange}/>
                <FormHelperText id="sheet-helper-text">xlsx의 경우 sheet number를 입력해주세요.</FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} >
            <Box width="auto">
              <FormControl fullWidth={true}>
                <InputLabel width="100%" htmlFor="sheet-input">url</InputLabel>
                <Input id="sheet-input" aria-describedby="sheet-helper-text" name="url" value={fileForm.url} onChange={handleFileFormChange}/>
                <FormHelperText id="sheet-helper-text">원천 파일 Url을 입력해주세요.</FormHelperText>
              </FormControl>
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={onCloseButtonClick} variant="contained" color="secondary">
            닫기
          </Button>
          <Button disabled={loading} onClick={onSaveButtonClick} variant="contained" color="primary" autoFocus>
            저장
          </Button>
        </DialogActions>
    </Box>
  )
}