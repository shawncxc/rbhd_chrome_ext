import React from "react";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import List from "material-ui-icons/List";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { FormLabel, FormControl, } from "material-ui/Form";

export default class Position extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let positionDiv = (
			<Paper elevation={3} className="position-container" square>
				<Divider />
				<div style={{ padding: 10 }}>
					<Grid item xs={12}>
					<Typography variant="headline" component="h3">Your Position</Typography>
				</Grid>
				</div>
				<Divider />
				<div style={{ padding: 10 }}>
					<Grid item xs={12}>
						<Typography variant="body1" color="inherit">No position.</Typography>
					</Grid>
				</div>
				<Divider />
			</Paper>
		);

		if (this.props.poslist.indexOf(this.props.data.symbol) !== -1) {
			let currentInstrument = this.props.data.instrument;
			let currentPosition = this.props.positions.filter(pos => pos.instrument === currentInstrument)[0];
			let quantity = parseInt(currentPosition.quantity);
			let avgPrice = parseFloat(currentPosition.average_buy_price);
			let historicals = this.props.data.historicals;
			let lastPrice = historicals[historicals.length - 1].close_price || this.props.data.previous_close_price;
			let equityValue = quantity * parseFloat(lastPrice);
			positionDiv = (
				<Paper elevation={3} className="position-container" square>
					<Divider />
					<div style={{ padding: 10 }}>
						<Grid item xs={12}>
							<Typography variant="headline" component="h3">Your Position</Typography>
						</Grid>
					</div>
					<Divider />
					<div style={{ padding: 10 }}>
						<Grid container spacing={8}>
							<Grid item xs={6}>
								<Typography variant="subheading" color="textSecondary">SHARES</Typography>
								<Typography component="p" color="inherit">{ quantity }</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant="subheading" color="textSecondary">EQUITY VALUE</Typography>
								<Typography variant="body1" color="inherit">{ equityValue }</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="subheading" color="textSecondary">AVG COST</Typography>
								<Typography variant="body1" color="inherit">{ avgPrice }</Typography>
							</Grid>
						</Grid>
					</div>
					<Divider />
				</Paper>
			);
		}

		return positionDiv;
	}
}