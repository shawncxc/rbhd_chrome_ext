import axios from "axios";
import endpoint from "../constant/endpoint";

export const GET_QUOTE = "GET_QUOTE";

export const getQuote = (symbols, interval="5minute", span="day", bounds="trading") => {
	return (dispatch) => {
		let url = endpoint.getQuote(symbols, interval, span, bounds);
		axios
		.get(url)
		.then((res) => {
			let data = res.data.results || [];
			dispatch({ type: GET_QUOTE, payload: data });
		})
		.catch((err) => {
			console.error(err);
		});
	};
};