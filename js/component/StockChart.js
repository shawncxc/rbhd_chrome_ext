import React from "react";
import HighStock from "react-highcharts/ReactHighstock";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";

HighStock.Highcharts.setOptions({
	chart: {
		backgroundColor: "black",
	},
	title: {
		style: {
			color: "white",
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
	}

	componentWillReceiveProps(nextProps) {
		let quoteArr = nextProps.quote;
		if (quoteArr.join() === this.props.quote.join() && nextProps.span === this.props.span) {
			return;
		}

		nextProps.getQuote(quoteArr.join(), nextProps.interval, nextProps.span);
	}

	setConfig(data) {
		var historicals = data.historicals;
		var currentPrice = parseFloat(historicals[historicals.length - 1].close_price);
		var startPrice = data.span === "day" ? parseFloat(data.previous_close_price) : parseFloat(historicals[0].close_price);
		var currentPercent = (currentPrice / startPrice - 1) * 100;
		var color = data.open_price <= currentPrice ? "#1cee85" : "#ee1c1c";

		return {
			rangeSelector: { enabled: false },
			title: { text: data.symbol },
			subtitle: {
				text: `$${currentPrice.toFixed(2)}, ${currentPercent.toFixed(2)}%`,
				style: {
					color: color,
					font: "bold 15px Trebuchet MS, Verdana, sans-serif"
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
		if (!this.props.share || this.props.share.length === 0) {
			return <CircularProgress />;
		}

		return (
			<div>
				{
					this.props.share.map((data, i) => {
						return (
							<div key={ i }>
								<HighStock key={ "chart" + i } config={ this.setConfig(data) } />
								{
									/*<Button variant="raised" color="secondary" key={ "remove" + i } onClick={ () => { this.props.removeQuote(data.symbol); } }>REMOVE</Button>*/
								}
							</div>
						);
					})
				}
			</div>
		);
	}
}
