import { combineReducers } from 'redux';

import { users } from './userReducer';
import { alerts } from './alertReducer';
import { apis } from './apiReducer';
import { metas } from './metaReducer';
import { operations } from './operationReducer';
import { resources } from './resourceReducer'; 
import { applications } from './applicationReducer';

const rootReducer = combineReducers({
  users,
  alerts,
  apis,
  metas,
  operations,
  resources,
  applications
});

export default rootReducer;