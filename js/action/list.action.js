import axios from "axios";
import endpoint from "../constant/endpoint";

export const GET_QUOTE = "GET_QUOTE";
export const getQuote = (symbols, interval="5minute", span="day") => {
	return (dispatch) => {
		if (symbols === "") {
			dispatch({ type: GET_QUOTE, payload: [] });
		} else {
			let url = endpoint.getQuote(symbols, interval, span);
			axios
			.get(url)
			.then((res) => {
				let data = res.data.results || [];
				dispatch({ type: GET_QUOTE, payload: data });
			})
			.catch((err) => {
				console.error(err);
			});
		}
	};
};

export const ADD_QUOTE = "ADD_QUOTE";
export const addQuote = (symbol) => {
	return (dispatch) => {
		dispatch({ type: ADD_QUOTE, payload: symbol });
	};
};

export const REMOVE_QUOTE = "REMOVE_QUOTE";
export const removeQuote = (symbol) => {
	return (dispatch) => {
		dispatch({ type: REMOVE_QUOTE, payload: symbol });
	};
};

export const SET_QUOTE_SPAN = "SET_QUOTE_SPAN";
export const setQuoteSpan = (span) => {
	return (dispatch) => {
		dispatch({ type: SET_QUOTE_SPAN, payload: span });
	};
};