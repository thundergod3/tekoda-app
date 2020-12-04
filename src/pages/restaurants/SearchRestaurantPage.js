import React, { useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";
import utilAction from "../../stores/redux/actions/utilAction";

import "./restaurants.scss";

import ResultRestaurantSearch from "../../components/restaurants/resultRestaurantSearch/ResultRestaurantSearch";
import RestaurantSearchDetail from "../../components/restaurants/restaurantSearchDetail/RestaurantSearchDetail";
import Loading from "../../components/utils/loading/Loading";

const SearchRestaurantPage = ({
	match: {
		params: { params, pageNumber, collectionId },
	},
}) => {
	const {
		utilReducer: { loading },
		authReducer: { authenticated },
		restaurantReducer: { statusSurvey },
		errorReducer: { errorStatus },
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
		fetchListCollectionRestaurant,
	} = restaurantAction;

	const scrollTopRestaurantDetail = () => {
		if (searchPageRef.current) searchPageRef.current.scrollTop = 0;
	};

	useEffect(() => {
		dispatch(utilAction.loadingUI());
		dispatch(fetchSaveRestaurantRequest());
		if (params && params.slice(0, 4) === "page") {
			dispatch(fetchListRestaurantPerPageRequest(params.slice(5, params.length)));
			dispatch(fetchListRestaurantRequest());
		} else if (params && isNaN(parseInt(params))) {
			dispatch(getAllSearchRestaurantRequest([params]));
			dispatch(getSearchRestaurantPerPageRequest([params], pageNumber));
			dispatch(searchRestaurantRequest([params]));
			dispatch(storeListKeyword(params.split("+").filter((item) => item !== "")));
		} else if (params && !isNaN(parseInt(params))) {
			if (Number.isInteger(parseInt(params))) {
				dispatch(getRestaurantSearchDetailRequest(params));
				dispatch(fetchListRestaurantPerPageRequest());
				dispatch(fetchListRestaurantRequest());
			} else {
				dispatch(getAllSearchRestaurantRequest([params]));
				dispatch(searchRestaurantRequest([params]));
				dispatch(storeListKeyword(params.split("+").filter((item) => item !== "")));
				dispatch(getSearchRestaurantPerPageRequest([params], pageNumber));
			}
		} else if (collectionId) {
			dispatch(fetchListCollectionRestaurant(parseInt(collectionId)));
		} else {
			dispatch(fetchListRestaurantRequest());
			dispatch(fetchListRestaurantPerPageRequest());
			dispatch(getRestaurantSearchDetailRequest(1076));
		}
	}, []);

	if (authenticated === false || errorStatus === 401) return <Redirect to="/login" />;

	if (!statusSurvey && authenticated === true) {
		return <Redirect to="/survey" />;
	}

	return (
		<>
			{authenticated !== undefined && (
				<>
					{loading ? (
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
