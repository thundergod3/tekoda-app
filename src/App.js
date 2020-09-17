import React, { useEffect } from "react";
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
	const dispatch = useDispatch();
	const { checkAuthenticatedRequest } = authAction;

	useEffect(() => {
		dispatch(checkAuthenticatedRequest());
	}, []);

	// useEffect(() => {
	// 	ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
	// 		console.log(tti);
	// 		ReactGA.timing({
	// 			category: "Load Performace",
	// 			variable: "Time to Interactive",
	// 			value: tti,
	// 		});
	// 	});
	// }, []);

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
