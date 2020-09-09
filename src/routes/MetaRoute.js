import React from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { MetaShow } from '../views/metas/Show';
import { OperationNew } from 'views/operations/New';

export function MetaRoute(props) {
  return (
    <Box>
      <Switch>
        <Route path={`${props.match.path}/:id/operation/new`} component={OperationNew}/>
        <Route path={`${props.match.path}/:id`} component={MetaShow}/>
      </Switch>
    </Box>
  )
}