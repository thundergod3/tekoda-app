import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import Carousel from "@brainhubeu/react-carousel";
import IconArrowLeft from "../../../assets/icons/arrow_left.png";
import IconArrowRight from "../../../assets/icons/arrow_right.png";
import "@brainhubeu/react-carousel/lib/style.css";
import "./RestaurantRecommendList.scss";

import RestaurantRecommendItem from "../restaurantRecommendItem/RestaurantRecommendItem";

const RestaurantRecommendList = ({ restaurantRecommendList, title, bio, style }) => {
	return (
		<div className="restaurant-recommend-list" style={style}>
			<p className="restaurant-recommend-list__title">{title}</p>
			<p className="restaurant-recommend-list__bio">{bio}</p>
			<div className="restaurant-recommend-list__container">
				<Carousel
					className="restaurant-social-recommend-list__container"
					arrowLeft={<img src={IconArrowLeft} className="icon-arrow icon-arrow-left" />}
					arrowRight={<img src={IconArrowRight} className="icon-arrow icon-arrow-right" />}
					addArrowClickHandler
					arrows
					slidesPerPage={5}
					slidesPerScroll={5}
					animationSpeed={500}
					offset={7}
					itemWidth={200}>
					{restaurantRecommendList.slice(0, 10).map((restaurant, index) => (
						<Link to={`/today-eat/${restaurant.ResId}/page=1`} key={index}>
							<RestaurantRecommendItem restaurant={restaurant} id={restaurant.ResId} />
						</Link>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default RestaurantRecommendList;
