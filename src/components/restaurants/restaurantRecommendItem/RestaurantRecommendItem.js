import React from "react";

import { useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";

import "./RestaurantRecommendItem.scss";
import numeral from "numeral";

import star from "../../../assets/icons/star.png";

const RestaurantRecommendItem = ({ restaurant: { Name, AvgRatingText, comments, Address, PhotoUrl }, id }) => {
	const dispatch = useDispatch();
	const { getRestaurantSearchDetailRequest } = restaurantAction;

	return (
		<div className="restaurant-recommend-item" onClick={() => dispatch(getRestaurantSearchDetailRequest(id))}>
			<img src={PhotoUrl} alt={Name} />
			<div className="restaurant-recommend-item__info">
				<div className="restaurant-recommend-item__rating">
					<img src={star} alt={star} className="restaurant-recommend-item__star" />
					<span className="restaurant-recommend-item__rateStar">{AvgRatingText}</span>
					<span className="restaurant-recommend-item__comment">({comments} đánh giá)</span>
				</div>
				<p className="restaurant-recommend-item__location">{Name}</p>
				<p className="restaurant-recommend-item__desc">{Address}</p>
				<p className="restaurant-recommend-item__price">Từ {numeral(100000).format("0,0")} vnđ</p>
			</div>
		</div>
	);
};

export default RestaurantRecommendItem;
