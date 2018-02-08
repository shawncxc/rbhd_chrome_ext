import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getQuote } from '../action/list.action.js'

class List extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getQuote("IRBT");
	}

	render() {
		return (
			<h3>Welcome to Rbhd Beta</h3>
		);
	}
}

let mapStateToProps = (state) => {
	return state;
};

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getQuote }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(List)