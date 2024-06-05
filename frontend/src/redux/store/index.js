// src/redux/store/index.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import watchlistReducer from '../reducers/watchlistReducer';

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
