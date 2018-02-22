import React from "react";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";

export default class QuoteInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
		this.addWatchList = this.addWatchList.bind(this);
		this.handleSpanChange = this.handleSpanChange.bind(this);

		this.state = {
			symbol: "",
			span: this.props.span ? this.props.span : "day",
		};
	}

	handleInput(event) {
		this.setState({ symbol: event.target.value });
	}

	addWatchList() {
		let symbol = this.state.symbol;
		this.props.addWatchList(symbol, this.props.token);
		this.setState({ symbol: "" });
	}

	handleSpanChange(span) {
		this.setState({ span: span });
		this.props.setQuoteSpan(span);
	}

	render() {
		return (
			<div>
				<Grid item xs={12}>
					<TextField label="Symbol" type="text" onChange={ this.handleInput } value={ this.state.symbol } />
					<Button style={{ backgroundColor: "#1cee85" }} variant="fab" mini color="primary" aria-label="add" onClick={ this.addWatchList }><AddIcon /></Button>
				</Grid>
				<Grid item xs={12}>
					<Button onClick={ () => { this.handleSpanChange("day"); } }>day</Button>
					<Button onClick={ () => { this.handleSpanChange("week"); } }>week</Button>
					<Button onClick={ () => { this.handleSpanChange("year"); } }>year</Button>
					<Button onClick={ () => { this.handleSpanChange("5year"); } }>5 year</Button>
				</Grid>
			</div>
		);
	}
}