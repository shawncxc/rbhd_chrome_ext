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
// import ListPreload from "../component/StockList/ListPreload";
import StockChart from "../component/StockList/StockChart";
import QuoteInput from "../component/StockList/QuoteInput";
import AccountSummary from "../component/StockList/AccountSummary";
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
		// console.log(this.props);
		// if (this.props.share.length === 0 ||
		// 	this.props.quote.length === 0
		// 	// this.props.token.length === 0
		// 	// Object.keys(this.props.portfolio).length === 0
		// ) {
		// 	return (
		// 		<div>
		// 			<Grid item xs={12}>
		// 				<ListPreload />
		// 			</Grid>
		// 		</div>
		// 	);
		// }

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