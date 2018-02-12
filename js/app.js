import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import Login from "./container/Login";
import List from "./container/List";

let store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render((
	<Provider store={store}>
		<Router>
			<div>
				<Link to="/">Login</Link>
				<Route exact path="/" component={Login} />
				<Route exact path="/watchlist" component={List} />
			</div>
		</Router>
	</Provider>),
	document.getElementById("app")
);
