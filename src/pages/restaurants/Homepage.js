import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";
import utilAction from "../../stores/redux/actions/utilAction";

import "./restaurants.scss";
import cookieLocal from "../../helpers/cookieLocal";

import SearchBar from "../../components/layouts/searchBar/SearchBar";
import FilterList from "../../components/utils/filterList/FilterList";
import RestaurantSocialRecommendList from "../../components/restaurants/restaurantSocialRecommendList/RestaurantSocialRecommendList";
import RestaurantLocationRecommendList from "../../components/restaurants/restaurantLocationRecommendList/RestaurantLocationRecommendList";
import WarningCookie from "../../components/utils/warningCookie/WarningCookie";
import { Redirect } from "react-router-dom";
import Loading from "../../components/utils/loading/Loading";

const Homepage = () => {
	const {
		restaurantReducer: { statusSurvey },
		authReducer: { authenticated },
		utilReducer: { loading },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const {
		fetchListRestaurantRequest,
		fetchListRestaurantPerPageRequest,
		fetchRecommendRestaurantRequest,
	} = restaurantAction;
	const { loadingUI } = utilAction;

	useEffect(() => {
		dispatch(loadingUI());
		dispatch(fetchListRestaurantRequest());
		// dispatch(fetchRecommendRestaurantRequest());
		dispatch(fetchListRestaurantPerPageRequest());
	}, []);

	if (!statusSurvey && authenticated === true) {
		return <Redirect to="/survey" />;
	}

	return (
		<>
			{loading === true ? (
				<Loading />
			) : (
				<>
					<div className="homepage">
						<SearchBar />
						<FilterList />
						<RestaurantSocialRecommendList />
						<RestaurantLocationRecommendList />
						<WarningCookie />
					</div>
				</>
			)}
		</>
	);
};

export default Homepage;
