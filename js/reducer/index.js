import { combineReducers } from "redux";
import ListReducer from "./list.reducer.js";
import LoginReducer from "./login.reducer.js";

const rootReducer  = combineReducers({
	list: ListReducer,
	login: LoginReducer,
});

export default rootReducer;
