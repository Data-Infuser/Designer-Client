import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../views/Home';
import { Layout } from '../views/Layout';
import { ApisRoute } from './ApiRoute';
import { MetaRoute } from './MetaRoute';

export function DashboardRoute(props) {
  return (
    <Layout>
      <Route exact path={props.match.path} component={Home} />
      <Switch>
        <Route path={`/apis`} component={ApisRoute}/>
        <Route path={`/metas`} component={MetaRoute}/>
      </Switch>
    </Layout>
  )
}