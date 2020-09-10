import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Menu, MenuItem, Box } from '@material-ui/core'
import { NewMetaDialog } from './dialogs/NewMeta';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apiActions } from '../../actions/apiActions';
import { MetaBox } from './MetaBox';
import SwaggerUI from 'swagger-ui-react';
import "swagger-ui-react/swagger-ui.css";

export function Show(props) {
  const dispatch = useDispatch();
  const [newMetaOpen, setNewMetaOpen] = useState(false);
  const [dataType, setDataType] = useState();

  const { id } = useParams();
  let api = props.location.state ? props.location.state.api : null;
  const metas = useSelector(state => state.metas.items).filter(el => el.apiId == api.id);
  console.log(metas);
  useEffect(() => {
    if(!api) { dispatch(apiActions.getApi(id)); }
  }, [])

  const handelMeneSelected = (dataType) => {
    setDataType(dataType)
    setNewMetaOpen(true);
  }

  return (
    <Container>
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
                { metas && metas.map(el => {
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
    </Container>
  )
}