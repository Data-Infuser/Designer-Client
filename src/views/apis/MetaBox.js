import React from 'react';
import { Box } from '@material-ui/core';

export function MetaBox(props) {
  const meta = props.meta;
  return (
    <Box>
      {meta.id}
    </Box>
  )
}