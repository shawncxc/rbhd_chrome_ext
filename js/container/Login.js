import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../action/login.action";
import LoginInput from "../component/LoginInput";

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <LoginInput { ...this.props } />;
	}
}

let mapStateToProps = (state) => {
	return {
		token: state.login.token ? state.login.token : "",
	};
};

let mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ login }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
