import axios from "axios";
import endpoint from "../constant/endpoint";

export const GET_DETAIL_QUOTE = "GET_DETAIL_QUOTE";
export const getDetailQuote = (symbol, interval="5minute", span="day") => {
	return (dispatch) => {
		let url = endpoint.getQuote(symbol, interval, span);
		axios
		.get(url)
		.then((res) => {
			let data = res.data.results[0] || {};
			dispatch({ type: GET_DETAIL_QUOTE, payload: data });
		})
		.catch((err) => {
			console.error(err);
		});
	};
};

export const GET_NEWS = "GET_NEWS";
export const getNews = (symbol, url=false) => {
	return (dispatch) => {
		url = endpoint.getNews(symbol, url);
		axios
		.get(url)
		.then((res) => {
			let data = res.data || {};
			dispatch({ type: GET_NEWS, payload: data });
		})
		.catch((err) => {
			console.error(err);
		});
	};
};

export const GET_FUNDAMENTAL = "GET_FUNDAMENTAL";
export const getFundamental = (symbol) => {
	return (dispatch) => {
		let url = endpoint.getFundamental(symbol);
		axios
		.get(url)
		.then((res) => {
			let data = res.data || {};
			dispatch({ type: GET_FUNDAMENTAL, payload: data });
		})
		.catch((err) => {
			console.error(err);
		});
	};
};

export const SET_DETAIL_QUOTE_SPAN = "SET_DETAIL_QUOTE_SPAN";
export const setDetailQuoteSpan = (span) => {
	return (dispatch) => {
		dispatch({ type: SET_DETAIL_QUOTE_SPAN, payload: span });
	};
};