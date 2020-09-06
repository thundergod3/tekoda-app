import React, { useState } from "react";

import { useSelector } from "react-redux";

import "./RestaurantFilterList.scss";

import RestaurantFilterItem from "../restaurantFilterItem/RestaurantFilterItem";

import Pagination from "@material-ui/lab/Pagination";

const RestaurantFilterList = () => {
	const [pageNumber, setPageNumber] = useState(0);
	const {
		restaurantReducer: { restaurantFilterList },
	} = useSelector((state) => state);

	return (
		<div className="restaurant-filter-list">
			<div className="restaurant-filter-list__container">
				{restaurantFilterList.map((restaurant) => (
					<RestaurantFilterItem key={restaurant.id} restaurant={restaurant} />
				))}
			</div>
			<div className="restaurant-filter__pagination">
				<Pagination
					count={10}
					shape="rounded"
					onChange={(object, number) => console.log(number)}
					hidePrevButton={pageNumber === 0 ? true : false}
				/>
				<p className="restaurant-filter__length">1 - 20 / Hơn 300 nhà hàng</p>
			</div>
		</div>
	);
};

export default RestaurantFilterList;
