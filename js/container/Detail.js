import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	getDetailQuote,
} from "../action/detail.action";
import Grid from "material-ui/Grid";
import StockDetail from "../component/StockDetail";

class Detail extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let symbol = this.props.match.params.symbol;
		this.props.getDetailQuote(symbol);
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
		span: state.detail.span,
		interval: state.detail.interval,
	};
};

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getDetailQuote, }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail)