import React from "react";
import Grid from "material-ui/Grid";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import List from "material-ui-icons/List";
import Position from "./Position";
import StockChart from "./StockChart";
import News from "./News";
import "../../../css/StockDetail.css";

export default class StockDetail extends React.Component {
	constructor(props) {
		super(props);

		this.goToWatchList = this.goToWatchList.bind(this);
	}

	goToWatchList() {
		this.props.history.push(`/watchlist`);
	}

	render() {
		return (
			<Grid item xs={12}>
				<AppBar color="primary" position="sticky">
					<Toolbar>
						<IconButton color="inherit">
							<List onClick={ this.goToWatchList } />
						</IconButton>
						<Typography variant="title" color="inherit">
							{ this.props.match.params.symbol }
						</Typography>
					</Toolbar>
				</AppBar>
				<StockChart { ...this.props } />
				<Grid item xs={12} className="stock-detial-item-container">
					<Position { ...this.props } />
				</Grid>
				<Grid item xs={12} className="stock-detial-item-container">
					<News { ...this.props } />
				</Grid>
			</Grid>
		);
	}
}