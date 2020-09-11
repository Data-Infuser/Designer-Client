import React, { useState } from 'react';
import { Container, Box, FormControl, InputLabel, Input, FormHelperText, Button, Select, MenuItem, Collapse } from '@material-ui/core';
import { PageTitle } from '../../components/typos/Title';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import { userActions } from '../../actions/userActions';

const initialForm = {
  username: "",
  password: "",
  passwordConfirm: "",
  name: "",
  email: "",
  role: ""
}

export function UserNew(props) {
  const loading = useSelector(state => state.users.loading);
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const [invalidMessage, setInvelidMessage] = useState();
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onSaveButtonClick = (e) => {
    const invalidMessage = validateRegistForm(form)
    if(invalidMessage) {
      setInvelidMessage(invalidMessage);
      return;
    }
    dispatch(userActions.registByAdmin(form));
  }

  const validateRegistForm = (registForm) => {
    if(registForm.username.length <= 6) {
      return "로그인 ID가 너무 짧습니다.";
    }
    if(registForm.password !== registForm.passwordConfirm) {
      return "비밀번호가 일치하지 않습니다.";
    }
    if(registForm.role === "") {
      return "역할을 선택해주세요.";
    }
    return;
  }

  return (
    <Container maxWidth="sm">
      <PageTitle text={`신규 담당자 추가`} align="left"/>
      <Collapse in={invalidMessage ? true : false}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setInvelidMessage();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="error"
        >
          {invalidMessage}
        </Alert>
      </Collapse>
      <Box mt={2}>
        <FormControl fullWidth={true}>
          <InputLabel width="100%" htmlFor="usrname-input">로그인 ID</InputLabel>
          <Input id="usrname-input" aria-describedby="usrname-helper-text" name="username" value={form.username} onChange={handleChange}/>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth={true}>
          <InputLabel width="100%" htmlFor="password-input">비밀번호</InputLabel>
          <Input type="password" id="password-input" aria-describedby="password-helper-text" name="password" value={form.password} onChange={handleChange}/>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth={true}>
          <InputLabel width="100%" htmlFor="passwordConfirm-input">비밀번호 재입력</InputLabel>
          <Input type="password" id="passwordConfirm-input" aria-describedby="passwordConfirm-helper-text" name="passwordConfirm" value={form.passwordConfirm} onChange={handleChange}/>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth={true}>
          <InputLabel width="100%" htmlFor="name-input">이름</InputLabel>
          <Input id="name-input" aria-describedby="name-helper-text" name="name" value={form.name} onChange={handleChange}/>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth={true}>
          <InputLabel width="100%" htmlFor="email-input">Email</InputLabel>
          <Input id="email-input" aria-describedby="email-helper-text" name="email" value={form.email} onChange={handleChange}/>
        </FormControl>
      </Box>
      <Box mt={2} textAlign="left">
        <FormControl fullWidth={true}>
          <InputLabel width="100%" htmlFor="role-input">역할을 선택해주세요.</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <MenuItem value={"admin"}>관리자</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt={2} textAlign="right">
        <Button disabled={loading} variant="contained" color="primary" onClick={onSaveButtonClick}>저장</Button>
      </Box>
    </Container>
  )
}