import React from "react";

import restaurant1 from "../../../assets/restaurants/restaurant1.png";
import restaurant2 from "../../../assets/restaurants/restaurant2.png";
import restaurant3 from "../../../assets/restaurants/restaurant3.png";

import "./RestaurantSocialRecommendList.scss";

import RestaurantRecommendItem from "../restaurantRecommendItem/RestaurantRecommendItem";

const restaurantSocialRecommendList = [
	{
		title: "Langmandi -Beca Room, Pretty House in Centre Hanoi",
		rates: 4.7,
		comments: 110,
		location: "T116C5 Nghĩa Tân, Quận Cầu Giấy, Hà Nội",
		price: 100000,
		image: restaurant1,
	},
	{
		title: "Langmandi -Beca Room, Pretty House in Centre Hanoi",
		rates: 4.7,
		comments: 110,
		location: "T116C5 Nghĩa Tân, Quận Cầu Giấy, Hà Nội",
		price: 100000,
		image: restaurant1,
	},
	{
		title: "Langmandi -Beca Room, Pretty House in Centre Hanoi",
		rates: 4.7,
		comments: 110,
		location: "T116C5 Nghĩa Tân, Quận Cầu Giấy, Hà Nội",
		price: 100000,
		image: restaurant1,
	},
];

const RestaurantSocialRecommendList = () => {
	return (
		<div className="restaurant-social-recommend-list">
			<p className="restaurant-social-recommend-list__title">Top 10 nhà hàng </p>
			<p className="restaurant-social-recommend-list__title">xu hướng trên mạng xã hội</p>
			<p className="restaurant-social-recommend-list__bio">Take a fresh view an span our top visited places</p>
			<div className="restaurant-social-recommend-list__container">
				{restaurantSocialRecommendList.map((restaurant, index) => (
					<RestaurantRecommendItem key={index} restaurant={restaurant} />
				))}
			</div>
		</div>
	);
};

export default RestaurantSocialRecommendList;
