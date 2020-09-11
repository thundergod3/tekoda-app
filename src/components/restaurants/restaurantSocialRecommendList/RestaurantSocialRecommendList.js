import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import Carousel from "@brainhubeu/react-carousel";
import Icon from "react-fa";
import "@brainhubeu/react-carousel/lib/style.css";
import "./RestaurantSocialRecommendList.scss";

import RestaurantRecommendItem from "../restaurantRecommendItem/RestaurantRecommendItem";
import Loading from "../../utils/loading/Loading";

const RestaurantSocialRecommendList = () => {
	const {
		restaurantReducer: { restaurantList: restaurantSocialRecommendList },
		utilReducer: { loadingList },
	} = useSelector((state) => state);

	return (
		<div className="restaurant-social-recommend-list">
			<p className="restaurant-social-recommend-list__title">Top 10 nhà hàng </p>
			<p className="restaurant-social-recommend-list__title">xu hướng trên mạng xã hội</p>
			<p className="restaurant-social-recommend-list__bio">Take a fresh view an span our top visited places</p>

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
				{restaurantSocialRecommendList.map((restaurant, index) => (
					<Link to={`/today-eat/${restaurant._id}`} key={index}>
						<RestaurantRecommendItem restaurant={restaurant?._source} id={restaurant._id} />
					</Link>
				))}
			</Carousel>
		</div>
	);
};

export default RestaurantSocialRecommendList;
