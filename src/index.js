import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";

import history from "./constants/history";

import store from "./stores/configureStore";
import { Provider } from "react-redux";

import App from "./App";
import ReactGA from "react-ga";

ReactGA.initialize("UA-178258009-1");

ReactDOM.render(
	<>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</>,
	document.getElementById("root")
);
