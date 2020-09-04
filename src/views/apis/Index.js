import React from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, TablePagination, CircularProgress, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

export function ApiIndex() {
  return (
    <Box>
      <h2> API 목록 </h2>
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">API 명</TableCell>
              <TableCell align="center">버전</TableCell>
              <TableCell align="center">호출주소</TableCell>
              <TableCell align="center">Operation 갯수</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">최종 호출 시간</TableCell>
              <TableCell align="center">배포일</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">공적 마스크 API</TableCell>
              <TableCell align="center">V1</TableCell>
              <TableCell align="center">/public-mask/v1</TableCell>
              <TableCell align="center">3</TableCell>
              <TableCell align="center">운영중</TableCell>
              <TableCell align="center">2020-07-21 19:00</TableCell>
              <TableCell align="center">2020-03-14 03:23</TableCell>
              <TableCell>
                <Button variant="outlined" size="small" color="primary">API 관리</Button>
                <Button variant="outlined" size="small" color="secondary">버전 관리</Button>
              </TableCell>
            </TableRow>
            <EmptyApis/>
            <TableLodingProgress colSpan={9}/>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={1} alignItems="center" flexWrap="wrap" style={{textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Pagination count={100}  showFirstButton showLastButton variant="outlined" shape="rounded" size="large" page={Number(1)}/>
      </Box>
    </Box>
  )
}

function EmptyApis() {
  return (
    <TableRow>
      <TableCell colSpan={9} align="center">
        등록된 API가 없습니다. 신규 API를 등록해주세요.
      </TableCell>
    </TableRow>
  )
}

function TableLodingProgress(props) {
  const colSpan = props.colSpan || 1;

  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        <CircularProgress/>
      </TableCell>
    </TableRow>
  )
}