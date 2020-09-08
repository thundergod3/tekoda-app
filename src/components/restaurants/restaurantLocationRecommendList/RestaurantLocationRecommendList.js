import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import Carousel from "@brainhubeu/react-carousel";
import Icon from "react-fa";
import "@brainhubeu/react-carousel/lib/style.css";
import "./RestaurantLocationRecommendList.scss";

import RestaurantRecommendItem from "../restaurantRecommendItem/RestaurantRecommendItem";
import Loading from "../../utils/loading/Loading";

const RestaurantLocationRecommendList = () => {
	const {
		restaurantReducer: { restaurantList: restaurantLocationRecommendList },
		utilReducer: { loadingList },
	} = useSelector((state) => state);

	let loadingFetchFListRestaurant = false;
	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "fetchListRestaurant") loadingFetchFListRestaurant = loadingList[i].loading;
	}

	return (
		<>
			{loadingFetchFListRestaurant !== true ? (
				<div className="restaurant-location-recommend-list">
					<p className="restaurant-location-recommend-list__title">
						Top 10 lựa chọn ăn trưa gần Hoàng Đạo Thúy
					</p>
					<p className="restaurant-location-recommend-list__title">được gợi ỷ riêng cho bạn</p>
					<p className="restaurant-location-recommend-list__bio">
						Take a fresh view an span our top visited places
					</p>
					<div className="restaurant-location-recommend-list__container">
						<Carousel
							className="restaurant-social-recommend-list__container"
							arrowLeft={<Icon className="icon-example" name="arrow-left" />}
							arrowRight={<Icon className="icon-example" name="arrow-right" />}
							addArrowClickHandler
							arrows
							slidesPerPage={3}
							slidesPerScroll={3}
							animationSpeed={500}
							offset={10}
							itemWidth={394}>
							{restaurantLocationRecommendList.map((restaurant, index) => (
								<Link to={`/today-eat/${restaurant._id}`} key={index}>
									<RestaurantRecommendItem restaurant={restaurant?._source} id={restaurant._id} />
								</Link>
							))}
						</Carousel>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};

export default RestaurantLocationRecommendList;
