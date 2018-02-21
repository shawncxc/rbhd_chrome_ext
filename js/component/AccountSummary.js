import React from "react";
import Grid from "material-ui/Grid";

export default class AccountSummary extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Grid item xs={12}>Equity: { this.props.portfolio.equity }</Grid>
				<Grid item xs={12}>After Hour Equity: { this.props.portfolio.extended_hours_equity }</Grid>
			</div>
		);
	}
}