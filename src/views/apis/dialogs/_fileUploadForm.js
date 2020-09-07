import React, { useState } from 'react';
import { Container, Grid, Box, FormControl, Input, InputLabel, Button, FormHelperText, DialogActions, DialogContent } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { useDispatch } from 'react-redux';

export function FileUploadForm(props) {
  const dispatch = useDispatch();

  const initialFileForm = {
    serviceId: 1,
    title: "",
    skip: 0,
    sheet: 0,
    file: undefined
  }

  const [fileForm, setFileForm] = useState(initialFileForm);

  const handleFileFormChange = (e) => {
    setFileForm({
      ...fileForm,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (files) => {
    const file = files.length > 0 ? files[0] : undefined
    setFileForm({
      ...fileForm,
      serviceId: 1,
      file: file
    })
  }

  const onButtonClick = () => {
    props.handleClose();
    setFileForm(initialFileForm);
  }

  return (
    <Box>
      <DialogContent>
        <Container maxWidth="lg">
          { !fileForm.file &&
            <Grid item xs={12} >
              <Box width="auto">
                <FormControl fullWidth={true}>
                  <DropzoneArea
                    acceptedFiles={['.xlsx', '.csv']}
                    dropzoneText="csv, xlsx 또는 JSON 파일을 드래그 앤 드롭 하거나 아래 아이콘을 클릭해 업로드해주세요."
                    showPreviewsInDropzone={false}
                    showFileNames={true}
                    onChange={handleFileChange}
                  />
                </FormControl>
              </Box>
            </Grid>
          }
          { fileForm.file &&
            <Grid item xs={12}>
              <Box width="auto">
                <FormControl fullWidth={true}>
                  <InputLabel width="100%" htmlFor="file-input">File</InputLabel>
                  <Input id="file-input" aria-describedby="file-helper-text" name="file" value={fileForm.file.name}/>
                  <Button color="secondary" onClick={() => handleFileChange([])}>파일 삭제</Button>
                  <FormHelperText id="file-helper-text">업로드된 파일명 입니다.</FormHelperText>
                </FormControl>
              </Box>
            </Grid>
          }
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
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={onButtonClick} variant="contained" color="secondary">
          닫기
        </Button>
        <Button onClick={onButtonClick} variant="contained" color="primary" autoFocus>
          저장
        </Button>
      </DialogActions>
    </Box>
  )
}