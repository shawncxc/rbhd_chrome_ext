import React from "react";
import HighStock from "react-highcharts/ReactHighstock";
import { CircularProgress } from "material-ui/Progress";
import Grid from "material-ui/Grid";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import List from "material-ui-icons/List";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { FormLabel, FormControl, FormControlLabel, } from "material-ui/Form";
import "../../css/StockDetail.css";

HighStock.Highcharts.setOptions({
	chart: {
		height: 300,
		width: 450,
	},
	title: {
		style: {
			color: "black",
			font: "bold 16px Trebuchet MS, Verdana, sans-serif"
		}
	},
	legend: {
		itemStyle: {
			font: "9pt Trebuchet MS, Verdana, sans-serif",
			color: "white"
		},
		itemHoverStyle:{
			color: "gray"
		}
	},
	yAxis: { 
		visible: false,
	},
	xAxis: {
		lineColor: "gray",
	},
});

export default class StockDetail extends React.Component {
	constructor(props) {
		super(props);

		this.goToWatchList = this.goToWatchList.bind(this);
		this.setConfig = this.setConfig.bind(this);
	}

	goToWatchList() {
		this.props.history.push(`/watchlist`);
	}

	setConfig(data) {
		var historicals = data.historicals;
		var currentPrice = parseFloat(historicals[historicals.length - 1].close_price);
		var startPrice = data.span === "day" ? parseFloat(data.previous_close_price) : parseFloat(historicals[0].close_price);
		var currentPercent = (currentPrice / startPrice - 1) * 100;
		var color = data.open_price <= currentPrice ? "#1fcc9a" : "#fc5038";

		return {
			rangeSelector: { enabled: false },
			subtitle: {
				text: `$${currentPrice.toFixed(2)}, ${currentPercent.toFixed(2)}%`,
				style: {
					color: color,
					font: "15px Trebuchet MS, Verdana, sans-serif"
				}
			},
			navigator: { enabled: false },
			series: [
				{
					name: data.symbol,
					data: historicals.map(
						ele => [
							(new Date(ele.begins_at).getTime()) - 6 * 3600 * 1000,
							parseFloat(ele.close_price)
						]
					),
					color: color,
				}
			],
			scrollbar: {
				enabled: false
			},
		};
	}

	render() {
		if (!this.props.data || !this.props.data.historicals || !this.props.data.historicals.length) {
			return (
				<Grid item xs={12} className="stock-spinner">
					<CircularProgress />
				</Grid>
			);
		}

		let positionDiv = "";
		if (this.props.poslist.indexOf(this.props.data.symbol) !== -1) {
			let currentInstrument = this.props.data.instrument;
			let currentPosition = this.props.positions.filter(pos => pos.instrument === currentInstrument)[0];
			let quantity = parseInt(currentPosition.quantity);
			let avgPrice = parseFloat(currentPosition.average_buy_price);
			let historicals = this.props.data.historicals;
			let lastPrice = historicals[historicals.length - 1].close_price || this.props.data.previous_close_price;
			let equityValue = quantity * parseFloat(lastPrice);
			positionDiv = (
				<Paper elevation={2} className="position-container">
					<Grid item xs={12}>
						<Typography variant="headline" component="h3">Your Position</Typography>
					</Grid>
					<Divider />
					<Grid item xs={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">SHARES</FormLabel>
							<Typography variant="body1" color="inherit">{ quantity }</Typography>
						</FormControl>
						<FormControl component="fieldset">
							<FormLabel component="legend">EQUITY VALUE</FormLabel>
							<Typography variant="body1" color="inherit">{ equityValue }</Typography>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl component="fieldset">
							<FormLabel component="legend">AVG COST</FormLabel>
							<Typography variant="body1" color="inherit">{ avgPrice }</Typography>
						</FormControl>
					</Grid>
				</Paper>
			);
		}

		return (
			<Grid item xs={12}>
				<AppBar color="primary" position="sticky">
					<Toolbar>
						<IconButton color="inherit">
							<List onClick={ this.goToWatchList } />
						</IconButton>
						<Typography variant="title" color="inherit">
							{ this.props.match.params.symbol }
						</Typography>
					</Toolbar>
				</AppBar>
				<HighStock config={ this.setConfig(this.props.data) } />
				{ positionDiv }
			</Grid>
		);
	}
}