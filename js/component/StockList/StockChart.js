import React from "react";
import HighStock from "react-highcharts/ReactHighstock";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import Visibility from "material-ui-icons/Visibility";
import Timeline from "material-ui-icons/Timeline";
import HighlightOff from "material-ui-icons/HighlightOff";
import ContentLoader from "react-content-loader"
import "../../../css/StockChart.css";

HighStock.Highcharts.setOptions({
	chart: {
		height: 200,
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

export default class StockChart extends React.Component {
	constructor(props) {
		super(props);

		this.setConfig = this.setConfig.bind(this);
		this.goToStockDetail = this.goToStockDetail.bind(this);
		this.removeWatchList = this.removeWatchList.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		let quoteArr = nextProps.quote;
		let positionArr = nextProps.poslist;
		if (quoteArr.join() === this.props.quote.join() &&
			positionArr.join() === this.props.poslist.join() &&
			nextProps.span === this.props.span) {
			return;
		}

		nextProps.getQuote(quoteArr.join(), nextProps.interval, nextProps.span);
		nextProps.getQuotePos(positionArr.join(), nextProps.interval, nextProps.span);
	}

	setConfig(data) {
		var historicals = data.historicals;
		var currentPrice = parseFloat(historicals[historicals.length - 1].close_price);
		var startPrice = data.span === "day" ? parseFloat(data.previous_close_price) : parseFloat(historicals[0].close_price);
		var currentPercent = (currentPrice / startPrice - 1) * 100;
		var color = data.open_price <= currentPrice ? "#1fcc9a" : "#fc5038";

		return {
			chart: {
				events: {
					click: () => {
						this.goToStockDetail(data.symbol);
					}
				},
			},
			rangeSelector: { enabled: false },
			title: {
				text: data.symbol,
			},
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

	goToStockDetail(symbol) {
		this.props.history.push(`/stock/${symbol}`);
	}

	removeWatchList(symbol, instrumentUrl) {
		let instrumentArr = instrumentUrl.split("/");
		let instrumentId = instrumentArr[instrumentArr.length - 2];
		this.props.removeWatchList(symbol, instrumentId, this.props.token);
	}

	render() {
		const StockPlaceholder = (
			<Grid item xs={12}>
				<ContentLoader
					height={300}
					width={450}
					speed={1}
					primaryColor={"#d1d1d1"}
					secondaryColor={"#e8e8e8"}
				>
					<rect x="175" y="10" rx="4" ry="4" width="100" height="20" /> 
					<rect x="25" y="50" rx="5" ry="5" width="400" height="250" />
				</ContentLoader>
			</Grid>
		);

		let StockPlaceholders = [];
		for (let i = 0; i < 10; i++) {
			StockPlaceholders.push(
				<Grid item xs={12} key={ i }>
					<ContentLoader
						height={300}
						width={450}
						speed={1}
						primaryColor={"#d1d1d1"}
						secondaryColor={"#e8e8e8"}
					>
						<rect x="175" y="10" rx="4" ry="4" width="100" height="20" /> 
						<rect x="25" y="50" rx="5" ry="5" width="400" height="250" />
					</ContentLoader>
				</Grid>
			);
		}

		return (
			<Grid container spacing={0}>
				{
					this.props.sharePos && this.props.sharePos.length > 0 ?
					<List component="nav">
						<Divider />
						<ListItem>
							<ListItemIcon><Timeline /></ListItemIcon>
							<ListItemText primary="Stocks" />
						</ListItem>
						<Divider />
					</List> : ""
				}
				{
					this.props.sharePos.map((data, i) => {
						return (
							<div key={ i }>
								<HighStock key={ "chart-" + i } config={ this.setConfig(data) } />
							</div>
						);
					})
				}
				<List component="nav">
					<Divider />
					<ListItem>
						<ListItemIcon><Visibility /></ListItemIcon>
						<ListItemText primary="Watchlist" />
					</ListItem>
					<Divider />
				</List>
				{
					this.props.share.length > 0 ?
					this.props.share.map((data, i) => {
						return (
							<div key={ i }>
								<IconButton className="remove-watchlist-btn" onClick={ () => { this.removeWatchList(data.symbol, data.instrument) } }><HighlightOff /></IconButton>
								<HighStock key={ "chart-" + i } config={ this.setConfig(data) } />
							</div>
						);
					})
					:
					StockPlaceholders
				}
			</Grid>
		);
	}
}
