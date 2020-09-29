import React from 'react';
import { MetaSchemaTitle } from './MetaSchemaTitle';
import logoImg from 'assets/imgs/logos/api_spec.png';

export function MetaDocs(props) {
  return (
    <div>
      <MetaSchemaTitle img={logoImg} title='활용 명세서' />
    </div>
  )
}