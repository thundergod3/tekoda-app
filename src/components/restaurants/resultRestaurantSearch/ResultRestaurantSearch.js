import React from "react";

import { useSelector } from "react-redux";

import "./ResultRestaurantSearch.scss";

import RestaurantSearchFilterList from "../restaurantSearchFilterList/RestaurantSearchFilterList";
import RestaurantFilterList from "../restaurantFilterList/RestaurantFilterList";

const ResultRestaurantSearch = () => {
	return (
		<div className="search-restaurant-search">
			<div className="search-restaurant-search__container">
				<p className="search-restaurant-search__title">Kết quả hơn 300 nhà hàng tại Cầu giấy</p>
				<RestaurantSearchFilterList />
				<RestaurantFilterList />
			</div>
		</div>
	);
};

export default ResultRestaurantSearch;
