import React from "react";

import restaurant1 from "../../../assets/restaurants/restaurant1.png";
import restaurant2 from "../../../assets/restaurants/restaurant2.png";
import restaurant3 from "../../../assets/restaurants/restaurant3.png";

import "./RestaurantLocationRecommendList.scss";

import RestaurantRecommendItem from "../restaurantRecommendItem/RestaurantRecommendItem";

const restaurantLocationRecommendList = [
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

const RestaurantLocationRecommendList = () => {
	return (
		<div className="restaurant-location-recommend-list">
			<p className="restaurant-location-recommend-list__title">Top 10 lựa chọn ăn trưa gần Hoàng Đạo Thúy</p>
			<p className="restaurant-location-recommend-list__title">được gợi ỷ riêng cho bạn</p>
			<p className="restaurant-location-recommend-list__bio">Take a fresh view an span our top visited places</p>
			<div className="restaurant-location-recommend-list__container">
				{restaurantLocationRecommendList.map((restaurant, index) => (
					<RestaurantRecommendItem key={index} restaurant={restaurant} />
				))}
			</div>
		</div>
	);
};

export default RestaurantLocationRecommendList;
