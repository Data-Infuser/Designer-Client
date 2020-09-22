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
import { resourceActions } from '../../actions/resourceActions';
import { PageTitle } from '../../components/typos/Title';

export function ResourceIndex(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const resourceStore = useSelector(state => state.resources);
  const loading = useSelector(state => state.resources.loading);

  const {page, perPage} = queryString.parse(props.location.search);
  
  const [currentPage, setCurrentPage] = useState(page ? page : 1);
  const [currentPerPage, setCurrentPerpage] = useState(perPage ? perPage : 10);

  useEffect(() => {
    dispatch(resourceActions.getIndex(currentPage, currentPerPage)).then((response) => {
      if(response.error) {
        alertActions.handleError(dispatch, response.error);
        return;
      }
      history.push(`/resources?page=${currentPage}&perPage=${currentPerPage}`)
    })
  }, [currentPage, currentPerPage])

  const handlePageChange = (event, value) => {
    if(value*currentPerPage > resourceStore.totalCount) return;
    setCurrentPage(value);
  }

  return (
    <Container>
      <PageTitle text="원천데이터 목록" />
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">데이터명</TableCell>
              <TableCell align="center">데이터 타입</TableCell>
              <TableCell align="center">상태</TableCell>
              <TableCell align="center">데이터 수정일</TableCell>
              <TableCell align="center">데이터 생성일</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            { loading &&
              <TableLodingProgress colSpan={9}/>
            }
            { !loading && resourceStore.index && Array.isArray(resourceStore.index) && resourceStore.index.length <= 0 &&
              <TableEmptyRow colSpan={9} text={"등록된 API가 없습니다. 신규 API를 추가해주세요."}/>
            }
            { !loading && resourceStore.index && Array.isArray(resourceStore.index) && resourceStore.index.map(metaId => {
              const meta = resourceStore.dict[metaId];
                return (
                  <TableRow key={`apis-index-table-${meta.id}`}>
                    <TableCell align="center">{meta.id}</TableCell>
                    <TableCell align="center">{meta.title}</TableCell>
                    <TableCell align="center">{meta.dataType}</TableCell>
                    <TableCell align="center">{meta.status}</TableCell>
                    <TableCell align="center">{moment(meta.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                    <TableCell align="center">{moment(meta.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                    <TableCell>
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
          count={parseInt(resourceStore.totalCount/resourceStore.perPage) + (((resourceStore.totalCount%resourceStore.perPage) === 0) ? 0 : 1 )}  
          showFirstButton 
          showLastButton 
          variant="outlined" 
          shape="rounded" 
          size="large" 
          page={Number(currentPage)} 
          onChange={handlePageChange}/>
      </Box>
    </Container>
  )
}