import { combineReducers } from 'redux';

import { users } from './userReducer';
import { alerts } from './alertReducer';

const rootReducer = combineReducers({
  users,
  alerts
});

export default rootReducer;