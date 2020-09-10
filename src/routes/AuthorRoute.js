import React from 'react';
import { Route } from 'react-router-dom';
import { ForbiddenPage } from '../views/errors/ForbiddenPage';

export function AuthorRoute(props) {
  const roles = props.roles;
  const role = "admin";
  return (
    <Route
      render={ props => {
        if(!roles.includes(role)) {
          return <ForbiddenPage/>
        }
        if(props.component) {
          return <props.component {...props} />
        }
      }}
    />
  )
}