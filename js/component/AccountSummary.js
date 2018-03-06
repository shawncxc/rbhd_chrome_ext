import React from "react";
import Grid from "material-ui/Grid";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import AttachMoney from "material-ui-icons/AttachMoney";

export default class AccountSummary extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let afterMarket = this.props.portfolio.extended_hours_equity;
		let market = this.props.portfolio.equity;
		return (
			<Grid item xs={12}>
				<AppBar color="primary" position="static">
					<Toolbar>
						<Typography variant="title" color="inherit">
							<AttachMoney />{ afterMarket ? afterMarket : market }
						</Typography>
					</Toolbar>
				</AppBar>
			</Grid>
		);
	}
}