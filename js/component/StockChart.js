import React from "react";
import HighStock from "react-highcharts/ReactHighstock";
import HighChart from "react-highcharts";

export default class StockChart extends React.Component {
	constructor(props) {
		super(props);

		this.setConfig = this.setConfig.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		let quoteArr = nextProps.quote;
		if (quoteArr.join() === this.props.quote.join()) {
			return;
		}

		nextProps.getQuote(quoteArr.join());
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
			return "";
		}

		return (
			<div>
				{
					this.props.share.map((data, i) => {
						return (
							<div key={ i }>
								<HighStock key={ "chart" + i } config={ this.setConfig(data) } />
								<button key={ "remove" + i } onClick={ () => { this.props.removeQuote(data.symbol); } }>REMOVE</button>
							</div>
						);
					})
				}
			</div>
		);
	}
}
