import {
	LOGIN,
} from "../action/login.action";

const LoginReducer = (
	state = {
		token: "",
	},
	action
) => {
	switch(action.type) {
		case LOGIN:
			return Object.assign({}, state, { token: action.payload });
		default:
			return state;
	}
};

export default LoginReducer;