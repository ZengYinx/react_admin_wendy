import { createStore, combineReducers } from 'redux';
import { CollApsedReducer } from './reducers/CollapsedReducer';
import { LoadingReducer } from './reducers/LoadingReducer'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'wendy',
  storage,
  blacklist: ['LoadingReducer'] // navigation will not be persisted不进行管理存储的reducer
}
// 进行合并reducer
const reducer = combineReducers({
    CollApsedReducer,
    LoadingReducer
});
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {
    store,
    persistor
};