import axios from "axios";
import endpoint from "../constant/endpoint";

export const GET_PORTFOILO = "GET_PORTFOILO";
export const getPortfolio = (token) => {
	return (dispatch) => {
		let url = endpoint.getAccount;
		axios({
			url: url,
			method: "get",
			headers: {
				Authorization: `Token ${token}`
			},
		})
		.then((res) => {
			let portfolioUrl = res.data.results[0].portfolio || "";
			
			axios({
				url: portfolioUrl,
				method: "get",
				headers: {
					Authorization: `Token ${token}`
				},
			})
			.then((rres) => {
				let portfolio = rres.data;
				dispatch({ type: GET_PORTFOILO, payload: portfolio });
			});
		})
		.catch((err) => {
			console.error(err);
		});
	};
};

let getInstrument = (instrumentUrl, token) => {
	return axios.get(instrumentUrl);
};
export const GET_WATCHLIST = "GET_WATCHLIST";
export const getWatchList = (token) => {
	return (dispatch) => {
		let url = endpoint.getWatchList;
		axios({
			url: url,
			method: "get",
			headers: {
				Authorization: `Token ${token}`
			},
		})
		.then((res) => {
			let list = res.data.results || [];
			let instruments = list.map(ele => ele.instrument);

			axios
			.all(instruments.map(ins => getInstrument(ins)))
			.then((...res) => {
				let symbols = res[0].map(ele => ele.data.symbol);
				dispatch({ type: GET_WATCHLIST, payload: symbols });
			});
		})
		.catch((err) => {
			console.error(err);
		});
	};
};

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

// it also has the capability to bulk add
// but right now only use it for single add
export const ADD_WATCHLIST = "ADD_WATCHLIST";
export const addWatchList = (symbol, token) => {
	let url = endpoint.addWatchList;
	return (dispatch) => {
		axios({
			url: url,
			method: "post",
			headers: {
				Authorization: `Token ${token}`
			},
			data: {
				symbols: symbol,
			},
		})
		.then(() => {
			dispatch({ type: ADD_WATCHLIST, payload: symbol });
		})
		.catch((err) => {
			console.error(err);
		});
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
