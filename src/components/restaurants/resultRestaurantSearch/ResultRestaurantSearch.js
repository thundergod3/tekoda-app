import React from "react";

import { useSelector } from "react-redux";

import "./ResultRestaurantSearch.scss";
import cookieLocal from "../../../helpers/cookieLocal";

import RestaurantSearchFilterList from "../restaurantSearchFilterList/RestaurantSearchFilterList";
import RestaurantFilterList from "../restaurantFilterList/RestaurantFilterList";

const ResultRestaurantSearch = ({ scrollTopRestaurantDetail }) => {
	const {
		restaurantReducer: { restaurantList },
	} = useSelector((state) => state);

	return (
		<div className="search-restaurant-search">
			<div className="search-restaurant-search__container">
				{restaurantList.length !== 0 && (
					<p className="search-restaurant-search__title">
						Kết quả hơn {restaurantList.length} nhà hàng tại {cookieLocal.getFromLocal("street")}
					</p>
				)}
				<RestaurantSearchFilterList />
				<RestaurantFilterList scrollTopRestaurantDetail={scrollTopRestaurantDetail} />
			</div>
		</div>
	);
};

export default ResultRestaurantSearch;
