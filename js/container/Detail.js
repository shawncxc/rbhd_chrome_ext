import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	getDetailQuote,
	setDetailQuoteSpan,
	getNews,
	getFundamental,
} from "../action/detail.action";
import Grid from "material-ui/Grid";
import StockDetail from "../component/StockDetail/StockDetail";

class Detail extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let symbol = this.props.match.params.symbol;
		this.props.getDetailQuote(symbol);
		this.props.getNews(symbol);
		this.props.getFundamental(symbol);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.span === this.props.span) {
			return;
		}
		
		this.props.getDetailQuote(nextProps.data.symbol, nextProps.interval, nextProps.span);
	}

	render() {
		return (
			<Grid item xs={12}>
				<StockDetail { ...this.props } />
			</Grid>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		token: state.login.token ? state.login.token : "",
		portfolio: state.list.portfolio ? state.list.portfolio : {},
		positions: state.list.positions ? state.list.positions : [],
		poslist: state.list.poslist ? state.list.poslist : [],
		data: state.detail.data ? state.detail.data : {},
		span: state.detail.span ? state.detail.span : "day",
		interval: state.detail.interval ? state.detail.interval : "5minute",
		news: state.detail.news ? state.detail.news : [],
		totalNews: state.detail.totalNews ? state.detail.totalNews : 0,
		nextNews: state.detail.nextNews,
		prevNews: state.detail.prevNews,
		fundamental: state.detail.fundamental,
	};
};

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getDetailQuote, getNews, getFundamental, setDetailQuoteSpan, }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail)