import React from "react";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

export default class QuoteInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
		this.addQuote = this.addQuote.bind(this);

		this.state = {
			symbol: "",
		};
	}

	handleInput(event) {
		this.setState({ symbol: event.target.value });
	}

	addQuote() {
		let symbol = this.state.symbol;
		this.props.addQuote(symbol);
		this.setState({ symbol: "" });
	}

	render() {
		return (
			<Grid container spacing={24}>
				<TextField label="Symbol" helperText="Enter the symbol of the stock" type="text" onChange={ this.handleInput } value={ this.state.symbol } />
				<Button variant="raised" color="primary" onClick={ this.addQuote }>ADD</Button>
				<Button variant="raised" color="primary" onClick={ () => { this.props.setQuoteSpan("day"); } }>DAY</Button>
				<Button variant="raised" color="primary" onClick={ () => { this.props.setQuoteSpan("week"); } }>WEEK</Button>
				<Button variant="raised" color="primary" onClick={ () => { this.props.setQuoteSpan("year"); } }>YEAR</Button>
				<Button variant="raised" color="primary" onClick={ () => { this.props.setQuoteSpan("5year"); } }>5 YEAR</Button>
			</Grid>
		);
	}
}