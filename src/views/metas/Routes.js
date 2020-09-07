import React from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { MetaShow } from './Show';

export function MetasRoute(props) {
  return (
    <Box>
      <Switch>
        <Route path={`${props.match.path}/:id`} component={MetaShow}/>
      </Switch>
    </Box>
  )
}