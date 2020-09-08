import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";

import "./restaurants.scss";

import ResultRestaurantSearch from "../../components/restaurants/resultRestaurantSearch/ResultRestaurantSearch";
import RestaurantSearchDetail from "../../components/restaurants/restaurantSearchDetail/RestaurantSearchDetail";

const SearchRestaurantPage = ({ match }) => {
	const {
		restaurantReducer: { restaurantSearchDetail },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { getRestaurantSearchDetailRequest, fetchListRestaurantRequest } = restaurantAction;

	useEffect(() => {
		if (Object.keys(restaurantSearchDetail).length === 0) {
			dispatch(fetchListRestaurantRequest());
		}
		if (match.params.params) {
			dispatch(getRestaurantSearchDetailRequest(match.params.params));
		}
	}, []);

	return (
		<div className="search-page">
			<ResultRestaurantSearch />
			<RestaurantSearchDetail />
		</div>
	);
};

export default SearchRestaurantPage;
