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

// Chrome

let windowId = 0;
const CONTEXT_MENU_ID = 'robinhood_window';

function closeIfExist() {
	if (windowId > 0) {
		chrome.windows.remove(windowId);
		windowId = chrome.windows.WINDOW_ID_NONE;
	}
}

function popWindow(type) {
	closeIfExist();
	const options = {
		// type: "popup",
		// left: 300,
		// top: 300,
		width: 800,
		height: 475,
	};
	if (type === 'open') {
		options.url = '../build/index.html';
		chrome.windows.create(options, (win) => {
			windowId = win.id;
		});
	}
}

/* Create a context-menu */
chrome.contextMenus.create({
	id: CONTEXT_MENU_ID,   // <-- mandatory with event-pages
	title: "Robinhood",
	contexts: ["all"]
});

/* Register a listener for the `onClicked` event */
chrome.contextMenus.onClicked.addListener(function(event) {
	if (event.menuItemId === CONTEXT_MENU_ID) {
		popWindow('open');
	}
});