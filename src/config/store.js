import { AsyncStorage } from 'react';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from '../reducers/index.js';

const persistConfig = {
  key:'authType',
  storage: storage,
  whitelist:['authType']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer, {}, applyMiddleware());
  let persistor = persistStore(store)
  return { store, persistor }
}
