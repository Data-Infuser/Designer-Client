import React, { useEffect, useState } from 'react';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, TablePagination, CircularProgress, Button, Grid, Container } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { apiActions } from '../../actions/apiActions';
import { Link, useHistory } from 'react-router-dom';
import { TableEmptyRow, TableLodingProgress } from '../../components/tables/TableUtilRows'
import { alertActions } from '../../actions/alertActions';
import moment from 'moment';
import queryString from 'query-string';

export function ApiIndex(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const apisStore = useSelector(state => state.apis);
  const loading = useSelector(state => state.apis.loading);

  const {page, perPage} = queryString.parse(props.location.search);
  
  const [currentPage, setCurrentPage] = useState(page ? page : 1);
  const [currentPerPage, setCurrentPerpage] = useState(perPage ? perPage : 10);

  useEffect(() => {
    dispatch(apiActions.getIndex(currentPage, currentPerPage)).then((response) => {
      if(response.error) {
        alertActions.handleError(dispatch, response.error);
        return;
      }
      history.push(`/apis?page=${currentPage}&perPage=${currentPerPage}`)
    })
  }, [currentPage, currentPerPage])

  const handlePageChange = (event, value) => {
    if(value*currentPerPage > apisStore.totalCount) return;
    setCurrentPage(value);
  }

  return (
    <Container>
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
              {/* TODO: 최종 호출 시간 구현 후 변경 */}
              <TableCell align="center">업데이트일</TableCell> 
              {/* TODO: 배포일 */}
              <TableCell align="center">생성일</TableCell> 
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            { loading &&
              <TableLodingProgress colSpan={9}/>
            }
            { !loading && apisStore.index && Array.isArray(apisStore.index) && apisStore.index.length <= 0 &&
              <TableEmptyRow colSpan={9} text={"등록된 API가 없습니다. 신규 API를 추가해주세요."}/>
            }
            { !loading && apisStore.index && Array.isArray(apisStore.index) && apisStore.index.map(apiId => {
              const api = apisStore.dict[apiId];
                return (
                  <TableRow key={`apis-index-table-${api.id}`}>
                    <TableCell align="center">{api.id}</TableCell>
                    <TableCell align="center">{api.application.title}</TableCell>
                    <TableCell align="center">{api.name}</TableCell>
                    <TableCell align="center">{`/${api.application.nameSpace}/${api.name}`}</TableCell>
                    <TableCell align="center">{api.metas.length}</TableCell>
                    <TableCell align="center">{api.status}</TableCell>
                    <TableCell align="center">{moment(api.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                    <TableCell align="center">{moment(api.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" color="primary" component={Link} to={{ pathname: `/apis/${api.id}`, state: {api: api}}}>API 관리</Button>
                      <Button variant="outlined" size="small" color="secondary">버전 관리</Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4} alignItems="center" flexWrap="wrap" style={{textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Pagination 
          count={parseInt(apisStore.totalCount/apisStore.perPage) + (((apisStore.totalCount%apisStore.perPage) === 0) ? 0 : 1 )}  
          showFirstButton 
          showLastButton 
          variant="outlined" 
          shape="rounded" 
          size="large" 
          page={Number(currentPage)} 
          onChange={handlePageChange}/>
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