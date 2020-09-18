import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Menu, MenuItem, Box } from '@material-ui/core'
import { NewMetaDialog } from './dialogs/NewMeta';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { apiActions } from '../../actions/apiActions';
import { MetaBox } from './MetaBox';
import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css";
import { alertActions } from '../../actions/alertActions';
import { history } from '../../utils/history';

export function Show(props) {
  const dispatch = useDispatch();
  const history = useHistory();
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
    <Container>
      { api &&
        <Box>
          <NewMetaDialog dataType={dataType} api={api} open={newMetaOpen} setOpen={setNewMetaOpen}/>
          <Grid container direction="row" spacing={4}>
            <Grid item>
              <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={() => handelMeneSelected("upload")}>
                파일 업로드
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={() => handelMeneSelected("url")}>
                파일 URL 등록
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={() => handelMeneSelected("dbms")}>
                DBMS
              </Button>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box textAlign="left">
                  { api.metas && api.metas.map(el => {
                    return (
                      <MetaBox meta={el}/>
                    )
                  })}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box textAlign="left">
                  <SwaggerUI url="http://rackerlabs.github.io/wadl2swagger/openstack/swagger/dbaas.json"/>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      }
    </Container>
  )
}