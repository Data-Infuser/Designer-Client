import React from 'react';
import { Box } from '@material-ui/core';
import { Route } from 'react-router-dom';


export function UserRoute(props) {
  return (
    <Box>
      <Route exact path={props.match.path} component={Home} />
      {/* <Switch>
        <Route path={`${props.match.path}/:id/operation/new`} component={OperationNew}/>
        <Route path={`${props.match.path}/:id`} component={MetaShow}/>
      </Switch> */}
    </Box>
  )
}