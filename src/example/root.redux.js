import {count} from './cout.redux';
import {sub} from './sub.redux';
import { createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';
import thunk from 'redux-thunk';
import immutable from 'immutable'
let rootReducer = combineReducers({
	count,
	sub
});

export const store = createStore(
	rootReducer,
	immutable.Map(),
	applyMiddleware(thunk)
);