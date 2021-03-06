import React from "react";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

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

	componentDidMount() {
		chrome.storage && chrome.storage.sync.get("robinhood", (cred) => {
			if (cred.robinhood) {
				this.props.login(cred.robinhood.username, cred.robinhood.password);
			}
		});
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
				<Grid item xs={12}>
					<TextField label="Username" onChange={ this.onUsernameChange } fullWidth />
				</Grid>
				<Grid item xs={12}>
					<TextField label="Password" type="password" onChange={ this.onPasswordChange } fullWidth />
				</Grid>
				<Grid item xs={12}>
					<Button variant="raised" color="primary" onClick={ this.login } fullWidth>Login</Button>
				</Grid>
			</div>
		);
	}
}
