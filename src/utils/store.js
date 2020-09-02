import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import axiosMiddleware from 'redux-axios-middleware';
import axiosClient from './axiosHelper';

const loggerMiddleware = createLogger();

export default createStore(
  rootReducer,
  applyMiddleware(
    axiosMiddleware(axiosClient),
    thunkMiddleware,
    loggerMiddleware
  )
);
