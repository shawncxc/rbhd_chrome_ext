import React from "react";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { Order } from "../../util/order";

/*let url2id = (url) => {
	let arr = url.split("/");
	return arr[arr.length - 2];
};*/

export default class BuySell extends React.Component {
	constructor(props) {
		super(props);

		this.placeSell = this.placeSell.bind(this);
		this.placeBuy = this.placeBuy.bind(this);
	}

	placeBuy() {

	}

	placeSell() {
		console.log(this.props);
		
		let account = this.props.portfolio.account;
		let instrument = this.props.data.instrument;
		let symbol = this.props.data.symbol;
		let timeInForce = "gfd"; // hardcode
		let price = this.props.data.previous_close_price;
		// let stopPrice = "";
		let quantity = 1; // hardcode
		let orderType = "market"; // hardcode
		
		console.log(account, instrument, symbol, timeInForce, quantity);
		// account, instrument, symbol, timeInForce, quantity
		let orderPayload = Order.marketSellOrder(account, instrument, symbol, timeInForce, quantity);
		this.props.placeOrder(orderPayload, this.props.token);
	}

	render() {
		return (
			<Grid container spacing={16} style={{ padding: 10 }}>
				<Grid item xs={6}>
					<Button variant="raised" color="primary" onClick={ this.placeBuy } fullWidth>Buy</Button>
				</Grid>
				<Grid item xs={6}>
					<Button variant="raised" color="primary" onClick={ this.placeSell } fullWidth>Sell</Button>
				</Grid>
			</Grid>
		);
	}
}