import { createStore, combineReducers } from 'redux';
import { CollApsedReducer } from './reducers/CollapsedReducer';
import { LoadingReducer } from './reducers/LoadingReducer'

// 进行合并reducer
const reducer = combineReducers({
    CollApsedReducer,
    LoadingReducer
});
const store = createStore(reducer);

export default store;