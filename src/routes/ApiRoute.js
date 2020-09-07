import React from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { ApiIndex } from '../views/apis/Index';
import { New } from '../views/apis/New';
import { Show } from '../views/apis/Show';

export function ApisRoute(props) {
  return (
    <Box>
      <Route exact path={props.match.path} component={ApiIndex} />
      <Switch>
        <Route path={`${props.match.path}/new`} component={New}/>
        <Route path={`${props.match.path}/:id`} component={Show}/>
      </Switch>
    </Box>
  )
}