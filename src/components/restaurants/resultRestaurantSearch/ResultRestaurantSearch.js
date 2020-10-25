import React from "react";

import { useSelector } from "react-redux";

import "./ResultRestaurantSearch.scss";
import saveLocal from "../../../helpers/saveLocal";

import RestaurantSearchFilterList from "../restaurantSearchFilterList/RestaurantSearchFilterList";
import RestaurantFilterList from "../restaurantFilterList/RestaurantFilterList";

const ResultRestaurantSearch = ({ scrollTopRestaurantDetail }) => {
	const {
		restaurantReducer: { restaurantList },
	} = useSelector((state) => state);

	return (
		<>
			{restaurantList.length !== 0 && (
				<div className="search-restaurant-search">
					<div className="search-restaurant-search__container">
						<p className="search-restaurant-search__title">
							Kết quả hơn {restaurantList.length} nhà hàng{" "}
							{saveLocal.getFromLocal("street") && `tại ${saveLocal.getFromLocal("street")}`}
						</p>
						<RestaurantSearchFilterList />
						<RestaurantFilterList scrollTopRestaurantDetail={scrollTopRestaurantDetail} />
					</div>
				</div>
			)}
		</>
	);
};

export default ResultRestaurantSearch;
