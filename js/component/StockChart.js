import React from "react";
import HighStock from "react-highcharts/ReactHighstock";
import HighChart from "react-highcharts";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";

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
		return {
			rangeSelector: { enabled:false },
			title: { text: data.symbol },
			navigator: { enabled: false },
			series: [
				{
					name: data.symbol,
					data: data.historicals.map(ele => [new Date(ele.begins_at).getTime(), parseFloat(ele.close_price)])
				}
			],
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
								<Button variant="raised" color="secondary" key={ "remove" + i } onClick={ () => { this.props.removeQuote(data.symbol); } }>REMOVE</Button>
							</div>
						);
					})
				}
			</div>
		);
	}
}
