import { combineReducers } from 'redux';

import { users } from './userReducer';
import { alerts } from './alertReducer';
import { apis } from './apiReducer';
import { metas } from './metaReducer';
import { operations } from './operationReducer';
import { resources } from './resourceReducer';

const rootReducer = combineReducers({
  users,
  alerts,
  apis,
  metas,
  operations,
  resources
});

export default rootReducer;