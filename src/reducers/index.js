import { combineReducers } from 'redux';

import { users } from './userReducer';
import { alerts } from './alertReducer';
import { apis } from './apiReducer';

const rootReducer = combineReducers({
  users,
  alerts,
  apis
});

export default rootReducer;