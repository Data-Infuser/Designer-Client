import React, { useState } from 'react';
import { Container, Box, FormControl, InputLabel, Input, TextField, FormHelperText, Button, Select, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PageTitle } from 'components/typos/Title';
import { operationActions } from '../../actions/operationActions';

export function OperationNew(props) {
  const apis = useSelector(state => state.apis.items);
  let meta = props.location.state ? props.location.state.meta : null;
  const api = apis.find(el => el.id == meta.apiId);
  const loading = useSelector(state => state.operations.loading);
  const dispatch = useDispatch();

  const initialForm = {
    api: api,
    metaId: meta.id,
    title: "",
    description: "",
    method: "get",
    entityName: ""
  }

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSaveButtonClick = (e) => {
    dispatch(operationActions.postOperation(form));
  }

  return (
    <Container>
      <PageTitle text="오퍼레이션 정의"/>
      <Box mt={2}>
        <FormControl fullWidth={true}>
          <InputLabel width="100%" htmlFor="title-input">제목</InputLabel>
          <Input id="title-input" aria-describedby="title-helper-text" name="title" value={form.title} onChange={handleChange}/>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth={true}>
          <TextField
            id="description-input"
            label="Description"
            multiline
            rows={5}
            variant="filled"
            aria-describedby="description-helper-text"
            name="description" value={form.description} onChange={handleChange}
          />
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth={true}>
          <InputLabel width="100%" htmlFor="namespace-input">Method</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="namespace-input"
            name="method"
            value={form.method}
            onChange={handleChange}
          >
            <MenuItem value={"get"}>GET</MenuItem>
          </Select>
          <FormHelperText id="namespace-helper-text">Http metod를 선택해주세요. 현재 GET 기능만 지원합니다.</FormHelperText>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth={true}>
          <InputLabel width="100%" htmlFor="entityName-input">호출 주소</InputLabel>
          <Input id="entityName-input" aria-describedby="entityName-helper-text" name="entityName" value={form.entityName} onChange={handleChange}/>
          <FormHelperText id="namespace-helper-text">{`https://OOOOOO.go.kr/api/APINAME/v1/${form.entityName}`}</FormHelperText>
        </FormControl>  
      </Box>
      <Box mt={2} textAlign="right">
        <Button disabled={loading} variant="contained" color="primary" onClick={onSaveButtonClick}>저장</Button>
      </Box>
    </Container>
  )
}