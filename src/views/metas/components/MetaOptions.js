import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { MetaSchemaTitle } from './MetaSchemaTitle';
import logoImg from 'assets/imgs/logos/api_conf.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: 'rgb(242,243,247)',
    background: 'linear-gradient(118deg, rgba(242,243,247,1) 0%, rgba(225,229,245,1) 100%)',
    borderLeft: '1px solid #95A3B6',
    padding: theme.spacing(2),
  },
  fontIcon: {
    color: '#95A3B6',
    fontSize: '1rem',
    marginRight: theme.spacing(1),
  }
}));

export function MetaOptions(props) {
  const classes = useStyles();

  return (
    <div>
      <MetaSchemaTitle img={logoImg} title='API 설정' />

      <div className={classes.root}>
        <FontAwesomeIcon icon={faLaptopCode} className={classes.fontIcon} />
        API 상세 설명
        <Paper>
          feij
        </Paper>
      </div>
    </div>
  )
}