import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Menu, MenuItem, Box, Paper, ButtonGroup } from '@material-ui/core'
import { NewMetaDialog } from './dialogs/NewMeta';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { apiActions } from '../../actions/apiActions';
import { MetaBox } from './MetaBox';
import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css";
import { alertActions } from '../../actions/alertActions';
import property from '../../configs/property.json';
import { makeStyles } from '@material-ui/core/styles';
import { SubTitle } from 'components/typos/Title';
const server = property.designerServerHost;

const useStyles = makeStyles((theme) => ({
  defaultPaper: {
    textAlign: 'left',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  }
}));

export function Show(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [newMetaOpen, setNewMetaOpen] = useState(false);
  const [dataType, setDataType] = useState();

  const { id } = useParams();
  const api = useSelector(state => state.apis.dict)[id];

  useEffect(() => {
    dispatch(apiActions.getApi(id)).then((response) => {
      if(response.error) {
        /**
         * 문제가 발생하는 경우 목록 페이지로 redirect
         */
        alertActions.handleError(dispatch, response.error);
        history.push("/apis");
        return;
      }
    })
  }, [])

  const handelMeneSelected = (dataType) => {
    setDataType(dataType)
    setNewMetaOpen(true);
  }

  return (
    <Container maxWidth={false}>
      { api &&
        <Box>
          <NewMetaDialog dataType={dataType} api={api} open={newMetaOpen} setOpen={setNewMetaOpen}/>
          
          <Box mt={2}>
            <Grid container>
              <Grid item xs={12} md={6}>
                { api.metas && api.metas.map(el => {
                  return (
                    <MetaBox meta={el}/>
                  )
                })}

                <Paper className={`${classes.defaultPaper} ${classes.spaceBetween}`}>
                  <div>
                    오퍼레이션 추가
                  </div>                  
                  
                  <ButtonGroup color="primary" size="small" aria-label="outlined primary button group">
                    <Button onClick={() => handelMeneSelected("upload")}>파일 직접 등록</Button>
                    <Button onClick={() => handelMeneSelected("url")}>파일 URL 등록</Button>
                    <Button onClick={() => handelMeneSelected("dbms")}>DBMS 접속 정보 등록</Button>
                  </ButtonGroup>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box textAlign="left">
                  <SwaggerUI url={`${server}/stages/${api.id}/api-docs`}/>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      }
    </Container>
  )
}