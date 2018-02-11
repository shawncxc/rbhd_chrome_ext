import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getQuote, addQuote, removeQuote } from "../action/list.action"
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
	};
};

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getQuote, addQuote, removeQuote }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(List)