import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";

import "./restaurants.scss";
import cookieLocal from "../../helpers/cookieLocal";

import SearchBar from "../../components/layouts/searchBar/SearchBar";
import FilterList from "../../components/utils/filterList/FilterList";
import RestaurantSocialRecommendList from "../../components/restaurants/restaurantSocialRecommendList/RestaurantSocialRecommendList";
import RestaurantLocationRecommendList from "../../components/restaurants/restaurantLocationRecommendList/RestaurantLocationRecommendList";
import WarningCookie from "../../components/utils/warningCookie/WarningCookie";
import { Redirect } from "react-router-dom";

const Homepage = () => {
	const {
		restaurantReducer: { statusSurveyForm },
		authReducer: { authenticated },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { fetchListRestaurantRequest } = restaurantAction;

	useEffect(() => {
		dispatch(fetchListRestaurantRequest());
	}, []);

	if (!statusSurveyForm && authenticated === true) {
		return <Redirect to="/survey" />;
	}

	return (
		<div className="homepage">
			<SearchBar />
			<FilterList />
			<RestaurantSocialRecommendList />
			<RestaurantLocationRecommendList />
			<WarningCookie />
		</div>
	);
};

export default Homepage;
