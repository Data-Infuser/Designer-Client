import { combineReducers } from 'redux';

import { users } from './userReducer';
import { alerts } from './alertReducer';
import { apis } from './apiReducer';
import { metas } from './metaReducer';

const rootReducer = combineReducers({
  users,
  alerts,
  apis,
  metas
});

export default rootReducer;