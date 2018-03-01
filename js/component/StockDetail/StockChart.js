import React from "react";
import HighStock from "react-highcharts/ReactHighstock";
import { CircularProgress } from "material-ui/Progress";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";

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

export default class StockChart extends React.Component {
	constructor(props) {
		super(props);

		this.setConfig = this.setConfig.bind(this);
		this.handleSpanChange = this.handleSpanChange.bind(this);

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

	render() {
		if (!this.props.data || !this.props.data.historicals || !this.props.data.historicals.length) {
			return (
				<Grid item xs={12} className="stock-spinner">
					<CircularProgress />
				</Grid>
			);
		}

		return (
			<Grid container spacing={0}>
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