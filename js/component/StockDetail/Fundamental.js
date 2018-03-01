import React from "react";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import List from "material-ui-icons/List";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";

export default class Fundamental extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Paper elevation={3} className="position-container" square>
				<Divider />
				<div style={{ padding: 10 }}>
					<Grid item xs={12}>
						<Typography variant="headline" component="h3">Stats</Typography>
					</Grid>
				</div>
				<Divider />
				<div style={{ padding: 10 }}>
					<Grid container spacing={8}>
						<Grid item xs={6}>
							<Typography variant="subheading" color="textSecondary">OPEN</Typography>
							<Typography variant="body1" color="inherit">{ this.props.fundamental.open }</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subheading" color="textSecondary">VOLUME</Typography>
							<Typography variant="body1" color="inherit">{ this.props.fundamental.volume }</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subheading" color="textSecondary">HIGH</Typography>
							<Typography variant="body1" color="inherit">{ this.props.fundamental.high }</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subheading" color="textSecondary">AVG VOL</Typography>
							<Typography variant="body1" color="inherit">{ this.props.fundamental.average_volume }</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subheading" color="textSecondary">LOW</Typography>
							<Typography variant="body1" color="inherit">{ this.props.fundamental.low }</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subheading" color="textSecondary">MKT CAP</Typography>
							<Typography variant="body1" color="inherit">{ this.props.fundamental.market_cap }</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subheading" color="textSecondary">52 WK HIGH</Typography>
							<Typography variant="body1" color="inherit">{ this.props.fundamental.high_52_weeks }</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subheading" color="textSecondary">P/E RATIO</Typography>
							<Typography variant="body1" color="inherit">{ this.props.fundamental.pe_ratio }</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subheading" color="textSecondary">52 WK LOW</Typography>
							<Typography variant="body1" color="inherit">{ this.props.fundamental.low_52_weeks }</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subheading" color="textSecondary">DIV/YIELD</Typography>
							<Typography variant="body1" color="inherit">{ this.props.fundamental.dividend_yield }</Typography>
						</Grid>
					</Grid>
				</div>
				<Divider />
			</Paper>
		);
	}
}