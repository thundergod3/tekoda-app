import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import utilAction from "../../../stores/redux/actions/utilAction";

import "./RestaurantFilterList.scss";

import RestaurantFilterItem from "../restaurantFilterItem/RestaurantFilterItem";

import Pagination from "@material-ui/lab/Pagination";

const RestaurantFilterList = ({ match, history, scrollTopRestaurantDetail }) => {
	const [pageNumber, setPageNumber] = useState(1);
	const {
		restaurantReducer: { restaurantList, restaurantListEachPage, listKeyWord },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { fetchListRestaurantPerPageRequest, getSearchRestaurantPerPageRequest } = restaurantAction;
	const { loadingUI } = utilAction;

	const renderLayoutRestaurant = (list) =>
		list.map((restaurant) => (
			<RestaurantFilterItem
				key={restaurant?._id}
				restaurant={restaurant}
				id={restaurant?._id}
				scrollTopRestaurantDetail={scrollTopRestaurantDetail}
				rating={restaurant?._score}
			/>
		));

	useEffect(() => {
		if (match.params.params) {
			if (match.params.params.slice(0, 4) === "page")
				setPageNumber(parseInt(match.params.params.slice(5, match.params.params.length)));
			else if (match.params.pageNumber) setPageNumber(parseInt(match.params.pageNumber));
		}
	}, []);

	console.log(pageNumber);

	return (
		<div className="restaurant-filter-list">
			<div className="restaurant-filter-list__container">
				{(!match.params.params ||
					isNaN(parseInt(match.params.params) && match.params.params) ||
					!isNaN(parseInt(match.params.params))) &&
					renderLayoutRestaurant(restaurantListEachPage)}
				<div className="restaurant-filter__pagination">
					<Pagination
						page={pageNumber}
						count={Math.ceil(restaurantList.length / 10)}
						shape="rounded"
						onChange={(object, number) => {
							dispatch(loadingUI());
							setPageNumber(number);

							if (listKeyWord.length !== 0) {
								dispatch(getSearchRestaurantPerPageRequest(listKeyWord, number));
								history.push(`/today-eat/${listKeyWord.join("+")}/page=${number}`);
							} else {
								history.push(`/today-eat/page=${number}`);
								dispatch(fetchListRestaurantPerPageRequest(number));
							}
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
