import React, {useState} from 'react';
import { Button, Container, Grid, Menu, MenuItem } from '@material-ui/core'
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
      <Grid container direction="row">
        <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          원천데이터 추가
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handelMeneSelected("upload")}>파일 업로드</MenuItem>
          {/* <MenuItem onClick={() => handelMeneSelected("url")}>파일 URL 등록</MenuItem>
          <MenuItem onClick={() => handelMeneSelected("dbms")}>DBMS</MenuItem> */}
        </Menu>
      </Grid>
    </Container>
  )
}