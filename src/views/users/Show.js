import React from 'react';
import { Container, Box } from '@material-ui/core';
import { PageTitle } from '../../components/typos/Title';

export function UserShow(props) {
  return (
    <Container>
      <PageTitle text={`담당자 상세보기`} align="left"/>
      <Box>
        content
      </Box>
    </Container>
  )
}