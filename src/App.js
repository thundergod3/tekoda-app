import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.scss";
import ttiPolyfill from "tti-polyfill";
import ReactGA from "react-ga";

import { useSelector, useDispatch } from "react-redux";
import authAction from "./stores/redux/actions/authAction";

import Navbar from "./components/layouts/navbar/Navbar";
import Homepage from "./pages/restaurants/Homepage";
import SearchRestaurantPage from "./pages/restaurants/SearchRestaurantPage";
import LoginPage from "./pages/auths/LoginPage";
import RegisterPage from "./pages/auths/Register";
import SurveyPage from "./pages/restaurants/SurveyPage";
import SaveRestaurantPage from "./pages/restaurants/SaveRestaurantPage";

const App = ({
	history: {
		location: { pathname },
	},
}) => {
	const {
		authReducer: { authenticated },
	} = useSelector((state) => state);
	const [screenOrientation, setScreenOrientation] = useState("portrait");
	const dispatch = useDispatch();
	const { checkAuthenticatedRequest } = authAction;

	const changeScreenOrientation = () => {
		if (window.matchMedia("(orientation: portrait)").matches) {
			setScreenOrientation("portrait");
		}

		if (window.matchMedia("(orientation: landscape)").matches) {
			setScreenOrientation("landscape");
		}
	};

	useEffect(() => {
		window.addEventListener("orientationchange", changeScreenOrientation);
	}, []);

	useEffect(() => {
		dispatch(checkAuthenticatedRequest());
	}, []);

	return (
		<>
			{pathname !== "/login" && pathname !== "/register" && pathname !== "/survey" ? <Navbar /> : null}
			<Switch>
				{/* TEKODA PAGES */}
				<Route exact path="/" component={Homepage} />
				<Route
					exact
					path={["/today-eat/:params/page=:pageNumber", "/today-eat", "/today-eat/page=:pageNumber"]}
					component={SearchRestaurantPage}
				/>
				<Route exact path={"/survey"} component={SurveyPage} />
				<Route exact path="/save-restaurant" component={SaveRestaurantPage} />

				{/* AUTH PAGES */}
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/register" component={RegisterPage} />
			</Switch>
		</>
	);
};

export default withRouter(App);
