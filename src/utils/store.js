import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import axiosMiddleware from 'redux-axios-middleware';
import axiosClient from './axiosHelper';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';

const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(
      axiosMiddleware(axiosClient),
      thunkMiddleware,
      loggerMiddleware
    )
  );
  let persistor = persistStore(store);

  return { store, persistor }
}

const storeObj = store();
export default storeObj;
