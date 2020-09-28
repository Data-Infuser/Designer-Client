import React, { useState, useEffect } from 'react';
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { metaActions } from '../../actions/metaActions';
import { alertActions } from '../../actions/alertActions';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFile, faDatabase, faLink } from '@fortawesome/free-solid-svg-icons'
import { MetaSchema } from './MetaSchema';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    flexGrow: 1,
  },
  dataInfo: {
    padding: theme.spacing(2),
    color: "#fff",
    fontSize: "1rem",
    background: "rgb(0,96,211)",
    background: "linear-gradient(118deg, rgba(0,96,211,1) 0%, rgba(0,227,194,1) 100%)",
  },
  dataName: {
    marginLeft: theme.spacing(1),
  },
  formContainer: {
    backgroundColor: "#fff",
  },
  formGroup: {
    padding: theme.spacing(2),
    textAlign: "left",
  }
}));

export function ShowMetaConfig(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [cols, setCols] = useState();

  const { id } = useParams();
  const metaDict = useSelector((state) => state.metas.dict);
  const meta = metaDict[id];
  console.log(meta);

  useEffect(() => {
    dispatch(metaActions.getMeta(id)).then((response) => {
      if(response.error) {
        alertActions.handleError(dispatch, response.error);
        return;
      }
    })  
  }, [])

  useEffect(() => {
    if(meta && meta.columns && !cols) {
      setCols(meta.columns);
    }
  }, [meta])

  let dataTypeIcon;
  if (meta && meta.dataType) {
    switch (meta.dataType) {
      case "file":
        dataTypeIcon = <FontAwesomeIcon icon={faFile} />
        break;
      case "database":
        dataTypeIcon = <FontAwesomeIcon icon={faDatabase} />
        break;
      case "link":
        dataTypeIcon = <FontAwesomeIcon icon={faLink} />
        break;
    }
  }  

  return (

    <div className={classes.root}>
      {meta && 
        <div>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.dataInfo}>
              {dataTypeIcon}
              <span className={classes.dataName}>
                {meta.originalFileName}
              </span>
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item lg={4} md={6} xs={12}>
            <MetaSchema cols={meta.columns} />
          
            l4 m6 x12
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
          l4 m6 x12
          </Grid>
          <Grid item lg={4} md={12}>
            l4 m12
          </Grid>
        </Grid>
        </div>
      }
    </div>
  )
}