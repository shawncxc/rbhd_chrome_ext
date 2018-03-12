import React from "react";
import HighStock from "react-highcharts/ReactHighstock";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import ContentLoader from "react-content-loader";
import Stars from "material-ui-icons/Stars";
import ThumbUp from "material-ui-icons/ThumbUp";
import ThumbDown from "material-ui-icons/ThumbDown";
import { highChartsStockConfig } from "../highChartsStockConfig";

HighStock.Highcharts.setOptions(highChartsStockConfig);

const btnRowStyle = {
	textAlign: "center",
};

const normalBtnStyle = {
	color: "#1fcc9a",
	marginTop: 10,
	marginBottom: 10,
	fontSize: 10,
};

const highlightBtnStyle = {
	marginTop: 10,
	marginBottom: 10,
	fontSize: 10,
	backgroundColor: "#1fcc9a",
};

const chipBaseStyle = {
	margin: 10,
	position: "absolute",
	zIndex: 10,
};

const ratingChipStyle = Object.assign({}, chipBaseStyle, { marginTop: 50 });

export default class StockChart extends React.Component {
	constructor(props) {
		super(props);

		this.setConfig = this.setConfig.bind(this);
		this.handleSpanChange = this.handleSpanChange.bind(this);
		this.renderRating = this.renderRating.bind(this);

		this.state = {
			span: "day",
		};
	}

	handleSpanChange(span) {
		this.setState({ span: span }, () => {
			this.props.setDetailQuoteSpan(span);
		});
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

	renderRating() {
		if (!this.props.rating) {
			return "";
		}

		let rate = this.props.rating;
		let totalRatings = rate.num_buy_ratings + rate.num_sell_ratings + rate.num_hold_ratings;
		if (rate.num_buy_ratings >= rate.num_sell_ratings) {
			let buyRate = rate.num_buy_ratings / totalRatings * 100;
			return (
				<Chip avatar={ <Avatar><ThumbUp /></Avatar> } label={ `${ buyRate.toFixed(0) }%` } style={ ratingChipStyle } />
			);
		}
		if (rate.num_buy_ratings < rate.num_sell_ratings) {
			let sellRate = rate.num_sell_ratings / totalRatings;
			return (
				<Chip avatar={ <Avatar><ThumbDown /></Avatar> } label={ `${ sellRate.toFixed(0) }%` } style={ ratingChipStyle } />
			);
		}
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

		if (!this.props.data || !this.props.data.historicals || !this.props.data.historicals.length) {
			return (
				<Grid container spacing={0}>
					{ StockPlaceholder }
				</Grid>
			);
		}

		return (
			<Grid container spacing={0}>
				<Chip avatar={ <Avatar><Stars /></Avatar> } label={ this.props.popularity } style={ chipBaseStyle } />
				{ this.renderRating() }
				<HighStock config={ this.setConfig(this.props.data) } />
				<Grid item xs={3} style={ btnRowStyle }>
					<Button size="small" style={ this.state.span === "day" ? highlightBtnStyle : normalBtnStyle } onClick={ () => { this.handleSpanChange("day"); } }>day</Button>
				</Grid>
				<Grid item xs={3} style={ btnRowStyle }>
					<Button size="small" style={ this.state.span === "week" ? highlightBtnStyle : normalBtnStyle } onClick={ () => { this.handleSpanChange("week"); } }>week</Button>
				</Grid>
				<Grid item xs={3} style={ btnRowStyle }>
					<Button size="small" style={ this.state.span === "year" ? highlightBtnStyle : normalBtnStyle } onClick={ () => { this.handleSpanChange("year"); } }>year</Button>
				</Grid>
				<Grid item xs={3} style={ btnRowStyle }>
					<Button size="small" style={ this.state.span === "5year" ? highlightBtnStyle : normalBtnStyle } onClick={ () => { this.handleSpanChange("5year"); } }>5 year</Button>
				</Grid>
			</Grid>
		);
	}
}