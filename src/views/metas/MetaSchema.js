import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MetaColInfo } from './MetaColInfo';
import { SubTitle } from 'components/typos/Title';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#D1D6E1',
    padding: theme.spacing(2),
  }
}));

export function MetaSchema(props) {
  const cols = props.cols;
  console.log(cols);
  const classes = useStyles();

  return (
    <div>
      <div>
        스키마 정의
      </div>

      <div className={classes.root}>
        {cols.map((col, idx) => {
          return <MetaColInfo col={col} key={`MetaColInfo${idx}`} />
        })}
      </div>
    </div>
  )
}