import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	getQuote,
	addWatchList,
	removeWatchList,
	setQuoteSpan,
	getWatchList,
	getPortfolio,
	getQuotePos,
} from "../action/list.action"
import StockChart from "../component/StockChart";
import QuoteInput from "../component/QuoteInput";
import AccountSummary from "../component/AccountSummary";
import Grid from "material-ui/Grid";

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
				<Grid item xs={12}>
					<AccountSummary { ...this.props } />
				</Grid>
				<Grid item xs={12}>
					<QuoteInput { ...this.props } />
				</Grid>
				<Grid item xs={12}>
					<StockChart { ...this.props } />
				</Grid>
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
		positions: state.list.positions ? state.list.positions : [],
		poslist: state.list.poslist ? state.list.poslist : [],
		sharePos: state.list.sharePos && state.list.sharePos.length > 0 ? state.list.sharePos : [],
	};
};

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getQuote, addWatchList, removeWatchList, setQuoteSpan, getWatchList, getPortfolio, getQuotePos, }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(List)