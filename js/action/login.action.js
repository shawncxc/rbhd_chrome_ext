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
			// Save it using the Chrome extension storage API.
			chrome.storage.sync.set({ username: username, password: password }, function() {
				// Notify that we saved.
				// message('Settings saved');
				console.log("credentials saved");
			});
			dispatch({ type: LOGIN, payload: token });
		})
		.catch((err) => {
			console.error(err);
		});
	};
};
