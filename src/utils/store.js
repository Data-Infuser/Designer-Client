import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import axiosMiddleware from 'redux-axios-middleware';
import axiosClient from './axiosHelper';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

const migrations = {
  0: (state) => {
    return {
      ...state
    }
  },
  1: (state) => {
    return {
      ...state,
      users: {
        ...state.users,
        items: []
      }
    }
  },
  2: (state) => {
    return {
      ...state,
      users: {
        ...state.users,
        items: []
      }
    }
  },
  3: (state) => {
    return {
      ...state,
      apis: {
        ...state.apis,
        dict: {},
        index: []
      }
    }
  }
}
const persistConfig = {
  key: 'root',
  version: 3,
  storage,
  migrate: createMigrate(migrations, { debug: true })
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(
        axiosMiddleware(axiosClient),
        thunkMiddleware,
        loggerMiddleware
      ),
    ),
  );
  let persistor = persistStore(store);

  return { store, persistor }
}

const storeObj = store();
export default storeObj;
