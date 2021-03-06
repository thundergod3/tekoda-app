import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";
import utilAction from "../../stores/redux/actions/utilAction";

import "./restaurants.scss";
import getLocation from "../../helpers/getLocation";

import Loading from "../../components/utils/loading/Loading";
import RestaurantRecommendList from "../../components/restaurants/restaurantRecommendList/RestaurantRecommendList";
import WrapperSearchBar from "../../components/layouts/wrapperSearchBar/WrapperSearchBar";
import CollectionRestaurantList from "../../components/restaurants/collectionRestaurantList/CollectionRestaurantList";

const Homepage = () => {
	const {
		restaurantReducer: {
			restaurantList,
			trendingRestaurantList,
			locationRestaurantList,
			behaviorRestaurantList,
			statusSurvey,
		},
		authReducer: { authenticated },
		utilReducer: { loading },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const {
		removeListRestaurantPerPage,
		fetchRecommendRestaurantRequest,
		fetchRecommendRestaurantGuessRequest,
		deleteStoreListKeyWord,
		fetchRecommendRestaurantLocationRequest,
		fetchRecommendBehaviorRestaurantRequest,
		fetchListRestaurantRequest,
	} = restaurantAction;
	const { loadingUI } = utilAction;
	const [address, setAddress] = useState(null);

	useEffect(() => {
		getLocation(setAddress, false, true);
		dispatch(loadingUI());
		dispatch(removeListRestaurantPerPage());
		dispatch(deleteStoreListKeyWord());
	}, []);

	useEffect(() => {
		if (authenticated !== undefined) {
			if (authenticated === true) {
				dispatch(fetchListRestaurantRequest());
				dispatch(fetchRecommendRestaurantRequest());
				dispatch(fetchRecommendBehaviorRestaurantRequest());
				if (address) {
					dispatch(
						fetchRecommendRestaurantLocationRequest({
							latitude: address[0].geometry.location.lat,
							longitude: address[0].geometry.location.lng,
						})
					);
				}
			} else {
				dispatch(fetchRecommendRestaurantGuessRequest());
			}
		}
	}, [authenticated, address]);

	if (statusSurvey === undefined || (!statusSurvey && authenticated === true)) {
		return <Redirect to="/survey" />;
	}

	return (
		<>
			{authenticated !== undefined && statusSurvey !== undefined ? (
				<>
					{loading === true ? (
						<Loading />
					) : (
						<>
							<WrapperSearchBar />
							<div className="homepage">
								{authenticated === true && <CollectionRestaurantList />}
								<RestaurantRecommendList
									restaurantRecommendList={
										authenticated === true
											? restaurantList
													.slice(0, 10)
													.sort((a, b) => b.detail.AvgRatingText - a.detail.AvgRatingText)
											: trendingRestaurantList
													.slice(0, 10)
													.sort((a, b) => b.detail.AvgRatingText - a.detail.AvgRatingText)
									}
									title="Nhà hàng được xem nhiều"
									style={{ marginTop: 0 }}
								/>
								<RestaurantRecommendList
									restaurantRecommendList={
										authenticated === true
											? trendingRestaurantList
													.slice(0, 10)
													.sort((a, b) => b.detail.AvgRatingText - a.detail.AvgRatingText)
											: trendingRestaurantList
													.slice(10, 20)
													.sort((a, b) => b.detail.AvgRatingText - a.detail.AvgRatingText)
									}
									title="Những người giống bạn thích"
									style={{ marginTop: 0 }}
								/>
								{authenticated === true && address && (
									<RestaurantRecommendList
										restaurantRecommendList={locationRestaurantList
											.slice(0, 10)
											.sort((a, b) => b.detail.AvgRatingText - a.detail.AvgRatingText)}
										title={`Quán ngon gần bạn`}
									/>
								)}
								<RestaurantRecommendList
									restaurantRecommendList={
										authenticated === true
											? behaviorRestaurantList
													.slice(0, 10)
													.sort((a, b) => b.detail.AvgRatingText - a.detail.AvgRatingText)
											: trendingRestaurantList
													.slice(20, 30)
													.sort((a, b) => b.detail.AvgRatingText - a.detail.AvgRatingText)
									}
									title="Có thể bạn sẽ thích"
								/>
							</div>
						</>
					)}
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Homepage;
