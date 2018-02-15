import React from "react";

export default class AccountSummary extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<p>Equity: { this.props.portfolio.equity }</p>
				<p>After Hour Equity: { this.props.portfolio.extended_hours_equity }</p>
			</div>
		);
	}
}