import { combineReducers } from 'redux';
import ListReducer from './list.reducer.js';

const rootReducer  = combineReducers({
	list: ListReducer,
});

export default rootReducer;
