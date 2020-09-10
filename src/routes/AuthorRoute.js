import React from 'react';
import { Route } from 'react-router-dom';
import { ForbiddenPage } from '../views/errors/ForbiddenPage';

export function AuthorRoute({ component: Component, roles, ...rest }) {
  const role = "admin";
  return (
    <Route
      {...rest}
      render={ routeProps => {
        if(!roles.includes(role)) {
          return <ForbiddenPage/>
        }
        if(Component) {
          return <Component component={Component} {...routeProps}/>
        }
      }}
    />
  )
}