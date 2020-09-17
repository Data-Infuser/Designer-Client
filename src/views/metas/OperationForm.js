import React, { useState } from "react";
import { FormControl, InputLabel, Input, TextField, Grid, Select, MenuItem, FormHelperText } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: "#fff",
  },
  formGroup: {
    padding: theme.spacing(2),
    textAlign: "left",
  }
}));

export default function OperationForm(props) {
  const classes = useStyles();
  const operation = props.operation;

  return (
    <div className={classes.formContainer}>
      <div className={classes.formGroup}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="operation-title">오퍼레이션 명칭</InputLabel>
          <Input id="operation-title" value={operation.title}></Input>
        </FormControl>
      </div>

      <div className={classes.formGroup}>
        <FormControl fullWidth={true}>
          <TextField
            id="operation-description"
            label="오퍼레이션 설명"
            multiline
            rows={5}
            value={operation.desc}
            aria-describedby="description-helper-text"
            name="description"
            placeholder="API 이용자에게 안내되는 설명글 입니다. 데이터의 이해를 위한 설명을 친절히 작성해 주세요."
          />
        </FormControl>
      </div>

      <div className={classes.formGroup}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth={true}>
              <InputLabel width="100%" htmlFor="operation-method">
                호출 방식
              </InputLabel>
              <Select
                labelId="operation-method"
                id="namespace-input"
                name="method"
                value={operation.method || 'GET'}
              >
                <MenuItem value={"GET"}>GET</MenuItem>
              </Select>
              <FormHelperText id="operation-method-text">Http metod를 선택해주세요. 현재 GET 기능만 지원합니다.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={9}>
            <FormControl fullWidth={true}>
              <InputLabel width="100%" htmlFor="operation-end-point">호출 주소</InputLabel>
              <Input id="operation-end-point" value={operation.endPoint || ''} aria-describedby="entityName-helper-text" name="entityName" />
              <FormHelperText id="operation-end-point-text">{`https://OOOOOO.go.kr/api/APINAME/v1/TEST`}</FormHelperText>
            </FormControl>  
          </Grid>
        </Grid>
      </div>
    </div>
  )
}