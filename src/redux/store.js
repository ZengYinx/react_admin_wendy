import { createStore, combineReducers } from 'redux';
import { CollApsedReducer } from './reducers/CollapsedReducer';

// 进行合并reducer
const reducer = combineReducers({
    CollApsedReducer
});
const store = createStore(reducer);

export default store;