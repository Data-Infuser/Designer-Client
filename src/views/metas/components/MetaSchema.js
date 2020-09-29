import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MetaColInfo } from './MetaColInfo';
import { SubTitle } from 'components/typos/Title';

import schemeLogo from 'assets/imgs/logos/schema_logo.png';
import { MetaSchemaTitle } from './MetaSchemaTitle';

const formHeaders = [
  { key: "formHeader1", name: "원본 컬럼명" },
  {
    key: "formHeader2",
    name: "활용자 제공 컬럼명",
    tooltip: "영문 작성을 권고합니다.",
  },
  { key: "formHeader3", name: "컬럼 타입" },
  { key: "formHeader4", name: "최대 길이", tooltip: "정수: 자릿수, 소수: 전체자릿수, 소수점 자릿수" },
  { key: "formHeader5", name: "날짜 형식", tooltip: "ex) yyyy-MM-dd HH:mm:ss" },
  { key: "formHeader6", name: "빈값 허용" },
  { key: "formHeader7", name: "검색 설정" },
];


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#D1D6E1',
    padding: theme.spacing(2),
  },
}));

export function MetaSchema(props) {
  const cols = props.cols;  
  const classes = useStyles();

  return (
    <div>
      <MetaSchemaTitle img={schemeLogo} title='스키마정의' />

      <div className={classes.root}>
        {cols.map((col, idx) => {
          return <MetaColInfo key={`MetaColInfo${idx}`} col={col} formHeaders={formHeaders}  />
        })}
      </div>
    </div>
  )
}