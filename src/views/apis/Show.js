import React from 'react';
import { Button, Container } from '@material-ui/core'

export function Show() {
  return (
    <Container>
      <Button>
        파일 업로드
      </Button>
      <Button>
        파일 URL 등록
      </Button>
      <Button>
        DBMS
      </Button>
    </Container>
  )
}