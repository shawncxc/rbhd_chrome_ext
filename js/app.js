import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import Login from "./container/Login";
import List from "./container/List";
import "../css/main.css";

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#1fcc9a',
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contast with palette.primary.main
		},
		secondary: {
			// light: '#0066ff',
			main: '#1fcc9a',
			// dark: will be calculated from palette.secondary.main,
			// contrastText: '#ffcc00',
		},
		// error: will us the default color
	},
});


let store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render((
	<MuiThemeProvider theme={theme}>
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/watchlist" component={List} />
					<Route path="*" component={Login} />
				</Switch>
			</Router>
		</Provider>
	</MuiThemeProvider>),
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
		width: 450,
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
chrome.contextMenus && chrome.contextMenus.create({
	id: CONTEXT_MENU_ID,   // <-- mandatory with event-pages
	title: "Robinhood",
	contexts: ["all"]
});

/* Register a listener for the `onClicked` event */
chrome.contextMenus && chrome.contextMenus.onClicked.addListener(function(event) {
	if (event.menuItemId === CONTEXT_MENU_ID) {
		popWindow('open');
	}
});