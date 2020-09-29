import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heading: {
    display: 'flex',
  },
  logoWrap: {
    padding: theme.spacing(1),
    borderBottom: '1px solid #ddd',
    flex: '0 0 52px',
  },
  logoImg: {
    height: 32,
    display: 'block',
  },
  title: {
    border: '1px solid #ddd',
    padding: 12,
    fontSize: '1rem',
    fontWeight: 'bold',
    flex: 1,
  }
}));

export function MetaSchemaTitle(props) {
  const classes = useStyles();

  return (
    <div className={classes.heading}>
      <div className={classes.logoWrap}>
        <img src={props.img} className={classes.logoImg} />
      </div>
      <div className={classes.title}>
        {props.title}
      </div>
    </div>
  )
}