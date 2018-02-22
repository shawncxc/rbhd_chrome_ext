import React from "react";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import Radio, { RadioGroup } from "material-ui/Radio";
import { FormControl, FormControlLabel } from "material-ui/Form";

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

	handleSpanChange(event) {
		this.setState({ span: event.target.value });
		this.props.setQuoteSpan(event.target.value);
	}

	render() {
		return (
			<div>
				<TextField label="Symbol" type="text" onChange={ this.handleInput } value={ this.state.symbol } />
				<Button style={{ backgroundColor: "#1cee85" }} variant="fab" mini color="primary" aria-label="add" onClick={ this.addWatchList }><AddIcon /></Button>
				<span>day <Radio checked={ this.state.span === "day" } onChange={ this.handleSpanChange } value="day" /></span>
				<span>week <Radio checked={ this.state.span === "week" } onChange={ this.handleSpanChange } value="week" /></span>
				<span>year <Radio checked={ this.state.span === "year" } onChange={ this.handleSpanChange } value="year" /></span>
				<span>5 year <Radio checked={ this.state.span === "5year" } onChange={ this.handleSpanChange } value="5year" /></span>
			</div>
		);
	}
}