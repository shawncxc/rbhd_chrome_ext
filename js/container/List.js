import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	getQuote,
	addQuote,
	removeQuote,
	setQuoteSpan,
	getWatchList,
	getPortfolio,
} from "../action/list.action"
import StockChart from "../component/StockChart";
import QuoteInput from "../component/QuoteInput";
import AccountSummary from "../component/AccountSummary";

class List extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getWatchList(this.props.token);
		this.props.getPortfolio(this.props.token);
	}

	render() {
		return (
			<div>
				<AccountSummary { ...this.props } />
				<QuoteInput { ...this.props } />
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
		token: state.login.token ? state.login.token : "",
		portfolio: state.list.portfolio ? state.list.portfolio : {},
	};
};

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getQuote, addQuote, removeQuote, setQuoteSpan, getWatchList, getPortfolio }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(List)