import React from 'react';
import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Grid, Button, Link } from '@material-ui/core';
import { PageTitle } from '../../components/typos/Title';
import Pagination from '@material-ui/lab/Pagination';

export function UserIndex() {
  return (
    <Container>
      <PageTitle text={"담당자 관리"} align="left" />
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">Group</TableCell>
              <TableCell align="center">로그인ID</TableCell>
              <TableCell align="center">권한</TableCell>
              <TableCell align="center">가입일</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">Ptech</TableCell>
              <TableCell align="center">admin</TableCell>
              <TableCell align="center">admin</TableCell>
              <TableCell align="center">2019.03.21</TableCell>
              <TableCell/>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4} alignItems="center" flexWrap="wrap" style={{textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Pagination count={100}  showFirstButton showLastButton variant="outlined" shape="rounded" size="large" page={Number(1)}/>
      </Box>
      <Grid container direction="column" justify="flex-end" alignItems="flex-end">
        <Grid item>
          <Button variant="outlined" color="primary" component={Link} to='/apis/new'>
            신규 API 추가
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}