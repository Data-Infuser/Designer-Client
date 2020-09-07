import React, { useState } from 'react';
import { Container, Grid, FormControl, InputLabel, Input, FormHelperText, Box, TextField, Button } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { apiActions } from '../../actions/apiActions';

const useStyles = makeStyles((theme) => ({
}))

export function New() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch();

  const loading = useSelector(state => state.apis.loading);

  const initialForm = {
    title: "",
    nameSpace: "",
    description: "",
    maxCountPerDay: 10000,
    maxCountPerMonth: 1000000
  }

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const onSaveButtonClick = (e) => {
    dispatch(apiActions.postNewApi(form));
  }
  return (
    <Container maxWidth='md'>
      <h2>
        신규 API 추가
      </h2>
      <Box mt={2}>
        <FormControl className={classes.formContorrl} fullWidth={true}>
          <InputLabel width="100%" htmlFor="title-input">제목</InputLabel>
          <Input id="title-input" aria-describedby="title-helper-text" name="title" value={form.title} onChange={handleChange}/>
        </FormControl>
      </Box>
      <Box mt={2}>
      <FormControl className={classes.formContorrl} fullWidth={true}>
        <InputLabel width="100%" htmlFor="namespace-input">호출 주소 prefix</InputLabel>
        <Input id="namespace-input" aria-describedby="namespace-helper-text" name="nameSpace" value={form.nameSpace} onChange={handleChange}/>
        <FormHelperText id="namespace-helper-text">* 활용자가 API 호출시 사용하게 되는 URL 주소 정보의 일부가 됩니다. 기관 또는 API의 성향을 나타낼 수 있는 명칭을 작성해주세요.</FormHelperText>
        <FormHelperText id="namespace-helper-text">* 영문 또는 숫자로 기입 가능하며, 특수문자 _ 까지 사용 가능합니다. (띄어쓰기를 포함한 그 외의 문자 입력 불가)</FormHelperText>
      </FormControl>  
      </Box>
      <Box mt={2}>
        <FormControl className={classes.formContorrl} fullWidth={true}>
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
        <FormControl className={classes.formContorrl} fullWidth={true}>
          <InputLabel width="100%" htmlFor="maxCountPerDay-input">일별 최대 호출 건수</InputLabel>
          <Input id="maxCountPerDay-input" aria-describedby="maxCountPerDay-helper-text" name="maxCountPerDay" value={form.maxCountPerDay} onChange={handleChange}/>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl className={classes.formContorrl} fullWidth={true}>
          <InputLabel width="100%" htmlFor="maxCountPerMonth-input">월별 최대 호출 건수</InputLabel>
          <Input id="maxCountPerMonth-input" aria-describedby="maxCountPerMonth-helper-text" name="maxCountPerMonth" value={form.maxCountPerMonth} onChange={handleChange}/>
        </FormControl>
      </Box>
      <Box mt={2} textAlign="right">
        <Button disabled={loading} variant="contained" color="primary" onClick={onSaveButtonClick}>저장</Button>
      </Box>
    </Container>
  )
}

