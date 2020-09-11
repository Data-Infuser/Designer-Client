import React, { useEffect, useState } from 'react';
import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Grid, Button } from '@material-ui/core';
import { PageTitle } from '../../components/typos/Title';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../actions/userActions';
import { TableLodingProgress, TableEmptyRow } from '../../components/tables/TableUtilRows';
import { Link } from 'react-router-dom';
import ActionDialog from '../../components/dialogs/ActionDialog';


export function UserIndex() {
  const users = useSelector(state => state.users.items);
  const loading = useSelector(state => state.users.loading);
  const dispatch = useDispatch();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(-1);

  useEffect(() => {
    dispatch(userActions.index());
  }, [])

  const deleteBtnClick = (userId) => {
    setSelectedUserId(userId)
    setDeleteModalOpen(true);
  }

  const deleteUser = () => {
    if(selectedUserId <= 0) return;
    dispatch(userActions.unregistByAdmin(selectedUserId));
  }

  return (
    <Container>
      <PageTitle text={"담당자 관리"} align="left" />
      <ActionDialog action={deleteUser} open={deleteModalOpen} setOpen={setDeleteModalOpen} titleText="사용자 탈퇴" actionText="삭제" cancelText="취소">
        정말 사용자를 탈퇴 시키시겠습니까?
      </ActionDialog>
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">Group</TableCell>
              <TableCell align="center">로그인ID</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">권한</TableCell>
              <TableCell align="center">가입일</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            { loading &&
              <TableLodingProgress colSpan={6}/>
            }
            { !loading && users.length <= 0 &&
              <TableEmptyRow colSpan={6} text={`관리가 가능한 사용자가 없습니다.`}/>
            }
            { !loading && users.length > 0 && users.map( user => {
              return (
                <TableRow key={`users-index-table-row-${user.id}`}>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.group}</TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  <TableCell align="center">{user.createdAt}</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" size="small" color="primary" component={Link} to={{ pathname: `/users/${user.id}`, state: {user: user}}}>상세보기</Button>
                    <Button variant="outlined" size="small" color="secondary" onClick={() => deleteBtnClick(user.id)}>삭제</Button>
                  </TableCell>
                </TableRow>
              )
            })}
            
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4} alignItems="center" flexWrap="wrap" style={{textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Pagination count={100}  showFirstButton showLastButton variant="outlined" shape="rounded" size="large" page={Number(1)}/>
      </Box>
      <Grid container direction="column" justify="flex-end" alignItems="flex-end">
        <Grid item>
          <Button variant="outlined" color="primary" component={Link} to='/users/new'>
            신규 담당자 추가
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}