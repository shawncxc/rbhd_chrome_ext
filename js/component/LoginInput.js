import React from "react";
import Grid from "material-ui/Grid";

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
			<Grid container spacing={24}>
				<Grid item xs={12}>
					<input type="text" onChange={ this.onUsernameChange } />
				</Grid>
				<Grid item xs={12}>
					<input type="password" onChange={ this.onPasswordChange } />
				</Grid>
				<Grid item xs={12}>
					<button onClick={ this.login }>Login</button>
				</Grid>
			</Grid>
		);
	}
}
