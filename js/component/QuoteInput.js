import React from "react";

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
			<div>
				<input type="text" onChange={ this.handleInput } value={ this.state.symbol } />
				<button onClick={ this.addQuote }>ADD</button>
				<button onClick={ () => { this.props.setQuoteSpan("day"); } }>DAY</button>
				<button onClick={ () => { this.props.setQuoteSpan("week"); } }>WEEK</button>
				<button onClick={ () => { this.props.setQuoteSpan("year"); } }>YEAR</button>
				<button onClick={ () => { this.props.setQuoteSpan("5year"); } }>5 YEAR</button>
			</div>
		);
	}
}