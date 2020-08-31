import { combineReducers } from 'redux';

import { users } from './userReducer';

const rootReducer = combineReducers({
  users
});

export default rootReducer;