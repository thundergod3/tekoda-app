import React, { useState, useEffect } from "react";
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
	const [tempRandomList, setTempRandomList] = useState([]);
	const {
		restaurantReducer: { trendingRestaurantList, statusSurvey },
		authReducer: { authenticated },
		utilReducer: { loading },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const {
		removeListRestaurantPerPage,
		fetchRecommendRestaurantRequest,
		fetchRecommendRestaurantGuessRequest,
		deleteStoreListKeyWord,
	} = restaurantAction;
	const { loadingUI } = utilAction;

	useEffect(() => {
		dispatch(loadingUI());
		dispatch(removeListRestaurantPerPage());
		dispatch(deleteStoreListKeyWord());
	}, []);

	useEffect(() => {
		// if (authenticated !== undefined) {
		// 	if (authenticated === true) {
		// 		dispatch(fetchRecommendRestaurantRequest());
		// 	} else {
		// 		dispatch(fetchRecommendRestaurantGuessRequest());
		// 	}
		// }

		setTempRandomList([0, 0, 0].map((item) => Math.floor(Math.random() * 91)));
		dispatch(fetchRecommendRestaurantGuessRequest());
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
									restaurantRecommendList={trendingRestaurantList.slice(
										tempRandomList[0],
										tempRandomList[0] + 10
									)}
									title="Top nhà hàng nổi bật trên mạng xã hội"
									bio="Take a fresh view an span our top visited places"
									style={{ marginTop: 0 }}
								/>
								<RestaurantRecommendList
									restaurantRecommendList={trendingRestaurantList.slice(
										tempRandomList[1],
										tempRandomList[1] + 10
									)}
									title="Top ăn trưa gần địa điểm gợi ý cho riêng bạn"
									bio="Take a fresh view an span our top visited places"
								/>
								<RestaurantRecommendList
									restaurantRecommendList={trendingRestaurantList.slice(
										tempRandomList[2],
										tempRandomList[2] + 10
									)}
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
