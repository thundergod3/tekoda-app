import React from "react";

import { useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import utilAction from "../../../stores/redux/actions/utilAction";

import "./RestaurantRecommendItem.scss";
import numeral from "numeral";

import star from "../../../assets/icons/star.png";

const RestaurantRecommendItem = ({
	restaurant: {
		detail: { Name, AvgRatingText, comments, Address, ResId },
		image_link,
	},
}) => {
	const dispatch = useDispatch();
	const { getRestaurantSearchDetailRequest } = restaurantAction;
	const { loadingUI } = utilAction;

	return (
		<div
			className="restaurant-recommend-item"
			onClick={() => {
				dispatch(loadingUI());
				dispatch(getRestaurantSearchDetailRequest(ResId));
			}}>
			<img src={image_link[0]} alt={Name} />
			<div className="restaurant-recommend-item__info">
				<div className="restaurant-recommend-item__rating">
					<img src={star} alt={star} className="restaurant-recommend-item__star" />
					<span className="restaurant-recommend-item__rateStar">{AvgRatingText}</span>
					<span className="restaurant-recommend-item__comment">100 (đánh giá)</span>
				</div>
				<p className="restaurant-recommend-item__location">{Name}</p>
				<p className="restaurant-recommend-item__desc">{Address}</p>
				<p className="restaurant-recommend-item__price">Từ {numeral(100000).format("0,0")} vnđ</p>
			</div>
		</div>
	);
};

export default RestaurantRecommendItem;
