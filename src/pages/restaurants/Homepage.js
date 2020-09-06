import React from "react";

import "./restaurants.scss";

import SearchBar from "../../components/layouts/searchBar/SearchBar";
import FilterList from "../../components/utils/filterList/FilterList";
import RestaurantSocialRecommendList from "../../components/restaurants/restaurantSocialRecommendList/RestaurantSocialRecommendList";
import RestaurantLocationRecommendList from "../../components/restaurants/restaurantLocationRecommendList/RestaurantLocationRecommendList";
import WarningCookie from "../../components/utils/warningCookie/WarningCookie";

const Homepage = () => {
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
