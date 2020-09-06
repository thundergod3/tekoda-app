import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.scss";

import { useSelector, useDispatch } from "react-redux";
import authAction from "./stores/redux/actions/authAction";

import Navbar from "./components/layouts/navbar/Navbar";
import Homepage from "./pages/restaurants/Homepage";
import SearchRestaurantPage from "./pages/restaurants/SearchRestaurantPage";
import LoginPage from "./pages/auths/LoginPage";
import RegisterPage from "./pages/auths/Register";

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

	return (
		<>
			{pathname !== "/login" && pathname !== "/register" ? <Navbar /> : null}
			<Switch>
				{/* TEKODA PAGES */}
				<Route exact path="/" component={Homepage} />
				<Route exact path="/today-eat" component={SearchRestaurantPage} />

				{/* AUTH PAGES */}
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/register" component={RegisterPage} />
			</Switch>
		</>
	);
};

export default withRouter(App);
