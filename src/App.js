import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import authAction from "./stores/redux/actions/authAction";

import Navbar from "./components/layouts/navbar/Navbar";
import Homepage from "./pages/restaurants/Homepage";
import SearchRestaurantPage from "./pages/restaurants/SearchRestaurantPage";
import LoginPage from "./pages/auths/LoginPage";
import RegisterPage from "./pages/auths/RegisterPage";
import SurveyPage from "./pages/restaurants/SurveyPage";
import SaveRestaurantPage from "./pages/restaurants/SaveRestaurantPage";

const App = ({
	history: {
		location: { pathname },
	},
}) => {
	const {
		errorReducer: { errorStatus, errorMsg },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { checkAuthenticatedRequest } = authAction;

	useEffect(() => {
		if (errorMsg) {
			toast.error(errorMsg);
		}
	}, [errorMsg]);

	useEffect(() => {
		dispatch(checkAuthenticatedRequest());
	}, [errorStatus]);

	return (
		<>
			{pathname !== "/login" &&
			pathname !== "/register" &&
			pathname !== "/survey" ? (
				<Navbar />
			) : null}
			<Switch>
				{/* TEKODA PAGES */}
				<Route exact path="/" component={Homepage} />
				<Route
					exact
					path={[
						"/today-eat",
						"/today-eat/:params/page=:pageNumber",
						"/today-eat/page=:pageNumber",
						"/today-eat/collection/collection_id=:collectionId",
					]}
					component={SearchRestaurantPage}
				/>
				<Route exact path={"/survey"} component={SurveyPage} />
				<Route exact path="/save-restaurant" component={SaveRestaurantPage} />

				{/* AUTH PAGES */}
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/register" component={RegisterPage} />
			</Switch>
			<ToastContainer />
		</>
	);
};

export default withRouter(App);
