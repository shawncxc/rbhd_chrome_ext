import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getQuote, addQuote, removeQuote, setQuoteSpan } from "../action/list.action"
import StockChart from "../component/StockChart";
import QuoteInput from "../component/QuoteInput";

class List extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<QuoteInput { ...this.props }/>
				<StockChart { ...this.props } />
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		share: state.list.share && state.list.share.length > 0 ? state.list.share : [],
		quote: state.list.quote && state.list.quote.length > 0 ? state.list.quote : [],
		span: state.list.span ? state.list.span : "day",
		interval: state.list.interval ? state.list.interval : "5minute",
	};
};

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getQuote, addQuote, removeQuote, setQuoteSpan }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(List)