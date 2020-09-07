import React from 'react';
import { Container, Box, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table, Button, Input, Checkbox } from '@material-ui/core';
import { history } from '../../utils/history';

export function MetaShow() {
  const sampleData = [
    ["5028304693", "대구상동우체국", "이영숙", "대구광역시 수성구 수성로 82 (상동)", "053-766-0031", "02"],
    ["5148302626", "대구상인1동우체국", "황재동", "대구광역시 달서구 상인서로10길 6-4 (상인동)", "053-635-0014", "02"],
    ["5148302645", "대구상인동우체국", "최윤희", "대구광역시 달서구 송현로 47 (상인동)", "053-633-0013", "02"],
    ["5038303299", "대구서문우체국", "서경숙", "대구광역시 서구 큰장로 101 (내당동)", "053-571-0418", "02"],
    ["5048303797", "대구서변동우체국", "김태룡", "대구광역시 북구 호국로43길 17 (서변동)", "053-951-9930", "02"]
  ];
  
  const sampleMetas = [
    {
      id: 1,
      originalColumnName: "BIZRNO",
      columnName: "BIZRNO",
      type: "int",
      length: null,
      format: null,
      nullable: false,
      searchParams: []
    },
    {
      id: 2,
      originalColumnName: "CORP_NM",
      columnName: "CORP_NM",
      type: "varchar",
      length: null,
      format: null,
      nullable: false,
      searchParams: []
    },
    {
      id: 3,
      originalColumnName: "RPPR_NM",
      columnName: "RPPR_NM",
      type: "varchar",
      length: null,
      format: null,
      nullable: false,
      searchParams: []
    },
    {
      id: 4,
      originalColumnName: "ADDR",
      columnName: "ADDR",
      type: "text",
      length: null,
      format: null,
      nullable: false,
      searchParams: []
    },
    {
      id: 5,
      originalColumnName: "TELNO",
      columnName: "TELNO",
      type: "varchar",
      length: null,
      format: null,
      nullable: false,
      searchParams: []
    },
    {
      id: 6,
      originalColumnName: "RMK_TXT",
      columnName: "RMK_TXT",
      type: "int",
      length: null,
      format: null,
      nullable: false,
      searchParams: []
    }
  ]

  const handleChange = (e) => {

  }

  const onButtonClick = (e) => {
    history.push("/metas/1/service")
  }

  return (
    <Container>
      <Box textAlign="left">
        <h2>데이터셋 Meta</h2>
      </Box>
      <Box p={4}>
        <Box textAlign="left">
          <h3>Sample Data 상위 5건</h3>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>BIZRNO</TableCell>
                <TableCell>CORP_NM</TableCell>
                <TableCell>RPPR_NM</TableCell>
                <TableCell>ADDR</TableCell>
                <TableCell>TELNO</TableCell>
                <TableCell>RMK_TXT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleData.map(row => {
                return (
                  <TableRow key={`meta-sample-row-${row[0]}`}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                    <TableCell>{row[3]}</TableCell>
                    <TableCell>{row[4]}</TableCell>
                    <TableCell>{row[5]}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Box textAlign="left">
          <h3>데이터셋 Meta 정보</h3>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell textAlign="center">원본 컬럼명</TableCell>
                <TableCell textAlign="center">활용자 제공 컬럼명</TableCell>
                <TableCell textAlign="center">컬럼 타입</TableCell>
                <TableCell textAlign="center">최대 길이</TableCell>
                <TableCell textAlign="center">날짜 형식</TableCell>
                <TableCell textAlign="center">빈값 허용</TableCell>
                <TableCell textAlign="center">검색 설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleMetas.map(row => {
                return(
                  <TableRow key={`meta-sample-meta-row-${row.id}`}>
                    <TableCell textAlign="center">{row.originalColumnName}</TableCell>
                    <TableCell textAlign="center">
                      <Input id={`meta-${row.id}-input-columnName`} value={row.columnName} onChange={handleChange}/>
                    </TableCell>
                    <TableCell textAlign="center">
                      <Input id={`meta-${row.id}-input-type`} value={row.type} onChange={handleChange}/>
                    </TableCell>
                    <TableCell textAlign="center">
                      <Input id={`meta-${row.id}-input-length`} value={row.length} onChange={handleChange}/>
                    </TableCell>
                    <TableCell textAlign="center">
                      <Input id={`meta-${row.id}-input-format`} value={row.format} onChange={handleChange} disabled={row.type !== 'date'}/>
                    </TableCell>
                    <TableCell textAlign="center">
                      <Checkbox id={`meta-${row.id}-input-nullable`} checked={row.nullable} onChange={handleChange} color="primary"/>
                    </TableCell>
                    <TableCell textAlign="center">검색조건</TableCell>
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
    </Container>
  )
}