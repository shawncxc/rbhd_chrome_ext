import axios from "axios";
import endpoint from "../constant/endpoint";

/*

account: ,
instrument: ,
symbol: ,
type: ,
time_in_force: ,
trigger: ,
price: ,
stop_price: ,
quantity: ,
side: ,

*/

const marketBuyOrder = (account, instrument, symbol, timeInForce, quantity) => {
	return {
		account: account,
		instrument: instrument,
		symbol: symbol,
		type: "market",
		time_in_force: timeInForce,
		trigger: "immediate",
		quantity: quantity,
		side: "buy",
	}
};

const limitBuyOrder = (account, instrument, symbol, timeInForce, price, quantity) => {
	return {
		account: account,
		instrument: instrument,
		symbol: symbol,
		type: "limit",
		time_in_force: timeInForce,
		trigger: "immediate",
		price: price,
		quantity: quantity,
		side: "buy",
	}
};

const stopLossBuyOrder = (account, instrument, symbol, timeInForce, stopPrice, quantity) => {
	return {
		account: account,
		instrument: instrument,
		symbol: symbol,
		type: "market",
		time_in_force: timeInForce,
		trigger: "stop",
		stop_price: stopPrice,
		quantity: quantity,
		side: "buy",
	}
};

const stopLimitBuyOrder = (account, instrument, symbol, timeInForce, stopPrice, quantity) => {
	return {
		account: account,
		instrument: instrument,
		symbol: symbol,
		type: "limit",
		time_in_force: timeInForce,
		trigger: "stop",
		stop_price: stopPrice,
		quantity: quantity,
		side: "buy",
	}
};

const marketSellOrder = (account, instrument, symbol, timeInForce, quantity) => {
	return {
		account: account,
		instrument: instrument,
		symbol: symbol,
		type: "market",
		time_in_force: timeInForce,
		trigger: "immediate",
		quantity: quantity,
		side: "sell",
	}
};

const limitSellOrder = (account, instrument, symbol, timeInForce, price, quantity) => {
	return {
		account: account,
		instrument: instrument,
		symbol: symbol,
		type: "limit",
		time_in_force: timeInForce,
		trigger: "immediate",
		price: price,
		quantity: quantity,
		side: "sell",
	}
};

const stopLossSellOrder = (account, instrument, symbol, timeInForce, stopPrice, quantity) => {
	return {
		account: account,
		instrument: instrument,
		symbol: symbol,
		type: "market",
		time_in_force: timeInForce,
		trigger: "stop",
		stop_price: stopPrice,
		quantity: quantity,
		side: "sell",
	}
};

const stopLimitSellOrder = (account, instrument, symbol, timeInForce, price, stopPrice, quantity) => {
	return {
		account: account,
		instrument: instrument,
		symbol: symbol,
		type: "limit",
		time_in_force: timeInForce,
		trigger: "stop",
		price: price,
		stop_price: stopPrice,
		quantity: quantity,
		side: "sell",
	}
};

export const Order = {
	marketBuyOrder: marketBuyOrder,
	limitBuyOrder: limitBuyOrder,
	stopLossBuyOrder: stopLossBuyOrder,
	stopLimitBuyOrder: stopLimitBuyOrder,
	marketSellOrder: marketSellOrder,
	limitSellOrder: limitSellOrder,
	stopLossSellOrder: stopLossSellOrder,
	stopLimitSellOrder: stopLimitSellOrder,
};

export const placeOrder = (orderPayload, token) => {
	let url = endpoint.placeOrder;
	return (dispatch) => {
		axios({
			url: url,
			method: "post",
			headers: {
				Authorization: `Token ${token}`
			},
			data: orderPayload,
		})
		.then(() => {
			// dispatch({ type: ADD_WATCHLIST, payload: symbol });
		})
		.catch((err) => {
			console.error(err);
		});
	};
};