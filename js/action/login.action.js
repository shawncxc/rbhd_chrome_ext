import axios from "axios";
import endpoint from "../constant/endpoint";

export const LOGIN = "LOGIN";
export const login = (username, password) => {
	return (dispatch) => {
		let url = endpoint.login;
		axios({
			url: url,
			method: "post",
			data: {
				username: username,
				password: password,
			},
		})
		.then((res) => {
			let token = res.data.token || "";
			dispatch({ type: LOGIN, payload: token });
		})
		.catch((err) => {
			console.error(err);
		});
	};
};
