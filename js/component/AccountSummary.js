import React from "react";
import Grid from "material-ui/Grid";

export default class AccountSummary extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12}>Equity: { this.props.portfolio.equity }</Grid>
				<Grid item xs={12}>After Hour Equity: { this.props.portfolio.extended_hours_equity }</Grid>
			</Grid>
		);
	}
}