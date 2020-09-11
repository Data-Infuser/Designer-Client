import React from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { UserIndex } from '../views/users/Index';
import { UserNew } from '../views/users/New';
import { UserShow } from '../views/users/Show';


export function UserRoute(props) {
  console.log(props.match.path)
  return (
    <Box>
      <Route exact path={props.match.path} component={UserIndex} />
      <Switch>
        <Route path={`${props.match.path}/new`} component={UserNew}/>
        <Route path={`${props.match.path}/:userId`} component={UserShow}/>
      </Switch>
    </Box>
  )
}