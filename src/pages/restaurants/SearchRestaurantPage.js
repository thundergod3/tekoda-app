import React from "react";

import "./restaurants.scss";

import ResultRestaurantSearch from "../../components/restaurants/resultRestaurantSearch/ResultRestaurantSearch";
import RestaurantSearchDetail from "../../components/restaurants/restaurantSearchDetail/RestaurantSearchDetail";

const SearchRestaurantPage = () => {
	return (
		<div className="search-page">
			<ResultRestaurantSearch />
			<RestaurantSearchDetail />
		</div>
	);
};

export default SearchRestaurantPage;
