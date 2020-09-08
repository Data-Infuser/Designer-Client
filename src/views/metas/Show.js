import React from 'react';
import { Container, Box, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table, Button, Input, Checkbox } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PageTitle, SubTitle } from 'components/typos/Title';
import BorderedTable from 'components/tables/BorderedTable';

export function MetaShow(props) {
  const { id } = useParams();
  const metas = useSelector(state => state.metas.items);
  const meta = metas.find(el => el.id == id)
  const history = useHistory();

  const handleChange = (e) => {

  }

  const onButtonClick = (e) => {
    history.push({ pathname: `/metas/${meta.id}/service`, state: {meta: meta}})
  }

  return (
    <Container>
      <PageTitle text="데이터셋 Meta" />
      
      {meta &&
        <Box>
          <Box>
            <Box textAlign="left">
              <SubTitle text="데이터 예시" smallText="상위 5건의 원본 데이터를 출력합니다." />
            </Box>
            <BorderedTable
              container={Paper}
              size="small"
              headers={['BIZRNO', 'CORP_NM', 'RPPR_NM', 'ADDR', 'TELNO', 'RMK_TXT']}
              rows={JSON.parse(meta.samples).items} />
          </Box>
          <Box>
            <Box textAlign="left">
              <h3>데이터셋 Meta 정보</h3>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">원본 컬럼명</TableCell>
                    <TableCell align="center">활용자 제공 컬럼명</TableCell>
                    <TableCell align="center">컬럼 타입</TableCell>
                    <TableCell align="center">최대 길이</TableCell>
                    <TableCell align="center">날짜 형식</TableCell>
                    <TableCell align="center">빈값 허용</TableCell>
                    <TableCell align="center">검색 설정</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {meta.columns.map(row => {
                    return(
                      <TableRow key={`meta-sample-meta-row-${row.id}`}>
                        <TableCell align="center">{row.originalColumnName}</TableCell>
                        <TableCell align="center">
                          <Input id={`meta-${row.id}-input-columnName`} value={row.columnName} onChange={handleChange}/>
                        </TableCell>
                        <TableCell align="center">
                          <Input id={`meta-${row.id}-input-type`} value={row.type} onChange={handleChange}/>
                        </TableCell>
                        <TableCell align="center">
                          <Input id={`meta-${row.id}-input-length`} value={row.length} onChange={handleChange}/>
                        </TableCell>
                        <TableCell align="center">
                          <Input id={`meta-${row.id}-input-format`} value={row.format} onChange={handleChange} disabled={row.type !== 'date'}/>
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox id={`meta-${row.id}-input-nullable`} checked={row.nullable} onChange={handleChange} color="primary"/>
                        </TableCell>
                        <TableCell align="center">검색조건</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box mt={4} textAlign="right">
            <Button variant="contained" color="primary" onClick={onButtonClick}>
              저장
            </Button>
          </Box>
        </Box>
      }
      
    </Container>
  )
}