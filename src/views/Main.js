import React from 'react';
import { Typography } from '@material-ui/core';
import { Layout } from './Layout';
import { Route, Switch } from 'react-router-dom';
import { ApiIndex } from './apis/Index';
import { New } from './apis/New';
import { ApisRoute } from './apis/Routes';
import { MetasRoute } from './metas/Routes';

export function Main(props) {

  return (
    <Layout>
      <Route exact path={props.match.path} component={Home} />
      <Switch>
        <Route path={`/apis`} component={ApisRoute}/>
        <Route path={`/metas`} component={MetasRoute}/>
      </Switch>
    </Layout>
  )

}

function Home(){
  return (
    <Typography paragraph>
      Home      
    </Typography>
  )
}