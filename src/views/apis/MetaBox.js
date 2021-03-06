import React from 'react';
import { Box, Paper, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(1)
  },
  flexBox: {
    display: "flex"
  },
  metaBoxTypo: {
    marginRight: theme.spacing(1)
  }
}))

export function MetaBox(props) {
  const classes = useStyles();

  const meta = props.meta;
  return (
    <Paper className={classes.paper} variant="outlined">
      <Grid container direction="row">
        <Grid item xs={12} md={8}>
          <Grid container direction="row">
            { meta.operation &&
              <Box className={classes.flexBox}>
                <Typography className={classes.metaBoxTypo}>{meta.operation.method}</Typography>
                <Typography className={classes.metaBoxTypo}>/{meta.operation.entityName}</Typography>
              </Box>
            }
            <Typography>{meta.title}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container direction="row-reverse">
            { meta.operation &&
              <Button variant="contained" color="primary" size='small'>상세</Button>
            }
            { !meta.operation &&
              <Button variant="contained" color="primary" size='small' component={Link} to={{ pathname: `/metas/${meta.id}/back`, state: {meta: meta}}}>operation 설정</Button>
            }
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}