import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";
import authAction from "../../stores/redux/actions/authAction";
import utilAction from "../../stores/redux/actions/utilAction";

import "./restaurants.scss";

import Loading from "../../components/utils/loading/Loading";
import RestaurantRecommendList from "../../components/restaurants/restaurantRecommendList/RestaurantRecommendList";
import WrapperSearchBar from "../../components/layouts/wrapperSearchBar/WrapperSearchBar";

const Homepage = () => {
	const {
		restaurantReducer: { trendingRestaurantList, statusSurvey },
		authReducer: { authenticated },
		utilReducer: { loading },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const {
		fetchListRestaurantRequest,
		removeListRestaurantPerPage,
		fetchRecommendRestaurantRequest,
		deleteStoreListKeyWord,
	} = restaurantAction;
	const { loadingUI } = utilAction;

	useEffect(() => {
		dispatch(loadingUI());
		dispatch(fetchListRestaurantRequest());
		dispatch(removeListRestaurantPerPage());
		dispatch(deleteStoreListKeyWord());
		dispatch(fetchRecommendRestaurantRequest());
	}, []);

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
								<RestaurantRecommendList
									restaurantRecommendList={trendingRestaurantList}
									title="Top nhà hàng nổi bật trên mạng xã hội"
									bio="Take a fresh view an span our top visited places"
									style={{ marginTop: 0 }}
								/>
								<RestaurantRecommendList
									restaurantRecommendList={trendingRestaurantList}
									title="Top ăn trưa gần Hoàng Đạo Thúy gợi ý cho riêng bạn"
									bio="Take a fresh view an span our top visited places"
								/>
								<RestaurantRecommendList
									restaurantRecommendList={trendingRestaurantList}
									title="Top nhà hàng nổi bật trên mạng xã hội"
									bio="Take a fresh view an span our top visited places"
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
