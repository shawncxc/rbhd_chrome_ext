import React from "react";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { Order } from "../../util/order";
import Drawer from "material-ui/Drawer";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";

export default class BuySell extends React.Component {
	constructor(props) {
		super(props);

		this.placeSell = this.placeSell.bind(this);
		this.placeBuy = this.placeBuy.bind(this);
		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.onSharesChange = this.onSharesChange.bind(this);
		this.onCloseDrawer = this.onCloseDrawer.bind(this);

		this.state = {
			buyDrawer: false,
			sellDrawer: false,
			shares: 0,
		};
	}

	toggleDrawer(drawerType, open) {
		this.setState({ [drawerType]: open });
	}

	onSharesChange(event) {
		this.setState({ shares: parseInt(event.target.value) });
	}

	onCloseDrawer() {
		this.setState({
			buyDrawer: false,
			sellDrawer: false,
			shares: 0,
		});
	}

	placeBuy() {
		let account = this.props.portfolio.account;
		let instrument = this.props.data.instrument;
		let symbol = this.props.data.symbol;
		let timeInForce = "gfd"; // hardcode
		let price = parseFloat(this.props.data.previous_close_price);
		// let stopPrice = "";
		let quantity = this.state.shares;
		let orderType = "market"; // hardcode
		
		// account, instrument, symbol, timeInForce, quantity
		let orderPayload = Order.marketBuyOrder(account, instrument, symbol, timeInForce, price, quantity);
		console.log("buy order:", orderPayload);
		this.props.placeOrder(orderPayload, this.props.token);
		this.onCloseDrawer();
	}

	placeSell() {
		let account = this.props.portfolio.account;
		let instrument = this.props.data.instrument;
		let symbol = this.props.data.symbol;
		let timeInForce = "gfd"; // hardcode
		// let price = parseFloat(this.props.data.previous_close_price);
		// let stopPrice = "";
		let quantity = this.state.shares;
		let orderType = "market"; // hardcode
		
		// account, instrument, symbol, timeInForce, quantity
		let orderPayload = Order.marketSellOrder(account, instrument, symbol, timeInForce, quantity);
		console.log("sell order:", orderPayload);
		this.props.placeOrder(orderPayload, this.props.token);
		this.onCloseDrawer();
	}

	render() {
		let currentPrice = 0;
		if (this.props.data.historicals && this.props.data.historicals.length) {
			let historicals = this.props.data.historicals;
			currentPrice = parseFloat(historicals[historicals.length - 1].close_price);
		}

		return (
			<Grid container spacing={16} style={{ padding: 10 }}>
				<Grid item xs={6}>
					<Button variant="raised" color="primary" onClick={ () => { this.toggleDrawer("buyDrawer", true) } } fullWidth>Buy</Button>
				</Grid>
				<Grid item xs={6}>
					<Button variant="raised" color="primary" onClick={ () => { this.toggleDrawer("sellDrawer", true) } } fullWidth>Sell</Button>
				</Grid>
				<Drawer anchor="bottom" open={ this.state.buyDrawer } onClose={ this.onCloseDrawer }>
					<TextField label="Shares" onChange={ this.onSharesChange } fullWidth />
					<Typography variant="body1" color="inherit" align="left">Price: { currentPrice }</Typography>
					<Typography variant="body1" color="inherit" align="left">Total: { currentPrice * (this.state.shares ? this.state.shares : 0 ) }</Typography>
					<Button variant="raised" color="primary" onClick={ this.placeBuy } fullWidth>Submit Buy</Button>
					<Button color="primary" onClick={ this.onCloseDrawer } fullWidth>Cancel</Button>
				</Drawer>
				<Drawer anchor="bottom" open={ this.state.sellDrawer } onClose={ this.onCloseDrawer }>
					<TextField label="Shares" onChange={ this.onSharesChange } fullWidth />
					<Typography variant="body1" color="inherit" align="left">Price: { currentPrice }</Typography>
					<Typography variant="body1" color="inherit" align="left">Total: { currentPrice * (this.state.shares ? this.state.shares : 0 ) }</Typography>
					<Button variant="raised" color="primary" onClick={ this.placeSell } fullWidth>Submit Sell</Button>
					<Button color="primary" onClick={ this.onCloseDrawer } fullWidth>Cancel</Button>
				</Drawer>
			</Grid>
		);
	}
}