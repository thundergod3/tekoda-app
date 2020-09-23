import React, { useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";

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
		authReducer: { authenticated },
		restaurantReducer: { statusSurvey },
	} = useSelector((state) => state);
	const searchPageRef = useRef(null);
	const dispatch = useDispatch();
	const {
		getRestaurantSearchDetailRequest,
		fetchListRestaurantRequest,
		searchRestaurantRequest,
		fetchListRestaurantPerPageRequest,
		storeListKeyword,
		getAllSearchRestaurantRequest,
		getSearchRestaurantPerPageRequest,
		fetchSaveRestaurantRequest,
	} = restaurantAction;

	const scrollTopRestaurantDetail = () => {
		if (searchPageRef.current) searchPageRef.current.scrollTop = 0;
	};

	useEffect(() => {
		dispatch(utilAction.loadingUI());
		dispatch(fetchSaveRestaurantRequest());
		if (match.params.params && match.params.params.slice(0, 4) === "page") {
			dispatch(fetchListRestaurantPerPageRequest(match.params.params.slice(5, match.params.params.length)));
			dispatch(fetchListRestaurantRequest());
		} else if (match.params.params && isNaN(parseInt(match.params.params))) {
			dispatch(getAllSearchRestaurantRequest([match.params.params]));
			dispatch(getSearchRestaurantPerPageRequest([match.params.params], match.params.pageNumber));
			dispatch(searchRestaurantRequest([match.params.params]));
			dispatch(storeListKeyword(match.params.params.split("+").filter((item) => item !== "")));
		} else if (match.params.params && !isNaN(parseInt(match.params.params))) {
			if (Number.isInteger(parseInt(match.params.params))) {
				dispatch(getRestaurantSearchDetailRequest(match.params.params));
				dispatch(fetchListRestaurantPerPageRequest());
				dispatch(fetchListRestaurantRequest());
			} else {
				dispatch(getAllSearchRestaurantRequest([match.params.params]));
				dispatch(searchRestaurantRequest([match.params.params]));
				dispatch(storeListKeyword(match.params.params.split("+").filter((item) => item !== "")));
				dispatch(getSearchRestaurantPerPageRequest([match.params.params], match.params.pageNumber));
			}
		} else {
			dispatch(fetchListRestaurantRequest());
			dispatch(fetchListRestaurantPerPageRequest());
		}
	}, []);

	if (authenticated === false) return <Redirect to="/login" />;

	if (!statusSurvey && authenticated === true) {
		return <Redirect to="/survey" />;
	}

	return (
		<>
			{authenticated !== undefined && (
				<>
					{loading === true ? (
						<Loading />
					) : (
						<div className="search-page">
							<ResultRestaurantSearch scrollTopRestaurantDetail={scrollTopRestaurantDetail} />
							<RestaurantSearchDetail searchPageRef={searchPageRef} />
						</div>
					)}
				</>
			)}
		</>
	);
};

export default SearchRestaurantPage;
