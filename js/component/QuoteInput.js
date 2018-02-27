import React from "react";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

const btnRowStyle = {
	textAlign: "center",
};

const normalBtnStyle = {
	color: "#1fcc9a",
	marginTop: 10,
	marginBottom: 10,
	fontSize: 10,
};

const highlightBtnStyle = {
	marginTop: 10,
	marginBottom: 10,
	fontSize: 10,
	backgroundColor: "#1fcc9a",
};

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
		this.setState({ span: span }, () => {
			this.props.setQuoteSpan(span);
		});
	}

	render() {
		return (
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<TextField label="Symbol" type="text" onChange={ this.handleInput } value={ this.state.symbol } />
					<Button size="small" onClick={ this.addWatchList }>Add</Button>
				</Grid>
				<Grid item xs={3} style={ btnRowStyle }>
					<Button size="small" style={ this.state.span === "day" ? highlightBtnStyle : normalBtnStyle } onClick={ () => { this.handleSpanChange("day"); } }>day</Button>
				</Grid>
				<Grid item xs={3} style={ btnRowStyle }>
					<Button size="small" style={ this.state.span === "week" ? highlightBtnStyle : normalBtnStyle } onClick={ () => { this.handleSpanChange("week"); } }>week</Button>
				</Grid>
				<Grid item xs={3} style={ btnRowStyle }>
					<Button size="small" style={ this.state.span === "year" ? highlightBtnStyle : normalBtnStyle } onClick={ () => { this.handleSpanChange("year"); } }>year</Button>
				</Grid>
				<Grid item xs={3} style={ btnRowStyle }>
					<Button size="small" style={ this.state.span === "5year" ? highlightBtnStyle : normalBtnStyle } onClick={ () => { this.handleSpanChange("5year"); } }>5 year</Button>
				</Grid>
			</Grid>
		);
	}
}