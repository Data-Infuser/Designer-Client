import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../views/Home';
import { Layout } from '../views/Layout';
import { ApisRoute } from './ApiRoute';
import { MetaRoute } from './MetaRoute';
import { Box } from '@material-ui/core';
import { AuthorRoute } from './AuthorRoute';

export function DashboardRoute(props) {
  return (
    <Layout>
      <Route exact path={props.match.path} component={Home} />
      <Switch>
        <AuthorRoute path={`/apis`} component={ApisRoute} roles={["admin", "user"]} />
        <AuthorRoute path={`/metas`} component={MetaRoute} roles={["admin", "user"]}/>
      </Switch>
    </Layout>
  )
}