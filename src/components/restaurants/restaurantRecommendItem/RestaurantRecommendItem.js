import React from "react";

import "./RestaurantRecommendItem.scss";
import numeral from "numeral";

import star from "../../../assets/icons/star.png";

const RestaurantRecommendItem = ({ restaurant: { title, rates, comments, location, price, image } }) => {
	return (
		<div className="restaurant-recommend-item">
			<img src={image} alt={title} />
			<div className="restaurant-recommend-item__info">
				<div className="restaurant-recommend-item__rating">
					<img src={star} alt={star} className="restaurant-recommend-item__star" />
					<span className="restaurant-recommend-item__rateStar">{rates}</span>
					<span className="restaurant-recommend-item__comment">({comments} đánh giá)</span>
				</div>
				<p className="restaurant-recommend-item__location">{title}</p>
				<p className="restaurant-recommend-item__desc">{location}</p>
				<p className="restaurant-recommend-item__price">Từ {numeral(price).format("0,0")} vnđ</p>
			</div>
		</div>
	);
};

export default RestaurantRecommendItem;
