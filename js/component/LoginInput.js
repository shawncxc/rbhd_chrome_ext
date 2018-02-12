import React from "react";

export default class LoginInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};

		this.onUsernameChange = this.onUsernameChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.login = this.login.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.token)
			this.props.history.push("/watchlist");
	}

	onUsernameChange(event) {
		this.setState({ username: event.target.value });
	}

	onPasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	login() {
		this.props.login(this.state.username, this.state.password);
	}

	render() {
		return (
			<div>
				<input type="text" onChange={ this.onUsernameChange } />
				<input type="password" onChange={ this.onPasswordChange } />
				<button onClick={ this.login }>Login</button>
			</div>
		);
	}
}
