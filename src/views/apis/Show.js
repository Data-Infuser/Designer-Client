import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, Menu, MenuItem, Box } from '@material-ui/core'
import { NewMetaDialog } from './dialogs/NewMeta';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apiActions } from '../../actions/apiActions';

export function Show(props) {
  const dispatch = useDispatch();
  const [newMetaOpen, setNewMetaOpen] = useState(false);
  const [dataType, setDataType] = useState();

  const { id } = useParams();
  let api = props.location.state ? props.location.state.api : null;
  
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
        <Box>
  
        </Box>
      </Box>
    </Container>
  )
}