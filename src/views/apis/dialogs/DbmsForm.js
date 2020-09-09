import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, FormControl, Input, InputLabel, Button, FormHelperText, DialogActions, DialogContent, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { metaActions } from '../../../actions';
import { Alert } from '@material-ui/lab';

export function DbmsForm(props) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.metas.loading);
  const api = props.api;
  const initialForm = {
    apiId: api.id,
    type: "dbms",
    title: "",
    dbms: "",
    host: "",
    port: "",
    database: "",
    user: "",
    password: "",
    table: ""
  }

  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState();

  useEffect(() => {
    setForm(initialForm);
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onCloseButtonClick = () => {
    props.handleClose();
  }

  const onSaveButtonClick = () => {
    if(form.title.length < 6) {
      setMessage("제목은 6자 이상이어야 합니다.");
      return;
    }
    dispatch(metaActions.postMetaUpload(form));
  }

  return (
    <Box>
      <DialogContent>
        <Grid item xs={12}>
          <Box width="auto">
            <FormControl fullWidth={true}>
              <InputLabel width="100%" htmlFor="database-type-input">데이터베이스 종류를 선택하세요</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="dbms"
                value={form.dbms}
                onChange={handleChange}
              >
                <MenuItem value={"mysql"}>MySql</MenuItem>
                <MenuItem value={"cubrid"}>Cubrid</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box width="auto">
            <FormControl fullWidth={true}>
              <InputLabel width="100%" htmlFor="title-input">Title</InputLabel>
              <Input id="title-input" aria-describedby="title-helper-text" name="title" value={form.title} onChange={handleChange}/>
              <FormHelperText id="title-helper-text">데이터명을 입력해주세요. 목록표시를 위해 사용됩니다.</FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Box width="auto">
            <FormControl fullWidth={true}>
              <InputLabel width="100%" htmlFor="host-input">Host</InputLabel>
              <Input id="host-input" aria-describedby="host-helper-text" name="host" value={form.host} onChange={handleChange}/>
              <FormHelperText id="host-helper-text">DB Host를 입력해주세요. ex) 127.0.0.1 // mydb.com</FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Box width="auto">
            <FormControl fullWidth={true}>
              <InputLabel width="100%" htmlFor="port-input">post</InputLabel>
              <Input id="port-input" aria-describedby="port-helper-text" name="port" value={form.port} onChange={handleChange}/>
              <FormHelperText id="port-helper-text">DB port 번호를 입력해주세요.</FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Box width="auto">
            <FormControl fullWidth={true}>
              <InputLabel width="100%" htmlFor="database-input">database</InputLabel>
              <Input id="database-input" aria-describedby="database-helper-text" name="database" value={form.database} onChange={handleChange}/>
              <FormHelperText id="database-helper-text">database 를 입력해주세요.</FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Box width="auto">
            <FormControl fullWidth={true}>
              <InputLabel width="100%" htmlFor="user-input">username</InputLabel>
              <Input autoComplete='new-user' id="user-input" aria-describedby="user-helper-text" name="user" value={form.user} onChange={handleChange}/>
              <FormHelperText id="user-helper-text">db 연결을 위한 username을 입력해주세요.</FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Box width="auto">
            <FormControl fullWidth={true}>
              <InputLabel width="100%" htmlFor="password-input">password</InputLabel>
              <Input autoComplete='new-password' type="password" id="password-input" aria-describedby="password-helper-text" name="password" value={form.password} onChange={handleChange}/>
              <FormHelperText id="password-helper-text">db 연결을 위한 password을 입력해주세요.</FormHelperText>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Box width="auto">
            <FormControl fullWidth={true}>
              <InputLabel width="100%" htmlFor="password-input">table</InputLabel>
              <Input autoComplete='new-table' type="table" id="table-input" aria-describedby="table-helper-text" name="table" value={form.table} onChange={handleChange}/>
              <FormHelperText id="table-helper-text">table명을 입력해주세요.</FormHelperText>
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