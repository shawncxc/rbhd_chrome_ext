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
		chrome.storage.sync.get("robinhood", (cred) => {
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
			<Grid container spacing={24}>
				<Grid item xs={12}>
					<TextField label="Username" helperText="Enter your robinhood username" onChange={ this.onUsernameChange } />
				</Grid>
				<Grid item xs={12}>
					<TextField label="Password" helperText="Enter your robinhood password" type="password" onChange={ this.onPasswordChange } />
				</Grid>
				<Grid item xs={12}>
					<Button variant="raised" color="primary" onClick={ this.login }>Login</Button>
				</Grid>
			</Grid>
		);
	}
}
