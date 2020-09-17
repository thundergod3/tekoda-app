import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import utilAction from "../../../stores/redux/actions/utilAction";

import "./RestaurantFilterList.scss";

import RestaurantFilterItem from "../restaurantFilterItem/RestaurantFilterItem";

import Pagination from "@material-ui/lab/Pagination";

const RestaurantFilterList = ({ match, history }) => {
	const [pageNumber, setPageNumber] = useState(
		match.params.params && match.params.params.slice(0, 4) === "page"
			? parseInt(match.params.params.slice(5, match.params.params.length))
			: 1
	);
	const {
		restaurantReducer: { restaurantList, restaurantListEachPage },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { fetchListRestaurantPerPageRequest } = restaurantAction;
	const { loadingUI } = utilAction;

	const renderLayoutRestaurant = (list) =>
		list.map((restaurant) => (
			<RestaurantFilterItem key={restaurant._id} restaurant={restaurant?._source} id={restaurant._id} />
		));

	return (
		<div className="restaurant-filter-list">
			<div className="restaurant-filter-list__container">
				{!match.params.params ||
					((isNaN(parseInt(match.params.params) && match.params.params) ||
						!isNaN(parseInt(match.params.params))) &&
						renderLayoutRestaurant(restaurantListEachPage))}
				<div className="restaurant-filter__pagination">
					<Pagination
						defaultPage={pageNumber}
						count={Math.ceil(restaurantList.length / 10)}
						shape="rounded"
						onChange={(object, number) => {
							dispatch(loadingUI());
							setPageNumber(number);
							history.push(`/today-eat/page=${number}`);
							dispatch(fetchListRestaurantPerPageRequest(number));
						}}
						hidePrevButton={pageNumber === 1 ? true : false}
						hideNextButton={pageNumber === Math.ceil(restaurantList.length / 10) ? true : false}
					/>
					<p className="restaurant-filter__length">1 - 20 / Hơn 300 nhà hàng</p>
				</div>
			</div>
		</div>
	);
};

export default withRouter(RestaurantFilterList);
