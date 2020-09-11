import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";
import utilAction from "../../stores/redux/actions/utilAction";

import "./restaurants.scss";

import ResultRestaurantSearch from "../../components/restaurants/resultRestaurantSearch/ResultRestaurantSearch";
import RestaurantSearchDetail from "../../components/restaurants/restaurantSearchDetail/RestaurantSearchDetail";
import Loading from "../../components/utils/loading/Loading";

const SearchRestaurantPage = ({ match }) => {
	const {
		utilReducer: { loading },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { getRestaurantSearchDetailRequest, fetchListRestaurantRequest, searchRestaurantRequest } = restaurantAction;

	useEffect(() => {
		if (match.params.params && isNaN(parseInt(match.params.params))) {
			dispatch(searchRestaurantRequest([match.params.params]));
		} else if (!isNaN(parseInt(match.params.params))) {
			dispatch(getRestaurantSearchDetailRequest(match.params.params));
			dispatch(fetchListRestaurantRequest());
		} else {
			dispatch(fetchListRestaurantRequest());
		}
	}, []);

	return (
		<>
			{loading === true ? (
				<Loading />
			) : (
				<div className="search-page">
					<ResultRestaurantSearch />
					<RestaurantSearchDetail />
				</div>
			)}
		</>
	);
};

export default SearchRestaurantPage;
