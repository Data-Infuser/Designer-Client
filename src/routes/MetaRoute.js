import React from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { MetaShow } from '../views/metas/Show';
import { OperationShow } from '../views/metas/OperationShow';

export function MetaRoute(props) {
  return (
    <Box>
      <Switch>
        <Route path={`${props.match.path}/:id/service`} component={OperationShow}/>
        <Route path={`${props.match.path}/:id`} component={MetaShow}/>
      </Switch>
    </Box>
  )
}