import React from 'react';
import { Box } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { ResourceIndex } from '../views/resources/Index';

export function ResourceRoute(props) {
  return (
    <Box>
      <Route exact path={props.match.path} component={ResourceIndex} />
    </Box>
  )
}