import React from 'react';
import { Box } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { UserIndex } from '../views/users/Index';


export function UserRoute(props) {
  return (
    <Box>
      <Route exact path={props.match.path} component={UserIndex} />
      {/* <Switch>
        <Route path={`${props.match.path}/:id/operation/new`} component={OperationNew}/>
        <Route path={`${props.match.path}/:id`} component={MetaShow}/>
      </Switch> */}
    </Box>
  )
}