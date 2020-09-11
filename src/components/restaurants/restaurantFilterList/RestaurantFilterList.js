import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { useSelector } from "react-redux";

import "./RestaurantFilterList.scss";

import RestaurantFilterItem from "../restaurantFilterItem/RestaurantFilterItem";

import Pagination from "@material-ui/lab/Pagination";

const RestaurantFilterList = ({ match }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const {
		restaurantReducer: { restaurantList, restaurantSearchList },
	} = useSelector((state) => state);

	const renderLayoutRestaurant = (list) =>
		list.map((restaurant) => (
			<RestaurantFilterItem key={restaurant._id} restaurant={restaurant?._source} id={restaurant._id} />
		));

	return (
		<div className="restaurant-filter-list">
			<div className="restaurant-filter-list__container">
				{!match.params.params && renderLayoutRestaurant(restaurantList)}
				{isNaN(parseInt(match.params.params) && match.params.params) &&
					renderLayoutRestaurant(restaurantSearchList)}
				{!isNaN(parseInt(match.params.params)) && renderLayoutRestaurant(restaurantList)}
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

export default withRouter(RestaurantFilterList);
