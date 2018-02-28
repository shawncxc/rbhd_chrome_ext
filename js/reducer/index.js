import { combineReducers } from "redux";
import ListReducer from "./list.reducer.js";
import LoginReducer from "./login.reducer.js";
import DetailReducer from "./detail.reducer.js";

const rootReducer  = combineReducers({
	list: ListReducer,
	login: LoginReducer,
	detail: DetailReducer,
});

export default rootReducer;
