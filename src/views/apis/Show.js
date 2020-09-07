import React, {useState} from 'react';
import { Button, Container, Grid, Menu, MenuItem, Box } from '@material-ui/core'
import { NewMetaDialog } from './dialogs/NewMeta';

export function Show() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newMetaOpen, setNewMetaOpen] = useState(false);
  const [dataType, setDataType] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelMeneSelected = (dataType) => {
    handleClose();
    setDataType(dataType)
    setNewMetaOpen(true);
  }
  return (
    <Container>
      <NewMetaDialog open={newMetaOpen} setOpen={setNewMetaOpen}/>
      <Grid container direction="row" spacing={4}>
        <Grid item>
          <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={() => handelMeneSelected("upload")}>
            파일 업로드
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={() => handelMeneSelected("upload")}>
            파일 URL 등록
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={() => handelMeneSelected("upload")}>
            DBMS
          </Button>
        </Grid>
      </Grid>
      <Box>

      </Box>
    </Container>
  )
}